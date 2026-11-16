import { Button } from "@/components/ds";
import { contact } from "@/content/home";

/**
 * Figma: Contact form (256:68637) — pt 140, px 40, gap 40.
 * Iteration 1: static picture of the sentence form (fields are not interactive yet).
 * Rows: flex-wrap, gap 8 / 12, items-end; text Heading/H2, fields Statement/L tertiary + 1px border/inverse, pb 6.
 * Figma keeps a text box's leading space but drops trailing spaces from its hug width,
 * so trailing spaces are trimmed and a leading space is kept as a no-break space.
 */
function segment(text: string) {
  return text.trimEnd().replace(/^ /, "\u00a0");
}
export function ContactForm() {
  return (
    <section className="flex w-full flex-col items-start gap-40 px-40 pt-section">
      <h2 className="w-full text-text-primary display-l">{contact.title}</h2>
      <div className="flex w-full flex-col items-start gap-8">
        {contact.rows.map((row, i) => (
          <div key={i} className="flex w-full flex-wrap content-end items-end gap-x-12 gap-y-8">
            {row.map((part, j) =>
              "text" in part ? (
                <p key={j} className="whitespace-nowrap text-text-primary heading-h2">
                  {segment(part.text)}
                </p>
              ) : (
                <div key={j} className="flex items-center gap-8 border-b border-border-inverse pb-6">
                  <span className="whitespace-nowrap text-text-tertiary statement-l">{part.field}</span>
                  {part.dropdown && (
                    <span className="text-text-secondary body-xl" aria-hidden="true">
                      ▾
                    </span>
                  )}
                </div>
              ),
            )}
          </div>
        ))}
      </div>
      <Button variant="Primary" label={contact.cta} />
    </section>
  );
}
