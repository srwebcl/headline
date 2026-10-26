"use client";

import { useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ArrowLeft, ArrowRight, Asterisk } from "@phosphor-icons/react";
import type { ModelStep } from "@/data/content";

/**
 * "Nuestro modelo" del Home: ciclo estratégico circular de cuatro movimientos.
 * Fiel a headline_modelo_circular_concepto_02.html (anillos, núcleo, cuatro nodos, flechas
 * de flujo y panel de la etapa seleccionada), con la tipografía y colores del sitio.
 * El arco lila rota hasta la etapa activa; flechas y nodos permiten recorrer el ciclo.
 *
 * Colores en variables --mc-* (globals.css): paleta oscura por defecto y clara con .model-cycle--light.
 *
 * Efectos (Home y /nuestro-modelo):
 * - Entrada al aparecer en pantalla: el disco crece (en /nuestro-modelo), los anillos se dibujan, el arco da una vuelta
 *   completa hasta la etapa activa, el núcleo aparece y los nodos llegan desde el centro.
 * - La etapa seleccionada se agranda dentro del ciclo.
 * Con movimiento reducido (MotionConfig "user") sólo quedan los fundidos.
 *
 * Con `detail` (página /nuestro-modelo) se divide a todo el ancho sobre fondo claro: el ciclo dentro
 * de un círculo oscuro y, en una columna más ancha, la etapa completa: objetivo,
 * descripción y entregables. Los cuatro paneles se renderizan superpuestos (sólo el activo
 * es visible), así el alto no salta al cambiar de etapa y todo el contenido queda en el HTML.
 */

const steps = [
  {
    name: "Escuchar",
    hint: "Leer el contexto",
    title: "Primero, escuchar.",
    desc: "Antes de proponer soluciones, comprendemos la organización, su entorno, sus audiencias y el desafío que necesita resolver.",
  },
  {
    name: "Planificar",
    hint: "Definir el rumbo",
    title: "Después, planificar.",
    desc: "Convertimos el diagnóstico en una dirección clara: objetivos, mensajes prioritarios y acciones conectadas con las necesidades reales.",
  },
  {
    name: "Visibilizar",
    hint: "Activar la estrategia",
    title: "Es momento de visibilizar.",
    desc: "Ponemos la estrategia en movimiento y conectamos los mensajes con las audiencias relevantes, a través de los canales adecuados.",
  },
  {
    name: "Evaluar",
    hint: "Aprender y ajustar",
    title: "Medir para evolucionar.",
    desc: "Evaluamos los resultados, reconocemos lo que funciona y detectamos oportunidades para mejorar las próximas decisiones.",
  },
];

// Posición de cada nodo sobre el anillo (arriba, derecha, abajo, izquierda).
const nodePos = [
  "left-1/2 top-[4%] -translate-x-1/2 flex-col text-center",
  "right-[-4%] top-1/2 -translate-y-1/2 flex-row",
  "bottom-[5%] left-1/2 -translate-x-1/2 flex-col text-center",
  "left-[-4%] top-1/2 -translate-y-1/2 flex-row-reverse text-right",
];
// Punto amarillo de cada nodo, del lado que mira al anillo.
const dotPos = [
  "left-1/2 bottom-[-14px] -translate-x-1/2",
  "left-[-16px] top-1/2 -translate-y-1/2",
  "left-1/2 top-[-14px] -translate-x-1/2",
  "right-[-16px] top-1/2 -translate-y-1/2",
];
// Flechas de flujo entre etapas (diagonales, sentido horario).
const arrows = [
  { cls: "right-[15%] top-[20%]", rot: 45 },
  { cls: "right-[15%] bottom-[20%]", rot: 135 },
  { cls: "left-[15%] bottom-[20%]", rot: 225 },
  { cls: "left-[15%] top-[20%]", rot: 315 },
];

