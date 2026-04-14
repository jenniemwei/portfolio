import { Hero } from "@/components/home/Hero";
import { HomeScrollToSection } from "@/components/nav/HomeScrollToSection";
import { SpacerSection } from "@/components/sections/SpacerSection";
import { VisualSection } from "@/components/home/VisualSection";
import { WorkSection } from "@/components/home/WorkSection";
import { Footer } from "@/components/nav/Footer";
import { ProjectPreviewProvider } from "@/components/cards/ProjectPreviewProvider";

export default function HomePage() {
  return (
    <ProjectPreviewProvider>
      <div
        className="flex min-h-screen flex-col items-center"
        data-home-smooth-scroll
      >
        <HomeScrollToSection />
        <main className="flex w-full max-w-[var(--content-max)] flex-col px-[var(--page-gutter)] pb-[var(--home-page-padding-bottom)]">
          <Hero />
          <WorkSection />
          <SpacerSection />
          <VisualSection />
          <SpacerSection />
        </main>
        <Footer />
      </div>
    </ProjectPreviewProvider>
  );
}
