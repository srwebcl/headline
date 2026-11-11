// Feed RSS del blog: lo usan agregadores, LinkedIn y buscadores para descubrir artículos nuevos.
import { insightCategories, insights, site } from "@/data/content";
import { pageSeo } from "@/data/seo";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);

export function GET() {
  const items = insights
    .map((p) => {
      const url = `${site.url}/insights/${p.slug}`;
      const cat = insightCategories.find((c) => c.slug === p.category)?.name ?? "";
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(cat)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Insights de Headline</title>
    <link>${site.url}/insights</link>
    <atom:link href="${site.url}/insights/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(pageSeo.insights.description)}</description>
    <language>es-CL</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
