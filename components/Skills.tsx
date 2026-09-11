'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { sectionLabels } from '@/lib/ui-strings';
import { AnimatedSection, StaggerGroup, StaggerItem } from './AnimatedSection';

export function Skills() {
  const { t } = useLocale();
  const { content } = useContent();

  return (
    <section id="skills" className="py-24 sm:py-28">
      <div className="container-page">
        <AnimatedSection className="max-w-xl">
          <span className="text-sm font-medium text-signal-violet">{t(sectionLabels.skillsHeading)}</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t(sectionLabels.skillsSub)}
          </h2>
        </AnimatedSection>

        <StaggerGroup className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {content.skillCategories.map((category) => (
            <StaggerItem key={category.id}>
              <h3 className="font-display text-lg font-semibold">{t(category.title)}</h3>
              <div className="mt-5 space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-ink/80 dark:text-paper/80">{skill.name}</span>
                      <span className="text-ink/45 dark:text-paper/45">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-soft dark:bg-ink-soft">
                      <motion.div
                        className="h-full rounded-full bg-bridge-gradient"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
