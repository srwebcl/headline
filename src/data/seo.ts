// SEO y GEO (buscadores con IA): títulos, descripciones y datos estructurados (schema.org).
// Las búsquedas objetivo se usan de forma natural en títulos, descripciones y en la
// descripción de la organización; no se repiten artificialmente en el contenido visible.
import type { Metadata } from "next";
import { capabilities, insightCategories, leadership, recognitions, site, type Capability, type Insight } from "./content";

export const searchTargets = [
  "consultora de comunicaciones",
  "consultora de comunicación estratégica",
  "agencia de comunicaciones",
  "agencia de comunicación estratégica",
  "agencia de relaciones públicas",
];

/** Descripción de la organización para buscadores e IA (schema.org, llms.txt). */
export const orgDescription =
  "Headline es una consultora de comunicación estratégica y agencia de relaciones públicas con sede en Santiago de Chile. " +
  "Desde 2003 asesora a empresas nacionales y multinacionales en reputación corporativa, gestión de crisis, asuntos públicos, " +
  "relaciones institucionales, comunicación interna y vocerías, con especial experiencia en industrias reguladas como salud, " +
  "minería, energía y tecnología.";

/** Títulos y descripciones por página (el layout agrega " | Headline" al título). */
export const pageSeo = {
  home: {
    title: "Headline | Consultora de comunicación estratégica en Chile",
    description:
      "Consultora de comunicación estratégica y relaciones públicas en Chile. Desde 2003 en reputación corporativa, gestión de crisis, asuntos públicos y vocerías.",
  },
  queHacemos: {
    title: "Servicios de comunicación estratégica",
    description:
      "Servicios de nuestra consultora de comunicaciones: reputación corporativa, gestión de crisis, relaciones institucionales, comunicación interna y vocerías.",
  },
  nosotros: {
    title: "Nosotros: consultora de comunicaciones desde 2003",
    description:
      "Headline es una consultora de comunicación estratégica chilena fundada en 2003. Conoce al equipo que integra las comunicaciones al negocio de sus clientes.",
  },
  modelo: {
    title: "Modelo de comunicación estratégica Vector Headline",
    description:
      "Escuchar, planificar, visibilizar y evaluar: el modelo con que nuestra consultora de comunicaciones entiende el contexto y convierte la estrategia en resultados.",
  },
  clientes: {
    title: "Clientes de nuestra consultora de comunicaciones",
    description:
      "Empresas de salud, minería, energía, tecnología, construcción, servicios y consumo que confían en Headline para su comunicación estratégica en Chile.",
  },
  casos: {
    title: "Casos de éxito en comunicación estratégica",
    description:
      "Casos reales de comunicación estratégica, asuntos públicos, gestión de crisis y relaciones públicas: Laboratorio Chile, Scania, Abbott, CSL Behring y más.",
  },
  insights: {
    title: "Blog de comunicación estratégica y reputación",
    description:
      "Análisis y tendencias sobre comunicación estratégica, reputación corporativa, gestión de crisis, relaciones públicas y liderazgo, por el equipo de Headline.",
  },
  contacto: {
    title: "Contacto: consultora de comunicaciones en Santiago",
    description:
      "Conversemos sobre el desafío de tu organización. Headline, consultora de comunicación estratégica y relaciones públicas en Las Condes, Santiago de Chile.",
  },
};

export const OG_DEFAULT = { url: "/og/headline.jpg", width: 1200, height: 630, alt: "Headline, consultora de comunicación estratégica en Chile" };

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** true = el título ya trae la marca y no se le agrega " | Headline". */
  absoluteTitle?: boolean;
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
};

/**
 * Metadata completa de una página. Open Graph se arma completo en cada página porque
 * Next.js no combina el openGraph del layout con el de la página: lo reemplaza.
 */
