"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { briefOptions } from "@/config/site";
import { brief } from "@/content/home";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

const fieldWrap =
  "relative inline-grid min-w-0 grid-cols-[minmax(0,auto)] border-b border-ink pb-1.5 leading-[1.2] font-normal focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-ink";
const cell = "col-start-1 row-start-1";
const mirror = "invisible overflow-hidden whitespace-pre";

/** Keeps a field and the punctuation after it on one line; the field may shrink to fit. */
function Slot({ after, children }: { after?: string; children: ReactNode }) {
  return (
    <span className="mx-[0.15em] inline-flex max-w-full items-end align-bottom whitespace-nowrap">
      {children}
      {after && <span className="-mr-[0.15em] ml-[0.15em]">{after}</span>}
    </span>
  );
}

/** Text input that grows with its content, like a word in the sentence. */
function InlineInput({
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  required,
  after,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  after?: string;
}) {
  const [value, setValue] = useState("");
  return (
    <Slot after={after}>
    <span className={fieldWrap}>
      <span aria-hidden className={cn(cell, mirror)}>
        {value || placeholder}
      </span>
      <input
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        size={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          cell,
          "w-full min-w-[2ch] text-ellipsis bg-transparent outline-none placeholder:text-placeholder",
        )}
      />
    </span>
    </Slot>
  );
}

function InlineSelect({
  name,
  label,
  placeholder,
  options,
  after,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  after?: string;
}) {
  const [value, setValue] = useState("");
  return (
    <Slot after={after}>
    <span className={cn(fieldWrap, "grid-cols-[minmax(0,auto)_auto] items-center gap-2")}>
      <span aria-hidden className={cn(cell, mirror)}>
        {value || placeholder}
      </span>
      <select
        name={name}
        aria-label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          cell,
          "w-0 min-w-full cursor-pointer appearance-none bg-transparent outline-none",
          !value && "text-placeholder",
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none col-start-2 row-start-1 text-[0.6em] text-muted">
        ▾
      </span>
    </span>
    </Slot>
  );
}

function Line({ children }: { children: ReactNode }) {
  return <p className="leading-[1.375]">{children}</p>;
}

export function BriefForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="brief" aria-labelledby="brief-title" className="flex scroll-mt-6 flex-col gap-10 px-gutter pt-section">
      <h2 id="brief-title" data-split className="text-h-xl font-semibold tracking-wordmark">
        {brief.title}
      </h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-form font-medium tracking-title">
          <Line>
            Hey Bocharov®, my name is{" "}
            <InlineInput name="name" label="Your name" placeholder="your name" autoComplete="name" required />{" "}
            and
            I’m writing from{" "}
            <InlineInput name="company" label="Company" placeholder="company" autoComplete="organization" after="." />
          </Line>
          <Line>
            I’d like to{" "}
            <InlineInput
              name="goal"
              label="What would you like to do"
              placeholder="build a brand / website / campaign"
              after="."
            />
          </Line>
          <Line>
            My budget is roughly{" "}
            <InlineSelect name="budget" label="Budget" placeholder="€10–25k" options={briefOptions.budget} />{" "}
            and
            I’d like to start{" "}
            <InlineSelect name="start" label="Start date" placeholder="next month" options={briefOptions.start} after="." />
          </Line>
          <Line>
            You can reach me at{" "}
            <InlineInput
              name="email"
              type="email"
              label="Email"
              placeholder="email"
              autoComplete="email"
              required
              after="."
            />{" "}
            Looking forward to it!
          </Line>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Button type="submit" disabled={status === "sending"}>
            {brief.cta}
          </Button>
          <p role="status" aria-live="polite" className="text-small text-muted">
            {status === "sent" && "Thanks — your brief is in. We’ll get back to you shortly."}
            {status === "error" && "Something went wrong. Please try again."}
          </p>
        </div>
      </form>
    </section>
  );
}
