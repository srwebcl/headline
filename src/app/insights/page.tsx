import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { insightCategories, insights, site } from "@/data/content";

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
            Ideas, análisis y perspectivas para entender un entorno cada vez más <em>complejo</em>.
          </>
        }
      >
        <p>
          Compartimos análisis, tendencias y aprendizajes con el objetivo de aportar una mirada útil para quienes toman decisiones y
          lideran organizaciones.
        </p>
      </PageHero>

      <section className="border-b border-line">
        <div className="wrap grid md:grid-cols-3">
          {insightCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.06} className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <h2 className="text-2xl tracking-tight">{cat.name}</h2>
              <p className="mt-4 leading-relaxed text-muted">{cat.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap">
          {insights.length > 0 ? (
            <InsightsGrid posts={insights} categories={insightCategories} />
          ) : (
            <Reveal className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="relative aspect-[4/3] lg:col-span-5">
                <Image src="/images/lectura.webp" alt="Libro abierto sobre una mesa" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <h2 className="display text-[clamp(1.9rem,3.2vw,2.8rem)]">Estamos preparando los primeros análisis.</h2>
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
    </>
  );
}
