import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { CTA, capabilities, nav, site } from "@/data/content";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="tone-ink bg-bg text-fg">
      <div className="wrap grid gap-14 py-20 md:grid-cols-12 md:gap-8 lg:py-24">
        <div className="md:col-span-5">
          <Image src="/brand/headline-dark.png" alt="Headline Comunicaciones Estratégicas" width={180} height={54} className="h-auto w-[168px]" />
          <p className="mt-8 max-w-[34ch] text-2xl font-extralight leading-snug tracking-tight">{site.tagline}</p>
          <ButtonLink href={CTA.href} className="mt-10">
            {CTA.label}
          </ButtonLink>
        </div>

        <nav aria-label="Pie de página" className="md:col-span-3 md:col-start-7">
          <ul className="space-y-3">
            {[...nav, { label: "Contacto", href: "/contacto" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[15px] text-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 space-y-2 border-t border-line pt-6">
            {capabilities.map((c) => (
              <li key={c.slug}>
                <Link href={`/que-hacemos/${c.slug}`} className="text-[13px] text-muted transition-colors hover:text-fg">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-3">
          <ul className="space-y-3 text-[15px] text-muted">
            <li>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-fg">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="transition-colors hover:text-fg">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={site.contact.mapsUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
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
          <Link href="/politica-de-privacidad" className="hover:text-fg">
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
