import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function Page() {
  return <StubPage label="Contact" title="Contact" />;
}
