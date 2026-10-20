import Image from "next/image";
import { Dotted } from "@/components/ui/Dot";
import { InkField } from "@/components/ui/InkField";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Hero de cada servicio: la fotografía vive en el fondo (a sangre, a la derecha) con un
 * Ken Burns lento (.kenburns en globals.css) y se funde con el negro hacia el texto.
 * El nombre del servicio va destacado (número + nombre) sobre un titular más contenido.
 */
export function ServiceHero({
  num,
  name,
  title,
  image,
}: {
  num: string;
  name: string;
  title: string;
  image: { src: string; alt: string };
}) {
  return (
    <section className="tone-ink relative isolate flex min-h-[min(78vh,640px)] items-end overflow-clip bg-bg text-fg">
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <Image src={image.src} alt="" fill preload sizes="100vw" className="kenburns object-cover object-[70%_center] opacity-75" />
      </div>
      {/* Fusión con el fondo: negro sólido detrás del texto, la foto se abre hacia la derecha. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--bg)_0%,color-mix(in_oklab,var(--bg)_92%,transparent)_34%,color-mix(in_oklab,var(--bg)_55%,transparent)_62%,color-mix(in_oklab,var(--bg)_25%,transparent)_100%),linear-gradient(0deg,var(--bg)_0%,transparent_45%)] max-lg:bg-[linear-gradient(0deg,var(--bg)_0%,color-mix(in_oklab,var(--bg)_88%,transparent)_55%,color-mix(in_oklab,var(--bg)_55%,transparent)_100%)]"
      />
      <InkField density={22} intensity={0.45} speed={0.6} interactive={false} className="ink-field--quiet -z-10" />

      <div className="wrap relative w-full pb-16 pt-28 md:pb-20 md:pt-36">
        <Reveal className="max-w-[760px]">
          <p style={{ "--d": 0.05 } as React.CSSProperties} className="title-in text-[clamp(2.6rem,4.4vw,3.8rem)] font-semibold leading-none tracking-tight text-accent">{num}</p>
          <p style={{ "--d": 0.2 } as React.CSSProperties} className="title-in mt-4 max-w-[22ch] text-[clamp(1.7rem,2.9vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-fg">{name}</p>
          <span aria-hidden style={{ "--d": 0.45 } as React.CSSProperties} className="fade-up mt-7 block h-0.5 w-14 bg-[var(--dot)]" />
          <h1 style={{ "--d": 0.55 } as React.CSSProperties} className="display title-in mt-7 max-w-[30ch] text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.2] text-fg/85">
            <Dotted>{title}</Dotted>
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
