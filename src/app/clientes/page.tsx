import type { Metadata } from "next";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { LogoMark } from "@/components/ui/LogoMark";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/data/content";

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Empresas nacionales y multinacionales de salud, minería, construcción, tecnología, instituciones y ferias que han confiado en Headline.",
  alternates: { canonical: "/clientes" },
};

export default function ClientesPage() {
  return (
    <>
      <PageHero
        label="Clientes"
        title={
          <>
            Experiencia en industrias donde la confianza, la reputación y el liderazgo son <em>fundamentales</em>.
          </>
        }
      >
        <p>
          Hemos acompañado a empresas nacionales y multinacionales de diversos sectores en desafíos de posicionamiento, reputación,
          gestión de crisis y relacionamiento con stakeholders, adaptando cada estrategia a la realidad y necesidades de cada
          industria.
        </p>
      </PageHero>

      <nav aria-label="Industrias" className="sticky top-[77px] z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
        <ul className="wrap flex gap-6 overflow-x-auto py-4 text-[13px] font-medium uppercase tracking-[0.08em] [scrollbar-width:none]">
          {industries.map((ind) => (
            <li key={ind.slug} className="shrink-0">
              <a href={`#${ind.slug}`} className="text-muted transition-colors hover:text-accent">
                {ind.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="py-12 md:py-20">
        {industries.map((ind) => (
          <section key={ind.slug} id={ind.slug} aria-labelledby={`${ind.slug}-t`} className="wrap grid gap-8 py-12 lg:grid-cols-12 lg:py-16">
            <Reveal className="lg:col-span-3">
              <h2 id={`${ind.slug}-t`} className="text-2xl font-light tracking-tight lg:sticky lg:top-40">
                {ind.name}
                <span className="mt-2 block text-sm text-muted">{ind.logos.length} organizaciones</span>
              </h2>
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
