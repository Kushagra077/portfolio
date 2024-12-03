import { getMarkdownContent } from "@/lib/markdown";
import { SectionHeader } from "@/components/section-header";
import { MarkdownContent } from "@/components/markdown-content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ResumePage() {
  const { metadata, content } = getMarkdownContent('resume');

  return (
    <div className="container px-4 py-8 mx-auto">
      <div data-aos="fade-up">
        <SectionHeader
          title={metadata.title as string}
          description={metadata.description as string}
        />
        
        <div className="mb-8 flex justify-center">
          <Button size="lg" className="group" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </Button>
        </div>

        <Card className="p-6 md:p-8">
          <MarkdownContent content={content} />
        </Card>
      </div>
    </div>
  );
}