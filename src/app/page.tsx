import { HeroCursorLayer } from "@/components/home/HeroCursorLayer";
import { HeroVis } from "@/components/home/HeroVis";
import { IntroHeader } from "@/components/home/IntroHeader";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SpacerSection } from "@/components/home/SpacerSection";
import { VisualGallery } from "@/components/home/VisualGallery";
import { VisualIntro } from "@/components/home/VisualIntro";
import { WorkGallery } from "@/components/home/WorkGallery";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Nav />
      <main className="flex w-full max-w-[var(--content-max)] flex-col px-[var(--page-gutter)] pb-[var(--home-page-padding-bottom)]">
        <HeroCursorLayer>
          <HeroVis />
        </HeroCursorLayer>
        <IntroHeader />
        <WorkGallery />
        <SpacerSection />
        <VisualIntro />
        <VisualGallery />
        <SpacerSection />
      </main>
      <div className="flex w-full justify-center">
        <SiteFooter />
      </div>
    </div>
  );
}
