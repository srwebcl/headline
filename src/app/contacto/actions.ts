"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { site, contactServices } from "@/data/content";
import { verifyRecaptcha, isRateLimited, clientIp } from "./security";
import { internalEmail, confirmationEmail, oneLine, type ContactData } from "./emails";

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre y apellido.").max(120, "El nombre es demasiado largo."),
  empresa: z.string().trim().min(2, "Ingresa tu empresa u organización.").max(160, "El nombre de la empresa es demasiado largo."),
  cargo: z.string().trim().max(120, "El cargo es demasiado largo.").optional(),
  email: z.string().trim().max(254).pipe(z.email("Ingresa un correo electrónico válido.")),
  telefono: z
    .string()
    .trim()
    .min(1, "Ingresa tu número de teléfono.")
    .max(20)
    .refine(
      (v) => {
        const digits = v.replace(/\D/g, "");
        return (digits.length === 11 && digits.startsWith("569")) || (digits.length === 9 && digits.startsWith("9"));
      },
      "Ingresa un teléfono válido en formato +56 9 xxxx xxxx."
    ),
  servicio: z.enum(contactServices, "Selecciona un servicio de interés."),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos brevemente tu desafío (mínimo 10 caracteres).")
    .max(4000, "El mensaje puede tener hasta 4.000 caracteres."),
  privacidad: z.literal("si", "Debes aceptar la política de privacidad para enviar el formulario."),
});

type Field = keyof z.infer<typeof schema>;
const FIELDS: Field[] = ["nombre", "empresa", "cargo", "email", "telefono", "servicio", "mensaje", "privacidad"];

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Record<string, string>;
};

// Menos tiempo que esto entre que se carga el formulario y se envía es propio de un bot.
const MIN_FILL_MS = 3000;

const fallback = `No pudimos enviar el formulario en este momento. Escríbenos directamente a ${site.contact.email}.`;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(FIELDS.map((k) => [k, String(formData.get(k) ?? "").slice(0, 5000)]));
  const h = await headers();
  const ip = clientIp(h);

  // Honeypot y envíos instantáneos: se responde "éxito" para no dar pistas al bot.
  if (formData.get("sitio_web")) return { status: "success" };
  if (Number(formData.get("t") ?? 0) < MIN_FILL_MS) return { status: "success" };

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Recibimos varios envíos desde tu conexión. Intenta nuevamente en unos minutos.",
      values: raw,
    };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as Field;
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Revisa los campos marcados.", errors, values: raw };
  }

  const captcha = await verifyRecaptcha(String(formData.get("recaptcha") ?? ""), ip);
  if (!captcha.ok) {
    console.warn("[contacto] reCAPTCHA rechazado:", captcha.reason);
    return {
      status: "error",
      message: captcha.misconfigured
        ? fallback
        : "No pudimos verificar el envío. Recarga la página e intenta nuevamente.",
      values: raw,
    };
  }

  const data: ContactData = { ...parsed.data, cargo: parsed.data.cargo || undefined };
  const meta = {
    fecha: new Intl.DateTimeFormat("es-CL", { dateStyle: "full", timeStyle: "short", timeZone: "America/Santiago" }).format(
      new Date(),
    ),
    ip,
    userAgent: oneLine(h.get("user-agent") ?? "-").slice(0, 300),
    origen: oneLine(h.get("referer") ?? `${site.url}/contacto`).slice(0, 300),
    score: "score" in captcha ? captcha.score : undefined,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin proveedor configurado: en desarrollo se registra; en producción se avisa
    // al visitante para que no crea que su mensaje llegó.
    if (process.env.NODE_ENV !== "production") {
      console.info("[contacto] Mensaje recibido (RESEND_API_KEY no configurada):", data);
      return { status: "success" };
    }
    console.error("[contacto] RESEND_API_KEY no configurada");
    return { status: "error", message: fallback, values: raw };
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "Headline <web@headline.cl>";
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const bcc = (process.env.CONTACT_BCC_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // 1) Notificación a Headline (obligatoria: si falla, el visitante lo sabe).
  const internal = internalEmail(data, meta);
  const sent = await sendEmail(apiKey, {
    from,
    to: [to],
    ...(bcc.length ? { bcc } : {}),
    reply_to: data.email,
    subject: internal.subject,
    html: internal.html,
    text: internal.text,
  });
  if (!sent) return { status: "error", message: fallback, values: raw };

  // 2) Confirmación al visitante (si falla, el contacto igual llegó a Headline).
  const confirmation = confirmationEmail(data);
  await sendEmail(apiKey, {
    from,
    to: [data.email],
    reply_to: to,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
  });

  return { status: "success" };
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error("[contacto] Error al enviar correo:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[contacto] Error al enviar correo:", (e as Error).message);
    return false;
  }
}
