"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ds";
import { contact, type SentenceLine } from "@/content/home";

/**
 * Figma: Contact form (256:68637) — pt 140, px 40, gap 40; «Sentence form» (256:68639):
 * 3 lines, Heading/XL, gap space/12; each line wraps (flex-wrap, baseline, row gap 8).
 * Field = <input> inside the sentence: same type style, no border / underline / fill /
 * outline; placeholder text/tertiary, value text/primary, caret text/primary; pl space/16;
 * the period sits right after the field. Width follows the placeholder / typed value
 * (an invisible mirror in the same grid cell sizes the input).
 * Submission is not wired yet — client-side validation only (native constraints).
 */
export function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    // TODO: send the brief (endpoint not decided yet).
  };

  return (
    <section id="contact" className="flex w-full flex-col items-start gap-40 px-40 pt-section">
      <h2 className="w-full text-text-primary display-l">{contact.title}</h2>
      <form onSubmit={onSubmit} className="flex w-full flex-col items-start gap-40">
        <div className="flex w-full flex-col items-start gap-12">
          {contact.lines.map((line) => (
            <Line
              key={line.field.name}
              line={line}
              value={values[line.field.name] ?? ""}
              onChange={(v) => setValues((prev) => ({ ...prev, [line.field.name]: v }))}
            />
          ))}
        </div>
        <Button variant="Primary" type="submit" label={contact.cta} />
      </form>
    </section>
  );
}

function Line({ line, value, onChange }: { line: SentenceLine; value: string; onChange: (v: string) => void }) {
  const id = `brief-${line.field.name}`;
  return (
    <div className="sentence-line flex w-full flex-wrap items-baseline gap-y-8 text-text-primary heading-xl">
      <label htmlFor={id} className="whitespace-nowrap">
        {line.before}
      </label>
      <span className="flex items-baseline whitespace-nowrap">
        {/* Clicking anywhere on the hint (or the 16px before it) focuses the input. */}
        <label htmlFor={id} className="inline-field inline-grid pl-16">
          <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-pre">
            {value || line.field.placeholder}
          </span>
          <input
            id={id}
            name={line.field.name}
            type={line.field.type}
            required={line.field.required}
            autoComplete={line.field.autoComplete}
            placeholder={line.field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            size={1}
            className="col-start-1 row-start-1 w-0 min-w-full heading-xl"
          />
        </label>
        <span aria-hidden="true">{line.after}</span>
      </span>
    </div>
  );
}
