import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: about.seo.title,
  description: about.seo.description,
};

export default function Page() {
  return <AboutPage />;
}
