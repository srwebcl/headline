"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Asterisk, Plus } from "@phosphor-icons/react";
import type { Capability } from "@/data/content";

type Item = Pick<Capability, "slug" | "num" | "name" | "summary" | "listLabel" | "items">;

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Servicios del Home. Desktop: índice de capacidades (pestañas verticales) + panel de
 * detalle fijo con las soluciones de la capacidad activa. Móvil: acordeón.
 * La barra lila se desliza a la capacidad activa (layoutId); el panel cambia con fundido
 * y las soluciones entran escalonadas. Con movimiento reducido los cambios son instantáneos.
 */
export function CapabilitiesExplorer({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameVisible = useInView(frameRef, { once: true, amount: 0.35 });

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    const next =
      e.key === "ArrowDown" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowUp" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      {/* Desktop: índice + panel */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" aria-label="Capacidades" onKeyDown={onKeyDown} className="lg:col-span-5">
          {items.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`${id}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative flex w-full items-baseline gap-6 py-5 pl-8 pr-4 text-left"
              >
                {isActive && (
                  <motion.span
                    layoutId={`${id}-bar`}
                    aria-hidden
                    className="absolute inset-y-3 left-0 w-0.5 bg-accent"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className={`w-8 shrink-0 text-lg font-light transition-colors ${isActive ? "text-accent" : "text-fg/50"}`}>
                  {c.num}
                </span>
                <span
                  className={`text-[clamp(1.35rem,1.9vw,1.75rem)] leading-tight tracking-tight transition-[color,transform] duration-500 ease-out ${
                    isActive ? "translate-x-1 text-fg" : "text-fg/55 group-hover:text-fg"
                  }`}
                >
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7">
          {/* Marco lila: conecta con la línea de "Nuestro modelo". Se dibuja completo al entrar y al cambiar de capacidad. */}
          <div ref={frameRef} className="relative sticky top-28">
            <div
              role="tabpanel"
              id={`${id}-panel`}
              aria-labelledby={`${id}-tab-${active}`}
              className="tone-white min-h-[540px] overflow-hidden bg-bg p-10 text-fg xl:p-12"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={items[active].slug}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8, transition: { duration: 0.2 } }}
                >
                  <Detail item={items[active]} reduce={!!reduce} />
                </motion.div>
              </AnimatePresence>
            </div>

            <PanelFrame drawKey={active} visible={frameVisible} reduce={!!reduce} />
          </div>
        </div>
      </div>

      {/* Móvil: acordeón */}
      <ul className="lg:hidden">
        {items.map((c, i) => {
          const isOpen = open === i;
          return (
            <li key={c.slug} className={isOpen ? "tone-white bg-bg text-fg" : ""}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-m-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-baseline gap-4 px-5 py-5 text-left"
              >
                <span className={`w-7 shrink-0 font-light ${isOpen ? "text-accent" : "text-muted"}`}>{c.num}</span>
                <span className={`flex-1 text-xl leading-tight tracking-tight ${isOpen ? "text-fg" : "text-fg/80"}`}>{c.name}</span>
                <Plus aria-hidden size={18} className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
              </button>
              {isOpen && (
                <motion.div
                  id={`${id}-m-${i}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
                  className="px-5 pb-8"
                >
                  <Detail item={c} reduce={!!reduce} compact />
                </motion.div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Detail({ item, reduce, compact = false }: { item: Item; reduce: boolean; compact?: boolean }) {
  return (
    <div className="relative">
      {!compact && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-8 text-[11rem] font-normal leading-none tracking-tighter text-accent/35"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}
        >
          {item.num}
        </motion.span>
      )}
      {/* pr deja espacio al número de fondo: ni el título ni la bajada lo tocan */}
      {!compact && <h3 className="relative max-w-[22ch] pr-40 text-[2rem] font-light leading-tight tracking-tight">{item.name}</h3>}
      <p className={`${compact ? "" : "relative mt-4 pr-44"} max-w-[52ch] leading-relaxed text-muted`}>{item.summary}</p>

      <p className="mt-8 text-[13px] font-medium text-fg">{item.listLabel}</p>
      {/* Orden en columnas: primero hacia abajo y luego a la derecha. */}
      <ol
        className={`mt-4 grid gap-x-10 ${compact ? "gap-y-3" : "gap-y-3.5 sm:grid-flow-col sm:grid-cols-2 sm:[grid-template-rows:repeat(var(--rows),auto)]"}`}
        style={{ "--rows": Math.ceil(item.items.length / 2) } as React.CSSProperties}
      >
        {item.items.map((s, j) => (
          <motion.li
            key={s}
            className="flex gap-3.5 leading-snug"
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.08 + j * 0.035, ease } }}
          >
            <Asterisk aria-hidden weight="bold" size={17} className="mt-[0.15em] shrink-0 text-accent" />
            <span>{s}</span>
          </motion.li>
        ))}
      </ol>

      <Link
        href={`/que-hacemos/${item.slug}`}
        className="group mt-10 inline-flex items-center gap-3 border-b border-line py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-fg transition-colors hover:border-accent hover:text-accent"
      >
        Ver más
        <span className="sr-only">: {item.name}</span>
        <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/**
 * Marco lila del panel: los cuatro lados se dibujan en secuencia (arriba → derecha → abajo → izquierda).
 * `drawKey` reinicia el dibujo al cambiar de capacidad; antes de entrar en pantalla no se muestra.
 */
function PanelFrame({ drawKey, visible, reduce }: { drawKey: number; visible: boolean; reduce: boolean }) {
  const sides = [
    { cls: "inset-x-0 top-0 h-[2px] origin-left", axis: "scaleX" },
    { cls: "inset-y-0 right-0 w-[2px] origin-top", axis: "scaleY" },
    { cls: "inset-x-0 bottom-0 h-[2px] origin-right", axis: "scaleX" },
    { cls: "inset-y-0 left-0 w-[2px] origin-bottom", axis: "scaleY" },
  ] as const;

  return (
    <span key={drawKey} aria-hidden className="pointer-events-none absolute inset-0">
      {sides.map((side, i) => (
        <motion.span
          key={side.cls}
          className={`absolute bg-accent ${side.cls}`}
          // Misma estructura en servidor y cliente; con movimiento reducido el marco aparece completo.
          initial={reduce ? false : { [side.axis]: 0 }}
          animate={reduce || visible ? { [side.axis]: 1 } : { [side.axis]: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.32, delay: 0.1 + i * 0.3, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </span>
  );
}
