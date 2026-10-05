"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { CaretDown, CaretUp, Pause, Play } from "@phosphor-icons/react";

export type CarouselPost = { slug: string; title: string; category: string; date: string; image?: string };

const ROW = 128; // alto de cada fila en px (imagen 96 + aire)
const VISIBLE = 3;
const INTERVAL = 4500;

const dateFmt = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Carrusel vertical de Insights secundarios: muestra 3 notas y avanza de a una.
 * Se pausa con hover/foco y con el botón (WCAG 2.2.2). Las notas clonadas al final
 * permiten el bucle continuo; al llegar al final salta sin transición al inicio.
 * Con movimiento reducido no avanza solo y los cambios manuales son instantáneos.
 */
export function InsightsCarousel({ posts }: { posts: CarouselPost[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const n = posts.length;
  // La estructura no depende de `reduce` (evita desajustes de hidratación):
  // con movimiento reducido sólo se desactiva el avance automático.
  const canLoop = n > VISIBLE;
  const running = canLoop && !reduce && !paused && !hover;

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [running]);

  // Tras llegar a las copias, vuelve al inicio sin transición (se ve idéntico).
  function onTransitionEnd() {
    if (index >= n) {
      setAnimate(false);
      setIndex(index - n);
    }
  }

  function step(dir: 1 | -1) {
    setAnimate(true);
    if (dir === -1 && index === 0) {
      // Retroceder desde el inicio: salta a la copia equivalente y luego anima.
      setAnimate(false);
      setIndex(n);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(n - 1);
        }),
      );
      return;
    }
    setIndex((i) => i + dir);
  }

  const track = canLoop ? [...posts, ...posts.slice(0, VISIBLE)] : posts;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
    >
      <div
        className="relative overflow-clip"
        style={canLoop ? { height: ROW * VISIBLE } : undefined}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Otros insights"
      >
        <ul
          onTransitionEnd={onTransitionEnd}
          className={animate && canLoop ? "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" : ""}
          style={canLoop ? { transform: `translateY(-${index * ROW}px)` } : undefined}
        >
          {track.map((post, i) => {
            const clone = i >= n;
            const visible = !canLoop || (i >= index && i < index + VISIBLE);
            return (
              <li key={`${post.slug}-${i}`} style={canLoop ? { height: ROW } : undefined} aria-hidden={clone || !visible || undefined}>
                <Link
                  href={`/insights/${post.slug}`}
                  tabIndex={clone || !visible ? -1 : undefined}
                  className="group grid h-full grid-cols-[96px_1fr] items-center gap-5 py-4"
                >
                  <div className="relative aspect-square overflow-hidden bg-bg-2">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-accent">{post.category}</p>
                    <h3 className="mt-1.5 line-clamp-2 text-[17px] leading-snug tracking-tight group-hover:text-accent">{post.title}</h3>
                    <p className="mt-1 text-sm text-muted">{dateFmt.format(new Date(post.date))}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {canLoop && (
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Nota anterior"
            className="flex size-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <CaretUp size={14} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Nota siguiente"
            className="flex size-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <CaretDown size={14} />
          </button>
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
            className="flex size-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
          >
            {paused ? <Play size={12} weight="fill" /> : <Pause size={12} weight="fill" />}
          </button>
        </div>
      )}
    </div>
  );
}
