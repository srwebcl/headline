"use client";

// Consentimiento de cookies publicitarias (Google Ads y Meta Pixel).
// Los identificadores se configuran con variables de entorno; si no hay ninguno,
// no se muestra el aviso ni se carga ningún script de terceros.

import { useSyncExternalStore } from "react";

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? ""; // AW-XXXXXXXXX
export const GOOGLE_ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? ""; // etiqueta de la conversión "formulario"
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const HAS_AD_TRACKERS = Boolean(GOOGLE_ADS_ID || META_PIXEL_ID);

/** "granted" | "denied" | "unset" (aún no decide) | "ssr" (render en servidor). */
export type ConsentState = "granted" | "denied" | "unset" | "ssr";

const KEY = "hl-consent-ads-v1";
const EVENT = "hl:consent";
export const OPEN_EVENT = "hl:open-consent";

function read(): ConsentState {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

let memory: ConsentState | null = null;

export function setConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Sin almacenamiento (modo privado, bloqueos): la decisión vale sólo para esta visita.
    memory = value;
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(
    subscribe,
    () => memory ?? read(),
    () => "ssr",
  );
}

type Trackers = { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };

/** Registra el envío del formulario como conversión (sólo si hubo consentimiento y los scripts están cargados). */
export function trackLead() {
  const w = window as unknown as Trackers;
  if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL) w.gtag?.("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}` });
  w.fbq?.("track", "Lead");
}
