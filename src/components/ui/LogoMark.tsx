import logos from "@/data/logos.json";

export type LogoSlug = keyof typeof logos;

export function getLogo(slug: string) {
  const logo = (logos as Record<string, { name: string; src: string; width: number; height: number }>)[slug];
  if (!logo) throw new Error(`Logo desconocido: ${slug}`);
  return logo;
}

/**
 * Logo de cliente como máscara monocroma: hereda el color del tono del bloque
 * (--logo-ink) y pasa a lila en hover. `height` define la altura visual;
 * el ancho sale de la proporción real, con tope para logos muy horizontales.
 */
export function LogoMark({
  slug,
  height = 36,
  maxWidth = 168,
  className = "",
}: {
  slug: string;
  height?: number;
  maxWidth?: number;
  className?: string;
}) {
  const logo = getLogo(slug);
  const ratio = logo.width / logo.height;
  // Logos casi cuadrados se ven más chicos que los horizontales: se compensan.
  const h = ratio < 1.6 ? height * 1.45 : ratio > 5 ? height * 0.8 : height;
  const w = Math.min(h * ratio, maxWidth);

  return (
    <span
      role="img"
      aria-label={logo.name}
      className={`logo-mask inline-block shrink-0 ${className}`}
      style={{
        width: w,
        height: w / ratio,
        maskImage: `url(${logo.src})`,
        WebkitMaskImage: `url(${logo.src})`,
      }}
    />
  );
}
