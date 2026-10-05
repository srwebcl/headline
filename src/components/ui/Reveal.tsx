/**
 * Entrada al hacer scroll con CSS scroll-driven animations (ver .reveal en globals.css).
 * Ordena la lectura de cada bloque (jerarquía), no decora. Es progresivo: sin soporte,
 * sin JS o con prefers-reduced-motion, el contenido se muestra estático.
 * `delay` (0 a ~0.4) desplaza el inicio para escalonar elementos hermanos.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  return (
    <Tag className={`reveal ${className}`} style={delay ? ({ "--d": delay } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
