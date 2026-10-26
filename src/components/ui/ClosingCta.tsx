import { CTA } from "@/data/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Dot } from "@/components/ui/Dot";

/**
 * Cierre de página en lila institucional. Mismo titular y texto en todo el sitio
 * (definido por la agencia); el botón siempre dice "Conversemos".
 */
const TITLE = "Cuéntanos qué desafío enfrenta tu organización";
const BODY =
  "Evaluemos cómo la comunicación puede ayudarte a fortalecer tu reputación, posicionar a tus líderes o enfrentar escenarios complejos.";

export function ClosingCta({
  label,
}: {
  /** Título breve opcional sobre el titular (eyebrow). */
  label?: string;
}) {
  return (
    <section className="tone-lila bg-bg text-fg">
      <Reveal className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {label && <p className="eyebrow mb-5">{label}</p>}
          <h2 className="display text-[clamp(2.2rem,4.6vw,4.2rem)]">
            {TITLE}
            <Dot />
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{BODY}</p>
          <ButtonLink href={CTA.href} className="mt-8">
            {CTA.label}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
