import type { Bilingual } from './types';

// Fixed interface chrome — navigation, section eyebrows, footer, admin labels.
// This is intentionally separate from content.ts: content.ts holds
// editable portfolio copy, this file holds structural UI labels that
// stay constant regardless of admin edits.

export const nav: Record<'about' | 'skills' | 'experience' | 'projects' | 'services' | 'certifications' | 'contact', Bilingual> = {
  about: { en: 'About', ar: 'نبذة' },
  skills: { en: 'Skills', ar: 'المهارات' },
  experience: { en: 'Experience', ar: 'الخبرة' },
  projects: { en: 'Projects', ar: 'المشاريع' },
  services: { en: 'Services', ar: 'الخدمات' },
  certifications: { en: 'Certifications', ar: 'الشهادات' },
  contact: { en: 'Contact', ar: 'التواصل' },
};

export const sectionLabels = {
  skillsHeading: { en: 'Skills', ar: 'المهارات' } as Bilingual,
  skillsSub: {
    en: 'The technical and analytical toolkit behind the work.',
    ar: 'مجموعة الأدوات التقنية والتحليلية التي تقف خلف العمل.',
  } as Bilingual,
  experienceHeading: { en: 'Experience', ar: 'الخبرة العملية' } as Bilingual,
  experienceSub: {
    en: 'Three years of shipping software and translating business needs into working systems.',
    ar: 'ثلاث سنوات من بناء البرمجيات وترجمة احتياجات الأعمال إلى أنظمة عاملة.',
  } as Bilingual,
  projectsHeading: { en: 'Selected Projects', ar: 'مشاريع مختارة' } as Bilingual,
  projectsSub: {
    en: 'A few systems built from a real problem to a working product.',
    ar: 'بعض الأنظمة التي بُنيت من مشكلة حقيقية إلى منتج عامل.',
  } as Bilingual,
  servicesHeading: { en: 'What I do', ar: 'ما أقدمه' } as Bilingual,
  servicesSub: {
    en: 'Practical technology and analysis for products that need to work in the real world.',
    ar: 'تقنية وتحليل عمليان لمنتجات يجب أن تعمل في العالم الحقيقي.',
  } as Bilingual,
  certificationsHeading: { en: 'Certifications', ar: 'الشهادات' } as Bilingual,
  languagesHeading: { en: 'Languages', ar: 'اللغات' } as Bilingual,
};

export const footer = {
  rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' } as Bilingual,
  builtWith: { en: 'Built with Next.js & Tailwind CSS.', ar: 'بُني باستخدام Next.js و Tailwind CSS.' } as Bilingual,
};

export const misc = {
  darkMode: { en: 'Toggle theme', ar: 'تبديل المظهر' } as Bilingual,
  language: { en: 'العربية', ar: 'English' } as Bilingual, // label shown is the *other* language
  downloadCv: { en: 'Download CV', ar: 'تحميل السيرة الذاتية' } as Bilingual,
  viewOnGithub: { en: 'GitHub', ar: 'GitHub' } as Bilingual,
  viewLive: { en: 'Live', ar: 'معاينة' } as Bilingual,
  viewRepo: { en: 'Code', ar: 'الكود' } as Bilingual,
  keyResults: { en: 'Key results', ar: 'أبرز النتائج' } as Bilingual,
  adminLink: { en: 'Admin', ar: 'لوحة التحكم' } as Bilingual,
  previewCertificate: { en: 'Preview certificate', ar: 'معاينة الشهادة' } as Bilingual,
  visitCertificate: { en: 'Visit certificate', ar: 'زيارة الشهادة' } as Bilingual,
};
