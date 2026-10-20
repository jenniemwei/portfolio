import { AboutContent } from "@/components/about/AboutContent";

import { PageColumns } from "@/components/layout/PageColumns";
import { PageSkyBackground } from "@/components/sky/PageSkyBackground";

export default function InfoPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div
        id="home-sky"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[40vh]"
        aria-hidden
      >
        <PageSkyBackground variant="band" />
      </div>

      <main className="relative z-[1] flex min-h-screen w-full flex-col items-center justify-center py-xl">
        <PageColumns centerClassName="flex flex-col gap-12 rounded-3xl px-md sm:px-[3vw]">
          <AboutContent />
        </PageColumns>
      </main>
    </div>
  );
}
