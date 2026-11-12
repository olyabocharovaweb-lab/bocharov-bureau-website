import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Services", alternates: { canonical: "/services" } };

export default function Page() {
  return <StubPage label="Services" title="Services" />;
}
