import { LucideIcon } from 'lucide-react';

export type SocialPlatform = 
  | 'GitHub'
  | 'LinkedIn'
  | 'Email'
  | 'Kaggle'
  | 'HuggingFace'
  | 'GoogleScholar'
  | 'ORCID'
  | 'Website';

export type ExpertiseIcon = 'Brain' | 'Code' | 'Database';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Expertise {
  title: string;
  description: string;
  icon: ExpertiseIcon;
}

export interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface HomeMetadata {
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLink[];
  expertise: Expertise[];
  featuredProjects: FeaturedProject[];
}

export interface IconMap {
  [key: string]: LucideIcon;
}

export interface ContentResponse {
  metadata: HomeMetadata;
  content: string;
}