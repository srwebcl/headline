import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";
import { cases, citizenProjects } from "@/data/content";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Desafíos complejos que exigieron estrategia, relacionamiento y capacidad de ejecución: TECSA, Congreso Nacional, Chile-India, AEH, Puerto Caldera, Laboratorio Chile y Gardilcic.",
  alternates: { canonical: "/casos" },
};

export default function CasosPage() {
  return (
    <>
      <PageHero
        label="Casos"
        title={
          <>
            Desafíos complejos que exigieron estrategia, relacionamiento y <em>capacidad de ejecución</em>.
          </>
        }
      />

      <section className="py-16 md:py-24">
        <ul className="wrap">
          {cases.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={0.04} className="border-b border-line first:border-t">
              <Link href={`/casos/${c.slug}`} className="group grid gap-x-10 gap-y-4 py-10 transition-colors hover:bg-bg-2 md:px-6 lg:grid-cols-12 lg:py-14">
                <span className="text-sm font-light text-accent lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <div className="lg:col-span-4">
                  <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-tight tracking-tight group-hover:text-accent">{c.client}</h2>
                  <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.12em] text-muted">{c.area}</p>
                </div>
                <p className="max-w-[60ch] leading-relaxed text-muted lg:col-span-6">{c.challenge}</p>
                <ArrowUpRight aria-hidden size={22} className="hidden justify-self-end text-muted transition-all group-hover:text-accent lg:col-span-1 lg:block" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
      <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
        <div className="wrap">
          <Reveal className="max-w-[760px]">
            <h2 className="display text-[clamp(2rem,3.8vw,3.4rem)]">Proyectos de vinculación ciudadana.</h2>
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

      <ClosingCta title="Cuéntanos qué desafío enfrenta tu organización." />
    </>
  );
}
