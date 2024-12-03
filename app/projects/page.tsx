import { getContent } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export default function ProjectsPage() {
  const { metadata } = getContent('projects');
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div data-aos="fade-up">
        <SectionHeader
          title={metadata.title}
          description={metadata.description}
        />
        <ProjectsGrid projects={metadata.projects} />
      </div>
    </div>
  );
}