"use client";

import { useEffect, useRef } from "react";

export const HERO_PAUSE_EVENT = "hero:pause";

/**
 * Video de fondo del hero (ejecutivos frente a la ciudad: el "entorno").
 * - Se renderiza con póster y sin autoplay: el póster es lo primero que se ve (LCP)
 *   y el video empieza sólo en el cliente.
 * - No se reproduce con prefers-reduced-motion ni con ahorro de datos (queda el póster).
 * - Se pausa fuera de pantalla y cuando el usuario pausa el titular (evento HERO_PAUSE_EVENT).
 * Archivos generados desde el original con ffmpeg: sin audio, en blanco y negro, faststart.
 */
export function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let visible = true;
    let userPaused = false;

    const sync = () => {
      const shouldPlay = !reduce.matches && !saveData && visible && !userPaused && !document.hidden;
      if (shouldPlay) video.play().catch(() => {});
      else video.pause();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(video);

    const onPause = (e: Event) => {
      userPaused = (e as CustomEvent<boolean>).detail;
      sync();
    };

    window.addEventListener(HERO_PAUSE_EVENT, onPause);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    sync();

    return () => {
      io.disconnect();
      window.removeEventListener(HERO_PAUSE_EVENT, onPause);
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/hero-oficina-poster.webp"
      className={`pointer-events-none h-full w-full object-cover ${className}`}
    >
      <source src="/video/hero-oficina-movil.mp4" type="video/mp4" media="(max-width: 767px)" />
      <source src="/video/hero-oficina.webm" type="video/webm" />
      <source src="/video/hero-oficina.mp4" type="video/mp4" />
    </video>
  );
}
