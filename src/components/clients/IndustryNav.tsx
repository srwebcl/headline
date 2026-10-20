"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type Item = { slug: string; name: string };

/**
 * Franja de rubros de /clientes: flechas sutiles siempre visibles a ambos lados y rubros
 * centrados (`safe center`: si no caben, se alinean al inicio y no se cortan).
 * Una flecha se atenúa cuando ya no hay más rubros hacia ese lado.
 */
export function IndustryNav({ items }: { items: Item[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.6, behavior: "smooth" });

  const arrow =
    "flex size-8 shrink-0 items-center justify-center text-fg/70 transition-[color,opacity] duration-300 hover:text-accent disabled:cursor-default disabled:opacity-25 disabled:hover:text-fg/70";

  return (
    <nav aria-label="Industrias" className="sticky top-[77px] z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="wrap flex items-center gap-2">
        <button type="button" onClick={() => scroll(-1)} disabled={!edges.left} aria-label="Ver rubros anteriores" className={arrow}>
          <CaretLeft size={18} />
        </button>

        <ul
          ref={ref}
          className="flex min-w-0 flex-1 gap-6 overflow-x-auto scroll-smooth py-4 text-[13px] font-medium uppercase tracking-[0.08em] [justify-content:safe_center] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage: `linear-gradient(to right, ${edges.left ? "transparent" : "black"} 0, black 40px, black calc(100% - 40px), ${edges.right ? "transparent" : "black"} 100%)`,
            WebkitMaskImage: `linear-gradient(to right, ${edges.left ? "transparent" : "black"} 0, black 40px, black calc(100% - 40px), ${edges.right ? "transparent" : "black"} 100%)`,
          }}
        >
          {items.map((ind) => (
            <li key={ind.slug} className="shrink-0">
              <a href={`#${ind.slug}`} className="text-muted transition-colors hover:text-accent">
                {ind.name}
              </a>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => scroll(1)} disabled={!edges.right} aria-label="Ver más rubros" className={arrow}>
          <CaretRight size={18} />
        </button>
      </div>
    </nav>
  );
}
