import { Footer, Nav } from "@/components/ds";
import { ContactForm } from "@/components/home/ContactForm";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { InNumbers } from "@/components/home/InNumbers";
import { Manifesto } from "@/components/home/Manifesto";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { config, socialLinks } from "@/lib/config";

/** JSON-LD Organization (schema.org) — name, e-mail and social profiles from lib/config.ts. */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: config.name,
  ...(config.contacts.email ? { email: config.contacts.email } : {}),
  sameAs: socialLinks.map((l) => l.href),
};

/** Home — Figma «Homepage — Variant 1b (light)» (256:68176). */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto w-full max-w-page">
        <Nav />
        <main>
          <Hero />
          <Manifesto />
          <Services />
          <InNumbers />
          <SelectedWork />
          <Process />
          <Reviews />
          <Industries />
          <ContactForm />
          <Faq />
        </main>
      </div>
      {/* Footer is full-bleed (its fill spans wider screens); its content stays 1440 inside. */}
      <Footer />
    </>
  );
}
