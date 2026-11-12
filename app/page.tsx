import { BriefForm } from "@/components/home/BriefForm";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { Manifesto } from "@/components/home/Manifesto";
import { Process } from "@/components/home/Process";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const { flags } = siteConfig;
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      {flags.showStats && <Stats />}
      <SelectedWork />
      <Process />
      {flags.showTestimonials && <Testimonials />}
      <Industries />
      <BriefForm />
      <Faq />
    </>
  );
}
