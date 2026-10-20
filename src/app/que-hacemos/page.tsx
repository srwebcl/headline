import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Asterisk } from "@phosphor-icons/react/ssr";
import { BlendImage } from "@/components/ui/BlendImage";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/data/content";
import { Dot } from "@/components/ui/Dot";

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
            Comunicación estratégica para organizaciones que necesitan avanzar en <em>entornos complejos</em>
            <Dot />
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
          {/* Mismo encabezado y bajada que "Nuestros servicios" del Home. */}
          <Reveal className="max-w-[820px]">
            <p className="eyebrow">Nuestros servicios</p>
            <h2 className="display mt-5 text-[clamp(2.1rem,4.4vw,4rem)]">
              Cinco capacidades para desafíos <em>complejos</em>
              <Dot />
            </h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
              Diseñamos soluciones a la medida de cada organización, acompañándola en sus desafíos de comunicación y en las distintas
              etapas de su desarrollo.
            </p>
          </Reveal>

          <ul className="mt-14 border-t border-line">
            {capabilities.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.04} className="border-b border-line">
                <Link
                  href={`/que-hacemos/${c.slug}`}
                  className="group relative isolate grid gap-x-10 gap-y-6 overflow-hidden px-4 py-12 md:px-8 lg:grid-cols-12 lg:py-16"
                >
                  {/* Hover: barrido lila de izquierda a derecha; texto en blanco y número en amarillo de marca. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[var(--lila-deep)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                  <div className="lg:col-span-5">
                    <span className="block text-6xl font-semibold leading-none tracking-tight text-accent transition-colors duration-300 group-hover:text-[var(--dot)]">
                      {c.num}
                    </span>
                    <h3 className="mt-6 text-[clamp(1.7rem,2.8vw,2.4rem)] font-light leading-tight tracking-tight transition-colors duration-300 group-hover:text-white">
                      {c.name}
                    </h3>
                  </div>
                  <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
                    <p className="max-w-[58ch] text-lg leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/85">
                      {c.summary}
                    </p>
                    {/* Soluciones con la misma viñeta del Home (asterisco lila), en columnas: primero hacia abajo. */}
                    <ul
                      className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-flow-col sm:grid-cols-2 sm:[grid-template-rows:repeat(var(--rows),auto)]"
                      style={{ "--rows": Math.ceil(c.items.length / 2) } as React.CSSProperties}
                    >
                      {c.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-snug transition-colors duration-300 group-hover:text-white">
                          <Asterisk aria-hidden weight="bold" size={16} className="mt-[0.15em] shrink-0 text-accent transition-colors duration-300 group-hover:text-[var(--dot)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Mismo estilo que los botones con borde del sitio (ButtonLink "outline").
                        Sobre el lila del hover pasa a blanco con texto lila, como el CTA del cierre. */}
                    <span className="mt-9 inline-flex items-center gap-3 whitespace-nowrap border border-fg/80 px-7 py-[15px] text-[13px] font-medium uppercase tracking-[0.12em] text-fg transition-[background-color,color,border-color] duration-300 ease-out group-hover:border-white group-hover:bg-white group-hover:text-[var(--lila-deep)] group-focus-visible:border-white group-focus-visible:bg-white group-focus-visible:text-[var(--lila-deep)]">
                      Ver más
                      <span className="sr-only">: {c.name}</span>
                      <ArrowRight aria-hidden size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>

        </div>
      </section>

      <BlendImage src="/images/reunion.webp" alt="Mesa de trabajo con cuadernos y notas" />

      <ClosingCta title="Conversemos sobre tu desafío." />
    </>
  );
}
