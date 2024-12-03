import { getContent } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { EducationGrid } from "@/components/education/education-grid";

export default function EducationPage() {
  const { metadata } = getContent('education');
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div data-aos="fade-up">
        <SectionHeader
          title={metadata.title}
          description={metadata.description}
        />
        <EducationGrid 
          degrees={metadata.degrees} 
          certifications={metadata.certifications}
        />
      </div>
    </div>
  );
}