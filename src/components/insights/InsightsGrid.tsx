"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Insight } from "@/data/content";

type Category = { slug: string; name: string };

const dateFmt = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Insights (mismo lenguaje que la sección del Home, sobre fondo oscuro):
 * filtro por línea editorial, nota destacada horizontal (imagen + texto) y tarjetas.
 */
export function InsightsGrid({ posts, categories }: { posts: Insight[]; categories: Category[] }) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? posts.filter((p) => p.category === active) : posts;
  const [featured, ...rest] = visible;
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name;
  // Imagen vertical (p. ej. piezas con texto 4:5): el recuadro toma su proporción y se ve completa.
  const portrait = !!featured?.imageSize && featured.imageSize[1] > featured.imageSize[0];

  const filters = [{ slug: null, name: "Todos" }, ...categories.filter((c) => posts.some((p) => p.category === c.slug))];

  return (
    <div>
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.name}
            type="button"
            aria-pressed={active === f.slug}
            onClick={() => setActive(f.slug)}
            className="border border-line px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.08em] text-muted transition-colors hover:border-fg hover:text-fg aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-fg"
          >
            {f.name}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/insights/${featured.slug}`}
          className={`group mt-12 grid gap-7 bg-bg-2 p-5 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--bg-2)_80%,var(--lila-deep))] ${portrait ? "sm:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]" : "sm:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"} sm:items-center md:p-6`}
        >
          {featured.image && (
            <div
              className={`relative overflow-hidden ${portrait ? "mx-auto aspect-[4/5] w-full max-w-[440px]" : "aspect-[4/3]"}`}
              style={portrait && featured.imageSize ? { aspectRatio: `${featured.imageSize[0]} / ${featured.imageSize[1]}` } : undefined}
            >
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 55vw, 100vw"
                className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>
          )}
          <div className="sm:pr-4 lg:pr-8">
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-accent">{catName(featured.category)}</p>
            <h2 className="mt-4 text-[clamp(1.5rem,2.4vw,2.2rem)] font-light leading-tight tracking-tight group-hover:text-accent">
              {featured.title}
            </h2>
            <p className="mt-4 line-clamp-3 leading-relaxed text-muted">{featured.excerpt}</p>
            <p className="mt-5 text-sm text-muted">
              <time dateTime={featured.date}>{dateFmt.format(new Date(featured.date))}</time>. {featured.readingMinutes} min de lectura
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-fg group-hover:text-accent">
              Leer artículo <ArrowUpRight aria-hidden size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {rest.map((post, i) => (
            // 3 por fila; si la última fila queda con 2, ocupan media fila cada una (sin huecos).
            <li
              key={post.slug}
              className={`lg:col-span-2 ${rest.length % 3 === 2 && i >= rest.length - 2 ? "lg:col-span-3" : ""} ${
                rest.length % 3 === 1 && i === rest.length - 1 ? "lg:col-span-6" : ""
              } ${rest.length % 2 === 1 && i === rest.length - 1 ? "md:col-span-2" : ""}`}
            >
              <Link
                href={`/insights/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden bg-bg-2 transition-transform duration-500 ease-out hover:-translate-y-1"
              >
                {post.image && (
                  <div
                    className={`relative aspect-[16/10] overflow-hidden ${
                      (rest.length % 3 === 2 && i >= rest.length - 2) || (rest.length % 3 === 1 && i === rest.length - 1) ? "lg:aspect-[21/9]" : ""
                    }`}
                  >
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-accent">{catName(post.category)}</p>
                  <h3 className="mt-3 text-[1.3rem] leading-snug tracking-tight group-hover:text-accent">{post.title}</h3>
                  <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
                  <p className="mt-auto pt-6 text-sm text-muted">
                    <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>. {post.readingMinutes} min de lectura
                  </p>
                </div>
                {/* Línea lila que se dibuja en la base al pasar el cursor */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
