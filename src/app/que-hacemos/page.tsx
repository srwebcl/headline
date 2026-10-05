import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/data/content";

export const metadata: Metadata = {
  title: "Qué hacemos",
  description:
    "Comunicación estratégica para organizaciones que necesitan avanzar en entornos complejos: reputación, riesgos, relaciones institucionales, comunicación interna y vocerías.",
  alternates: { canonical: "/que-hacemos" },
};

export default function QueHacemosPage() {
  return (
    <>
      <PageHero
        label="Qué hacemos"
        title={
          <>
            Comunicación estratégica para organizaciones que necesitan avanzar en <em>entornos complejos</em>.
          </>
        }
      >
        <p>
          Nuestro trabajo busca resolver desafíos concretos de reputación, posicionamiento, riesgo, relacionamiento, comunicación
          interna y liderazgo. No se trata solo de comunicar. Se trata de comprender el contexto, tomar posición y actuar
          estratégicamente.
        </p>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="wrap">
          <ul className="border-t border-line">
            {capabilities.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.04} className="border-b border-line">
                <Link
                  href={`/que-hacemos/${c.slug}`}
                  className="group grid gap-x-10 gap-y-6 py-12 transition-colors duration-300 hover:bg-bg-2 md:px-6 lg:grid-cols-12 lg:py-16"
                >
                  <div className="lg:col-span-5">
                    <span className="text-5xl font-thin leading-none text-accent">{c.num}</span>
                    <h2 className="mt-6 text-[clamp(1.7rem,2.8vw,2.4rem)] font-light leading-tight tracking-tight group-hover:text-accent">
                      {c.name}
                    </h2>
                  </div>
                  <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
                    <p className="max-w-[58ch] text-lg leading-relaxed text-muted">{c.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {c.items.slice(0, 4).map((item) => (
                        <li key={item} className="border border-line px-3 py-1.5 text-[13px] text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-8 inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.12em] text-fg group-hover:text-accent">
                      Ver capacidad
                      <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal className="relative mt-20 aspect-[16/9] overflow-hidden md:aspect-[21/8]">
            <Image src="/images/reunion.webp" alt="Mesa de trabajo con cuadernos y notas" fill sizes="(min-width: 1360px) 1220px, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <ClosingCta title="Conversemos sobre tu desafío." />
    </>
  );
}
