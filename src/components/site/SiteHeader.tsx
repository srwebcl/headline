"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react";
import { CTA, capabilities, nav } from "@/data/content";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Logo() {
  return (
    <Link href="/" aria-label="Headline, inicio" className="relative block h-11 w-[146px] shrink-0">
      <Image src="/brand/headline-color.png" alt="" fill sizes="146px" className="object-contain object-left dark:hidden" preload />
      <Image src="/brand/headline-dark.png" alt="" fill sizes="146px" className="hidden object-contain object-left dark:block" />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Cierra el menú móvil al navegar.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Bloquea el scroll de la página mientras el menú está abierto.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="tone-light sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="wrap flex h-[76px] items-center justify-between gap-8">
        <Logo />

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) =>
              item.href === "/que-hacemos" ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-center gap-1.5 py-6 text-[14px] font-semibold uppercase tracking-[0.05em] text-fg/70 transition-colors hover:text-accent aria-[current=page]:text-fg"
                  >
                    {item.label}
                    <CaretDown size={12} aria-hidden className="transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                  {/* Submenú: aparece con hover o foco dentro del grupo */}
                  <div className="invisible absolute left-1/2 top-full w-[420px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="border border-line bg-bg p-2 shadow-[0_24px_60px_-30px_rgb(24_23_27/0.35)]">
                      {capabilities.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/que-hacemos/${c.slug}`}
                            className="flex items-baseline gap-4 px-4 py-3 text-[15px] text-fg transition-colors hover:bg-bg-2"
                          >
                            <span className="w-6 text-sm font-light text-accent">{c.num}</span>
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="relative py-6 text-[14px] font-semibold uppercase tracking-[0.05em] text-fg/70 transition-colors hover:text-accent aria-[current=page]:text-fg aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:bottom-[20px] aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={CTA.href}
            className="hidden border border-fg px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fg hover:text-bg active:translate-y-px sm:inline-block"
          >
            {CTA.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="-mr-2 flex size-11 items-center justify-center text-fg xl:hidden"
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="tone-light fixed inset-x-0 bottom-0 top-[77px] overflow-y-auto bg-bg xl:hidden"
          >
            <nav aria-label="Menú móvil" className="wrap py-6">
              <ul>
                {nav.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex items-center justify-between py-5 text-2xl font-light text-fg aria-[current=page]:text-accent"
                    >
                      {item.label}
                      <ArrowRight size={18} aria-hidden className="text-muted" />
                    </Link>
                    {item.href === "/que-hacemos" && (
                      <ul className="-mt-2 pb-4">
                        {capabilities.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/que-hacemos/${c.slug}`} className="flex gap-3 py-2 text-[15px] text-muted hover:text-fg">
                              <span className="w-6 text-accent">{c.num}</span>
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <Link
                href={CTA.href}
                className="mt-8 flex items-center justify-between bg-accent px-6 py-5 text-[13px] font-medium uppercase tracking-[0.12em] text-accent-fg"
              >
                {CTA.label}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
