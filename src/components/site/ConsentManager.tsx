"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  GOOGLE_ADS_ID,
  HAS_AD_TRACKERS,
  META_PIXEL_ID,
  OPEN_EVENT,
  setConsent,
  useConsent,
} from "./consent";

type Trackers = { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };

/**
 * Aviso de cookies publicitarias y carga de Google Ads / Meta Pixel.
 * Los scripts sólo se cargan después de que el visitante acepta.
 */
export function ConsentManager() {
  if (!HAS_AD_TRACKERS) return null;
  return <ConsentManagerInner />;
}

function ConsentManagerInner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  // Vistas de página en navegación interna (la primera la registra cada script al cargar).
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (consent !== "granted") return;
    const w = window as unknown as Trackers;
    w.gtag?.("event", "page_view", { page_path: pathname });
    w.fbq?.("track", "PageView");
  }, [pathname, consent]);

  const choose = (value: "granted" | "denied") => {
    if (value === "denied") {
      // Si los scripts ya estaban cargados, dejan de usar cookies desde ahora.
      const w = window as unknown as Trackers;
      w.gtag?.("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      w.fbq?.("consent", "revoke");
    }
    setConsent(value);
    setReopened(false);
  };

  const showBanner = consent === "unset" || (reopened && consent !== "ssr");

  return (
    <>
      {consent === "granted" && GOOGLE_ADS_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
          <Script id="google-ads" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'denied'});
gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`}
          </Script>
        </>
      )}
      {consent === "granted" && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('consent','grant');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Preferencias de cookies"
          className="tone-ink fixed inset-x-4 bottom-4 z-50 border border-line bg-bg p-6 text-fg shadow-2xl sm:left-6 sm:right-auto sm:max-w-[440px]"
        >
          <p className="text-[15px] leading-relaxed text-muted">
            Usamos cookies técnicas necesarias y, si lo aceptas, cookies de Google y Meta para medir nuestras campañas y mostrarte
            publicidad de Headline. Puedes cambiar tu decisión cuando quieras. Más información en nuestra{" "}
            <Link href="/politica-de-privacidad" className="text-fg underline underline-offset-4 hover:text-accent">
              política de privacidad
            </Link>
            .
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="border border-line px-4 py-3 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors hover:border-fg"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="bg-accent px-4 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-fg hover:text-bg"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Enlace del pie de página para volver a abrir el aviso. */
export function ConsentPreferencesLink({ className }: { className?: string }) {
  if (!HAS_AD_TRACKERS) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Preferencias de cookies
    </button>
  );
}
