import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Journal", alternates: { canonical: "/journal" } };

export default function Page() {
  return <StubPage label="Journal" title="Journal" />;
}
