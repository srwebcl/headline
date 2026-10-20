"use server";

import { z } from "zod";
import { site, contactServices } from "@/data/content";

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre y apellido."),
  empresa: z.string().trim().min(2, "Ingresa tu empresa u organización."),
  cargo: z.string().trim().max(120).optional(),
  email: z.string().trim().pipe(z.email("Ingresa un correo electrónico válido.")),
  telefono: z
    .string()
    .trim()
    .min(1, "Ingresa tu número de teléfono.")
    .refine(
      (v) => {
        const digits = v.replace(/\D/g, "");
        return (digits.length === 11 && digits.startsWith("569")) || (digits.length === 9 && digits.startsWith("9"));
      },
      "Ingresa un teléfono válido en formato +56 9 xxxx xxxx."
    ),
  servicio: z.string().trim().min(1, "Selecciona un servicio de interés."),
  mensaje: z.string().trim().min(10, "Cuéntanos brevemente tu desafío (mínimo 10 caracteres).").max(4000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
  values?: Record<string, string>;
};

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(
    ["nombre", "empresa", "cargo", "email", "telefono", "servicio", "mensaje"].map((k) => [k, String(formData.get(k) ?? "")]),
  );

  // Honeypot: los bots suelen completar todos los campos.
  if (formData.get("sitio_web")) return { status: "success" };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Revisa los campos marcados.", errors, values: raw };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;

  if (!apiKey) {
    // Sin proveedor configurado: en desarrollo se registra; en producción se avisa
    // al visitante para que no crea que su mensaje llegó.
    if (process.env.NODE_ENV !== "production") {
      console.info("[contacto] Mensaje recibido (RESEND_API_KEY no configurada):", data);
      return { status: "success" };
    }
    return {
      status: "error",
      message: `No pudimos enviar el formulario en este momento. Escríbenos directamente a ${site.contact.email}.`,
      values: raw,
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sitio Headline <web@headline.cl>",
      to: [to],
      reply_to: data.email,
      subject: `Nuevo contacto web: ${data.nombre} (${data.empresa}) - ${data.servicio}`,
      text: [
        `Nombre: ${data.nombre}`,
        `Empresa: ${data.empresa}`,
        `Cargo: ${data.cargo || "-"}`,
        `Correo: ${data.email}`,
        `Teléfono: ${data.telefono}`,
        `Servicio de interés: ${data.servicio}`,
        "",
        data.mensaje,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[contacto] Error al enviar:", res.status, await res.text());
    return {
      status: "error",
      message: `No pudimos enviar el formulario. Escríbenos directamente a ${site.contact.email}.`,
      values: raw,
    };
  }

  return { status: "success" };
}
