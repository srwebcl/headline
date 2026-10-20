"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
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
  // Submenú de escritorio: se fuerza cerrado tras hacer clic en un enlace, hasta que el cursor salga.
  const [subClosed, setSubClosed] = useState(false);
  // true sólo en el cliente (el portal necesita document.body); sin efectos ni renders extra.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Cierra el menú móvil al navegar.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Menú móvil abierto: bloquea el scroll de la página y cierra con Escape.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Al navegar desde el submenú: quita el foco (que lo mantenía abierto) y lo oculta.
  const closeSub = () => {
    setSubClosed(true);
    (document.activeElement as HTMLElement | null)?.blur();
  };
  const closeMobile = () => setOpen(false);

  return (
    <header className="tone-light sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="wrap flex h-[76px] items-center justify-between gap-8">
        <Logo />

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-5 2xl:gap-7">
            {nav.map((item) =>
              item.href === "/que-hacemos" ? (
                <li key={item.href} className="group relative" onMouseLeave={() => setSubClosed(false)}>
                  <Link
                    href={item.href}
                    onClick={closeSub}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-center gap-1.5 py-6 text-[13px] font-semibold uppercase tracking-[0.04em] 2xl:text-[14px] 2xl:tracking-[0.05em] text-fg/70 transition-colors hover:text-accent aria-[current=page]:text-fg"
                  >
                    {item.label}
                    <CaretDown size={12} aria-hidden className="transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                  {/* Submenú: aparece con hover o foco dentro del grupo; se oculta al elegir una opción. */}
                  <div
                    data-closed={subClosed || undefined}
                    className="invisible absolute data-[closed]:!invisible data-[closed]:!translate-y-2 data-[closed]:!opacity-0 left-1/2 top-full w-[420px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <ul className="border border-line bg-bg p-2 shadow-[0_24px_60px_-30px_rgb(24_23_27/0.35)]">
                      {capabilities.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/que-hacemos/${c.slug}`}
                            onClick={closeSub}
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
                    className="relative py-6 text-[13px] font-semibold uppercase tracking-[0.04em] 2xl:text-[14px] 2xl:tracking-[0.05em] text-fg/70 transition-colors hover:text-accent aria-[current=page]:text-fg aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:bottom-[20px] aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-accent"
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

      {/* Menú móvil a pantalla completa. Va en un portal: el header tiene backdrop-blur, que convertiría
          el "fixed" en relativo al header en vez de a la pantalla. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="menu-movil"
                role="dialog"
                aria-modal="true"
                aria-label="Menú"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="tone-light fixed inset-0 z-50 flex h-dvh flex-col bg-bg text-fg xl:hidden"
              >
                <div className="wrap flex h-[76px] shrink-0 items-center justify-between border-b border-line">
                  <Link href="/" onClick={closeMobile} aria-label="Headline, inicio" className="relative block h-11 w-[146px]">
                    <Image src="/brand/headline-color.png" alt="" fill sizes="146px" className="object-contain object-left dark:hidden" />
                    <Image src="/brand/headline-dark.png" alt="" fill sizes="146px" className="hidden object-contain object-left dark:block" />
                  </Link>
                  <button
                    type="button"
                    onClick={closeMobile}
                    aria-label="Cerrar menú"
                    className="-mr-2 flex size-11 items-center justify-center text-fg"
                  >
                    <X size={26} />
                  </button>
                </div>

                <nav aria-label="Menú móvil" className="wrap flex-1 overflow-y-auto overscroll-contain py-4">
                  <motion.ul
                    initial={reduce ? false : "hidden"}
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                  >
                    {nav.map((item) => (
                      <motion.li
                        key={item.href}
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-line"
                      >
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          aria-current={isActive(pathname, item.href) ? "page" : undefined}
                          className="flex items-center justify-between py-4 text-[1.6rem] font-light text-fg aria-[current=page]:text-accent"
                        >
                          {item.label}
                          <ArrowRight size={18} aria-hidden className="text-muted" />
                        </Link>
                        {item.href === "/que-hacemos" && (
                          <ul className="-mt-1 pb-3">
                            {capabilities.map((c) => (
                              <li key={c.slug}>
                                <Link
                                  href={`/que-hacemos/${c.slug}`}
                                  onClick={closeMobile}
                                  aria-current={pathname === `/que-hacemos/${c.slug}` ? "page" : undefined}
                                  className="flex gap-3 py-2.5 text-[15px] leading-snug text-muted hover:text-fg aria-[current=page]:text-accent"
                                >
                                  <span className="w-6 shrink-0 font-semibold text-accent">{c.num}</span>
                                  {c.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>
                </nav>

                <div className="wrap shrink-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
                  <Link
                    href={CTA.href}
                    onClick={closeMobile}
                    className="flex items-center justify-between bg-accent px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-fg"
                  >
                    {CTA.label}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
