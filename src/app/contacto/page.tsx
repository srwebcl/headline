import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/content";
import { ContactForm } from "./ContactForm";
import { Dot } from "@/components/ui/Dot";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Conversemos sobre el desafío que enfrenta tu organización.",
  alternates: { canonical: "/contacto" },
};

const direct = [
  { label: "Correo", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Teléfono", value: site.contact.phone, href: site.contact.phoneHref },
  { label: "Oficina", value: site.contact.address, href: site.contact.mapsUrl, external: true },
  { label: "LinkedIn", value: "Headline Comunicaciones", href: site.contact.linkedin, external: true },
];

export default function ContactoPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <h1 className="display title-in text-[clamp(2.4rem,4.8vw,4.2rem)]">
            Conversemos sobre el desafío que enfrenta tu <em>organización</em>
            <Dot />
          </h1>
          <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted">
            Cuéntanos qué estás enfrentando. Estaremos encantados de conversar sobre cómo la comunicación puede ayudarte a fortalecer
            tu reputación, posicionar a tus líderes o enfrentar escenarios complejos.
          </p>

          <dl className="mt-14 border-t border-line">
            {direct.map((d) => (
              <div key={d.label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-5">
                <dt className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">{d.label}</dt>
                <dd>
                  <a
                    href={d.href}
                    {...(d.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="inline-flex items-center gap-1.5 text-fg transition-colors hover:text-accent"
                  >
                    {d.value}
                    {d.external && <ArrowUpRight aria-hidden size={13} className="text-muted" />}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="tone-white bg-bg p-6 text-fg sm:p-10 lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
