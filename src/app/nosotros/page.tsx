import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { LogoMark } from "@/components/ui/LogoMark";
import { PageHero } from "@/components/ui/PageHero";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";
import { alliances, leadership, recognitions, team, type Person } from "@/data/content";

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
            Experiencia, criterio estratégico y conocimiento de <em>industrias complejas</em>.
          </>
        }
        image={{ src: "/images/reunion.webp", alt: "Mesa de trabajo con cuadernos y notas" }}
      >
        <p>
          Somos un grupo de profesionales con más de dos décadas de comprobada experiencia en integrar las comunicaciones al
          negocio de nuestros clientes.
        </p>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-9">
            <p className="text-[clamp(1.5rem,2.6vw,2.2rem)] font-light leading-snug tracking-tight">
              Combinamos visión estratégica y conocimiento de industrias complejas para acompañar a organizaciones que enfrentan
              desafíos reputacionales, comunicacionales y de liderazgo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Equipo: socias destacadas (retrato + biografía) y luego las 10 personas (foto, nombre, cargo). */}
      <section className="border-t border-line bg-bg-2 py-20 md:py-28">
        <div className="wrap">
          <Reveal className="max-w-[760px]">
            <h2 className="display text-[clamp(2rem,3.8vw,3.4rem)]">Profesionales que entienden la complejidad del negocio y del entorno.</h2>
          </Reveal>

          <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-10">
            {leadership.map((p, i) => (
              <Reveal key={p.name} as="article" delay={i * 0.1} className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,220px)_1fr]">
                <Portrait person={p} sizes="(min-width: 1024px) 220px, 60vw" className="max-w-[320px]" />
                <div>
                  <h3 className="text-[clamp(1.7rem,2.6vw,2.2rem)] font-normal leading-tight tracking-tight">{p.name}</h3>
                  <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.14em] text-accent">{p.role}</p>
                  <div className="prose-body mt-6 max-w-[56ch] leading-relaxed text-muted">
                    {p.bio?.map((b) => <p key={b}>{b}</p>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 border-t border-line pt-12">
            <h3 className="text-2xl font-light tracking-tight">Nuestro equipo</h3>
            <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {team.map((p, i) => (
                <Reveal as="li" key={`${p.name}-${i}`} delay={(i % 5) * 0.05}>
                  <Portrait person={p} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw" />
                  <p className={`mt-4 text-[17px] leading-snug ${p.pending ? "text-muted" : ""}`}>{p.name}</p>
                  <p className="mt-1 text-sm text-muted">{p.role}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reconocimientos */}
      <section id="reconocimientos" className="tone-ink relative isolate overflow-clip bg-bg py-20 text-fg md:py-28">
      <InkField density={24} intensity={0.55} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />
        <div className="wrap">
          <Reveal>
            <h2 className="display text-[clamp(2rem,3.8vw,3.4rem)]">Reconocimientos</h2>
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

      {/* Alianzas */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <h2 className="display text-[clamp(1.9rem,3.4vw,3rem)]">La colaboración también es parte de nuestra forma de trabajar.</h2>
            <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted">
              Sabemos la importancia de la colaboración y el intercambio de experiencias con empresas de la industria. Participamos
              activamente en gremios, encuentros de la academia y como parte de Focco, el gremio de los comunicadores en Chile.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap items-center gap-x-14 gap-y-10 lg:col-span-5 lg:col-start-8">
            {alliances.map((slug) => (
              <LogoMark key={slug} slug={slug} height={40} maxWidth={200} />
            ))}
          </Reveal>
        </div>
      </section>

      <ClosingCta title="Conversemos sobre tu desafío." />
    </>
  );
}

/** Retrato en blanco y negro 4:5; si aún no hay foto, deja el espacio reservado con la misma proporción. */
function Portrait({ person, sizes, className = "" }: { person: Person; sizes: string; className?: string }) {
  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden bg-bg ${className}`}>
      {person.photo ? (
        <Image src={person.photo} alt={`Retrato de ${person.name}`} fill sizes={sizes} className="object-cover grayscale" />
      ) : (
        <div className="absolute inset-0 flex items-end border border-line p-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Fotografía pendiente</span>
        </div>
      )}
    </div>
  );
}
