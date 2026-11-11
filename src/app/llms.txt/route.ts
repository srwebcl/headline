// /llms.txt: resumen del sitio en Markdown para asistentes de IA (estándar llmstxt.org).
// Se genera desde el contenido del sitio, así que se actualiza solo con cada publicación.
import { capabilities, cases, industries, insights, leadership, recognitions, site } from "@/data/content";
import { orgDescription } from "@/data/seo";

export const dynamic = "force-static";

const dateFmt = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function GET() {
  const u = (path: string) => `${site.url}${path}`;
  const lines = [
    "# Headline Comunicaciones Estratégicas",
    "",
    `> ${orgDescription}`,
    "",
    "## Datos de la organización",
    "",
    `- Razón social: ${site.legal.razonSocial} (RUT ${site.legal.rut})`,
    "- Tipo: consultora de comunicación estratégica y relaciones públicas (agencia de comunicaciones)",
    "- Fundada en: 2003",
    `- Dirección: ${site.contact.address}, Chile`,
    `- Correo: ${site.contact.email}`,
    `- Teléfono: ${site.contact.phone}`,
    `- LinkedIn: ${site.contact.linkedin}`,
    `- Liderazgo: ${leadership.map((p) => `${p.name} (${p.role})`).join("; ")}`,
    `- Reconocimientos: ${recognitions.map((r) => `${r.name}, ${r.period}`).join("; ")}`,
    `- Industrias: ${industries.map((i) => i.name).join("; ")}`,
    "",
    "## Servicios",
    "",
    ...capabilities.map((c) => `- [${c.name}](${u(`/que-hacemos/${c.slug}`)}): ${c.summary}`),
    "",
    "## Páginas principales",
    "",
    `- [Nosotros](${u("/nosotros")}): equipo, trayectoria y reconocimientos.`,
    `- [Nuestro modelo](${u("/nuestro-modelo")}): modelo Vector Headline (escuchar, planificar, visibilizar y evaluar).`,
    `- [Casos de éxito](${u("/casos-de-exito")}): ${cases.length} casos de comunicación estratégica, asuntos públicos y gestión de crisis.`,
    `- [Clientes](${u("/clientes")}): empresas y organizaciones que han trabajado con Headline.`,
    `- [Contacto](${u("/contacto")}): formulario y datos de contacto.`,
    "",
    "## Casos de éxito",
    "",
    ...cases.map((c) => `- ${c.client}${c.title ? `, ${c.title}` : ""} (${c.area}): ${c.body[0]}`),
    "",
    "## Artículos (Insights)",
    "",
    ...insights.map((p) => `- [${p.title}](${u(`/insights/${p.slug}`)}) (${dateFmt.format(new Date(p.date))}): ${p.excerpt}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
