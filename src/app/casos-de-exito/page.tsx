import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";
import { cases, citizenProjects } from "@/data/content";
import { Dot, Dotted } from "@/components/ui/Dot";

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

      <section className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
      <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
        <div className="wrap">
          <Reveal className="max-w-[760px]">
            <h2 className="display text-[clamp(2rem,3.8vw,3.4rem)]"><Dotted>Proyectos de vinculación ciudadana.</Dotted></h2>
          </Reveal>
          <Reveal className="relative mt-12 aspect-[16/9] overflow-hidden md:aspect-[21/9]">
            <Image
              src="/cases/vinculacion-ciudadana.webp"
              alt="Encuentro con la Fundación Angioedema Hereditario Chile"
              fill
              sizes="(min-width: 1360px) 1220px, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </Reveal>
          <div className="mt-14 grid border-t border-line md:grid-cols-3">
            {citizenProjects.map((p, i) => (
              <Reveal key={p.name} as="article" delay={i * 0.08} className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <h3 className="text-2xl tracking-tight">{p.name}</h3>
                <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.12em] text-accent">{p.partner}</p>
                <p className="mt-6 leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
