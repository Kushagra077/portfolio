import { getContent } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { PublicationsGrid } from "@/components/publications/publications-grid";

export default function PublicationsPage() {
  const { metadata } = getContent('publications');
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div data-aos="fade-up">
        <SectionHeader
          title={metadata.title}
          description={metadata.description}
        />
        <PublicationsGrid publications={metadata.publications} />
      </div>
    </div>
  );
}