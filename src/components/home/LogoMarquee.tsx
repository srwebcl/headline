"use client";

import { useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * Carrusel infinito de logos (CSS .marquee en globals.css). Dos copias de la lista
 * se desplazan en bucle; se pausa con hover o con el botón (WCAG 2.2.2).
 * Con movimiento reducido queda estático y la copia se oculta.
 */
export function LogoMarquee({ slugs, label }: { slugs: string[]; label: string }) {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <div className="marquee relative flex overflow-hidden py-2" data-paused={paused || undefined} role="region" aria-label={label}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="marquee-track flex shrink-0 items-center gap-16 pr-16 md:gap-20 md:pr-20">
            {slugs.map((slug) => (
              <li key={slug} className="flex h-12 shrink-0 items-center">
                <LogoMark slug={slug} height={30} maxWidth={140} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={paused ? "Reanudar carrusel de clientes" : "Pausar carrusel de clientes"}
        className="mx-auto mt-6 flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg motion-reduce:hidden"
      >
        {paused ? <Play size={10} weight="fill" /> : <Pause size={10} weight="fill" />}
      </button>
    </div>
  );
}
