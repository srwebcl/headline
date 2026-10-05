import { ButtonLink } from "@/components/ui/ButtonLink";
import { InkField } from "@/components/ui/InkField";

export default function NotFound() {
  return (
    <section className="tone-ink relative isolate flex min-h-[70dvh] items-center overflow-hidden bg-bg text-fg">
      <InkField className="-z-10" />
      <div className="wrap relative py-24">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.4rem,5vw,4.4rem)]">
          No encontramos esta página<span className="brand-dot" aria-hidden />
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
          Es posible que la dirección haya cambiado con el nuevo sitio.
        </p>
        <ButtonLink href="/" className="mt-10">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