export function ModelCycle({ detail }: { detail?: ModelStep[] }) {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();
  const select = (i: number) => setCurrent((i + steps.length) % steps.length);
  const step = steps[current];

  // Entrada: se dispara una vez, cuando el diagrama entra en pantalla.
  const diagramRef = useRef<HTMLDivElement>(null);
  const inView = useInView(diagramRef, { once: true, amount: 0.35 });
  const ease = [0.16, 1, 0.3, 1] as const;
  const at = (delay: number, duration = 0.9) => ({ duration, delay, ease });

  // Flechas para recorrer el ciclo (compartidas por ambas variantes del panel).
  const nav = (
    <div className="flex shrink-0 gap-2.5">
      {[
        { dir: -1, label: "Etapa anterior", Icon: ArrowLeft },
        { dir: 1, label: "Etapa siguiente", Icon: ArrowRight },
      ].map(({ dir, label, Icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => select(current + dir)}
          aria-label={label}
          className="grid size-[38px] place-items-center rounded-full border border-[var(--mc-divider)] text-fg transition-colors hover:border-[var(--mc-hi)] hover:text-[var(--mc-hi)]"
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );

  // Anillos, núcleo, flechas y nodos del ciclo.
  // Desplazamiento de entrada de cada nodo: llega desde el centro del ciclo.
  const fromCenter = [{ y: 60 }, { x: -60 }, { y: -60 }, { x: 60 }];
  const ring = (
    <div className="relative grid aspect-square w-full max-w-[480px] place-items-center rounded-full border border-[var(--mc-ring)] lg:max-w-[530px]">
      <motion.span
        aria-hidden
        className="absolute inset-[18px] rounded-full border border-dashed border-[var(--mc-ring-dashed)] sm:inset-[30px]"
        initial={{ opacity: 0, rotate: -120 }}
        animate={inView ? { opacity: 1, rotate: 0 } : undefined}
        transition={at(0.25, 1.6)}
      />
      <motion.span
        aria-hidden
        className="absolute inset-[52px] rounded-full border border-[var(--mc-ring-inner)] sm:inset-[82px]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={at(0.35, 1.2)}
      />

      {/* Arco lila: gira hasta la etapa activa (cada etapa = 90°). En la entrada da una vuelta completa. */}
      <motion.svg
        aria-hidden
        viewBox="0 0 530 530"
        className="pointer-events-none absolute inset-0 h-full w-full"
        initial={{ rotate: -450, opacity: 0 }}
        animate={
          inView ? { rotate: -90 + current * 90, opacity: 1 } : undefined
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                rotate: {
                  type: "spring",
                  stiffness: 60,
                  damping: 16,
                  delay: inView ? 0.15 : 0,
                },
                opacity: at(0.15, 0.6),
              }
        }
      >
        <circle
          cx="265"
          cy="265"
          r="264"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="245 1500"
        />
      </motion.svg>

      {/* Núcleo */}
      <motion.div
        className="z-[2] flex size-[115px] flex-col items-center justify-center rounded-full border border-[var(--mc-core-line)] bg-[var(--mc-core)] text-center shadow-[0_0_50px_var(--mc-core-glow)] sm:size-[170px]"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 14,
          delay: 0.45,
        }}
      >
        {/* Asterisco girando de forma continua (el ciclo); quieto con movimiento reducido. */}
        <Asterisk
          aria-hidden
          weight="bold"
          className="mb-2 size-7 text-[var(--mc-hi)] motion-safe:animate-[spin_12s_linear_infinite] sm:mb-3 sm:size-10"
        />
        <strong className="text-[13px] font-semibold leading-tight sm:text-[17px]">
          Vector Headline
        </strong>
      </motion.div>

      {arrows.map((a, i) => (
        <motion.span
          key={a.rot}
          aria-hidden
          className={`absolute z-[3] grid size-[22px] place-items-center rounded-full border border-[var(--mc-hi-line)] bg-bg text-[var(--mc-hi)] sm:size-[30px] ${a.cls}`}
          initial={{ opacity: 0, scale: 0.4, rotate: a.rot - 90 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: a.rot } : undefined}
          transition={at(0.95 + i * 0.1, 0.7)}
        >
          <ArrowRight size={13} weight="bold" />
        </motion.span>
      ))}

      {steps.map((s, i) => {
        const active = i === current;
        return (
          <motion.button
            key={s.name}
            type="button"
            onClick={() => select(i)}
            aria-pressed={active}
            className={`absolute z-[4] flex max-w-[140px] items-center gap-1.5 p-1 sm:max-w-[220px] sm:gap-3 sm:p-2 ${nodePos[i]}`}
            initial={{ opacity: 0, scale: 0.7, ...fromCenter[i] }}
            // La etapa activa se agranda dentro del ciclo.
            animate={
              inView
                ? { opacity: 1, x: 0, y: 0, scale: active ? 1.22 : 1 }
                : undefined
            }
            transition={
              inView
                ? {
                    type: "spring",
                    stiffness: 220,
                    damping: 20,
                    opacity: at(0.6 + i * 0.12, 0.6),
                    x: at(0.6 + i * 0.12),
                    y: at(0.6 + i * 0.12),
                  }
                : undefined
            }
          >
            <span
              aria-hidden
              className={`absolute size-[9px] rounded-full border border-[var(--mc-hi)] transition-all duration-200 sm:size-[13px] ${dotPos[i]} ${
                active
                  ? "bg-[var(--mc-hi)] shadow-[0_0_0_5px_var(--mc-hi-glow)]"
                  : "bg-bg"
              }`}
            />
            <span className="text-[11px] font-semibold tabular-nums tracking-[0.08em] text-accent sm:text-[13px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-1">
              <b
                className={`text-[14px] font-bold leading-tight transition-colors sm:text-[20px] ${active ? "text-accent" : "text-fg"}`}
              >
                {s.name}
              </b>
              <small className="text-[8px] tracking-[0.04em] text-muted sm:text-[11px]">
                {s.hint}
              </small>
            </span>
          </motion.button>
        );
      })}
    </div>
  );

  // Diagrama circular
  const diagram = (
    <div
      ref={diagramRef}
      className={`relative grid min-h-[365px] place-items-center sm:min-h-[510px] lg:min-h-[570px] ${detail ? "lg:sticky lg:top-28" : ""}`}
      aria-label="Diagrama circular de cuatro etapas"
    >
      {detail ? (
        // En /nuestro-modelo el ciclo va dentro de un círculo oscuro sobre el fondo claro de la sección.
        <motion.div
          className="tone-ink grid aspect-square w-full max-w-[700px] place-items-center rounded-full bg-bg p-[6%] text-fg shadow-[0_40px_80px_-40px_rgb(24_23_27/0.45)]"
          initial={{ opacity: 0, scale: 0.86 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={at(0, 1.1)}
        >
          {ring}
        </motion.div>
      ) : (
        ring
      )}
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`model-cycle relative grid ${
          detail
            ? "lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)]"
            : "gap-10 items-center lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] lg:gap-[clamp(35px,7vw,100px)]"
        }`}
      >
        {detail ? (
          // Columna del ciclo sobre fondo claro (sin campo de líneas); se alinea con el borde izquierdo del .wrap.
          <div className="tone-light bg-bg px-[var(--gutter)] pt-14 lg:py-20 lg:pl-[max(var(--gutter),calc((100vw-1360px)/2+var(--gutter)))] lg:pr-6">
            {diagram}
          </div>
        ) : (
          diagram
        )}

        {/* Panel de la etapa seleccionada */}
        {detail ? (
          // Columna clara y más ancha con la etapa completa; se alinea con el borde derecho del .wrap.
          <article className="model-cycle--light tone-light flex flex-col bg-bg px-[var(--gutter)] py-14 text-fg lg:py-20 lg:pl-10 lg:pr-[max(var(--gutter),calc((100vw-1360px)/2+var(--gutter)))] xl:pl-14">
            {/* Flechas arriba, a la altura del número: se cambia de etapa sin bajar hasta el final del detalle. */}
            <div className="relative">
              <div className="absolute right-0 top-[-7px] z-10">{nav}</div>
              <div className="grid" aria-live="polite">
                {detail.map((d, i) => {
                  const active = i === current;
                  return (
                    <motion.div
                      key={d.num}
                      aria-hidden={!active}
                      className={`[grid-area:1/1] ${active ? "" : "pointer-events-none invisible"}`}
                      initial={false}
                      animate={
                        active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
                      }
                    >
                      <p className="mb-3 text-[18px] font-bold tabular-nums tracking-[-0.02em] text-accent sm:text-[20px]">
                        {d.num} / 04
                      </p>
                      <h2 className="text-[clamp(36px,4.4vw,58px)] font-bold leading-[1.02] tracking-[-0.045em]">
                        {d.name}
                      </h2>
                      <p className="mt-3 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.3rem)] font-light leading-snug text-accent">
                        {d.goal}
                      </p>
                      <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.8] text-muted">
                        {d.description}
                      </p>
                      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                        {d.deliverables.map((x) => (
                          <li
                            key={x.code}
                            className="group/item relative isolate overflow-hidden border border-[var(--mc-divider)] bg-bg-2/80 p-5 transition-colors duration-300 hover:text-white"
                          >
                            {/* Hover: relleno lila desde abajo; el asterisco gira 360° y pasa a amarillo. */}
                            <span
                              aria-hidden
                              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--lila-deep)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:scale-y-100"
                            />
                            <Asterisk
                              aria-hidden
                              weight="bold"
                              size={22}
                              className="text-accent transition-[color,rotate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:rotate-[360deg] group-hover/item:text-[var(--dot)] motion-reduce:transition-colors motion-reduce:group-hover/item:rotate-0"
                            />
                            <h3 className="mt-3 text-[16px] font-semibold leading-snug">
                              {x.title}
                            </h3>
                            <p className="mt-2 text-[14px] leading-relaxed text-muted transition-colors duration-300 group-hover/item:text-white/85">
                              {x.description}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </article>
        ) : (
          <article
            aria-live="polite"
            className="flex flex-col justify-center border-t border-[var(--mc-divider)] pt-7 lg:min-h-[330px] lg:border-l lg:border-t-0 lg:py-3.5 lg:pl-8"
          >
            <motion.div
              key={current}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-3 text-[18px] font-bold tabular-nums tracking-[-0.02em] text-accent sm:text-[20px]">
                {String(current + 1).padStart(2, "0")} / 04
              </p>
              <h3 className="mb-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.045em]">
                {step.title}
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.8] text-muted">
                {step.desc}
              </p>
            </motion.div>
            <div className="mt-7">{nav}</div>
          </article>
        )}
      </div>
    </MotionConfig>
  );
}
