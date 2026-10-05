"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { sendContact, type ContactState } from "./actions";

const fields = [
  { name: "nombre", label: "Nombre y apellido", required: true, type: "text", autoComplete: "name" },
  { name: "empresa", label: "Empresa / Organización", required: true, type: "text", autoComplete: "organization" },
  { name: "cargo", label: "Cargo", required: false, type: "text", autoComplete: "organization-title" },
  { name: "email", label: "Correo electrónico", required: true, type: "email", autoComplete: "email" },
  { name: "telefono", label: "Teléfono", required: false, type: "tel", autoComplete: "tel" },
] as const;

const initial: ContactState = { status: "idle" };

const inputCls =
  "mt-2 block w-full border border-line bg-bg px-4 py-3.5 text-[16px] text-fg transition-colors placeholder:text-muted hover:border-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent aria-[invalid=true]:border-[#b42318] dark:aria-[invalid=true]:border-[#f97066]";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);

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

  const err = state.errors ?? {};
  const val = state.values ?? {};

  return (
    <form action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="text-sm font-medium text-fg">
            {f.label}
            {f.required ? <span className="text-accent"> *</span> : <span className="text-muted"> (opcional)</span>}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            required={f.required}
            autoComplete={f.autoComplete}
            defaultValue={val[f.name]}
            aria-invalid={err[f.name] ? true : undefined}
            aria-describedby={err[f.name] ? `${f.name}-error` : undefined}
            className={inputCls}
          />
          {err[f.name] && (
            <p id={`${f.name}-error`} className="mt-2 text-sm text-[#b42318] dark:text-[#f97066]">
              {err[f.name]}
            </p>
          )}
        </div>
      ))}

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
    </form>
  );
}
