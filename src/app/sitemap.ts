import type { MetadataRoute } from "next";
import { capabilities, cases, insights, site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/nosotros", "/que-hacemos", "/nuestro-modelo", "/clientes", "/casos", "/insights", "/contacto"];

  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...capabilities.map((c) => ({ url: `${site.url}/que-hacemos/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...cases.map((c) => ({ url: `${site.url}/casos/${c.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...insights.map((p) => ({ url: `${site.url}/insights/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
