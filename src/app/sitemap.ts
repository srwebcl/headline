import type { MetadataRoute } from "next";
import { capabilities, insights, site } from "@/data/content";

const abs = (path: string) => `${site.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  // Fecha de la última publicación: indica a Google que el home y el blog cambiaron.
  const latest = insights[0]?.updated ?? insights[0]?.date;

  const pages: { path: string; priority: number; lastModified?: string; images?: string[] }[] = [
    { path: "", priority: 1, lastModified: latest, images: [abs("/og/headline.jpg")] },
    { path: "/que-hacemos", priority: 0.9 },
    { path: "/nosotros", priority: 0.8, images: [abs("/team/equipo-headline-grupal.webp")] },
    { path: "/casos-de-exito", priority: 0.8 },
    { path: "/clientes", priority: 0.7 },
    { path: "/nuestro-modelo", priority: 0.7 },
    { path: "/insights", priority: 0.8, lastModified: latest },
    { path: "/contacto", priority: 0.7 },
    { path: "/codigo-de-etica", priority: 0.3 },
  ];

  return [
    ...pages.map((p) => ({
      url: abs(p.path),
      changeFrequency: "monthly" as const,
      priority: p.priority,
      ...(p.lastModified ? { lastModified: p.lastModified } : {}),
      ...(p.images ? { images: p.images } : {}),
    })),
    ...capabilities.map((c) => ({
      url: abs(`/que-hacemos/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [abs(c.image.src)],
    })),
    ...insights.map((p) => ({
      url: abs(`/insights/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      ...(p.image ? { images: [abs(p.image)] } : {}),
    })),
  ];
}
