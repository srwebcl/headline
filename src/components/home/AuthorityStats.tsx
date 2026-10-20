"use client";

import { useEffect, useRef } from "react";

type Stat = { value: string; label: string };

/**
 * Destacados de "Quiénes somos". Al entrar en pantalla:
 * - los recuadros suben en secuencia (negro / lila alternados),
 * - una línea amarilla se dibuja en la parte superior de cada uno,
 * - las cifras cuentan desde 0 hasta su valor (el texto se actualiza por ref, sin re-render).
 * El HTML del servidor trae los valores finales (SEO / sin JS). Con movimiento reducido no hay animación.
 */
export function AuthorityStats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const nums = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Prepara: cifras en 0 y recuadros ocultos (sólo si aún no se ven, para no "parpadear").
    if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
      nums.current.forEach((n) => n && (n.textContent = "0"));
      el.dataset.state = "ready";
    } else return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.dataset.state = "in";
        stats.forEach((s, i) => {
          const node = nums.current[i];
          const target = parseInt(s.value.replace(/\D/g, ""), 10);
          if (!node || Number.isNaN(target)) return;
          const delay = 250 + i * 140;
          const duration = 1400;
          let start = 0;
          const tick = (t: number) => {
            if (!start) start = t;
            const p = Math.min(1, (t - start - delay) / duration);
            if (p >= 0) node.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stats]);

  return (
    <ul ref={ref} className="stats grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((h, i) => (
        <li
          key={h.label}
          style={{ "--i": i } as React.CSSProperties}
          className={`stat ${i % 2 === 0 ? "tone-ink" : "tone-lila"} relative flex min-h-[210px] flex-col justify-between overflow-hidden bg-bg p-6 text-left text-fg md:p-7`}
        >
          <span aria-hidden className="stat-bar absolute inset-x-0 top-0 h-[3px] bg-[var(--dot)]" />
          <p className="text-[clamp(3.2rem,5vw,4.6rem)] font-semibold leading-none tracking-tight text-accent tabular-nums">
            {h.value.startsWith("+") && "+"}
            <span
              ref={(n) => {
                nums.current[i] = n;
              }}
            >
              {h.value.replace(/^\+/, "")}
            </span>
          </p>
          <p className="mt-6 max-w-[22ch] text-[17px] leading-snug text-muted">{h.label}</p>
        </li>
      ))}
    </ul>
  );
}
