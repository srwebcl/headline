import type { Metadata } from "next";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: false },
};

// TODO(legal): borrador base. Debe ser revisado y aprobado por asesoría legal antes de publicar.
export default function PrivacidadPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap max-w-[760px]">
        <h1 className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">Política de privacidad</h1>
        <div className="prose-body mt-10 text-lg leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-fg">
          <p>
            Headline Comunicaciones Estratégicas respeta la privacidad de quienes visitan este sitio. Esta política describe qué
            datos recopilamos a través del formulario de contacto y cómo los usamos.
          </p>
          <h2>Datos que recopilamos</h2>
          <p>
            Nombre, empresa u organización, cargo, correo electrónico, teléfono y el contenido del mensaje que nos envías
            voluntariamente.
          </p>
          <h2>Uso de los datos</h2>
          <p>
            Utilizamos esta información únicamente para responder tu consulta y dar seguimiento a la conversación. No vendemos ni
            cedemos tus datos a terceros.
          </p>
          <h2>Tus derechos</h2>
          <p>
            Puedes solicitar el acceso, rectificación o eliminación de tus datos escribiendo a{" "}
            <a href={`mailto:${site.contact.email}`} className="text-fg underline underline-offset-4 hover:text-accent">
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
