/**
 * Punto amarillo de la marca como cierre de los títulos (igual que en el hero del Home).
 * Visualmente reemplaza al punto final; para lectores de pantalla sigue siendo un ".".
 */
export function Dot() {
  return (
    <>
      <span className="brand-dot" aria-hidden />
      <span className="sr-only">.</span>
    </>
  );
}

/**
 * Para títulos que llegan como texto (datos, props): quita el punto final y agrega el punto
 * de marca. Los títulos que terminan en "?" o "!" se dejan como están.
 * La última palabra va unida al punto para que éste nunca quede solo en una línea.
 */
export function Dotted({ children }: { children: string }) {
  const text = children.trim();
  if (/[?!]$/.test(text)) return <>{text}</>;
  const clean = text.replace(/\.$/, "");
  const cut = clean.lastIndexOf(" ") + 1;
  return (
    <>
      {clean.slice(0, cut)}
      <span className="whitespace-nowrap">
        {clean.slice(cut)}
        <Dot />
      </span>
    </>
  );
}
