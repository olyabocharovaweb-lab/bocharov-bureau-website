import { NextResponse } from "next/server";

type Brief = {
  name?: string;
  company?: string;
  goal?: string;
  budget?: string;
  start?: string;
  email?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Brief form endpoint — placeholder.
 * TODO: forward to the real destination (CRM / e-mail provider). See README → "Open items".
 */
export async function POST(request: Request) {
  let body: Brief;
  try {
    body = (await request.json()) as Brief;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  return NextResponse.json({ ok: true });
}
