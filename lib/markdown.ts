import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getMarkdownContent(filePath: string) {
  const fullPath = path.join(process.cwd(), 'content', `${filePath}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    metadata: data,
    content,
  };
}