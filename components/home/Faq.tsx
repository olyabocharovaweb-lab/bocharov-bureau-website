import { faq } from "@/content/home";

/**
 * Figma: FAQ (256:68670) — pt 140, px 40; list pt 40; item border-t default, py 28, gap 12.
 * Static: first two items open (—), last two closed (+), exactly as in the layout.
 */
export function Faq() {
  return (
    <section className="flex w-full flex-col items-start px-40 pt-section">
      <h2 className="whitespace-nowrap text-text-primary numeral-l">{faq.title}</h2>
      <div className="flex w-full flex-col items-start pt-40">
        {faq.items.map((item) => (
          <div key={item.q} className="flex w-full flex-col items-start gap-12 border-t border-border-default py-28">
            <div className="flex w-full items-start justify-between whitespace-nowrap text-text-primary">
              <h3 className="heading-h5">{item.q}</h3>
              <p className="body-xl" aria-hidden="true">
                {item.a ? "—" : "+"}
              </p>
            </div>
            {item.a && <p className="w-full text-text-secondary body-m-small">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
