import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { CTA, capabilities, nav, site } from "@/data/content";
import { ButtonLink } from "@/components/ui/ButtonLink";

const heading = "text-[12px] font-semibold uppercase tracking-[0.16em] text-accent";
const link = "text-[15px] text-muted transition-colors hover:text-fg";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="tone-ink bg-bg text-fg">
      <div className="wrap grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="md:col-span-2 lg:col-span-4">
          <Image src="/brand/headline-dark.png" alt="Headline Comunicaciones Estratégicas" width={180} height={54} className="h-auto w-[168px]" />
          <p className="mt-8 max-w-[30ch] text-2xl font-extralight leading-snug tracking-tight">{site.tagline}</p>
          <ButtonLink href={CTA.href} className="mt-10">
            {CTA.label}
          </ButtonLink>
        </div>

        {/* Columnas de enlaces con título: sitio, servicios y contacto. */}
        <nav aria-label="Pie de página" className="lg:col-span-2">
          <h2 className={heading}>Headline</h2>
          <ul className="mt-5 space-y-3">
            {[...nav.filter((n) => n.href !== "/"), { label: "Contacto", href: "/contacto" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Servicios" className="lg:col-span-3">
          <h2 className={heading}>Servicios</h2>
          <ul className="mt-5 space-y-3">
            {capabilities.map((c) => (
              <li key={c.slug}>
                <Link href={`/que-hacemos/${c.slug}`} className={`${link} flex gap-3 leading-snug`}>
                  <span className="w-5 shrink-0 text-[13px] font-semibold text-accent">{c.num}</span>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-2 lg:col-span-3 xl:pl-6">
          <h2 className={heading}>Contacto</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={`mailto:${site.contact.email}`} className={link}>
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className={link}>
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={site.contact.mapsUrl} target="_blank" rel="noreferrer" className={`${link} block max-w-[30ch] leading-snug`}>
                {site.contact.address}
              </a>
            </li>
          </ul>
          <ul className="mt-8 flex gap-6 text-[13px] uppercase tracking-[0.1em]">
            <li>
              <a href={site.contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-fg hover:text-accent">
                LinkedIn <ArrowUpRight size={12} aria-hidden />
              </a>
            </li>
            <li>
              <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-fg hover:text-accent">
                Instagram <ArrowUpRight size={12} aria-hidden />
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-3 border-t border-line py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Headline Comunicaciones Estratégicas</p>
          <div className="flex gap-6">
            <Link href="/codigo-de-etica" className="hover:text-fg">
              Código de ética
            </Link>
            <Link href="/politica-de-privacidad" className="hover:text-fg">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
