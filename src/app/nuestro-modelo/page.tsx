import type { Metadata } from "next";
import { BlendImage } from "@/components/ui/BlendImage";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { InkField } from "@/components/ui/InkField";
import { model } from "@/data/content";
import { Dot } from "@/components/ui/Dot";

export const metadata: Metadata = {
  title: "Nuestro modelo",
  description:
    "Escuchar, planificar y visibilizar: un modelo que parte por entender el contexto antes de actuar y convierte la estrategia en acciones medibles.",
  alternates: { canonical: "/nuestro-modelo" },
};

export default function ModeloPage() {
  return (
    <>
      <PageHero
        label="Nuestro modelo"
        title={
          <>
            <em>Escuchar.</em> Planificar. Visibilizar<Dot />
          </>
        }
      >
        <p>
          Nuestro modelo parte por comprender el negocio y su entorno. Escuchamos a quienes toman decisiones y a los grupos de
          interés para planificar una estrategia alineada con los objetivos de cada organización. Luego, la traducimos en acciones
          que dan visibilidad a sus mensajes y generan resultados medibles.
        </p>
      </PageHero>

      {/* Etapas sobre blanco cálido (#F5F4F2), distinto del hero oscuro. Mismo lenguaje que "Nuestro modelo" del Home (oscuro con líneas, número lila que sube,
          línea que conecta las etapas). Animación ligada al scroll en .step (globals.css). */}
      <section className="tone-light relative isolate overflow-clip bg-bg py-16 text-fg md:py-24">
        <InkField density={24} intensity={0.45} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
        <div className="wrap">
          {model.map((step, i) => (
            <article
              key={step.num}
              className="step group relative grid gap-8 border-b border-line py-14 pl-8 last:border-b-0 md:py-16 md:pl-12 lg:grid-cols-12 lg:gap-10"
            >
              {/* Línea vertical que conecta las etapas; se ilumina al pasar el cursor. */}
              <span aria-hidden className="step-line absolute bottom-0 left-0 top-0 w-px bg-line" />
              <span
                aria-hidden
                className="step-line absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />
              <span aria-hidden className="absolute left-[-5px] top-16 size-[11px] rounded-full border-2 border-accent bg-bg md:top-[4.5rem]" />

              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <span className="block [clip-path:inset(0)]">
                    <span className="step-num block text-[clamp(4.2rem,8vw,7rem)] font-bold leading-[0.85] tracking-[-0.04em] text-accent transition-colors duration-300 group-hover:text-[var(--lila-deep)]">
                      {step.num}
                    </span>
                  </span>
                  <h2 className="mt-5 flex items-center gap-3 text-[clamp(1.25rem,1.8vw,1.6rem)] font-semibold tracking-tight">
                    <span aria-hidden className="h-0.5 w-8 bg-accent transition-[width] duration-500 group-hover:w-12" />
                    {step.name}
                  </h2>
                </div>
              </div>
              <div className="step-text lg:col-span-8">
                <p className="max-w-[34ch] text-[clamp(1.35rem,2.1vw,1.85rem)] font-light leading-snug tracking-tight">{step.goal}</p>
                <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                  {step.items.map((item, j) => (
                    <li
                      key={item}
                      className="group/item relative isolate flex gap-4 overflow-hidden border border-line bg-white/70 px-5 py-4 shadow-[0_12px_30px_-24px_rgb(24_23_27/0.35)]"
                    >
                      {/* Hover por ítem: relleno lila desde la izquierda, número en amarillo. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[var(--lila-deep)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:scale-x-100"
                      />
                      <span className="pt-0.5 text-sm font-semibold tabular-nums text-accent transition-colors duration-300 group-hover/item:text-[var(--dot)]">
                        {`${i + 1}.${j + 1}`}
                      </span>
                      <span className="text-[16px] leading-snug transition-colors duration-300 group-hover/item:text-white">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* La foto se funde desde el blanco cálido de las etapas; franja más baja (menos invasiva). */}
      <div className="tone-light">
        <BlendImage src="/images/metodo.webp" alt="Equipo en una reunión de planificación estratégica" position="50% 40%" size="sm" />
      </div>

      <ClosingCta
        title="Conversemos sobre tu desafío."
        body="Evaluemos cómo la comunicación puede ayudarte a fortalecer tu reputación, posicionar a tus líderes o enfrentar escenarios complejos."
      />
    </>
  );
}
