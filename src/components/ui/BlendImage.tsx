import Image from "next/image";

/**
 * Fotografía integrada a la página: franja a todo el ancho que se funde arriba con el fondo
 * de la sección y abajo con el lila del cierre (ClosingCta), sin bordes duros.
 * La imagen se encuadra con object-cover (nunca se deforma) y un Ken Burns muy lento.
 */
export function BlendImage({
  src,
  alt,
  position = "50% 50%",
  size = "md",
}: {
  src: string;
  alt: string;
  position?: string;
  /** "sm": franja más baja y discreta. */
  size?: "sm" | "md";
}) {
  return (
    <div className={`relative isolate overflow-hidden ${size === "sm" ? "h-[clamp(220px,26vw,380px)]" : "h-[clamp(300px,42vw,600px)]"}`}>
      <Image src={src} alt={alt} fill sizes="100vw" className="kenburns -z-10 object-cover" style={{ objectPosition: position }} />
      {/* Fundido superior con el fondo de la página e inferior con el lila del cierre. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg)_0%,color-mix(in_oklab,var(--bg)_55%,transparent)_14%,transparent_32%,transparent_62%,color-mix(in_oklab,var(--lila-deep)_55%,transparent)_86%,var(--lila-deep)_100%)]"
      />
    </div>
  );
}
