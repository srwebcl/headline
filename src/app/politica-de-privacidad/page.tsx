import type { Metadata } from "next";
import { site } from "@/data/content";
import { Dotted } from "@/components/ui/Dot";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Headline trata los datos personales que recibe a través de su sitio web, conforme a la Ley N° 19.628 reformada por la Ley N° 21.719.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: false },
};

// Política de tratamiento de datos personales según el art. 14 ter de la Ley N° 19.628
// (reformada por la Ley N° 21.719). Al cambiar su contenido, actualizar VERSION y FECHA.
// Se recomienda validarla con asesoría legal.
const VERSION = "1.0";
const FECHA = "27 de octubre de 2026";

const link = "text-fg underline underline-offset-4 hover:text-accent";

// Cuando se configuren el píxel de Meta o la etiqueta de Google Ads, la sección de
// cookies describe las cookies publicitarias y el aviso de consentimiento.
const hasAdTrackers = Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID);

function Mail() {
  return (
    <a href={`mailto:${site.contact.email}`} className={link}>
      {site.contact.email}
    </a>
  );
}

export default function PrivacidadPage() {
  const { razonSocial, rut, representante } = site.legal;

  return (
    <section className="py-16 md:py-24">
      <div className="wrap max-w-[760px]">
        <h1 className="display title-in text-[clamp(2.2rem,4.4vw,3.6rem)]">
          <Dotted>Política de privacidad</Dotted>
        </h1>
        <p className="mt-6 text-sm uppercase tracking-[0.12em] text-muted">
          Versión {VERSION} · Vigente desde el {FECHA}
        </p>

        <div className="prose-body mt-10 text-lg leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-fg [&_li]:mt-2 [&_strong]:font-medium [&_strong]:text-fg [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul+p]:mt-5">
          <p>
            En Headline Comunicaciones Estratégicas respetamos la privacidad de quienes visitan este sitio. Esta política explica qué
            datos personales tratamos, para qué, con quién los compartimos, cuánto tiempo los conservamos y cómo puedes ejercer tus
            derechos, de acuerdo con la Ley N° 19.628 sobre protección de los datos personales, reformada por la Ley N° 21.719.
          </p>

          <h2>1. Responsable de los datos</h2>
          <ul>
            <li>
              <strong>Responsable:</strong> {razonSocial || "Headline Comunicaciones Estratégicas"}
              {razonSocial && " (Headline Comunicaciones Estratégicas)"}
              {rut && `, RUT ${rut}`}.
            </li>
            {representante && (
              <li>
                <strong>Representante legal:</strong> {representante}.
              </li>
            )}
            <li>
              <strong>Domicilio:</strong> {site.contact.address}, Chile.
            </li>
            <li>
              <strong>Correo para solicitudes sobre datos personales:</strong> <Mail />.
            </li>
            <li>
              <strong>Teléfono:</strong> {site.contact.phone}.
            </li>
          </ul>
          <p>
            Headline no ha designado un delegado de protección de datos ni un encargado de prevención. Cualquier consulta sobre esta
            política se atiende en el correo indicado.
          </p>

          <h2>2. Qué datos tratamos y de quién</h2>
          <p>
            Tratamos datos de las personas que nos escriben a través del formulario de contacto del sitio, en general
            representantes de empresas, instituciones y organizaciones interesadas en nuestros servicios. Los datos son:
          </p>
          <ul>
            <li>
              <strong>Identificación y contacto:</strong> nombre y apellido, empresa u organización, cargo (opcional), correo
              electrónico y teléfono.
            </li>
            <li>
              <strong>Contenido de la consulta:</strong> el servicio de interés y el mensaje que nos envías.
            </li>
            <li>
              <strong>Datos técnicos del envío:</strong> fecha y hora, dirección IP, tipo de navegador, página desde la que se
              envió el formulario y el puntaje de seguridad de reCAPTCHA.
            </li>
            <li>
              <strong>Preferencias:</strong> si aceptaste o no recibir comunicaciones comerciales y publicidad de Headline.
            </li>
          </ul>
          <p>
            No solicitamos datos personales sensibles. Te pedimos no incluirlos en tu mensaje (por ejemplo, información de salud).
          </p>

          <h2>3. De dónde provienen</h2>
          <p>
            Los datos de identificación, contacto y consulta los entregas directamente tú al completar el formulario. Los datos
            técnicos se generan automáticamente al enviarlo. No obtenemos datos de fuentes de acceso público ni de terceros.
          </p>

          <h2>4. Para qué los usamos</h2>
          <ul>
            <li>Responder tu consulta y enviarte la confirmación de que la recibimos.</li>
            <li>Preparar y enviarte una propuesta, si la solicitas, y dar seguimiento a esa conversación.</li>
            <li>Proteger el formulario contra envíos automatizados, spam y abusos.</li>
          </ul>
          <p>Solo si lo autorizas marcando la casilla opcional del formulario, usamos además tu nombre, correo y teléfono para:</p>
          <ul>
            <li>Enviarte por correo novedades, contenidos e invitaciones de Headline.</li>
            <li>
              Mostrarte publicidad de Headline en Google y Meta (Facebook e Instagram). Para esto, cargamos tu correo y teléfono
              cifrados en Google Ads y Meta Ads, que los usan para reconocerte como usuario de sus servicios, mostrarte nuestros
              anuncios o excluirte de ellos, y crear audiencias de personas con intereses similares.
            </li>
          </ul>
          <p>
            Si no marcas esa casilla, solo usamos tus datos para responder tu consulta. No vendemos ni cedemos tus datos.
          </p>

          <h2>5. Base de legitimidad</h2>
          <ul>
            <li>
              <strong>Consentimiento:</strong> al marcar la casilla obligatoria del formulario aceptas que usemos tus datos para
              responder tu consulta y darle seguimiento. El uso para comunicaciones comerciales y publicidad requiere un
              consentimiento separado y opcional. Puedes retirar cualquiera de ellos en cualquier momento escribiendo a <Mail /> o,
              en el caso de los correos, con el enlace para darte de baja que incluye cada envío, sin que ello afecte la licitud del
              tratamiento realizado antes de retirarlo.
            </li>
            <li>
              <strong>Interés legítimo:</strong> tratamos los datos técnicos del envío para mantener la seguridad del sitio y
              evitar el uso abusivo del formulario.
            </li>
          </ul>

          <h2>6. Con quién los compartimos</h2>
          <p>
            Compartimos los datos solo con los siguientes proveedores tecnológicos, y únicamente para las finalidades descritas
            en esta política:
          </p>
          <ul>
            <li>
              <strong>Vercel Inc.</strong> (Estados Unidos): alojamiento del sitio web.
            </li>
            <li>
              <strong>Resend</strong> (Estados Unidos): envío de los correos del formulario.
            </li>
            <li>
              <strong>Google LLC</strong> (Estados Unidos): correo electrónico corporativo de Headline (Google Workspace) y
              verificación de seguridad del formulario (reCAPTCHA) y, si lo autorizaste, publicidad en Google Ads.
            </li>
            <li>
              <strong>Meta Platforms, Inc.</strong> (Estados Unidos): si lo autorizaste, publicidad en Facebook e Instagram (Meta
              Ads).
            </li>
            <li>
              <strong>Plataforma de envío de correos masivos</strong>: si lo autorizaste, envío de novedades e invitaciones.
            </li>
          </ul>
          <p>
            También podremos comunicar datos a autoridades o tribunales cuando una ley o resolución judicial lo exija.
          </p>

          <h2>7. Transferencias internacionales</h2>
          <p>
            Los proveedores indicados almacenan o procesan los datos en Estados Unidos. A la fecha de esta política, la Agencia de
            Protección de Datos Personales no ha determinado si ese país ofrece un nivel adecuado de protección. Por ello, las
            transferencias se amparan en los compromisos contractuales de protección de datos y en las medidas de seguridad que
            cada proveedor ofrece a sus clientes.
          </p>

          <h2>8. Cuánto tiempo los conservamos</h2>
          <p>
            Los datos del formulario se conservan en el correo corporativo de Headline mientras dure la conversación o la relación
            comercial que se origine, y hasta por dos años desde el último contacto. Luego se eliminan, salvo que una obligación
            legal exija conservarlos por más tiempo. Los datos que usamos para comunicaciones comerciales y publicidad se
            conservan hasta que retires tu consentimiento, y en ese momento los quitamos de nuestras listas y audiencias. Si nos pides suprimirlos antes, lo haremos en los plazos que indica la ley.
          </p>

          <h2>9. Seguridad</h2>
          <ul>
            <li>El sitio funciona solo con conexión cifrada (HTTPS).</li>
            <li>
              El sitio no guarda los datos del formulario en una base de datos propia: se envían directamente por correo al equipo
              de Headline.
            </li>
            <li>El formulario cuenta con reCAPTCHA, validación de datos y límites de envío para evitar usos abusivos.</li>
            <li>Solo el equipo de Headline que atiende las consultas tiene acceso a los mensajes recibidos.</li>
            <li>Trabajamos con proveedores que aplican estándares reconocidos de seguridad de la información.</li>
          </ul>

          <h2>10. Decisiones automatizadas</h2>
          <p>
            Para proteger el formulario usamos reCAPTCHA v3 de Google, que analiza de forma automática la interacción con la página
            y le asigna un puntaje de riesgo. Si el puntaje indica un posible envío automatizado, el formulario se rechaza. En ese
            caso puedes escribirnos directamente a <Mail />.
          </p>
          <p>
            Si autorizaste el uso publicitario, Google y Meta deciden de forma automatizada, según sus propias políticas, a quién
            mostrar los anuncios dentro de las audiencias que definimos. Headline no toma otras decisiones automatizadas ni
            elabora perfiles por su cuenta.
          </p>

          <h2>11. Cookies</h2>
          {hasAdTrackers ? (
            <>
              <p>Este sitio usa dos tipos de cookies:</p>
              <ul>
                <li>
                  <strong>Necesarias:</strong> las que usa reCAPTCHA de Google en la página de contacto para la verificación de
                  seguridad. No requieren tu consentimiento.
                </li>
                <li>
                  <strong>Publicitarias:</strong> las de Google Ads y el píxel de Meta, que nos permiten medir los resultados de
                  nuestras campañas (por ejemplo, cuántas personas completan el formulario después de ver un anuncio) y mostrarte
                  publicidad de Headline en Google, Facebook e Instagram. Solo se activan si las aceptas en el aviso de cookies.
                </li>
              </ul>
              <p>
                Puedes cambiar tu decisión en cualquier momento desde el enlace &quot;Preferencias de cookies&quot; al pie de cada
                página. Más información en la{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className={link}>
                  política de publicidad de Google
                </a>{" "}
                y la{" "}
                <a href="https://www.facebook.com/privacy/policies/cookies/" target="_blank" rel="noreferrer" className={link}>
                  política de cookies de Meta
                </a>
                .
              </p>
            </>
          ) : (
            <p>
              Este sitio no usa cookies de analítica ni de publicidad. En la página de contacto, reCAPTCHA de Google puede utilizar
              cookies técnicas necesarias para la verificación de seguridad, sujetas a la{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className={link}>
                política de privacidad de Google
              </a>
              .
            </p>
          )}

          <h2>12. Tus derechos</h2>
          <p>Como titular de los datos, puedes solicitar en cualquier momento:</p>
          <ul>
            <li>
              <strong>Acceso:</strong> saber qué datos tuyos tratamos y cómo.
            </li>
            <li>
              <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
            </li>
            <li>
              <strong>Supresión:</strong> eliminar tus datos.
            </li>
            <li>
              <strong>Oposición:</strong> oponerte a un tratamiento determinado.
            </li>
            <li>
              <strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común.
            </li>
            <li>
              <strong>Bloqueo:</strong> suspender temporalmente el tratamiento mientras se resuelve una solicitud.
            </li>
          </ul>
          <p>
            Para ejercerlos, escribe a <Mail /> indicando tu nombre, el derecho que quieres ejercer y un medio para responderte.
            Podremos pedirte antecedentes que acrediten tu identidad. El trámite es gratuito y responderemos dentro de 30 días
            corridos, plazo que puede extenderse por una vez por igual período, informándote el motivo.
          </p>
          <p>
            Si rechazamos tu solicitud o no respondemos dentro de plazo, puedes reclamar ante la Agencia de Protección de Datos
            Personales.
          </p>

          <h2>13. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política para reflejar cambios legales o en nuestros servicios. Cada versión se publica en
            esta página con su número y fecha de vigencia.
          </p>
        </div>
      </div>
    </section>
  );
}
