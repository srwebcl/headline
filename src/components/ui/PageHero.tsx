import Image from "next/image";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Cabecera de páginas interiores: bloque oscuro tipográfico (lenguaje Parla),
 * con fotografía documental opcional a la derecha.
 */
export function PageHero({
  label,
  title,
  children,
  image,
}: {
  label?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="tone-ink relative isolate overflow-clip bg-bg text-fg">
      <InkField density={26} className="-z-10" />
      <div className="wrap relative grid items-end gap-12 pb-16 pt-16 md:pb-24 md:pt-24 lg:grid-cols-12">
        <Reveal className={image ? "lg:col-span-7" : "lg:col-span-10"}>
          {label && <p className="eyebrow mb-6">{label}</p>}
          <h1 className="display text-[clamp(2.4rem,5vw,4.6rem)]">{title}</h1>
          {children && <div className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted">{children}</div>}
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
