import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Awards", alternates: { canonical: "/awards" } };

export default function Page() {
  return <StubPage label="Awards" title="Awards" />;
}
