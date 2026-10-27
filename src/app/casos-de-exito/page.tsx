import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/data/content";
import { Dot } from "@/components/ui/Dot";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Desafíos complejos que exigieron estrategia, relacionamiento y capacidad de ejecución: Laboratorio Chile, Ascenty, Scania, Abbott, CSL Behring, Henkel, Gardilcic y más.",
  alternates: { canonical: "/casos-de-exito" },
};

export default function CasosPage() {
  return (
    <>
      <PageHero
        label="Casos de éxito"
        title={
          <>
            Desafíos complejos que exigieron estrategia, relacionamiento y <em>capacidad de ejecución</em>
            <Dot />
          </>
        }
      />

      {/* Grid de casos con fotografía limpia y diseño angular fiel al sistema de diseño Headline */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {cases.map((c, i) => (
              <Reveal as="article" key={c.slug} delay={0.04 * i}>
                {/* id: los enlaces del Home llevan a cada caso dentro de esta página (/casos-de-exito#slug). */}
                <div id={c.slug} className="group flex h-full scroll-mt-28 flex-col border border-line bg-bg transition-shadow duration-300 hover:shadow-[0_30px_60px_-40px_rgb(24_23_27/0.45)]">
                  {/* Fotografía: cover para fotos; contain (completa, sobre blanco) para logos y piezas con texto. */}
                  <div className={`relative aspect-[16/10] w-full overflow-hidden border-b border-line ${c.imageFit === "contain" ? "bg-white" : "bg-bg-2"}`}>
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={c.imageFit === "contain" ? "object-contain p-6" : "object-cover"}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h2 className="text-[clamp(1.4rem,2vw,1.85rem)] font-bold tracking-tight text-fg">{c.client}</h2>
                    <p className="mt-4 border-l-2 border-accent pl-3.5 text-[15px] font-medium leading-snug text-fg/90">
                      {c.area}
                      {c.title && <span className="block font-normal text-muted">{c.title}</span>}
                    </p>

                    {c.body.slice(0, -1).map((p) => (
                      <p key={p} className="mt-4 text-[14.5px] leading-relaxed text-muted">
                        {p}
                      </p>
                    ))}

                    {/* Último párrafo destacado: se llena de morado al pasar el cursor por la tarjeta. */}
                    <div className="relative isolate mt-6 overflow-hidden bg-[color-mix(in_oklab,var(--lila)_14%,var(--bg))] p-5 text-[14px] leading-relaxed text-fg">
                      <span
                        aria-hidden
                        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[var(--lila-deep)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      />
                      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[var(--lila-deep)] transition-colors duration-300 group-hover:text-[var(--dot)]">
                        Nuestro trabajo
                      </span>
                      <p className="font-light leading-relaxed text-fg/90 transition-colors duration-300 group-hover:text-white">
                        {c.body[c.body.length - 1]}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
