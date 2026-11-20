import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { contactPage } from "@/content/contact";

export const metadata: Metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
};

export default function Page() {
  return <ContactPage />;
}
