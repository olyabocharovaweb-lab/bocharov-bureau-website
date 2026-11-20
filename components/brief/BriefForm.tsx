"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ds";
import { brief, type SentenceLine } from "@/content/brief";
import { cn } from "@/lib/cn";

/**
 * The brief as one sentence — shared by Home (#contact) and /contact. Figma «Sentence form»: desktop Heading/XL lines,
 * gap 12, field gap 16, then «Send the brief» 40 below; mobile Heading/H5 (24), gap 8, field gap 8, shorter copy,
 * button full width 24 below. Copy: content/brief.ts.
 * Field = <input> inside the sentence: same type style, no border / underline / fill / outline;
 * caret text/primary; the period sits right after the field. The visible hint is a text span
 * (text/tertiary) so mobile and desktop can show different wording for one and the same input;
 * an invisible mirror of the typed value sizes the field. Inputs are 24px+ → no iOS zoom on focus.
 * Submission is not wired yet — client-side validation only (native constraints).
 */
export function BriefForm({ className }: { className?: string }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    // TODO: send the brief (endpoint not decided yet).
  };

  return (
    <form onSubmit={onSubmit} className={cn("flex w-full flex-col items-start gap-24 lg:gap-40", className)}>
      <div className="flex w-full flex-col items-start gap-8 lg:gap-12">
        {brief.lines.map((line) => (
          <Line
            key={line.field.name}
            line={line}
            value={values[line.field.name] ?? ""}
            onChange={(v) => setValues((prev) => ({ ...prev, [line.field.name]: v }))}
          />
        ))}
      </div>
      <Button variant="Primary" type="submit" label={brief.cta} className="w-full justify-center lg:w-auto" />
    </form>
  );
}

/** Text that differs between mobile (< 1024) and desktop; the hidden one is display:none (out of the a11y tree). */
function Responsive({ text }: { text: { desktop: string; mobile?: string } }) {
  if (!text.mobile) return <>{text.desktop}</>;
  return (
    <>
      <span className="lg:hidden">{text.mobile}</span>
      <span className="max-lg:hidden">{text.desktop}</span>
    </>
  );
}

function Line({ line, value, onChange }: { line: SentenceLine; value: string; onChange: (v: string) => void }) {
  const id = `brief-${line.field.name}`;
  const hint = line.field.placeholder;
  return (
    <div className="sentence-line flex w-full flex-wrap items-baseline gap-y-8 text-text-primary heading-h5 lg:heading-xl">
      <label htmlFor={id} className="whitespace-nowrap">
        <Responsive text={line.before} />
      </label>
      <span className="flex items-baseline whitespace-nowrap">
        {/* Clicking anywhere on the hint (or the gap before it) focuses the input. */}
        <label htmlFor={id} className="inline-field inline-grid">
          {value ? (
            <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-pre">
              {value}
            </span>
          ) : (
            <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-pre text-text-tertiary">
              <Responsive text={hint} />
            </span>
          )}
          <input
            id={id}
            name={line.field.name}
            type={line.field.type}
            required={line.field.required}
            autoComplete={line.field.autoComplete}
            placeholder={hint.mobile ?? hint.desktop}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            size={1}
            className="col-start-1 row-start-1 w-0 min-w-full heading-h5 lg:heading-xl"
          />
        </label>
        <span aria-hidden="true">{line.after}</span>
      </span>
    </div>
  );
}
