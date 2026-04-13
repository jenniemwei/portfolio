import { HeroVis } from "@/components/home/HeroVis";
import { SpacerSection } from "@/components/sitewide/SpacerSection";
import { VisualSection } from "@/components/home/VisualSection";
import { WorkSection } from "@/components/home/WorkSection";
import { SiteFooter } from "@/components/sitewide/SiteFooter";

export default function HomePage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center"
      data-home-smooth-scroll
    >
      <main className="flex w-full max-w-[var(--content-max)] flex-col px-[var(--page-gutter)] pb-[var(--home-page-padding-bottom)]">
        <HeroVis />
        <WorkSection />
        <SpacerSection />
        <VisualSection />
        <SpacerSection />
      </main>
      <SiteFooter />
    </div>
  );
}
