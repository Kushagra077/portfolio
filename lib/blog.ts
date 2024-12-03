import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export function getBlogPost(slug: string) {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      metadata: data,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllBlogPosts() {
  const files = fs.readdirSync(blogsDirectory);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(blogsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const slug = file.replace(/\.md$/, '');
      
      return {
        slug,
        ...data,
      };
    })
    .sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}