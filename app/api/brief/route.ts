import { config } from "@/lib/config";

/**
 * POST /api/brief — the brief form (Home #contact, /contact) → an e-mail to config.contacts.email.
 * Sends through Resend (https://resend.com) when RESEND_API_KEY is set in the environment (Vercel → Project →
 * Settings → Environment Variables). Optional BRIEF_FROM — a sender on a domain verified in Resend; without it
 * Resend's test sender is used, which can only deliver to the e-mail the Resend account was created with.
 * Without a key it answers 503 { reason: "not-configured" } and the form falls back to a prefilled mailto: link.
 */

type Brief = { name?: unknown; project?: unknown; email?: unknown; website?: unknown };

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

export async function POST(request: Request) {
  let body: Brief;
  try {
    body = (await request.json()) as Brief;
  } catch {
    return Response.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  // Honeypot: a hidden field people never fill in.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 200);
  const project = clean(body.project, 2000);
  const email = clean(body.email, 320);
  if (!name || !isEmail(email)) return Response.json({ ok: false, reason: "invalid" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = config.contacts.email;
  if (!key || !to) return Response.json({ ok: false, reason: "not-configured" }, { status: 503 });

  const text = `Name: ${name}\nNeeds: ${project || "—"}\nE-mail: ${email}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.BRIEF_FROM || "Bocharov Bureau <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New brief — ${name}`,
      text,
      html: `<p><b>Name:</b> ${escape(name)}<br><b>Needs:</b> ${escape(project || "—")}<br><b>E-mail:</b> ${escape(email)}</p>`,
    }),
  });
  if (!res.ok) return Response.json({ ok: false, reason: "send-failed" }, { status: 502 });
  return Response.json({ ok: true });
}
