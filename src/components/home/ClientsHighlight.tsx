import { ButtonLink } from "@/components/ui/ButtonLink";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { Dot } from "@/components/ui/Dot";

// Clientes destacados del carrusel, en el orden definido por la agencia.
const homeLogos = [
  "labchile-teva",
  "abbott",
  "merck",
  "zoetis",
  "adobe",
  "ascenty",
  "henkel",
  "scania",
  "afp-uno",
  "grupo-planeta",
];

/** Clientes: carrusel infinito con los logos destacados y salida a /clientes. */
export function ClientsHighlight() {
  return (
    <section aria-labelledby="clientes-title" className="tone-white bg-bg py-16 text-fg md:py-24">
      <Reveal className="wrap text-center">
        <p className="eyebrow">Nuestros clientes</p>
        <h2 id="clientes-title" className="display mx-auto mt-5 max-w-[900px] text-[clamp(2.1rem,4.4vw,4rem)] leading-[1.06]">
          Industrias donde la confianza es <em>fundamental</em>
            <Dot />
        </h2>
        <p className="mx-auto mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">
          Salud, minería, energía, tecnología, construcción, consumo e instituciones.
        </p>
        <div className="mx-auto mt-14 max-w-[1180px]">
          <LogoMarquee slugs={homeLogos} label="Clientes de Headline" />
        </div>
        <ButtonLink href="/clientes" className="mt-10">
          Ver todos los clientes
        </ButtonLink>
      </Reveal>
    </section>
  );
}
