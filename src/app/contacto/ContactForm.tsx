"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CaretDown, CheckCircle } from "@phosphor-icons/react";
import { sendContact, type ContactState } from "./actions";
import { contactServices } from "@/data/content";

const initial: ContactState = { status: "idle" };

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};

/** Token de reCAPTCHA v3 para la acción "contacto" (vacío si no hay clave o falla la carga). */
function getRecaptchaToken(): Promise<string> {
  const g = (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha;
  if (!SITE_KEY || !g) return Promise.resolve("");
  return new Promise((resolve) => {
    g.ready(() => {
      g.execute(SITE_KEY, { action: "contacto" }).then(resolve, () => resolve(""));
    });
  });
}

const inputCls =
  "mt-2 block w-full border border-line bg-bg px-4 py-3.5 text-[16px] text-fg transition-colors placeholder:text-muted hover:border-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent aria-[invalid=true]:border-[#b42318] dark:aria-[invalid=true]:border-[#f97066]";

function formatChileanPhone(value: string): string {
  const rawDigits = value.replace(/\D/g, "");
  if (!rawDigits) return "";

  // Si el usuario ingresa o pega el código de país 56, lo removemos para formatear uniformemente
  const digits = rawDigits.startsWith("56") ? rawDigits.slice(2) : rawDigits;
  if (!digits) return "+56 ";

  // Formato: +56 9 xxxx xxxx (máximo 9 dígitos nacionales)
  const d0 = digits.slice(0, 1);
  const d1 = digits.slice(1, 5);
  const d2 = digits.slice(5, 9);

  let result = `+56 ${d0}`;
  if (d1) result += ` ${d1}`;
  if (d2) result += ` ${d2}`;
  return result;
}

export function ContactForm() {
  // Momento en que el formulario quedó listo: los envíos casi instantáneos son de bots.
  const readyAt = useRef(0);
  useEffect(() => {
    readyAt.current = Date.now();
  }, []);

  const [state, action, pending] = useActionState(async (prev: ContactState, formData: FormData) => {
    formData.set("t", String(readyAt.current ? Date.now() - readyAt.current : 0));
    formData.set("recaptcha", await getRecaptchaToken());
    return sendContact(prev, formData);
  }, initial);
  const err = state.errors ?? {};
  const val = state.values ?? {};

  // El teléfono es controlado, así que conserva su valor entre envíos con error.
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (!input || input.trim() === "+" || input.trim() === "+56") {
      setPhone("");
      return;
    }
    setPhone(formatChileanPhone(input));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="border border-line bg-bg p-10">
        <CheckCircle size={36} weight="light" className="text-accent" aria-hidden />
        <h2 className="mt-6 text-3xl font-light tracking-tight">Gracias por escribirnos.</h2>
        <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">
          Recibimos tu mensaje. Nuestro equipo lo revisará y te contactará a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      {/* Nombre y apellido */}
      <div>
        <label htmlFor="nombre" className="text-sm font-medium text-fg">
          Nombre y apellido<span className="text-accent"> *</span>
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          autoComplete="name"
          defaultValue={val.nombre}
          aria-invalid={err.nombre ? true : undefined}
          aria-describedby={err.nombre ? "nombre-error" : undefined}
          className={inputCls}
        />
        {err.nombre && (
          <p id="nombre-error" className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
            {err.nombre}
          </p>
        )}
      </div>

      {/* Empresa / Organización */}
      <div>
        <label htmlFor="empresa" className="text-sm font-medium text-fg">
          Empresa / Organización<span className="text-accent"> *</span>
        </label>
        <input
          id="empresa"
          name="empresa"
          type="text"
          required
          autoComplete="organization"
          defaultValue={val.empresa}
          aria-invalid={err.empresa ? true : undefined}
          aria-describedby={err.empresa ? "empresa-error" : undefined}
          className={inputCls}
        />
        {err.empresa && (
          <p id="empresa-error" className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
            {err.empresa}
          </p>
        )}
      </div>

      {/* Cargo (opcional) */}
      <div>
        <label htmlFor="cargo" className="text-sm font-medium text-fg">
          Cargo<span className="text-muted"> (opcional)</span>
        </label>
        <input
          id="cargo"
          name="cargo"
          type="text"
          autoComplete="organization-title"
          defaultValue={val.cargo}
          aria-invalid={err.cargo ? true : undefined}
          aria-describedby={err.cargo ? "cargo-error" : undefined}
          className={inputCls}
        />
        {err.cargo && (
          <p id="cargo-error" className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
            {err.cargo}
          </p>
        )}
      </div>

      {/* Correo electrónico */}
      <div>
        <label htmlFor="email" className="text-sm font-medium text-fg">
          Correo electrónico<span className="text-accent"> *</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={val.email}
          aria-invalid={err.email ? true : undefined}
          aria-describedby={err.email ? "email-error" : undefined}
          className={inputCls}
        />
        {err.email && (
          <p id="email-error" className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
            {err.email}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className="text-sm font-medium text-fg">
          Teléfono<span className="text-accent"> *</span>
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          required
          autoComplete="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="+56 9 1234 5678"
          maxLength={16}
          aria-invalid={err.telefono ? true : undefined}
          aria-describedby={err.telefono ? "telefono-error" : undefined}
          className={inputCls}
        />
        {err.telefono && (
          <p id="telefono-error" className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
            {err.telefono}
          </p>
        )}
      </div>

      {/* Servicio de interés (al lado de Teléfono) */}
      <div>
        <label htmlFor="servicio" className="text-sm font-medium text-fg">
          Servicio de interés<span className="text-accent"> *</span>
        </label>
        <div className="relative">
          <select
            id="servicio"
            name="servicio"
            required
            defaultValue={val.servicio ?? ""}
            aria-invalid={err.servicio ? true : undefined}
            aria-describedby={err.servicio ? "servicio-error" : undefined}
            className={`${inputCls} cursor-pointer appearance-none pr-10`}
          >
            <option value="" disabled>
              Selecciona una opción...
            </option>
            {contactServices.map((opt) => (
              <option key={opt} value={opt} className="bg-bg text-fg">
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-[calc(50%+4px)] -translate-y-1/2 text-muted">
            <CaretDown size={16} weight="bold" />
          </div>
        </div>
        {err.servicio && (
          <p id="servicio-error" className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
            {err.servicio}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div className="sm:col-span-2">
        <label htmlFor="mensaje" className="text-sm font-medium text-fg">
          ¿Cómo podemos ayudarte?<span className="text-accent"> *</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={6}
          required
          defaultValue={val.mensaje}
          aria-invalid={err.mensaje ? true : undefined}
          aria-describedby={err.mensaje ? "mensaje-error" : "mensaje-help"}
          className={`${inputCls} resize-y`}
        />
        {err.mensaje ? (
          <p id="mensaje-error" className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
            {err.mensaje}
          </p>
        ) : (
          <p id="mensaje-help" className="mt-2 text-sm text-muted">
            Cuéntanos el contexto y qué te gustaría lograr.
          </p>
        )}
      </div>

      {/* Aceptación de la política de privacidad */}
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="privacidad"
            value="si"
            required
            defaultChecked={val.privacidad === "si"}
            aria-invalid={err.privacidad ? true : undefined}
            aria-describedby={err.privacidad ? "privacidad-error" : undefined}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-[var(--accent)]"
          />
          <span>
            Acepto que Headline use estos datos para responder mi consulta, según su{" "}
            <Link href="/politica-de-privacidad" className="text-fg underline underline-offset-4 hover:text-accent">
              política de privacidad
            </Link>
            .<span className="text-accent"> *</span>
          </span>
        </label>
        {err.privacidad && (
          <p id="privacidad-error" className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
            {err.privacidad}
          </p>
        )}
      </div>

      {/* Consentimiento opcional para comunicaciones comerciales y publicidad */}
      <div className="-mt-3 sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="marketing"
            value="si"
            defaultChecked={val.marketing === "si"}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-[var(--accent)]"
          />
          <span>
            Quiero recibir novedades e invitaciones de Headline por correo, y acepto que mis datos de contacto se usen para
            mostrarme su publicidad en Google y Meta (opcional).
          </span>
        </label>
      </div>

      {/* Honeypot oculto para bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="sitio_web">No completar</label>
        <input id="sitio_web" name="sitio_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm text-[#b42318] dark:text-[#f97066]">
          {state.status === "error" ? state.message : ""}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 text-[13px] font-medium uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-fg hover:text-bg active:translate-y-px disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Enviar mensaje"}
          {!pending && <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />}
        </button>
      </div>

      {SITE_KEY && (
        <>
          <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`} strategy="afterInteractive" />
          {/* Google permite ocultar el sello flotante si se muestra este aviso. */}
          <p className="text-xs leading-relaxed text-muted sm:col-span-2">
            Este sitio está protegido por reCAPTCHA y se aplican la{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
              política de privacidad
            </a>{" "}
            y los{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">
              términos del servicio
            </a>{" "}
            de Google.
          </p>
        </>
      )}
    </form>
  );
}
