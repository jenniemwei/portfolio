import { Hero } from "@/components/home/Hero";
import { PageSkyBackground } from "@/components/sky/PageSkyBackground";
import { HomeScrollToSection } from "@/components/nav/HomeScrollToSection";
import { SpacerSection } from "@/components/sections/SpacerSection";
import { WorkSection } from "@/components/home/WorkSection";

export default function HomePage() {
  return (
    <div
      className="relative min-h-screen flex-col items-center justify-start"
      data-home-smooth-scroll
    >
      <div
        id="home-sky"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[40vh] min-h-[400px]"
        aria-hidden
      >
        <PageSkyBackground variant="band" />
      </div>
      <HomeScrollToSection />
      <main className="relative z-[1] w-full flex-col items-center pb-12">
        <Hero />
        <WorkSection />
        <SpacerSection />
      </main>
    </div>
  );
}
