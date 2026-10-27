import type { Metadata } from "next";
import { Dotted } from "@/components/ui/Dot";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Código de ética",
  description: "Principios que orientan el trabajo de Headline con sus clientes, colaboradores y la sociedad.",
  alternates: { canonical: "/codigo-de-etica" },
};

// TODO(contenido): texto provisorio. Reemplazar por el código de ética oficial de Headline.
export default function CodigoEticaPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap max-w-[760px]">
        <h1 className="display title-in text-[clamp(2.2rem,4.4vw,3.6rem)]">
          <Dotted>Código de ética</Dotted>
        </h1>
        <div className="prose-body mt-10 text-lg leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-fg">
          <p>
            En Headline creemos que la comunicación estratégica solo genera valor cuando se basa en la verdad, la transparencia y
            el respeto. Este código reúne los principios que orientan nuestro trabajo con clientes, colaboradores, medios de
            comunicación y la sociedad.
          </p>
          <h2>Integridad y veracidad</h2>
          <p>
            Comunicamos información veraz y verificable. No difundimos contenidos falsos o engañosos ni participamos en acciones
            que busquen desinformar.
          </p>
          <h2>Confidencialidad</h2>
          <p>
            Resguardamos la información de nuestros clientes y la utilizamos únicamente para los fines acordados, incluso después
            de terminada la relación profesional.
          </p>
          <h2>Conflictos de interés</h2>
          <p>
            Declaramos oportunamente cualquier situación que pueda afectar nuestra independencia y no representamos intereses
            contrapuestos sin el conocimiento y la autorización de las partes involucradas.
          </p>
          <h2>Relación con medios y autoridades</h2>
          <p>
            Nos relacionamos con periodistas, autoridades y grupos de interés de manera transparente, respetando su independencia
            y la normativa vigente.
          </p>
          <h2>Respeto e inclusión</h2>
          <p>
            Promovemos un ambiente de trabajo diverso, inclusivo y libre de discriminación, y fomentamos el mismo compromiso en
            los proyectos que desarrollamos.
          </p>
          <h2>Cumplimiento</h2>
          <p>
            Todas las personas que forman parte de Headline conocen y aplican este código. Cualquier consulta o situación que
            pueda contravenirlo puede informarse a{" "}
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
