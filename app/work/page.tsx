import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer, Nav } from "@/components/ds";
import { WorkFromUrl } from "@/components/work/WorkFromUrl";
import { WorkView } from "@/components/work/WorkView";
import { work } from "@/content/work";

export const metadata: Metadata = { title: work.seo.title, description: work.seo.description };

/**
 * /work. The page is prerendered with the unfiltered view (Suspense fallback); on the client the same view
 * re-renders with ?service= / ?view= from the URL, so a shared link opens filtered.
 */
export default function WorkPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-page">
        <Nav />
        <main>
          <Suspense fallback={<WorkView service={null} view="grid" />}>
            <WorkFromUrl />
          </Suspense>
        </main>
      </div>
      <Footer />
    </>
  );
}
