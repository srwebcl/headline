import type { MetadataRoute } from "next";
import { capabilities, insights, site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/nosotros", "/que-hacemos", "/nuestro-modelo", "/clientes", "/casos-de-exito", "/insights", "/contacto", "/codigo-de-etica"];

  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...capabilities.map((c) => ({ url: `${site.url}/que-hacemos/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...insights.map((p) => ({ url: `${site.url}/insights/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
