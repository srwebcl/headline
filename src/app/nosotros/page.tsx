import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { LogoMark } from "@/components/ui/LogoMark";
import { PageHero } from "@/components/ui/PageHero";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";
import { leadership, recognitions, team, type Person } from "@/data/content";
import { Dot, Dotted } from "@/components/ui/Dot";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Profesionales con más de dos décadas de experiencia integrando las comunicaciones al negocio de sus clientes, con conocimiento de industrias complejas.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        label="Nosotros"
        title={
          <>
            Experiencia, criterio estratégico y conocimiento de <em>industrias complejas</em>
            <Dot />
          </>
        }
      >
        <p>
          Somos un grupo de profesionales con más de dos décadas de comprobada experiencia en integrar las comunicaciones al
          negocio de nuestros clientes.
        </p>
      </PageHero>

      {/* Foto grupal a todo el ancho, fundida arriba con el hero oscuro y abajo con la sección blanca. */}
      <div className="relative isolate aspect-[2000/1046] max-h-[780px] w-full overflow-hidden bg-[var(--ink)]">
        <Image
          src="/team/equipo-headline-grupal.webp"
          alt="Equipo de Headline Comunicaciones Estratégicas"
          fill
          preload
          sizes="100vw"
          className="kenburns -z-10 object-cover object-[50%_30%]"
        />
        <div
          aria-hidden
          className="tone-white absolute inset-0 bg-[linear-gradient(180deg,var(--ink)_0%,color-mix(in_oklab,var(--ink)_45%,transparent)_12%,transparent_28%,transparent_70%,color-mix(in_oklab,var(--bg)_60%,transparent)_88%,var(--bg)_100%)]"
        />
      </div>

      {/* Titular centrado + socias */}
      <section className="tone-white bg-bg pb-20 text-fg md:pb-28">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[900px] pt-6 text-center md:pt-10">
            <h2 className="display text-[clamp(2.1rem,4.2vw,3.8rem)]">
              Profesionales que entienden la complejidad del negocio y del <em>entorno</em>
              <Dot />
            </h2>
          </Reveal>

          {/* Socias: retrato grande + biografía, en filas alternadas */}
          <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
            {leadership.map((p, i) => (
              <Reveal key={p.name} as="article" className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={`relative lg:col-span-5 ${i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  {/* Marco lila desplazado: misma línea gráfica del panel de servicios */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 translate-y-4 border-2 border-accent ${i % 2 === 1 ? "-translate-x-4" : "translate-x-4"}`}
                  />
                  <Portrait person={p} sizes="(min-width: 1024px) 40vw, 90vw" className="relative" />
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-accent">{p.role}</p>
                  <h3 className="mt-3 text-[clamp(2.2rem,3.6vw,3.2rem)] font-light leading-[1.05] tracking-tight">{p.name}</h3>
                  <span aria-hidden className="mt-7 block h-0.5 w-12 bg-accent" />
                  <div className="prose-body mt-7 max-w-[60ch] text-[17px] leading-relaxed text-muted [&>p:first-child]:text-fg">
                    {p.bio?.map((b) => <p key={b}>{b}</p>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo completo */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <Reveal className="text-center">
            <p className="eyebrow">Nuestro equipo</p>
            <h2 className="display mx-auto mt-5 max-w-[760px] text-[clamp(1.9rem,3.4vw,3rem)]">
              <Dotted>Las personas detrás de cada estrategia</Dotted>
            </h2>
          </Reveal>
          <ul className="mt-14 flex flex-wrap justify-center gap-x-5 gap-y-12">
            {team.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={(i % 5) * 0.05}
                className="group w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)]"
              >
                <Portrait person={p} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw" zoom />
                <p className="mt-4 text-[17px] leading-snug">{p.name}</p>
                <p className="mt-1 text-sm text-muted">{p.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Reconocimientos */}
      <section id="reconocimientos" className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
        <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
        <div className="wrap">
          <Reveal>
            <h2 className="display text-[clamp(2rem,3.8vw,3.4rem)]">
              <Dotted>Reconocimientos</Dotted>
            </h2>
          </Reveal>
          <div className="mt-14 grid border-t border-line md:grid-cols-2">
            {recognitions.map((r, i) => (
              <Reveal
                key={r.name}
                as="article"
                delay={i * 0.1}
                className="border-b border-line py-10 md:border-b-0 md:pr-12 md:first:border-r md:[&:nth-child(2)]:pl-12"
              >
                <div className="flex h-20 items-center">
                  <LogoMark slug={r.logo} height={44} maxWidth={220} />
                </div>
                <p className="mt-8 text-sm font-medium uppercase tracking-[0.14em] text-accent">{r.period}</p>
                <h3 className="mt-2 text-2xl tracking-tight">{r.name}</h3>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alianzas: titular centrado y tres logos con el mismo peso (mismo módulo, misma caja). */}
      <section className="tone-white relative isolate overflow-clip bg-bg py-24 text-fg md:py-36">
        {/* Halo lila muy tenue detrás de los logos: da profundidad sin competir con ellos. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[62%] -z-10 h-[520px] w-[min(1100px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(142_74_155/0.12),transparent)]"
        />
        <div className="wrap">
          <Reveal className="mx-auto max-w-[880px] text-center">
            <p className="eyebrow">Alianzas</p>
            <h2 className="display mt-6 text-[clamp(2.3rem,4.8vw,4.4rem)]">
              La colaboración también es parte de nuestra forma de <em>trabajar</em>
              <Dot />
            </h2>
            <p className="mx-auto mt-8 max-w-[62ch] text-lg leading-relaxed text-muted">
              Creemos en la colaboración y el intercambio de experiencias como motores de desarrollo para nuestra industria.
              Participamos activamente en espacios gremiales y encuentros con la academia, y somos parte de Focco, el gremio de los
              comunicadores en Chile.
            </p>
          </Reveal>

          <ul className="mx-auto mt-16 grid max-w-[1080px] gap-4 sm:grid-cols-3 md:mt-20">
            {[
              { src: "/alliances/focco.webp", alt: "Focco", w: 461, h: 200 },
              { src: "/alliances/amcham.webp", alt: "AmCham Chile", w: 1523, h: 191 },
              { src: "/alliances/pr-latam.webp", alt: "PR LATAM", w: 213, h: 55 },
            ].map((logo, i) => (
              <Reveal as="li" key={logo.alt} delay={0.08 + i * 0.08} className="group relative">
                <div className="relative flex aspect-[5/2] items-center justify-center overflow-hidden bg-bg-2 px-10 sm:aspect-[4/3] shadow-[0_30px_60px_-40px_rgb(24_23_27/0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                  {/* Misma caja para los tres logos: ninguno domina. */}
                  <div className="relative h-16 w-full max-w-[220px]">
                    <Image src={logo.src} alt={logo.alt} fill sizes="220px" className="object-contain" />
                  </div>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

/** Retrato 3:4 en color; si aún no hay foto, deja el espacio reservado con la misma proporción. */
function Portrait({ person, sizes, className = "", zoom = false }: { person: Person; sizes: string; className?: string; zoom?: boolean }) {
  return (
    <div className={`relative aspect-[3/4] w-full overflow-hidden bg-bg-2 ${className}`}>
      {person.photo ? (
        <Image
          src={person.photo}
          alt={`Retrato de ${person.name}`}
          fill
          sizes={sizes}
          className={`object-cover ${zoom ? "transition-transform duration-700 ease-out group-hover:scale-[1.04]" : ""}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-end border border-line p-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Fotografía pendiente</span>
        </div>
      )}
    </div>
  );
}
