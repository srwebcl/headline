import type { NextConfig } from "next";
import { insights } from "./src/data/content";

// Migración desde el sitio actual (headline.cl en Wix): las URLs antiguas
// redirigen de forma permanente a su equivalente para conservar el SEO.
const legacyPages: [string, string][] = [
  ["/inicio", "/"],
  ["/inicio/codigo-etica", "/codigo-de-etica"],
  ["/la-agencia", "/nosotros"],
  ["/lo-que-hacemos", "/que-hacemos"],
  ["/nuestros-clientes", "/clientes"],
  ["/casos-de-exito", "/casos"],
  ["/blog", "/insights"],
  // Capacidades renombradas (URLs anteriores del sitio nuevo).
  ["/que-hacemos/gestion-prevencion-riesgos", "/que-hacemos/prevencion-gestion-crisis"],
  ["/que-hacemos/relaciones-institucionales", "/que-hacemos/relaciones-institucionales-grupos-interes"],
];

const legacyPosts = insights.flatMap((post) => {
  if (!post.source) return [];
  const path = new URL(post.source).pathname; // /post/... (puede venir con tildes)
  const decoded = decodeURIComponent(path);
  const encoded = encodeURI(decoded);
  return [...new Set([decoded, encoded])].map((source) => ({ source, destination: `/insights/${post.slug}`, permanent: true }));
});

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    return [
      ...legacyPages.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...legacyPosts,
    ];
  },
};

export default nextConfig;
