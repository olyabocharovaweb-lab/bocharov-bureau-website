import { BriefForm } from "@/components/brief/BriefForm";
import { contact } from "@/content/home";

/**
 * Figma: Contact form — desktop 256:68637 (pt 140, px 40, gap 40; title Display/L);
 * mobile 322:6060 (pt 72, px 20, gap 24; title Heading/XL). The form is the shared <BriefForm /> (also on /contact).
 */
export function ContactForm() {
  return (
    <section
      id="contact"
      className="flex w-full flex-col items-start gap-24 px-20 pt-72 md:px-32 lg:gap-40 lg:px-40 lg:pt-section"
    >
      <h2 className="w-full text-text-primary heading-xl lg:display-l">{contact.title}</h2>
      <BriefForm />
    </section>
  );
}
