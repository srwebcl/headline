import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { insightCategories, insights, site } from "@/data/content";
import { Dotted } from "@/components/ui/Dot";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
  };
}

const dateFmt = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) notFound();

  const category = insightCategories.find((c) => c.slug === post.category);
  const others = insights.filter((p) => p.slug !== post.slug);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 2);
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${site.url}/insights/${post.slug}`)}`;

  return (
    <>
      <article className="py-16 md:py-24">
        <header className="wrap max-w-[860px]">
          <Link href="/insights" className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] text-muted hover:text-accent">
            <ArrowLeft aria-hidden size={14} /> Insights
          </Link>
          <p className="eyebrow mt-10">{category?.name}</p>
          <h1 className="display title-in mt-4 text-[clamp(2.2rem,4.6vw,4rem)]"><Dotted>{post.title}</Dotted></h1>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 text-sm text-muted">
            <span>
              {post.author}, <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>. {post.readingMinutes} min de lectura
            </span>
            <a href={shareUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-fg hover:text-accent">
              <LinkedinLogo aria-hidden size={18} /> Compartir en LinkedIn
            </a>
          </div>
        </header>
        {post.image && (
          <div className="wrap mt-12 max-w-[860px]">
            {/* Imagen original del artículo, completa y sin recorte (formatos variados). */}
            <Image
              src={post.image}
              alt=""
              width={post.imageSize?.[0] ?? 1800}
              height={post.imageSize?.[1] ?? 1200}
              preload
              sizes="(min-width: 920px) 860px, 100vw"
              className="mx-auto h-auto max-h-[78vh] w-auto max-w-full bg-bg-2 object-contain"
            />
          </div>
        )}
        <div className="wrap mt-14 max-w-[860px] text-lg leading-[1.75] text-fg/90">
          {post.body.map((p) =>
            p.startsWith("## ") ? (
              <h2 key={p} className="mb-4 mt-12 text-[1.6rem] font-normal leading-snug tracking-tight text-fg">
                {p.slice(3)}
              </h2>
            ) : (
              <p key={p} className="mt-6 first:mt-0">
                {p}
              </p>
            ),
          )}
        </div>
      </article>

      {related.length > 0 && (
        <nav aria-label="Más insights" className="border-t border-line">
          <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:py-20">
            {related.map((r) => (
              <Link key={r.slug} href={`/insights/${r.slug}`} className="group block">
                <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-accent">
                  {insightCategories.find((c) => c.slug === r.category)?.name}
                </span>
                <span className="mt-3 block text-[1.5rem] font-light leading-snug tracking-tight group-hover:text-accent">{r.title}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
      <ClosingCta title="Cuéntanos qué desafío enfrenta tu organización." />
    </>
  );
}
