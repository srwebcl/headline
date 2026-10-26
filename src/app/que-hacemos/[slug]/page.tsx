import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Asterisk } from "@phosphor-icons/react/ssr";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { ServiceHero } from "@/components/services/ServiceHero";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/data/content";
import { Dotted } from "@/components/ui/Dot";

export const dynamicParams = false;

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/que-hacemos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.summary,
    alternates: { canonical: `/que-hacemos/${c.slug}` },
  };
}

export default async function CapabilityPage({ params }: PageProps<"/que-hacemos/[slug]">) {
  const { slug } = await params;
  const index = capabilities.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const c = capabilities[index];
  const prev = capabilities[index - 1];
  const next = capabilities[index + 1];

  return (
    <>
      <ServiceHero num={c.num} name={c.name} title={c.title} image={c.image} />

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          {/* Texto justificado; el primer párrafo en lila como entrada, con filete lila a la izquierda. */}
          <Reveal className="prose-body border-l-2 border-accent pl-6 text-left text-lg leading-relaxed text-muted [hyphens:none] [text-wrap:pretty] md:pl-8 md:text-justify lg:col-span-7 [&>p:first-child]:text-xl [&>p:first-child]:font-normal [&>p:first-child]:leading-snug [&>p:first-child]:text-accent md:[&>p:first-child]:text-left md:[&>p:first-child]:text-[1.6rem]">
            {c.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          {c.quote && (
            <Reveal delay={0.1} as="div" className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
              {/* Texto destacado en el lila corporativo, con el amarillo de la marca como acento. */}
              <blockquote className="tone-lila relative bg-bg p-8 text-fg md:p-10">
                <span aria-hidden className="block h-0.5 w-12 bg-[var(--dot)]" />
                <p className="mt-6 text-xl font-light leading-snug tracking-tight md:text-[1.4rem]">{c.quote}</p>
              </blockquote>
            </Reveal>
          )}
        </div>
      </section>

      {/* Soluciones en bloque oscuro con el campo de líneas, como los heros y "Nuestro modelo". */}
      <section className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
        <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
        <div className="wrap">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,3.4vw,3rem)]"><Dotted>{c.listLabel}</Dotted></h2>
          </Reveal>
          {/* Misma viñeta que el Home (asterisco lila); hover con el lila corporativo.
              Asterisco y texto en el mismo flujo: separación fija en todas las tarjetas, sin superponerse. */}
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={(i % 3) * 0.05}
                className="group relative isolate flex h-full flex-col gap-5 overflow-hidden border border-line bg-bg-2/80 p-7 backdrop-blur-[2px] sm:min-h-[150px]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--lila-deep)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                {/* Asterisco de marca: gira 360° al pasar el cursor (estático con movimiento reducido). */}
                <Asterisk
                  aria-hidden
                  weight="bold"
                  size={26}
                  className="shrink-0 text-accent transition-[color,rotate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[360deg] group-hover:text-[var(--dot)] motion-reduce:transition-colors motion-reduce:group-hover:rotate-0"
                />
                <span className="text-lg leading-snug transition-colors duration-300 group-hover:text-white">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Anterior / Siguiente: dos columnas también en móvil, para que queden cuadradas una frente a la otra. */}
      <nav aria-label="Otras capacidades" className="border-t border-line">
        <div className="wrap grid grid-cols-2">
          {prev ? (
            <Link href={`/que-hacemos/${prev.slug}`} className="group flex flex-col gap-2 border-r border-line py-8 pr-4 sm:py-10 sm:pr-8">
              <span className="flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-muted sm:text-[13px]">
                <ArrowLeft aria-hidden size={14} /> Anterior
              </span>
              <span className="text-base leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-xl">{prev.name}</span>
            </Link>
          ) : (
            <span className="border-r border-line" />
          )}
          {next && (
            <Link href={`/que-hacemos/${next.slug}`} className="group flex flex-col items-end gap-2 py-8 pl-4 text-right sm:py-10 sm:pl-8">
              <span className="flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-muted sm:text-[13px]">
                Siguiente <ArrowRight aria-hidden size={14} />
              </span>
              <span className="text-base leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-xl">{next.name}</span>
            </Link>
          )}
        </div>
      </nav>

      <ClosingCta />
    </>
  );
}
