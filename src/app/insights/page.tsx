import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Asterisk } from "@phosphor-icons/react/ssr";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { InkField } from "@/components/ui/InkField";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { insightCategories, insights, site } from "@/data/content";
import { Dot, Dotted } from "@/components/ui/Dot";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Ideas, análisis y perspectivas sobre reputación, liderazgo, gestión de crisis, comunicación estratégica y posicionamiento corporativo.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        label="Insights"
        title={
          <>
            Ideas, análisis y perspectivas para entender un entorno cada vez más <em>complejo</em>
            <Dot />
          </>
        }
      >
        <p>
          Compartimos análisis, tendencias y aprendizajes con el objetivo de aportar una mirada útil para quienes toman decisiones y
          lideran organizaciones.
        </p>
      </PageHero>

      {/* Líneas editoriales */}
      <section className="py-16 md:py-20">
        <div className="wrap grid gap-4 md:grid-cols-3">
          {insightCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.06} className="tone-white flex flex-col bg-bg p-7 text-fg md:p-8">
              <Asterisk aria-hidden weight="bold" size={24} className="text-accent" />
              <h2 className="mt-5 text-[1.5rem] font-medium tracking-tight">{cat.name}</h2>
              <p className="mt-3 leading-relaxed text-muted">{cat.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Artículos: mismo lenguaje que la sección Insights del Home (oscuro con líneas). */}
      <section className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
        <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
        <div className="wrap">
          <Reveal className="mb-10 max-w-[820px]">
            <p className="eyebrow">Artículos</p>
            <h2 className="display mt-5 text-[clamp(1.9rem,3.4vw,3rem)]">
              Ideas para entender mejor el <em>entorno</em>
              <Dot />
            </h2>
          </Reveal>
          {insights.length > 0 ? (
            <InsightsGrid posts={insights} categories={insightCategories} />
          ) : (
            <Reveal className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="relative aspect-[4/3] lg:col-span-5">
                <Image src="/images/lectura.webp" alt="Libro abierto sobre una mesa" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <h2 className="display text-[clamp(1.9rem,3.2vw,2.8rem)]"><Dotted>Estamos preparando los primeros análisis.</Dotted></h2>
                <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
                  Mientras tanto, compartimos perspectivas sobre reputación, crisis y liderazgo en nuestro LinkedIn.
                </p>
                <a
                  href={site.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 border-b border-line py-2 text-[13px] font-medium uppercase tracking-[0.12em] hover:border-accent hover:text-accent"
                >
                  Seguir a Headline en LinkedIn
                  <ArrowUpRight aria-hidden size={16} />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <ClosingCta title="Cuéntanos qué desafío enfrenta tu organización." />
    </>
  );
}
