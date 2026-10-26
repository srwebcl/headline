import { ModelCycle } from "@/components/home/ModelCycle";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Dot } from "@/components/ui/Dot";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";

/*
  "Nuestro modelo" en el Home: formato de headline_modelo_circular_concepto_02.html.
  Cabecera en dos columnas, ciclo circular interactivo (ModelCycle) y pie con CTA.
  Fondo oscuro con el campo de líneas animadas del sitio (InkField).
*/
export function MethodSection() {
  return (
    <section className="tone-ink relative isolate overflow-clip bg-bg py-[74px] text-fg md:pb-[82px]">
      {/* Líneas animadas de fondo, las mismas de los heros y las demás secciones oscuras. */}
      <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />

      <div className="wrap">
        <Reveal className="mb-9 grid items-end gap-5 lg:mb-[58px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[50px]">
          <div>
            <p className="eyebrow mb-[22px] flex items-center gap-3">
              <span aria-hidden className="h-0.5 w-7 bg-[var(--dot)]" />
              Nuestro modelo
            </p>
            <h2 className="text-[clamp(38px,5vw,66px)] font-medium leading-[1.05] tracking-[-0.05em]">
              Una mirada estratégica que parte por <em className="not-italic text-accent">entender</em>
              <Dot />
            </h2>
          </div>
          <p className="mb-1 max-w-[490px] text-[16px] leading-[1.85] text-muted">
            Cada desafío requiere comprender el contexto antes de definir una respuesta. Nuestro modelo integra diagnóstico,
            planificación, activación y evaluación para convertir la comunicación en una herramienta de gestión.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ModelCycle />
        </Reveal>

        <div className="mt-[46px] flex justify-center">
          <ButtonLink href="/nuestro-modelo">
            Conoce nuestro modelo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
