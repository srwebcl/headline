import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ConsentManager } from "@/components/site/ConsentManager";
import { site } from "@/data/content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Headline | Consultoría estratégica en comunicaciones, crisis y reputación",
    template: "%s | Headline",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Headline Comunicaciones Estratégicas",
  },
  alternates: { canonical: "/" },
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
