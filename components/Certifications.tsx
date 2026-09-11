'use client';

import { Award, ExternalLink, FileText } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { misc, sectionLabels } from '@/lib/ui-strings';
import { AnimatedSection, StaggerGroup, StaggerItem } from './AnimatedSection';

const ACCENTS = ['text-signal-indigo', 'text-signal-violet', 'text-signal-rose', 'text-signal-amber'];

export function Certifications() {
  const { t } = useLocale();
  const { content } = useContent();

  return (
    <section id="certifications" className="py-24 sm:py-28">
      <div className="container-page">
        <AnimatedSection>
          <span className="text-sm font-medium text-signal-violet">{t(sectionLabels.certificationsHeading)}</span>
        </AnimatedSection>

        <StaggerGroup className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-paper-line dark:border-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {content.certifications.map((cert, index) => (
            <StaggerItem key={cert.id}>
              <div className="h-full bg-paper p-6 transition-colors hover:bg-paper-soft dark:bg-ink dark:hover:bg-ink-soft">
                <Award className={`h-5 w-5 ${ACCENTS[index % ACCENTS.length]}`} />
                <p className="mt-4 font-medium leading-snug">{t(cert.name)}</p>
                <p className="mt-1.5 text-sm text-ink/50 dark:text-paper/50">
                  {t(cert.issuer)} · {cert.year}
                </p>
                {cert.pdf || cert.link ? (
                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium">
                    {cert.pdf ? (
                      <a
                        href={cert.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-ink/70 transition-colors hover:text-signal-violet dark:text-paper/70"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        {t(misc.previewCertificate)}
                      </a>
                    ) : null}
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-ink/70 transition-colors hover:text-signal-violet dark:text-paper/70"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t(misc.visitCertificate)}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
