import Link from "next/link";
import { ArrowRight, ArrowsClockwise, Asterisk, CaretDown } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Dot } from "@/components/ui/Dot";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";
import { model } from "@/data/content";

/*
  Sección "Nuestro modelo" en Home:
  Esquema metodológico de 4 etapas (Escuchar, Planificar, Visibilizar, Evaluar).
  - Fondo con efecto de líneas dinámicas del hero (InkField interactivo).
  - Hilo conductor continuo conectando las etapas (desktop y mobile).
  - Viñeta * amarilla de la marca en cada caja con rotación y realce interactivo al hover.
*/
export function MethodSection() {
  return (
    <section className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
      {/* Efecto de líneas del background idéntico al de los hero de página (interactivo con el puntero) */}
      <InkField density={30} intensity={0.85} speed={0.8} interactive={true} className="-z-10" />

      <div className="wrap">
        <Reveal className="max-w-[820px]">
          <p className="eyebrow">Nuestro modelo</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4.4vw,4rem)]">
            Una mirada estratégica que parte por <em>entender</em>
            <Dot />
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
            Cada desafío requiere comprender el contexto antes de definir una respuesta. Nuestro modelo integra diagnóstico,
            planificación, activación y evaluación para convertir la comunicación en una herramienta de gestión.
          </p>
        </Reveal>

        {/* FIGURA METODOLÓGICA: Sistema de 4 etapas con hilo conductor continuo */}
        <div className="relative mt-16 sm:mt-20">
          {/* Estructura unificada: marco traslúcido que deja ver las líneas ondulantes del fondo */}
          <div className="relative rounded-2xl border border-line bg-[#161519]/75 backdrop-blur-md overflow-hidden">
            {/* Hilo conductor superior continuo (rail de energía del método) */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-accent/80 to-[var(--dot)]/70"
            />

            {/* Grilla continua de las 4 etapas con divisores finos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line">
              {model.map((step, idx) => (
                <div
                  key={step.num}
                  className="group relative flex flex-col justify-between p-8 sm:p-9 md:py-10 transition-all duration-300 hover:bg-white/[0.035]"
                >
                  {/* Realce dinámico en el tope de la caja al hover con gradiente amarillo-lila */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--dot)] via-accent to-[var(--lila-light)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Conector visible en mobile entre cajas apiladas */}
                  {idx > 0 && (
                    <div
                      aria-hidden
                      className="lg:hidden absolute -top-3.5 left-7 z-10 flex size-7 items-center justify-center rounded-full border border-line bg-[#161519] text-accent shadow-sm"
                    >
                      <CaretDown className="size-3.5" weight="bold" />
                    </div>
                  )}

                  <div>
                    {/* Cabecera: Número + Viñeta * amarilla con movimiento + Hilo conductor a la siguiente etapa */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[clamp(2.7rem,4.2vw,3.6rem)] font-thin leading-none tracking-tight text-accent transition-colors duration-300 group-hover:text-white">
                          {step.num}
                        </span>

                        {/* Viñeta * amarilla con movimiento interactivo en hover */}
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--dot)]/30 bg-[var(--dot)]/10 text-[var(--dot)] transition-all duration-500 ease-out group-hover:border-[var(--dot)] group-hover:bg-[var(--dot)]/25 group-hover:shadow-[0_0_14px_rgba(252,211,77,0.5)]">
                          <Asterisk
                            weight="bold"
                            size={16}
                            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180 group-hover:scale-110"
                          />
                        </span>
                      </div>

                      {/* Hilo conductor entre recuadros (Desktop) */}
                      {idx < model.length - 1 ? (
                        <div aria-hidden className="hidden lg:flex flex-1 items-center pl-3">
                          <div className="h-0.5 w-full bg-gradient-to-r from-accent/40 via-accent/60 to-accent transition-colors duration-500 group-hover:from-[var(--dot)] group-hover:to-accent" />
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-[#161519] text-accent transition-all duration-300 group-hover:border-[var(--dot)] group-hover:text-[var(--dot)] group-hover:translate-x-1">
                            <ArrowRight className="size-3" weight="bold" />
                          </span>
                        </div>
                      ) : (
                        <div aria-hidden className="hidden lg:flex items-center pl-3 gap-2">
                          <div className="h-0.5 w-8 bg-gradient-to-r from-accent/40 to-[var(--dot)]/60" />
                          <span
                            title="Ciclo continuo de evaluación"
                            className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[var(--dot)]/40 bg-[var(--dot)]/10 text-[var(--dot)] transition-transform duration-700 group-hover:rotate-180"
                          >
                            <ArrowsClockwise className="size-3" weight="bold" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Nombre y Descripción priorizados en tamaño y espacio */}
                    <div className="mt-8">
                      <h3 className="text-[clamp(1.35rem,2vw,1.75rem)] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-accent">
                        {step.name}
                      </h3>
                      <p className="mt-3.5 text-[15px] sm:text-[15.5px] font-normal leading-relaxed text-white/85 transition-colors duration-300 group-hover:text-white">
                        {step.goal}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ButtonLink href="/nuestro-modelo" variant="outline">
            Conoce nuestro modelo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
