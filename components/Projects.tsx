'use client';

import { ChevronLeft, ChevronRight, ExternalLink, Github, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { sectionLabels, misc } from '@/lib/ui-strings';
import { AnimatedSection, StaggerGroup, StaggerItem } from './AnimatedSection';

export function Projects() {
  const { t } = useLocale();
  const { content } = useContent();

  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="container-page">
        <AnimatedSection className="max-w-xl">
          <span className="text-sm font-medium text-signal-violet">{t(sectionLabels.projectsHeading)}</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t(sectionLabels.projectsSub)}
          </h2>
        </AnimatedSection>

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {content.projects.map((project) => (
            <StaggerItem key={project.id}>
              <article className="group flex h-full flex-col rounded-3xl border border-paper-line p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-signal-violet/50 hover:shadow-glow dark:border-ink-line">
                {project.images?.length ? (
                  <ProjectGallery images={project.images} name={t(project.name)} />
                ) : null}
                <h3 className="font-display text-xl font-semibold">{t(project.name)}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70 dark:text-paper/70">
                  {t(project.description)}
                </p>

                <p className="mt-4 text-sm font-medium text-signal-amber">{t(project.metric)}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-paper-line px-2.5 py-1 text-xs text-ink/60 dark:border-ink-line dark:text-paper/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4 border-t border-paper-line pt-5 text-sm dark:border-ink-line">
                  <ProjectLink href={project.link} label={t(misc.viewLive)} icon={<ExternalLink className="h-3.5 w-3.5" />} />
                  <ProjectLink href={project.repo} label={t(misc.viewRepo)} icon={<Github className="h-3.5 w-3.5" />} />
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ProjectGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const activeImage = images[activeIndex];

  useEffect(() => {
    if (!isZoomed) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeWithEscape);
    };
  }, [isZoomed]);

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % images.length);
  }

  return (
    <div className="mb-6">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-paper-muted dark:bg-ink-muted">
        <button type="button" onClick={() => setIsZoomed(true)} className="absolute inset-0 cursor-zoom-in">
          <Image
            key={activeImage}
            src={activeImage}
            alt={`${name} screenshot ${activeIndex + 1}`}
            fill
            sizes="(min-width: 1024px) 28vw, 90vw"
            className="object-cover transition-opacity duration-300"
          />
        </button>
        <button
          type="button"
          onClick={() => setIsZoomed(true)}
          aria-label="Enlarge project image"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur-sm transition-colors hover:bg-ink"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous project image"
              className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur-sm transition-colors hover:bg-ink"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next project image"
              className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur-sm transition-colors hover:bg-ink"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View project image ${index + 1}`}
                  aria-current={index === activeIndex}
                  className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      {isZoomed ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} enlarged image`}
          onClick={() => setIsZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            aria-label="Close enlarged image"
            className="absolute right-4 top-20 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-full w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={activeImage}
              alt={`${name} screenshot ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous enlarged project image"
                  className="absolute left-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:-left-4"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next enlarged project image"
                  className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:-right-4"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>
        </div>,
        document.body
      ) : null}
    </div>
  );
}

function ProjectLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const hasLink = Boolean(href);
  return (
    <a
      href={hasLink ? href : undefined}
      target={hasLink ? '_blank' : undefined}
      rel={hasLink ? 'noreferrer' : undefined}
      aria-disabled={!hasLink}
      className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
        hasLink
          ? 'text-ink/70 hover:text-signal-violet dark:text-paper/70'
          : 'cursor-not-allowed text-ink/30 dark:text-paper/30'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
