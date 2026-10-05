"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Pause, Play } from "@phosphor-icons/react";
import { HERO_PAUSE_EVENT } from "@/components/home/HeroVideo";

/**
 * Titular rotativo del Home: las tres frases se muestran de a una porque cada
 * una es un momento del trabajo (anticipar, proteger, posicionar). El eyebrow
 * acompaña la secuencia resaltando el ámbito de cada frase.
 *
 * - El H1 real (sr-only) contiene las tres frases para lectores de pantalla y SEO.
 * - El avance lo marca la animación CSS de la barra activa (onAnimationEnd), así
 *   pausar la barra pausa la secuencia sin timers.
 * - Con prefers-reduced-motion se muestra el formato estático aprobado (tres líneas).
 */

const phrases = [
  { verb: "Anticipamos", key: "escenarios", term: 1 },
  { verb: "Protegemos", key: "reputaciones", term: 2 },
  { verb: "Posicionamos", key: "organizaciones", term: 0 },
];

// Ámbitos del eyebrow: índice 0 comunicaciones, 1 crisis, 2 reputación corporativa.
const terms = ["comunicaciones", "crisis", "reputación corporativa"];

const ease = [0.16, 1, 0.3, 1] as const;
const DURATION = 3.8; // segundos por frase

function Ending({ last }: { last: boolean }) {
  return last ? <span className="brand-dot" aria-hidden /> : <>.</>;
}

export function HeroStatement() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const active = phrases[index];
  const running = !paused && !hover;

  return (
    <div>
      {/* Eyebrow sincronizado (en movimiento reducido todos los términos quedan resaltados). */}
      <p className="eyebrow rise mb-8 max-w-[64ch] leading-relaxed !text-muted lg:max-w-none" style={{ "--d": 0.1 } as React.CSSProperties}>
        Consultoría estratégica en{" "}
        {terms.map((t, i) => (
          <Fragment key={t}>
            <span
              data-on={active.term === i}
              className="relative inline-block whitespace-nowrap text-muted transition-colors duration-500 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-700 after:ease-out data-[on=true]:text-accent data-[on=true]:after:scale-x-100 motion-reduce:text-accent motion-reduce:after:hidden"
            >
              {t}
            </span>
            {i === 0 ? ", " : i === 1 ? " y " : ""}
          </Fragment>
        ))}
      </p>

      <h1 className="sr-only">Anticipamos escenarios. Protegemos reputaciones. Posicionamos organizaciones.</h1>

      {/* Versión estática para movimiento reducido: el formato aprobado de tres líneas. */}
      <div aria-hidden className="display hidden text-[clamp(2.6rem,6.2vw,5.6rem)] leading-[1.02] motion-reduce:block">
        {phrases.map((p, i) => (
          <span key={p.key} className="block pb-1">
            {p.verb} <em>{p.key}</em>
            <Ending last={i === phrases.length - 1} />
          </span>
        ))}
      </div>

      {/* Rotador */}
      <div className="motion-reduce:hidden">
        <div
          aria-hidden
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="rise display grid text-[clamp(2.9rem,7vw,6.4rem)] leading-[1.02]"
          style={{ "--d": 0.25 } as React.CSSProperties}
        >
          {/* mode="wait": la frase saliente termina antes de que entre la nueva,
              así nunca se superponen. Fundido + desplazamiento + desenfoque, sin máscaras
              (los recortes con overflow fallan en Chrome durante animaciones en GPU). */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={index} className="[grid-area:1/1]">
              {[
                <Fragment key="verb">{active.verb}</Fragment>,
                <Fragment key="key">
                  <em>{active.key}</em>
                  <Ending last={index === phrases.length - 1} />
                </Fragment>,
              ].map((line, i) => (
                <motion.span
                  key={i}
                  className="block pb-[0.08em]"
                  initial={{ opacity: 0, y: "0.32em", filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, delay: i * 0.1, ease } }}
                  exit={{ opacity: 0, y: "-0.22em", filter: "blur(8px)", transition: { duration: 0.42, delay: i * 0.05, ease: [0.4, 0, 1, 1] } }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles: tres segmentos (saltar a una frase) + pausa. */}
        <div className="rise mt-8 flex items-center gap-4" style={{ "--d": 0.5 } as React.CSSProperties}>
          <div className="flex gap-2" role="group" aria-label="Frases del titular">
            {phrases.map((p, i) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                aria-label={`Mostrar: ${p.verb} ${p.key}`}
                className="group relative flex h-6 w-12 items-center"
              >
                <span className="block h-px w-full bg-fg/25 transition-colors group-hover:bg-fg/50" />
                {i === index && (
                  <span
                    key={index}
                    onAnimationEnd={() => setIndex((index + 1) % phrases.length)}
                    className="hero-progress absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-accent"
                    style={{ animationDuration: `${DURATION}s`, animationPlayState: running ? "running" : "paused" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const next = !paused;
              setPaused(next);
              window.dispatchEvent(new CustomEvent(HERO_PAUSE_EVENT, { detail: next }));
            }}
            aria-pressed={paused}
            aria-label={paused ? "Reanudar animaciones del hero" : "Pausar animaciones del hero"}
            className="flex size-7 items-center justify-center rounded-full border border-fg/30 text-fg/70 transition-colors hover:border-fg hover:text-fg"
          >
            {paused ? <Play size={10} weight="fill" /> : <Pause size={10} weight="fill" />}
          </button>
        </div>
      </div>
    </div>
  );
}
