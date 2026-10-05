import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/data/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/casos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.challenge,
    alternates: { canonical: `/casos/${c.slug}` },
  };
}

export default async function CasoPage({ params }: PageProps<"/casos/[slug]">) {
  const { slug } = await params;
  const index = cases.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const c = cases[index];
  const next = cases[(index + 1) % cases.length];

  const blocks = [
    { label: "Desafío", content: [c.challenge] },
    { label: "Acciones", content: c.actions },
    ...(c.result ? [{ label: "Logro", content: [c.result] }] : []),
  ];

  return (
    <>
      <PageHero label={`${c.client}  /  ${c.area}`} title={c.title} />

      <article className="py-12 md:py-20">
        <div className="wrap">
          {blocks.map((b) => (
            <Reveal key={b.label} as="section" className="grid gap-6 border-b border-line py-12 last:border-b-0 md:py-16 lg:grid-cols-12">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent lg:col-span-3">{b.label}</h2>
              <div
                className={`prose-body lg:col-span-8 lg:col-start-5 ${
                  b.label === "Logro"
                    ? "text-[clamp(1.5rem,2.6vw,2.2rem)] font-light leading-snug tracking-tight"
                    : "text-lg leading-relaxed text-muted [&>p:first-child]:text-fg"
                }`}
              >
                {b.content.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </article>

      <nav aria-label="Siguiente caso" className="border-t border-line">
        <Link href={`/casos/${next.slug}`} className="wrap group flex items-center justify-between gap-6 py-12 md:py-16">
          <span>
            <span className="text-[13px] uppercase tracking-[0.12em] text-muted">Siguiente caso</span>
            <span className="mt-2 block text-[clamp(1.6rem,3vw,2.6rem)] font-light tracking-tight group-hover:text-accent">{next.client}</span>
          </span>
          <ArrowRight aria-hidden size={28} className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </nav>

      <ClosingCta title="Cuéntanos qué desafío enfrenta tu organización." />
    </>
  );
}
