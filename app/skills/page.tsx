import { getContent } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { SkillsGrid } from "@/components/skills/skills-grid";

export default function SkillsPage() {
  const { metadata } = getContent('skills');
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div data-aos="fade-up">
        <SectionHeader
          title={metadata.title}
          description={metadata.description}
        />
        <SkillsGrid categories={metadata.categories} />
      </div>
    </div>
  );
}