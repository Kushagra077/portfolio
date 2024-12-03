import { getContent } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { ExperienceGrid } from "@/components/experience/experience-grid";

export default function ExperiencePage() {
  const { metadata } = getContent('experience');
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div data-aos="fade-up">
        <SectionHeader
          title={metadata.title}
          description={metadata.description}
        />
        <ExperienceGrid positions={metadata.positions} />
      </div>
    </div>
  );
}