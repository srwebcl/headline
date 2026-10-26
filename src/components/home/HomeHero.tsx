import { HeroStatement } from "@/components/home/HeroStatement";
import { HeroVideo } from "@/components/home/HeroVideo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTA } from "@/data/content";

const d = (s: number) => ({ "--d": s }) as React.CSSProperties;

/**
 * Hero del Home. El titular rotativo vive en HeroStatement. El video de fondo (ejecutivos
 * frente a la ciudad) es el "entorno": queda atenuado y con degradados para que el foco
 * siga en el mensaje. Animación de entrada CSS (.rise).
 */
export function HomeHero() {
  return (
    <section className="tone-ink relative isolate flex min-h-[calc(100dvh-77px)] items-center overflow-hidden bg-bg text-fg">
      <div aria-hidden className="hero-bg absolute inset-0 -z-10">
        <HeroVideo className="opacity-45 dark:opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/85 to-[var(--bg)]/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>

      <div className="wrap py-20 md:py-24">
        <HeroStatement />

        <p className="rise mt-10 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl" style={d(0.85)}>
          Desde 2003 acompañamos a empresas e instituciones en desafíos de comunicación, posicionamiento, liderazgo y relacionamiento.
        </p>

        <div className="rise mt-12 flex flex-wrap items-center gap-x-10 gap-y-6" style={d(1)}>
          <ButtonLink href={CTA.href} className="px-8">
            {CTA.label}
          </ButtonLink>
          <ButtonLink href="/nuestro-modelo" variant="text">
            Conoce nuestro Modelo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
