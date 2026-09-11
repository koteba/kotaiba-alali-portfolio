// Central type definitions for all site content.
// Every piece of text that appears on the site is typed here so the
// admin panel and the public site always agree on shape.

export type Locale = 'en' | 'ar';

/** A string that has both an English and an Arabic version. */
export interface Bilingual {
  en: string;
  ar: string;
}

export interface SocialLinks {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface HeroContent {
  name: string;
  title: Bilingual;
  tagline: Bilingual;
  valueProposition: Bilingual;
  location: Bilingual;
  ctaPrimary: Bilingual;
  ctaSecondary: Bilingual;
}

export interface PortfolioStat {
  id: string;
  value: string;
  label: Bilingual;
}

export interface Service {
  id: string;
  title: Bilingual;
  description: Bilingual;
}

export interface AboutContent {
  heading: Bilingual;
  paragraph: Bilingual;
  education: Bilingual;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  id: string;
  title: Bilingual;
  skills: Skill[];
}

export interface ExperienceAchievement {
  id: string;
  text: Bilingual;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: Bilingual;
  period: Bilingual;
  location: Bilingual;
  summary: Bilingual;
  achievements: ExperienceAchievement[];
}

export interface Project {
  id: string;
  name: Bilingual;
  description: Bilingual;
  images?: string[];
  tech: string[];
  link: string;
  repo: string;
  metric: Bilingual;
}

export interface Certification {
  id: string;
  name: Bilingual;
  issuer: Bilingual;
  year: string;
  pdf?: string;
  link?: string;
}

export interface Language {
  id: string;
  name: Bilingual;
  level: Bilingual;
  proficiency: number; // 0-100 for the bar
}

export interface ContactContent {
  heading: Bilingual;
  subheading: Bilingual;
  formNamePlaceholder: Bilingual;
  formEmailPlaceholder: Bilingual;
  formMessagePlaceholder: Bilingual;
  formSubmitLabel: Bilingual;
  formSuccessMessage: Bilingual;
}

export interface SiteContent {
  hero: HeroContent;
  stats: PortfolioStat[];
  about: AboutContent;
  services: Service[];
  skillCategories: SkillCategory[];
  experience: ExperienceEntry[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  contact: ContactContent;
  social: SocialLinks;
}
