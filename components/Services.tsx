'use client';

import { Code2, Database, GraduationCap, ListChecks } from 'lucide-react';
import { useContent } from '@/lib/content-context';
import { useLocale } from '@/lib/locale-context';
import { sectionLabels } from '@/lib/ui-strings';
import { AnimatedSection, StaggerGroup, StaggerItem } from './AnimatedSection';

const ICONS = [Code2, ListChecks, Database, GraduationCap];

export function Services() {
  const { content } = useContent();
  const { t } = useLocale();

  return (
    <section id="services" className="py-24 sm:py-28">
      <div className="container-page">
        <AnimatedSection className="max-w-xl">
          <span className="text-sm font-medium text-signal-violet">{t(sectionLabels.servicesHeading)}</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t(sectionLabels.servicesSub)}
          </h2>
        </AnimatedSection>

        <StaggerGroup className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.services.map((service, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <StaggerItem key={service.id}>
                <article className="h-full rounded-3xl border border-paper-line p-7 transition-colors hover:border-signal-violet/50 dark:border-ink-line">
                  <Icon className="h-6 w-6 text-signal-rose" />
                  <h3 className="mt-6 font-display text-xl font-semibold">{t(service.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65 dark:text-paper/65">{t(service.description)}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
