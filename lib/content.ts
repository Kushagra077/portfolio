import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContent(section: string) {
  const fullPath = path.join(contentDirectory, `${section}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    metadata: data,
    content,
  };
}

export function getAllContent(section: string) {
  const sectionDirectory = path.join(contentDirectory, section);
  const files = fs.readdirSync(sectionDirectory);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(sectionDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        ...data,
        content,
        slug: file.replace(/\.md$/, ''),
      };
    });
}