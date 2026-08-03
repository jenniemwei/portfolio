import { homeProjects } from "@/data/home-projects";
import gallerySectionStyles from "@/components/gallery/GallerySectionReveal.module.css";
import { PageColumns } from "@/components/layout/PageColumns";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export function VisualSection() {
  return (
    <section id="visual" className="w-full py-xl">
      <PageColumns centerClassName="px-md sm:px-[3vw]">
        <div className="layout-fluid pb-md">
          <div className="grid w-full grid-cols-6 gap-x-sm gap-y-sm border-line border-y border-solid py-xl">
            <p className="type-display col-span-6 text-text-default md:col-span-4">
              who also loves visual design...
            </p>
          </div>
        </div>
      </PageColumns>
      <ProjectGallery
        rows={homeProjects.visual.rows}
        gap="sm"
        sizes="(max-width: 1023px) 100vw, 50vw"
        className={gallerySectionStyles.sectionReveal}
      />
    </section>
  );
}
