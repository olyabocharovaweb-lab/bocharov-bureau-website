import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "AI Lab", alternates: { canonical: "/ai-lab" } };

export default function Page() {
  return <StubPage label="AI Lab" title="AI Lab" />;
}
