import type { Metadata } from "next";
import { IndustryNav } from "@/components/clients/IndustryNav";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { LogoMark } from "@/components/ui/LogoMark";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/data/content";
import { Dot } from "@/components/ui/Dot";

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Empresas nacionales y multinacionales de salud, minería, energía, tecnología, construcción, consumo e instituciones que han confiado en Headline.",
  alternates: { canonical: "/clientes" },
};

export default function ClientesPage() {
  return (
    <>
      <PageHero
        label="Clientes"
        title={
          <>
            Experiencia en industrias donde la confianza, la reputación y el liderazgo son <em>fundamentales</em>
            <Dot />
          </>
        }
      >
        <p>
          Hemos acompañado a empresas nacionales y multinacionales de diversos sectores en desafíos de posicionamiento, reputación,
          gestión de crisis y relacionamiento con stakeholders, adaptando cada estrategia a la realidad y necesidades de cada
          industria.
        </p>
      </PageHero>

      <IndustryNav items={industries.map(({ slug, name }) => ({ slug, name }))} />

      <div className="py-12 md:py-20">
        {industries.map((ind) => (
          <section
            key={ind.slug}
            id={ind.slug}
            aria-labelledby={`${ind.slug}-t`}
            className="wrap grid gap-8 border-b border-line py-14 last:border-b-0 lg:grid-cols-12 lg:py-20"
          >
            <Reveal className="lg:col-span-3">
              <div className="lg:sticky lg:top-40">
                <h2 id={`${ind.slug}-t`} className="text-[clamp(1.75rem,2.3vw,2.35rem)] font-light leading-tight tracking-tight">
                  {ind.name}
                  <Dot />
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium tracking-[0.02em] text-muted">
                  <span className="size-1.5 rounded-full bg-accent/70" aria-hidden />
                  <span>
                    {ind.logos.length} {ind.logos.length === 1 ? "organización" : "organizaciones"}
                  </span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-9">
              <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 xl:grid-cols-4">
                {ind.logos.map((slug) => (
                  <li key={slug} className="flex h-[124px] items-center justify-center border-b border-r border-line px-6">
                    <LogoMark slug={slug} height={30} maxWidth={150} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}
      </div>

      <ClosingCta title="Cuéntanos qué desafío enfrenta tu organización." />
    </>
  );
}
