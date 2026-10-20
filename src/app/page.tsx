import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Authority } from "@/components/home/Authority";
import { CapabilitiesExplorer } from "@/components/home/CapabilitiesExplorer";
import { ClientsHighlight } from "@/components/home/ClientsHighlight";
import { HomeHero } from "@/components/home/HomeHero";
import { InsightsCarousel } from "@/components/home/InsightsCarousel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities, cases, insightCategories, insights, model } from "@/data/content";
import { Dot } from "@/components/ui/Dot";

/*
  Home (orden acordado): Hero → Autoridad → Capacidades → Método → Casos → Clientes → Insights → CTA.
  Tonos alternados para que cada bloque se distinga: oscuro, blanco, cálido, oscuro, cálido, blanco, oscuro, lila.
*/
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Authority />
      <Capabilities />
      <Method />
      <Cases />
      <ClientsHighlight />
      <Insights />
      <ClosingCta label="Contacto" title="Cuéntanos qué desafío enfrenta tu organización." />
    </>
  );
}

/* Servicios: índice de capacidades + panel con sus soluciones (CapabilitiesExplorer). */
function Capabilities() {
  const items = capabilities.map(({ slug, num, name, summary, listLabel, items }) => ({ slug, num, name, summary, listLabel, items }));
  return (
    <section id="capacidades" aria-labelledby="servicios-title" className="py-20 md:py-28">
      <div className="wrap">
        <Reveal className="max-w-[820px]">
          <p className="eyebrow">Nuestros servicios</p>
          <h2 id="servicios-title" className="display mt-5 text-[clamp(2.1rem,4.4vw,4rem)]">
            Cinco capacidades para desafíos <em>complejos</em>
            <Dot />
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
            Diseñamos soluciones a la medida de cada organización, acompañándola en sus desafíos de comunicación y en las distintas
            etapas de su desarrollo.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <CapabilitiesExplorer items={items} />
        </Reveal>

        <div className="mt-12 text-center">
          <ButtonLink href="/que-hacemos" variant="filled">
            Conoce nuestras capacidades
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* Método: tres columnas en bloque oscuro (números finos, como Parla). */
function Method() {
  return (
    <section className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
      <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
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

        {/* Entrada ligada al scroll (.method en globals.css): la línea une las etapas y los números suben en orden. */}
        <ol className="method relative mt-16 grid md:grid-cols-3">
          {model.map((step, i) => (
            <li
              key={step.num}
              style={{ "--i": i } as React.CSSProperties}
              className="border-t border-line py-10 md:border-l md:border-t-0 md:px-10 md:pb-4 md:pt-10 md:first:border-l-0 md:first:pl-0"
            >
              <span className="block [clip-path:inset(0)]">
                <span className="method-num block text-[clamp(3.5rem,6vw,5.5rem)] font-thin leading-none text-accent">{step.num}</span>
              </span>
              <div className="method-text">
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em]">{step.name}</h3>
                <p className="mt-4 max-w-[34ch] leading-relaxed text-muted">{step.short}</p>
              </div>
            </li>
          ))}
          {/* Va al final para no alterar el :first-child de las etapas. */}
          <span aria-hidden className="method-line absolute inset-x-0 top-0 hidden h-px bg-accent md:block" />
        </ol>

        <ButtonLink href="/nuestro-modelo" variant="outline" className="mt-12">
          Conoce nuestro modelo
        </ButtonLink>
      </div>
    </section>
  );
}

/* Casos: 4 destacados en grilla 2x2 de alto uniforme; acentos oscuro y lila en diagonal. */
function Cases() {
  const featured: { slug: string; tone: string }[] = [
    { slug: "tecsa", tone: "tone-ink" },
    { slug: "congreso-nacional", tone: "tone-white" },
    { slug: "laboratorio-chile", tone: "tone-white" },
    { slug: "angioedema-hereditario", tone: "tone-lila" },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <Reveal className="max-w-[820px]">
          <p className="eyebrow">Casos de éxito</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4.4vw,4rem)]">
            Desafíos complejos. Estrategias que generan <em>impacto</em>
            <Dot />
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            Nuestro trabajo se construye junto a organizaciones que necesitan proteger su reputación, posicionarse frente a sus
            grupos de interés o responder estratégicamente ante escenarios complejos.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-3 md:grid-cols-2">
          {featured.map(({ slug, tone }, i) => {
            const c = cases.find((x) => x.slug === slug)!;
            return (
              <Reveal as="li" key={slug} delay={(i % 2) * 0.06} className={tone}>
                <Link
                  href={`/casos/${c.slug}`}
                  className={`group flex h-full min-h-[260px] flex-col justify-between bg-bg p-8 text-fg transition-colors duration-300 md:min-h-[320px] md:p-10 ${
                    tone === "tone-white" ? "hover:bg-bg-2" : ""
                  }`}
                >
                  <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-muted">{c.area}</p>
                  <div className="mt-10">
                    <h3 className="text-[clamp(1.8rem,2.8vw,2.5rem)] font-semibold leading-[1.05] tracking-tight">{c.client}</h3>
                    <p className="mt-4 line-clamp-2 max-w-[52ch] leading-relaxed text-muted">{c.challenge}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-accent">
                      Ver caso
                      <ArrowUpRight
                        aria-hidden
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <ButtonLink href="/casos" variant="outline" className="mt-12">
          Ver casos de éxito
        </ButtonLink>
      </div>
    </section>
  );
}

/* Insights (bloque oscuro): nota destacada en formato horizontal (imagen + texto) y
   carrusel vertical con las demás. */
const dateFmt = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const FEATURED_INSIGHT = "nuevo-desafio-comunicaciones-corporativas";

function Insights() {
  const featured = insights.find((p) => p.slug === FEATURED_INSIGHT) ?? insights[0];
  if (!featured) return null;
  const catName = (slug: string) => insightCategories.find((c) => c.slug === slug)?.name ?? "";
  const others = insights
    .filter((p) => p.slug !== featured.slug)
    .map((p) => ({ slug: p.slug, title: p.title, date: p.date, image: p.image, category: catName(p.category) }));

  return (
    <section className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
      <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
      <div className="wrap">
        <Reveal className="max-w-[820px]">
          <p className="eyebrow">Insights</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4.4vw,4rem)]">
            Ideas para entender mejor el <em>entorno</em>
            <Dot />
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
            Análisis, tendencias y aprendizajes sobre reputación, liderazgo, gestión de crisis, comunicación estratégica y
            posicionamiento corporativo.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <Link href={`/insights/${featured.slug}`} className="group grid gap-7 bg-bg-2 p-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:items-center md:p-6">
              {featured.image && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 100vw"
                    className="object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
              )}
              <div className="sm:pr-2">
                <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-accent">{catName(featured.category)}</p>
                <h3 className="mt-3 text-[clamp(1.4rem,2vw,1.8rem)] font-light leading-tight tracking-tight group-hover:text-accent">
                  {featured.title}
                </h3>
                <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{featured.excerpt}</p>
                <p className="mt-4 text-sm text-muted">
                  <time dateTime={featured.date}>{dateFmt.format(new Date(featured.date))}</time>. {featured.readingMinutes} min de lectura
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-fg group-hover:text-accent">
                  Leer artículo <ArrowUpRight aria-hidden size={14} />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col lg:col-span-5">
            <InsightsCarousel posts={others} />
            <ButtonLink href="/insights" variant="text" className="mt-10 self-start">
              Ver todos los insights
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