export function pageMetadata(m: PageMetaInput): Metadata {
  const image = m.image ?? OG_DEFAULT;
  const fullTitle = m.absoluteTitle ? m.title : `${m.title} | Headline`;
  return {
    title: m.absoluteTitle ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: { canonical: m.path },
    openGraph: {
      type: m.type ?? "website",
      locale: "es_CL",
      siteName: "Headline Comunicaciones Estratégicas",
      url: m.path,
      title: fullTitle,
      description: m.description,
      images: [image],
      ...(m.type === "article"
        ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime, section: m.section, tags: m.tags, authors: ["Headline Comunicaciones"] }
        : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: m.description, images: [image.url] },
  };
}

const ORG_ID = `${site.url}/#organizacion`;
const WEBSITE_ID = `${site.url}/#sitio`;
const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

/** Recorta un texto a ~160 caracteres sin cortar palabras (para meta descriptions). */
export function metaDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

/** Organización (ProfessionalService) y sitio web: van en todas las páginas. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: "Headline Comunicaciones Estratégicas",
        legalName: site.legal.razonSocial,
        alternateName: ["Headline", "Headline Comunicaciones"],
        taxID: site.legal.rut,
        url: site.url,
        logo: { "@type": "ImageObject", url: abs("/brand/headline-email.png"), width: 440, height: 132 },
        image: abs(OG_DEFAULT.url),
        description: orgDescription,
        slogan: site.tagline,
        foundingDate: "2003",
        email: site.contact.email,
        telephone: site.contact.phoneHref.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: "San Sebastián 2807, oficina 915",
          addressLocality: "Las Condes",
          addressRegion: "Región Metropolitana",
          addressCountry: "CL",
        },
        hasMap: site.contact.mapsUrl,
        areaServed: { "@type": "Country", name: "Chile" },
        sameAs: [site.contact.linkedin, site.contact.instagram],
        founder: { "@type": "Person", name: leadership[0]?.name },
        employee: leadership.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })),
        knowsAbout: [
          "Comunicación estratégica",
          "Relaciones públicas",
          "Reputación corporativa",
          "Gestión de crisis",
          "Asuntos públicos",
          "Relaciones institucionales",
          "Comunicación interna",
          "Vocerías y media training",
          "Relación con medios de comunicación",
          "Comunicación en salud",
        ],
        award: recognitions.map((r) => `${r.name} (${r.period})`),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de comunicación estratégica",
          itemListElement: capabilities.map((c) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: c.name, url: abs(`/que-hacemos/${c.slug}`) },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: "Headline Comunicaciones Estratégicas",
        inLanguage: "es-CL",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path === "/" ? "" : c.path),
    })),
  };
}

export function serviceJsonLd(c: Capability) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`/que-hacemos/${c.slug}#servicio`),
    name: c.name,
    serviceType: c.name,
    description: c.summary,
    url: abs(`/que-hacemos/${c.slug}`),
    image: abs(c.image.src),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Chile" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Soluciones de ${c.name.toLowerCase()}`,
      itemListElement: c.items.map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item } })),
    },
  };
}

export function articleJsonLd(post: Insight) {
  const url = abs(`/insights/${post.slug}`);
  const words = post.body.join(" ").split(/\s+/).length;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#articulo`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    ...(post.image ? { image: [abs(post.image)] } : {}),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "es-CL",
    articleSection: insightCategories.find((c) => c.slug === post.category)?.name,
    ...(post.keywords?.length ? { keywords: post.keywords.join(", ") } : {}),
    wordCount: words,
    timeRequired: `PT${post.readingMinutes}M`,
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function blogJsonLd(posts: Insight[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": abs("/insights#blog"),
    url: abs("/insights"),
    name: "Insights de Headline",
    description: pageSeo.insights.description,
    inLanguage: "es-CL",
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: abs(`/insights/${p.slug}`),
      datePublished: p.date,
    })),
  };
}

/** Renderiza un bloque JSON-LD (escapa "<" para evitar inyección de HTML). */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
