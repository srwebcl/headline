import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Asterisk } from "@phosphor-icons/react/ssr";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { Dotted } from "@/components/ui/Dot";
import { InkField } from "@/components/ui/InkField";
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

const CLOSING_BODY =
  "Analicemos cómo la comunicación puede ayudarte a fortalecer tu reputación, posicionar a tus líderes o enfrentar escenarios complejos.";

/** Etiqueta de cada bloque del caso: número grueso + nombre (01 Desafío, 02 Acciones, 03 Logro). */
function StepLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="lg:sticky lg:top-32">
      <span className="block text-[clamp(2.6rem,4.4vw,3.6rem)] font-bold leading-[0.85] tracking-[-0.03em] text-accent">{num}</span>
      <h2 className="mt-4 flex items-center gap-3 text-[clamp(1.05rem,1.4vw,1.25rem)] font-semibold tracking-tight">
        <span aria-hidden className="h-0.5 w-8 bg-accent" />
        {label}
      </h2>
    </div>
  );
}

/**
 * Caso de éxito: hero con el cliente como protagonista y tres bloques de color que se leen
 * como un relato (Desafío en blanco, Acciones en negro con líneas, Logro en lila).
 */
export default async function CasoPage({ params }: PageProps<"/casos/[slug]">) {
  const { slug } = await params;
  const index = cases.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const c = cases[index];
  const next = cases[(index + 1) % cases.length];
  const caseNum = String(index + 1).padStart(2, "0");

  return (
    <>
      {/* Hero: nombre del cliente en grande, área en lila y el título como bajada. */}
      <section className="tone-ink relative isolate overflow-clip bg-bg text-fg">
        <InkField density={26} className="-z-10" />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[0.18em] right-[-0.04em] -z-10 select-none text-[clamp(8rem,22vw,18rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.035]"
        >
          {caseNum}
        </span>
        <div className="wrap relative pb-16 pt-20 md:pb-24 md:pt-28">
          <Reveal className="max-w-[980px]">
            <p className="eyebrow fade-up" style={{ "--d": 0.05 } as React.CSSProperties}>Caso de éxito {caseNum}</p>
            <h1 style={{ "--d": 0.15 } as React.CSSProperties} className="title-in mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.03em]">
              <Dotted>{c.client}</Dotted>
            </h1>
            <p className="fade-up mt-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-accent md:text-sm" style={{ "--d": 0.45 } as React.CSSProperties}>{c.area}</p>
            <span aria-hidden className="mt-8 block h-0.5 w-14 bg-[var(--dot)]" />
            <p style={{ "--d": 0.6 } as React.CSSProperties} className="fade-up mt-7 max-w-[48ch] text-[clamp(1.1rem,1.5vw,1.35rem)] font-light leading-snug text-fg/85">{c.title}</p>
          </Reveal>
        </div>
      </section>

      {/* 01 Desafío */}
      <section className="tone-white bg-bg py-20 text-fg md:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <StepLabel num="01" label="Desafío" />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <p className="max-w-[58ch] text-[clamp(1.2rem,1.7vw,1.5rem)] font-light leading-[1.45] tracking-tight">{c.challenge}</p>
          </Reveal>
        </div>
      </section>

      {/* 02 Acciones */}
      <section className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
        <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <StepLabel num="02" label="Acciones" />
          </Reveal>
          <ul className="space-y-4 lg:col-span-8">
            {c.actions.map((a, i) => (
              <Reveal as="li" key={a} delay={0.06 + i * 0.08} className="flex gap-5 border border-line bg-bg-2/70 p-7 md:p-8">
                <Asterisk aria-hidden weight="bold" size={20} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-[16px] leading-relaxed text-fg/90 md:text-[17px]">{a}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 Logro */}
      {c.result && (
        <section className="tone-lila bg-bg py-20 text-fg md:py-28">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <StepLabel num="03" label="Logro" />
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <span aria-hidden className="block h-0.5 w-14 bg-[var(--dot)]" />
              <p className="mt-7 max-w-[54ch] text-[clamp(1.25rem,1.9vw,1.65rem)] font-light leading-[1.4] tracking-tight">{c.result}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Siguiente caso: barrido negro al pasar el cursor (queda entre el Logro lila y el cierre lila). */}
      <nav aria-label="Siguiente caso" className="border-b border-line">
        <Link href={`/casos/${next.slug}`} className="group relative isolate block overflow-hidden">
          <span
            aria-hidden
            className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[var(--ink)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
          <span className="wrap flex items-center justify-between gap-6 py-12 md:py-16">
            <span>
              <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-white/80">
                Siguiente caso
              </span>
              <span className="mt-2 block text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-tight transition-colors group-hover:text-white">
                {next.client}
              </span>
            </span>
            <ArrowRight
              aria-hidden
              size={26}
              className="shrink-0 text-accent transition-[color,transform] duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--dot)]"
            />
          </span>
        </Link>
      </nav>

      <ClosingCta title="Cuéntanos qué desafío enfrenta tu organización." body={CLOSING_BODY} />
    </>
  );
}
