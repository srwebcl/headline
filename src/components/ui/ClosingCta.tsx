import { CTA } from "@/data/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Cierre de página en lila institucional. El titular cambia según el contexto
 * ("Preparémonos antes de la próxima crisis", etc.); el botón siempre dice
 * "Conversemos" para no duplicar intenciones de contacto con distintos nombres.
 */
export function ClosingCta({
  label,
  title,
  body = "Conversemos sobre cómo la comunicación puede ayudarte a fortalecer tu reputación, posicionar a tus líderes o enfrentar escenarios complejos.",
}: {
  /** Título breve opcional sobre el titular (eyebrow). */
  label?: string;
  title: string;
  body?: string;
}) {
  const text = title.replace(/[.]$/, "");
  return (
    <section className="tone-lila bg-bg text-fg">
      <Reveal className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {label && <p className="eyebrow mb-5">{label}</p>}
          <h2 className="display text-[clamp(2.2rem,4.6vw,4.2rem)]">
            {text}
            <span className="brand-dot" aria-hidden />
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{body}</p>
          <ButtonLink href={CTA.href} className="mt-8">
            {CTA.label}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
