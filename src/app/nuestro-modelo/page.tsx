import type { Metadata } from "next";
import { ModelCycle } from "@/components/home/ModelCycle";
import { BlendImage } from "@/components/ui/BlendImage";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { model } from "@/data/content";
import { Dot } from "@/components/ui/Dot";

export const metadata: Metadata = {
  title: "Nuestro modelo",
  description:
    "Escuchar, planificar, visibilizar y evaluar: un modelo que parte por entender el contexto antes de actuar y convierte la estrategia en acciones medibles.",
  alternates: { canonical: "/nuestro-modelo" },
};

export default function ModeloPage() {
  return (
    <>
      <PageHero
        label="Vector Headline"
        title={
          <>
            <em>Escuchar.</em> Planificar. Visibilizar. Evaluar<Dot />
          </>
        }
      >
        <p>
          Nuestro modelo parte por comprender el negocio y su entorno. Escuchamos a quienes toman decisiones y a los grupos de
          interés para planificar una estrategia alineada con los objetivos de cada organización. Luego, la traducimos en acciones
          que dan visibilidad a sus mensajes y generan resultados medibles.
        </p>
      </PageHero>

      {/* Mismo ciclo circular del Home con la información completa de cada etapa:
          ciclo en columna oscura y detalle (objetivo, descripción y entregables) en columna clara. */}
      <section aria-label="Etapas del modelo">
        <ModelCycle detail={model} />
      </section>

      {/* La foto se funde desde el fondo claro del ciclo hacia el lila del cierre. */}
      <div className="tone-light">
        <BlendImage src="/images/metodo.webp" alt="Equipo en una reunión de planificación estratégica" position="50% 40%" size="sm" />
      </div>

      <ClosingCta />
    </>
  );
}
