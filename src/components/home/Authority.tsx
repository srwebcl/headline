import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Autoridad (Quiénes somos): primera sección después del hero, sobre fondo blanco.
 * Titular centrado + trayectoria y reconocimientos en una franja, y salida a /nosotros.
 * Copy del documento maestro (Home: bloque de autoridad; Nosotros: reconocimientos).
 */
// +350 clientes: cifra validada por Headline. 6 industrias y 2 reconocimientos: documento maestro.
const highlights = [
  { value: "+20", label: "Años de experiencia" },
  { value: "+350", label: "Clientes nacionales y multinacionales" },
  { value: "6", label: "Industrias: salud, minería, construcción, tecnología, instituciones y ferias" },
  { value: "2", label: "Reconocimientos: Leaders League y Sello Transforma" },
];

export function Authority() {
  return (
    <section aria-labelledby="autoridad-title" className="tone-white bg-bg py-16 text-fg md:py-24">
      <div className="wrap">
        <Reveal className="mx-auto max-w-[980px] text-center">
          <p className="eyebrow">Quiénes somos</p>
          <h2 id="autoridad-title" className="display mt-5 text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.04]">
            Más de dos décadas acompañando decisiones que <em>importan</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
            Somos una consultoría estratégica que integra las comunicaciones al negocio de sus clientes para enfrentar escenarios
            complejos, anticipar riesgos y construir relaciones de confianza.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-[1080px]">
          {/* Cuatro destacados en negro y lila (los colores de la web), alternados. */}
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <li
                key={h.label}
                className={`${i % 2 === 0 ? "tone-ink" : "tone-lila"} flex min-h-[180px] flex-col justify-between bg-bg p-6 text-left text-fg md:p-7`}
              >
                <p className="text-[clamp(2.6rem,4vw,3.4rem)] font-extralight leading-none tracking-tight text-accent">{h.value}</p>
                <p className="mt-6 max-w-[22ch] text-[15px] leading-snug text-muted">{h.label}</p>
              </li>
            ))}
          </ul>
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
