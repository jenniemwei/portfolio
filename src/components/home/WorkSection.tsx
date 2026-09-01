import { homeProjects } from "@/data/home-projects";
import { CASE_NOTE } from "@/components/case-study/caseStudyStyles";
import gallerySectionStyles from "@/components/gallery/GallerySectionReveal.module.css";
import { PageColumns } from "@/components/layout/PageColumns";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export function WorkSection() {
  return (
    <section id="work" className="w-full py-md">
      <PageColumns>
        <p className={`${CASE_NOTE} m-0 pb-md text-text-subtle`}>
          case studies in progress
        </p>
      </PageColumns>
      <ProjectGallery
        rows={homeProjects.work.rows}
        sizes="(max-width: 1023px) 100vw, 50vw"
        className={gallerySectionStyles.sectionReveal}
      />
    </section>
  );
}
