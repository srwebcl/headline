import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { model } from "@/data/content";

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
            <em>Escuchar.</em> Planificar. Visibilizar.
          </>
        }
      >
        <p>
          Nuestro modelo parte por entender antes de actuar. Analizamos el contexto, escuchamos a quienes toman decisiones y a los
          grupos de interés, definimos una estrategia y convertimos esa estrategia en acciones medibles.
        </p>
      </PageHero>

      <section className="py-12 md:py-20">
        <div className="wrap">
          {model.map((step, i) => (
            <Reveal key={step.num} as="article" className="grid gap-8 border-b border-line py-16 last:border-b-0 md:py-20 lg:grid-cols-12">
              {/* Número fijo mientras se lee la etapa en pantallas grandes */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <span className="block text-[clamp(5rem,11vw,9.5rem)] font-thin leading-[0.85] text-accent">{step.num}</span>
                  <h2 className="mt-6 text-sm font-semibold uppercase tracking-[0.16em]">{step.name}</h2>
                </div>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-tight tracking-tight">{step.goal}</p>
                <ol className="mt-10 grid gap-x-8 sm:grid-cols-2">
                  {step.items.map((item, j) => (
                    <li key={item} className="flex gap-4 border-t border-line py-5">
                      <span className="pt-0.5 text-sm font-light text-accent">{`${i + 1}.${j + 1}`}</span>
                      <span className="text-lg leading-snug">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="wrap pb-20 md:pb-28">
        <Reveal className="relative aspect-[16/9] overflow-hidden md:aspect-[21/8]">
          <Image src="/images/direccion.webp" alt="Persona caminando sobre una calle demarcada" fill sizes="(min-width: 1360px) 1220px, 100vw" className="object-cover" />
        </Reveal>
      </div>

      <ClosingCta title="Conversemos sobre tu desafío." />
    </>
  );
}
