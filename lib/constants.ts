import {
  Github,
  Linkedin,
  Mail,
  Brain,
  Code,
  Database,
  BookOpen,
  GraduationCap,
  Globe,
} from 'lucide-react';
import { IconMap } from './types';

export const iconMap: IconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
  Kaggle: Database,
  HuggingFace: Brain,
  GoogleScholar: BookOpen,
  ORCID: GraduationCap,
  Website: Globe,
};

export const expertiseIconMap: IconMap = {
  Brain,
  Code,
  Database,
};