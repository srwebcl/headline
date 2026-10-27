// Plantillas de los correos del formulario de contacto (sólo servidor).
import { site } from "@/data/content";

export type ContactData = {
  nombre: string;
  empresa: string;
  cargo?: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
};

export type ContactMeta = { fecha: string; ip: string; userAgent: string; origen: string; score?: number };

const INK = "#18171b";
const LILA = "#8e4a9b";
const MUTED = "#6b6a70";
const LINE = "#e2e3e6";

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Quita saltos de línea para usar el texto en asuntos y cabeceras. */
export function oneLine(s: string): string {
  return s.replace(/[\r\n\t]+/g, " ").trim();
}

function layout(preheader: string, content: string): string {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#f5f4f2;font-family:Helvetica,Arial,sans-serif;color:${INK};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f2;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;">
<tr><td style="background:#ffffff;padding:32px 36px 28px;border-bottom:3px solid ${LILA};">
<img src="${site.url}/brand/headline-email.png" width="220" height="66" alt="Headline Comunicaciones Estratégicas" style="display:block;width:220px;height:auto;border:0;outline:none;text-decoration:none;font-size:18px;font-weight:700;color:${INK};">
</td></tr>
<tr><td style="padding:36px;">${content}</td></tr>
<tr><td style="padding:24px 36px;border-top:1px solid ${LINE};font-size:12px;line-height:1.6;color:${MUTED};">
Headline Comunicaciones Estratégicas<br>${escapeHtml(site.contact.address)}<br>
<a href="mailto:${site.contact.email}" style="color:${LILA};">${site.contact.email}</a> · ${escapeHtml(site.contact.phone)}
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function rows(items: [string, string][]): string {
  return items
    .map(
      ([label, value]) => `<tr>
<td style="padding:12px 16px 12px 0;border-bottom:1px solid ${LINE};font-size:12px;text-transform:uppercase;letter-spacing:1px;color:${MUTED};vertical-align:top;white-space:nowrap;">${label}</td>
<td style="padding:12px 0;border-bottom:1px solid ${LINE};font-size:15px;color:${INK};vertical-align:top;">${value}</td>
</tr>`,
    )
    .join("");
}

/** Correo interno para Headline con todos los datos del contacto. */
export function internalEmail(d: ContactData, meta: ContactMeta) {
  const e = escapeHtml;
  const tel = d.telefono.replace(/[^\d+]/g, "");
  const subject = oneLine(`Nuevo contacto web: ${d.nombre} (${d.empresa}) | ${d.servicio}`).slice(0, 200);

  const html = layout(
    `${d.nombre} de ${d.empresa} escribió desde el sitio web.`,
    `<h1 style="margin:0 0 8px;font-size:24px;font-weight:700;">Nuevo contacto desde el sitio web<span style="color:${LILA};">.</span></h1>
<p style="margin:0 0 28px;font-size:15px;color:${MUTED};">Recibido el ${e(meta.fecha)}. Responde este correo para escribirle directamente.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows([
      ["Nombre", e(d.nombre)],
      ["Empresa", e(d.empresa)],
      ["Cargo", d.cargo ? e(d.cargo) : "-"],
      ["Correo", `<a href="mailto:${e(d.email)}" style="color:${LILA};">${e(d.email)}</a>`],
      ["Teléfono", `<a href="tel:${e(tel)}" style="color:${LILA};">${e(d.telefono)}</a>`],
      ["Servicio", e(d.servicio)],
    ])}</table>
<p style="margin:28px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:${MUTED};">Mensaje</p>
<div style="padding:20px;background:#f5f4f2;border-left:3px solid ${LILA};font-size:15px;line-height:1.6;white-space:pre-wrap;">${e(d.mensaje)}</div>
<p style="margin:28px 0 0;font-size:11px;line-height:1.6;color:${MUTED};">Origen: ${e(meta.origen)} · IP: ${e(meta.ip)}${
      meta.score !== undefined ? ` · reCAPTCHA: ${meta.score}` : ""
    }<br>Navegador: ${e(meta.userAgent)}</p>`,
  );

  const text = [
    "Nuevo contacto desde el sitio web",
    `Recibido el ${meta.fecha}`,
    "",
    `Nombre: ${d.nombre}`,
    `Empresa: ${d.empresa}`,
    `Cargo: ${d.cargo || "-"}`,
    `Correo: ${d.email}`,
    `Teléfono: ${d.telefono}`,
    `Servicio: ${d.servicio}`,
    "",
    "Mensaje:",
    d.mensaje,
    "",
    `Origen: ${meta.origen} | IP: ${meta.ip}${meta.score !== undefined ? ` | reCAPTCHA: ${meta.score}` : ""}`,
  ].join("\n");

  return { subject, html, text };
}

/**
 * Confirmación para quien completó el formulario. No repite el mensaje libre ni otros
 * campos abiertos: así el formulario no puede usarse para enviar texto arbitrario a
 * terceros desde el dominio de Headline.
 */
export function confirmationEmail(d: ContactData) {
  const firstName = oneLine(d.nombre).split(" ")[0].slice(0, 40);
  const subject = "Recibimos tu mensaje | Headline";

  const html = layout(
    "Gracias por escribirnos. Te contactaremos a la brevedad.",
    `<h1 style="margin:0 0 20px;font-size:24px;font-weight:700;">Hola ${escapeHtml(firstName)}, gracias por escribirnos<span style="color:${LILA};">.</span></h1>
<p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Recibimos tu mensaje sobre <strong>${escapeHtml(d.servicio)}</strong>. Nuestro equipo lo revisará y te contactará a la brevedad.</p>
<p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Si necesitas agregar información, responde este correo o escríbenos a <a href="mailto:${site.contact.email}" style="color:${LILA};">${site.contact.email}</a>.</p>
<p style="margin:28px 0 0;font-size:16px;line-height:1.6;">Saludos,<br><strong>Equipo Headline</strong></p>
<p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:${MUTED};">Recibes este correo porque completaste el formulario de contacto en ${escapeHtml(site.url.replace(/^https?:\/\//, ""))}. Si no fuiste tú, puedes ignorarlo.</p>`,
  );

  const text = [
    `Hola ${firstName}, gracias por escribirnos.`,
    "",
    `Recibimos tu mensaje sobre ${d.servicio}. Nuestro equipo lo revisará y te contactará a la brevedad.`,
    `Si necesitas agregar información, responde este correo o escríbenos a ${site.contact.email}.`,
    "",
    "Saludos,",
    "Equipo Headline",
  ].join("\n");

  return { subject, html, text };
}
