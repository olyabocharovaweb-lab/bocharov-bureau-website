/**
 * Site-wide settings — the one place for contacts, social links and booking targets. Components read from here;
 * nothing is hard-coded in JSX. An empty `href` / `value` is not rendered, so a network can be added or removed
 * here without touching components.
 */

export type SiteLink = { label: string; href: string };

export const config = {
  name: "Bocharov Bureau",
  /** «Book a 30-min call» / «Book a call» target — a booking page (e.g. Cal.com) once there is one; until then the Home form. */
  BOOKING_URL: "/#contact",
  /** «Start a project» → the Home contact form */
  CONTACT_URL: "/#contact",

  contacts: {
    email: "olyabocharovaweb@gmail.com",
    /** Shown as «WhatsApp +380 73 721 83 82»; the link uses the digits only */
    whatsapp: "+380 73 721 83 82",
  },

  /** Footer «Social» column, in this order */
  social: [
    { label: "Behance", href: "https://www.behance.net/OlyaBocharova" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/olha-bocharovaui/" },
    { label: "Dribbble", href: "https://dribbble.com/olhabocharova" },
  ] satisfies SiteLink[],
} as const;

/** mailto: link for the e-mail, empty when there is no e-mail */
export const emailHref = (email: string) => (email ? `mailto:${email}` : "");

/** https://wa.me/<digits>, empty when there is no number */
export const whatsappHref = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
};

/** Footer «Contact» column: e-mail, then WhatsApp; entries without a value are dropped */
export const contactLinks: SiteLink[] = [
  { label: config.contacts.email, href: emailHref(config.contacts.email) },
  {
    label: config.contacts.whatsapp ? `WhatsApp ${config.contacts.whatsapp}` : "",
    href: whatsappHref(config.contacts.whatsapp),
  },
].filter((l) => l.label && l.href);

/** Social links with both a label and a URL */
export const socialLinks: SiteLink[] = config.social.filter((l) => l.label && l.href);

/** External links open in a new tab; mailto: and internal paths don't */
export const isExternal = (href: string) => /^https?:/.test(href);
