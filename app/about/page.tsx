import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };

export default function Page() {
  return <StubPage label="About" title="About" />;
}
