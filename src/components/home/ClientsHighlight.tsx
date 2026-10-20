import { ButtonLink } from "@/components/ui/ButtonLink";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/data/content";
import { Dot } from "@/components/ui/Dot";

// Todos los clientes, intercalando industrias para que el carrusel no las agrupe.
const allLogos = (() => {
  const lists = industries.map((i) => i.logos);
  const max = Math.max(...lists.map((l) => l.length));
  return Array.from({ length: max }, (_, k) => lists.map((l) => l[k]).filter(Boolean)).flat();
})();

/** Clientes: carrusel infinito con todos los logos y salida a /clientes. */
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
          Salud, minería, construcción, tecnología e instituciones.
        </p>
        <div className="mx-auto mt-14 max-w-[1180px]">
          <LogoMarquee slugs={allLogos} label="Clientes de Headline" />
        </div>
        <ButtonLink href="/clientes" className="mt-10">
          Ver todos los clientes
        </ButtonLink>
      </Reveal>
    </section>
  );
}
