import { Hero } from "@/components/home/Hero";
import { HomeScrollToSection } from "@/components/nav/HomeScrollToSection";
import { SpacerSection } from "@/components/sections/SpacerSection";
import { VisualSection } from "@/components/home/VisualSection";
import { WorkSection } from "@/components/home/WorkSection";
import { Footer } from "@/components/nav/Footer";

export default function HomePage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      data-home-smooth-scroll
    >
      <HomeScrollToSection />
      <main className="flex w-full flex-col items-center pb-48 w-[100vw]max-w-page-lg">
        <Hero />
        <WorkSection />
        <SpacerSection />
        <VisualSection />
        <SpacerSection />
      </main>
      <Footer />
    </div>
  );
}
