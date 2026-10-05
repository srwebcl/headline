import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/data/content";

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
      <PageHero label={`${c.num}  ${c.name}`} title={c.title} image={c.image} />

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="prose-body text-lg leading-relaxed text-muted lg:col-span-7 [&>p:first-child]:text-fg [&>p:first-child]:text-xl md:[&>p:first-child]:text-2xl [&>p:first-child]:font-light [&>p:first-child]:leading-snug">
            {c.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          {c.quote && (
            <Reveal delay={0.1} as="div" className="lg:col-span-4 lg:col-start-9">
              <blockquote className="border-l-2 border-accent pl-6 text-xl font-light leading-snug tracking-tight md:text-2xl">
                {c.quote}
              </blockquote>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-bg-2 py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,3.4vw,3rem)]">{c.listLabel}</h2>
          </Reveal>
          <ol className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {c.items.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 3) * 0.05} className="flex min-h-[132px] flex-col justify-between gap-6 border-b border-r border-line bg-bg p-7">
                <span className="text-sm font-light text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg leading-snug">{item}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <nav aria-label="Otras capacidades" className="border-t border-line">
        <div className="wrap grid sm:grid-cols-2">
          {prev ? (
            <Link href={`/que-hacemos/${prev.slug}`} className="group flex flex-col gap-2 border-line py-10 sm:border-r sm:pr-8">
              <span className="flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] text-muted">
                <ArrowLeft aria-hidden size={14} /> Anterior
              </span>
              <span className="text-xl tracking-tight group-hover:text-accent">{prev.name}</span>
            </Link>
          ) : (
            <span className="hidden sm:block sm:border-r sm:border-line" />
          )}
          {next && (
            <Link href={`/que-hacemos/${next.slug}`} className="group flex flex-col items-end gap-2 border-t border-line py-10 text-right sm:border-t-0 sm:pl-8">
              <span className="flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] text-muted">
                Siguiente <ArrowRight aria-hidden size={14} />
              </span>
              <span className="text-xl tracking-tight group-hover:text-accent">{next.name}</span>
            </Link>
          )}
        </div>
      </nav>

      <ClosingCta title={c.closing} />
    </>
  );
}
