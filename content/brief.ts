/**
 * The brief sentence form — one copy for Home (#contact) and /contact (Figma «Sentence form» 256:68639 /
 * Contact 432:6365; mobile 322:6062 / 432:6538 — the shorter wording).
 */

/** Sentence form (Figma «Sentence form» 256:68639): text before the field, the field, text after. */
export type SentenceLine = {
  /** Text before the field; `mobile` (< 1024, Figma 322:6062) differs where the layout is shorter. */
  before: { desktop: string; mobile?: string };
  field: {
    name: string;
    placeholder: { desktop: string; mobile?: string };
    type: "text" | "email";
    required?: boolean;
    autoComplete?: string;
  };
  after: string;
};

export const brief = {
  lines: [
    {
      before: { desktop: "Hey Bocharov®, I’m", mobile: "Hi, I’m" },
      field: { name: "name", placeholder: { desktop: "your name" }, type: "text", required: true, autoComplete: "name" },
      after: ".",
    },
    {
      before: { desktop: "I need" },
      field: {
        name: "project",
        placeholder: { desktop: "a brand / website / campaign", mobile: "brand / website / ads" },
        type: "text",
      },
      after: ".",
    },
    {
      before: { desktop: "Reach me at" },
      field: { name: "email", placeholder: { desktop: "email" }, type: "email", required: true, autoComplete: "email" },
      after: ".",
    },
  ] as SentenceLine[],
  cta: "Send the brief",
  /** Status line under the button (not in Figma — interim copy) */
  status: {
    sending: "Sending…",
    sent: "Thanks — we’ll reply within 24 hours.",
    mail: "Opening your mail app — just press send.",
    error: "Couldn’t send. Write to us at",
  },
  /** Subject of the fallback mailto: */
  mailSubject: "New brief",
};
