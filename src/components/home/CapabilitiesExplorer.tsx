"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Plus } from "@phosphor-icons/react";
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
          {/* Marco lila: conecta visualmente con la línea de "Nuestro modelo" (.panel-frame en globals.css). */}
          <div className="panel-frame relative sticky top-28">
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

            <span aria-hidden className="frame-top pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent" />
            <span aria-hidden className="frame-right pointer-events-none absolute inset-y-0 right-0 w-[2px] bg-accent" />
            <span aria-hidden className="frame-bottom pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-accent" />
            <span aria-hidden className="frame-left pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-accent" />

            {/* Destello que recorre el borde superior al cambiar de capacidad. */}
            {/* Oculto vía CSS con movimiento reducido (no condicionar el render: evita desajustes de hidratación). */}
            {(
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden motion-reduce:hidden">
                <motion.span
                  key={active}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "300%", transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] } }}
                />
              </span>
            )}
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
          className="pointer-events-none absolute -right-3 -top-9 text-[12.5rem] font-extralight leading-none tracking-tighter text-accent/40"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}
        >
          {item.num}
        </motion.span>
      )}
      {/* pr deja espacio al número de fondo en títulos largos */}
      {!compact && <h3 className="relative max-w-[22ch] pr-40 text-[2rem] font-light leading-tight tracking-tight">{item.name}</h3>}
      <p className={`${compact ? "" : "mt-4"} max-w-[52ch] leading-relaxed text-muted`}>{item.summary}</p>

      <p className="mt-8 text-[13px] font-medium text-fg">{item.listLabel}</p>
      <ol className={`mt-4 grid gap-x-10 ${compact ? "gap-y-3" : "gap-y-3.5 sm:grid-cols-2"}`}>
        {item.items.map((s, j) => (
          <motion.li
            key={s}
            className="flex gap-3.5 leading-snug"
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.08 + j * 0.035, ease } }}
          >
            <span aria-hidden className="mt-[0.6em] h-[3px] w-3.5 shrink-0 bg-accent" />
            <span>{s}</span>
          </motion.li>
        ))}
      </ol>

      <Link
        href={`/que-hacemos/${item.slug}`}
        className="group mt-10 inline-flex items-center gap-3 border-b border-line py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-fg transition-colors hover:border-accent hover:text-accent"
      >
        Ver soluciones
        <span className="sr-only">: {item.name}</span>
        <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
