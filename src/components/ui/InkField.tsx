"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo animado de los bloques oscuros: un campo de líneas finas que ondulan
 * lentamente, como curvas de nivel de un terreno. Representa el "entorno que
 * cambia" (idea central del sitio), inspirado en la trama del hero de Parla.
 *
 * - Canvas puro, sin dependencias; el loop no toca estado de React.
 * - Se pausa fuera de pantalla y con la pestaña oculta.
 * - prefers-reduced-motion: dibuja un único cuadro estático.
 * - Se concentra a la derecha y se desvanece hacia el texto (máscara CSS).
 */
export function InkField({
  density = 34,
  intensity = 1,
  speed = 1,
  interactive = true,
  className = "",
}: {
  density?: number;
  /** 0..1: escala opacidad y amplitud de las ondas. */
  intensity?: number;
  /** Multiplicador de la velocidad de ondulación. */
  speed?: number;
  /** Si el puntero deforma las líneas. */
  interactive?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    let color = "193 143 205"; // --lila-light por defecto
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = Math.random() * 100;
    let last = performance.now();
    // Puntero suavizado (coordenadas relativas 0..1); fuera del canvas queda inactivo.
    const pointer = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5, strength: 0, target: 0 };

    const readColor = () => {
      const hex = getComputedStyle(canvas).getPropertyValue("--accent").trim();
      const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
      if (m) color = `${parseInt(m[1], 16)} ${parseInt(m[2], 16)} ${parseInt(m[3], 16)}`;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const smooth = (e0: number, e1: number, x: number) => {
      const k = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
      return k * k * (3 - 2 * k);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      pointer.strength += (pointer.target - pointer.strength) * 0.05;

      const lines = density;
      const step = Math.max(6, w / 180);
      for (let i = 0; i < lines; i++) {
        const p = i / (lines - 1);
        const base = h * (0.04 + p * 0.98);
        const accent = i % 7 === 3;
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const u = x / w;
          // La amplitud crece hacia la derecha: el lado del texto queda calmo.
          const env = 0.25 + 0.75 * smooth(0.1, 0.85, u);
          const wave =
            Math.sin(u * 5.2 + t * 0.22 + i * 0.38) * 0.55 +
            Math.sin(u * 11.7 - t * 0.17 + i * 0.21) * 0.25 +
            Math.sin(u * 2.1 + t * 0.09 - i * 0.12) * 0.6;
          // El puntero abre levemente las líneas a su alrededor.
          const dx = u - pointer.x;
          const dy = base / h - pointer.y;
          const bump = pointer.strength * Math.exp(-(dx * dx * 18 + dy * dy * 26)) * Math.sign(dy || 1) * 26;
          const y = base + wave * env * h * 0.055 * (0.45 + 0.55 * intensity) + bump;
          if (x === -step) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgb(${color} / ${(accent ? 0.42 : 0.16) * intensity})`;
        ctx.lineWidth = accent ? 1.15 : 0.8;
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      t += dt * speed;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches || !visible || document.hidden) {
        draw();
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      pointer.target = interactive && inside && e.pointerType === "mouse" ? 1 : 0;
      if (inside) {
        pointer.tx = x;
        pointer.ty = y;
      }
    };

    const onScheme = () => {
      readColor();
      if (reduce.matches) draw();
    };

    readColor();
    resize();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce.matches || !visible) draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);
    reduce.addEventListener("change", start);
    scheme.addEventListener("change", onScheme);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
      reduce.removeEventListener("change", start);
      scheme.removeEventListener("change", onScheme);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [density, intensity, speed, interactive]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`ink-field pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
