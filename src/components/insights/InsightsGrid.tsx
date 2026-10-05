"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Insight } from "@/data/content";

type Category = { slug: string; name: string };

const dateFmt = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Grilla editorial de Insights: el más reciente destacado y filtro por línea editorial. */
export function InsightsGrid({ posts, categories }: { posts: Insight[]; categories: Category[] }) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? posts.filter((p) => p.category === active) : posts;
  const [featured, ...rest] = visible;
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name;

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
            className="border border-line px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.08em] text-muted transition-colors hover:border-fg hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
          >
            {f.name}
          </button>
        ))}
      </div>

      {featured && (
        <Link href={`/insights/${featured.slug}`} className="group mt-12 grid gap-8 border-t border-line pt-12 lg:grid-cols-12 lg:gap-12">
          {featured.image && (
            <div className="relative aspect-[3/2] overflow-hidden bg-bg-2 lg:col-span-7">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
              />
            </div>
          )}
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-accent">{catName(featured.category)}</p>
            <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-tight tracking-tight group-hover:text-accent">
              {featured.title}
            </h2>
            <p className="mt-5 line-clamp-4 leading-relaxed text-muted">{featured.excerpt}</p>
            <p className="mt-6 text-sm text-muted">
              <time dateTime={featured.date}>{dateFmt.format(new Date(featured.date))}</time>. {featured.readingMinutes} min de lectura
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em]">
              Leer artículo <ArrowUpRight aria-hidden size={14} />
            </span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <ul className="mt-16 grid gap-x-8 gap-y-14 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <Link href={`/insights/${post.slug}`} className="group block">
                {post.image && (
                  <div className="relative aspect-[3/2] overflow-hidden bg-bg-2">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                )}
                <p className="mt-6 text-[13px] font-medium uppercase tracking-[0.12em] text-accent">{catName(post.category)}</p>
                <h3 className="mt-3 text-[1.45rem] leading-snug tracking-tight group-hover:text-accent">{post.title}</h3>
                <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{post.excerpt}</p>
                <p className="mt-4 text-sm text-muted">
                  <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>. {post.readingMinutes} min de lectura
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
