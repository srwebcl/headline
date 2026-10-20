import Image from "next/image";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";
import { Dotted } from "@/components/ui/Dot";

/**
 * Cabecera de páginas interiores: bloque oscuro tipográfico (lenguaje Parla),
 * con fotografía documental opcional a la derecha.
 */
export function PageHero({
  label,
  title,
  children,
  image,
  overlap = false,
}: {
  label?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  image?: { src: string; alt: string };
  /** Deja espacio abajo para una imagen que se monta sobre el borde del hero (ver /nosotros). */
  overlap?: boolean;
}) {
  return (
    <section className="tone-ink relative isolate overflow-clip bg-bg text-fg">
      <InkField density={26} className="-z-10" />
      <div className={`wrap relative grid items-end gap-12 pt-16 md:pt-24 lg:grid-cols-12 ${overlap ? "pb-28 md:pb-52" : "pb-16 md:pb-24"}`}>
        <Reveal className={image ? "lg:col-span-7" : "lg:col-span-10"}>
          {label && <p className="eyebrow fade-up mb-6" style={{ "--d": 0.05 } as React.CSSProperties}>{label}</p>}
          <h1 className="display title-in text-[clamp(2.4rem,5vw,4.6rem)]" style={{ "--d": 0.15 } as React.CSSProperties}>{typeof title === "string" ? <Dotted>{title}</Dotted> : title}</h1>
          {children && <div className="fade-up mt-8 max-w-[60ch] text-lg leading-relaxed text-muted" style={{ "--d": 0.55 } as React.CSSProperties}>{children}</div>}
        </Reveal>
        {image && (
          <Reveal delay={0.15} className="relative aspect-[4/3] w-full lg:col-span-5">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover opacity-80" preload />
          </Reveal>
        )}
      </div>
    </section>
  );
}
