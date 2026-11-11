import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ConsentManager } from "@/components/site/ConsentManager";
import { site } from "@/data/content";
import { OG_DEFAULT, jsonLdScript, organizationJsonLd, pageSeo } from "@/data/seo";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: pageSeo.home.title,
    template: "%s | Headline",
  },
  description: pageSeo.home.description,
  applicationName: "Headline Comunicaciones Estratégicas",
  authors: [{ name: "Headline Comunicaciones Estratégicas", url: site.url }],
  creator: "Headline Comunicaciones Estratégicas",
  publisher: "Headline Comunicaciones Estratégicas",
  category: "Comunicación estratégica y relaciones públicas",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Headline Comunicaciones Estratégicas",
    url: "/",
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    images: [OG_DEFAULT],
  },
  twitter: { card: "summary_large_image", images: [OG_DEFAULT.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/insights/rss.xml", title: "Insights de Headline" }] },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4f2" },
    { media: "(prefers-color-scheme: dark)", color: "#121115" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CL" className={outfit.variable}>
      <body className="tone-paper flex min-h-dvh flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())} />
        <a
          href="#contenido"
          className="sr-only z-50 bg-accent px-4 py-3 text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ConsentManager />
      </body>
    </html>
  );
}
