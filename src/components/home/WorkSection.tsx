import { homeProjects } from "@/data/home-projects";
import gallerySectionStyles from "@/components/gallery/GallerySectionReveal.module.css";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export function WorkSection() {
  return (
    <section id="work" className="w-full py-md">
      <ProjectGallery
        rows={homeProjects.work.rows}
        sizes="(max-width: 1023px) 100vw, 50vw"
        className={gallerySectionStyles.sectionReveal}
      />
    </section>
  );
}
