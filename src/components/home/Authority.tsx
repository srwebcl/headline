import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { AuthorityStats } from "@/components/home/AuthorityStats";
import { Reveal } from "@/components/ui/Reveal";
import { Dot } from "@/components/ui/Dot";

/**
 * Autoridad (Quiénes somos): primera sección después del hero, sobre fondo blanco.
 * Titular centrado + trayectoria y reconocimientos en una franja, y salida a /nosotros.
 * Copy del documento maestro (Home: bloque de autoridad; Nosotros: reconocimientos).
 */
// Cifras entregadas por Headline.
const highlights = [
  { value: "+20", label: "Años de experiencia." },
  { value: "+350", label: "Clientes nacionales y multinacionales." },
  { value: "+130", label: "Crisis abordadas con éxito." },
  { value: "+100", label: "Campañas de awareness en diversos ámbitos." },
];

export function Authority() {
  return (
    <section aria-labelledby="autoridad-title" className="tone-white bg-bg py-16 text-fg md:py-24">
      <div className="wrap">
        <Reveal className="mx-auto max-w-[980px] text-center">
          <p className="eyebrow">Quiénes somos</p>
          <h2 id="autoridad-title" className="display mt-5 text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.04]">
            Más de dos décadas acompañando decisiones que <em>importan</em>
            <Dot />
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            Somos una consultora estratégica que integra las comunicaciones al negocio de sus clientes para impulsar sus objetivos,
            aprovechar oportunidades y construir relaciones de confianza.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-[1080px]">
          {/* Cuatro destacados en negro y lila, con entrada animada y conteo de cifras. */}
          <AuthorityStats stats={highlights} />
          <p className="mt-10 text-center">
            <Link
              href="/nosotros"
              className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-fg hover:text-accent"
            >
              Conoce más sobre Headline
              <ArrowRight aria-hidden size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
