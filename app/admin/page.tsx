'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Upload, RotateCcw, Save, ExternalLink, ShieldAlert } from 'lucide-react';
import { useContent } from '@/lib/content-context';
import type { SiteContent, SkillCategory, ExperienceEntry, Project, Certification, Skill, ExperienceAchievement } from '@/lib/types';
import { AdminCard, AddButton, BilingualField, TextField, NumberField, FieldLabel } from '@/components/admin/AdminFields';

const TABS = ['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'social'] as const;
type Tab = (typeof TABS)[number];

const uid = () => Math.random().toString(36).slice(2, 10);

export default function AdminPage() {
  const { content, setOverrides, resetToDefault, exportJSON, importJSON, hydrated } = useContent();
  const [tab, setTab] = useState<Tab>('hero');
  const [draft, setDraft] = useState<SiteContent>(content);
  const [savedFlash, setSavedFlash] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Re-sync the draft whenever the underlying (merged) content changes —
  // e.g. right after hydration, or after "Reset to default".
  useEffect(() => {
    setDraft(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  function save() {
    setOverrides(draft);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  }

  function handleReset() {
    if (!confirm('Reset all content back to the site defaults? This clears every admin edit on this device.')) return;
    resetToDefault();
    setDraft(content); // content will re-derive to defaultContent on next render; this sets it optimistically
  }

  function handleExport() {
    const blob = new Blob([exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-content.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    setImportError(null);
    fileInputRef.current?.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importJSON(String(reader.result));
      if (!result.ok) {
        setImportError(result.error ?? 'Import failed.');
      } else {
        setImportError(null);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-ink/50">
        Loading admin panel…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
      <div className="border-b border-paper-line dark:border-ink-line">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-signal-amber">
              <ShieldAlert className="h-4 w-4" />
              Unlisted admin route — not linked from the public site, no auth
            </div>
            <h1 className="mt-1 font-display text-2xl font-semibold">Content Admin</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-paper-line px-4 text-sm dark:border-ink-line"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View site
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-paper-line px-4 text-sm dark:border-ink-line"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset to default
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-paper-line px-4 text-sm dark:border-ink-line"
            >
              <Download className="h-3.5 w-3.5" />
              Export JSON
            </button>
            <button
              type="button"
              onClick={handleImportClick}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-paper-line px-4 text-sm dark:border-ink-line"
            >
              <Upload className="h-3.5 w-3.5" />
              Import JSON
            </button>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
            <button
              type="button"
              onClick={save}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-bridge-gradient px-5 text-sm font-semibold text-white"
            >
              <Save className="h-3.5 w-3.5" />
              {savedFlash ? 'Saved ✓' : 'Save changes'}
            </button>
          </div>
        </div>
        {importError && (
          <div className="container-page pb-4 text-sm text-red-500">{importError}</div>
        )}
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[200px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? 'bg-signal-violet/15 text-signal-violet'
                  : 'text-ink/60 hover:bg-paper-soft dark:text-paper/60 dark:hover:bg-ink-soft'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          {tab === 'hero' && <HeroTab draft={draft} setDraft={setDraft} />}
          {tab === 'about' && <AboutTab draft={draft} setDraft={setDraft} />}
          {tab === 'skills' && <SkillsTab draft={draft} setDraft={setDraft} />}
          {tab === 'experience' && <ExperienceTab draft={draft} setDraft={setDraft} />}
          {tab === 'projects' && <ProjectsTab draft={draft} setDraft={setDraft} />}
          {tab === 'certifications' && <CertificationsTab draft={draft} setDraft={setDraft} />}
          {tab === 'social' && <SocialTab draft={draft} setDraft={setDraft} />}
        </div>
      </div>
    </div>
  );
}

type TabProps = { draft: SiteContent; setDraft: React.Dispatch<React.SetStateAction<SiteContent>> };

function HeroTab({ draft, setDraft }: TabProps) {
  const h = draft.hero;
  const update = (patch: Partial<typeof h>) => setDraft({ ...draft, hero: { ...h, ...patch } });
  return (
    <div className="max-w-2xl space-y-5">
      <TextField label="Name" value={h.name} onChange={(v) => update({ name: v })} />
      <BilingualField label="Title" value={h.title} onChange={(v) => update({ title: v })} />
      <BilingualField label="Tagline" value={h.tagline} onChange={(v) => update({ tagline: v })} />
      <BilingualField label="Value proposition" value={h.valueProposition} onChange={(v) => update({ valueProposition: v })} multiline />
      <BilingualField label="Location" value={h.location} onChange={(v) => update({ location: v })} />
      <BilingualField label="Primary CTA label" value={h.ctaPrimary} onChange={(v) => update({ ctaPrimary: v })} />
      <BilingualField label="Secondary CTA label" value={h.ctaSecondary} onChange={(v) => update({ ctaSecondary: v })} />
    </div>
  );
}

function AboutTab({ draft, setDraft }: TabProps) {
  const a = draft.about;
  const update = (patch: Partial<typeof a>) => setDraft({ ...draft, about: { ...a, ...patch } });
  return (
    <div className="max-w-2xl space-y-5">
      <BilingualField label="Heading" value={a.heading} onChange={(v) => update({ heading: v })} />
      <BilingualField label="Paragraph" value={a.paragraph} onChange={(v) => update({ paragraph: v })} multiline />
      <BilingualField label="Education line" value={a.education} onChange={(v) => update({ education: v })} />
    </div>
  );
}

function SkillsTab({ draft, setDraft }: TabProps) {
  const categories = draft.skillCategories;

  function updateCategory(index: number, patch: Partial<SkillCategory>) {
    const next = [...categories];
    next[index] = { ...next[index], ...patch };
    setDraft({ ...draft, skillCategories: next });
  }

  function updateSkill(catIndex: number, skillIndex: number, patch: Partial<Skill>) {
    const cat = categories[catIndex];
    const nextSkills = [...cat.skills];
    nextSkills[skillIndex] = { ...nextSkills[skillIndex], ...patch };
    updateCategory(catIndex, { skills: nextSkills });
  }

  function addSkill(catIndex: number) {
    const cat = categories[catIndex];
    updateCategory(catIndex, { skills: [...cat.skills, { id: uid(), name: 'New skill', level: 50 }] });
  }

  function removeSkill(catIndex: number, skillIndex: number) {
    const cat = categories[catIndex];
    updateCategory(catIndex, { skills: cat.skills.filter((_, i) => i !== skillIndex) });
  }

  return (
    <div className="max-w-3xl space-y-8">
      {categories.map((cat, catIndex) => (
        <div key={cat.id} className="space-y-4 rounded-2xl border border-paper-line p-5 dark:border-ink-line">
          <BilingualField label="Category title" value={cat.title} onChange={(v) => updateCategory(catIndex, { title: v })} />
          <div className="space-y-3">
            {cat.skills.map((skill, skillIndex) => (
              <div key={skill.id} className="grid grid-cols-[1fr_100px_auto] items-end gap-3">
                <TextField label="Skill name" value={skill.name} onChange={(v) => updateSkill(catIndex, skillIndex, { name: v })} />
                <NumberField label="Level %" value={skill.level} onChange={(v) => updateSkill(catIndex, skillIndex, { level: v })} />
                <button
                  type="button"
                  onClick={() => removeSkill(catIndex, skillIndex)}
                  className="mb-0.5 h-9 rounded-lg border border-paper-line px-3 text-sm text-red-500 dark:border-ink-line"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <AddButton label="Add skill" onClick={() => addSkill(catIndex)} />
        </div>
      ))}
    </div>
  );
}

function ExperienceTab({ draft, setDraft }: TabProps) {
  const entries = draft.experience;

  function updateEntry(index: number, patch: Partial<ExperienceEntry>) {
    const next = [...entries];
    next[index] = { ...next[index], ...patch };
    setDraft({ ...draft, experience: next });
  }

  function updateAchievement(entryIndex: number, achIndex: number, patch: Partial<ExperienceAchievement>) {
    const entry = entries[entryIndex];
    const next = [...entry.achievements];
    next[achIndex] = { ...next[achIndex], ...patch };
    updateEntry(entryIndex, { achievements: next });
  }

  function addAchievement(entryIndex: number) {
    const entry = entries[entryIndex];
    updateEntry(entryIndex, { achievements: [...entry.achievements, { id: uid(), text: { en: '', ar: '' } }] });
  }

  function removeAchievement(entryIndex: number, achIndex: number) {
    const entry = entries[entryIndex];
    updateEntry(entryIndex, { achievements: entry.achievements.filter((_, i) => i !== achIndex) });
  }

  function addEntry() {
    setDraft({
      ...draft,
      experience: [
        ...entries,
        {
          id: uid(),
          company: 'New Company',
          role: { en: '', ar: '' },
          period: { en: '', ar: '' },
          location: { en: '', ar: '' },
          summary: { en: '', ar: '' },
          achievements: [],
        },
      ],
    });
  }

  function removeEntry(index: number) {
    setDraft({ ...draft, experience: entries.filter((_, i) => i !== index) });
  }

  return (
    <div className="max-w-3xl space-y-8">
      {entries.map((entry, entryIndex) => (
        <AdminCard key={entry.id} title={entry.company || 'Untitled role'} onRemove={() => removeEntry(entryIndex)}>
          <TextField label="Company" value={entry.company} onChange={(v) => updateEntry(entryIndex, { company: v })} />
          <BilingualField label="Role" value={entry.role} onChange={(v) => updateEntry(entryIndex, { role: v })} />
          <BilingualField label="Period" value={entry.period} onChange={(v) => updateEntry(entryIndex, { period: v })} />
          <BilingualField label="Location" value={entry.location} onChange={(v) => updateEntry(entryIndex, { location: v })} />
          <BilingualField label="Summary" value={entry.summary} onChange={(v) => updateEntry(entryIndex, { summary: v })} multiline />

          <div>
            <FieldLabel>Achievements</FieldLabel>
            <div className="space-y-3">
              {entry.achievements.map((ach, achIndex) => (
                <div key={ach.id} className="flex items-end gap-3">
                  <div className="flex-1">
                    <BilingualField label="Achievement" value={ach.text} onChange={(v) => updateAchievement(entryIndex, achIndex, { text: v })} />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAchievement(entryIndex, achIndex)}
                    className="h-9 rounded-lg border border-paper-line px-3 text-sm text-red-500 dark:border-ink-line"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <AddButton label="Add achievement" onClick={() => addAchievement(entryIndex)} />
            </div>
          </div>
        </AdminCard>
      ))}
      <AddButton label="Add experience entry" onClick={addEntry} />
    </div>
  );
}

function ProjectsTab({ draft, setDraft }: TabProps) {
  const projects = draft.projects;

  function updateProject(index: number, patch: Partial<Project>) {
    const next = [...projects];
    next[index] = { ...next[index], ...patch };
    setDraft({ ...draft, projects: next });
  }

  function addProject() {
    setDraft({
      ...draft,
      projects: [
        ...projects,
        {
          id: uid(),
          name: { en: 'New Project', ar: 'مشروع جديد' },
          description: { en: '', ar: '' },
          tech: [],
          link: '',
          repo: '',
          metric: { en: '', ar: '' },
        },
      ],
    });
  }

  function removeProject(index: number) {
    setDraft({ ...draft, projects: projects.filter((_, i) => i !== index) });
  }

  return (
    <div className="max-w-3xl space-y-8">
      {projects.map((project, index) => (
        <AdminCard key={project.id} title={project.name.en || 'Untitled project'} onRemove={() => removeProject(index)}>
          <BilingualField label="Name" value={project.name} onChange={(v) => updateProject(index, { name: v })} />
          <BilingualField label="Description" value={project.description} onChange={(v) => updateProject(index, { description: v })} multiline />
          <BilingualField label="Key metric" value={project.metric} onChange={(v) => updateProject(index, { metric: v })} />
          <TextField
            label="Tech stack (comma separated)"
            value={project.tech.join(', ')}
            onChange={(v) => updateProject(index, { tech: v.split(',').map((t) => t.trim()).filter(Boolean) })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Live link (optional)" value={project.link} onChange={(v) => updateProject(index, { link: v })} placeholder="https://…" />
            <TextField label="Repo link (optional)" value={project.repo} onChange={(v) => updateProject(index, { repo: v })} placeholder="https://github.com/…" />
          </div>
        </AdminCard>
      ))}
      <AddButton label="Add project" onClick={addProject} />
    </div>
  );
}

function CertificationsTab({ draft, setDraft }: TabProps) {
  const certs = draft.certifications;

  function updateCert(index: number, patch: Partial<Certification>) {
    const next = [...certs];
    next[index] = { ...next[index], ...patch };
    setDraft({ ...draft, certifications: next });
  }

  function addCert() {
    setDraft({
      ...draft,
      certifications: [
        ...certs,
        { id: uid(), name: { en: 'New Certification', ar: 'شهادة جديدة' }, issuer: { en: '', ar: '' }, year: String(new Date().getFullYear()) },
      ],
    });
  }

  function removeCert(index: number) {
    setDraft({ ...draft, certifications: certs.filter((_, i) => i !== index) });
  }

  return (
    <div className="max-w-3xl space-y-6">
      {certs.map((cert, index) => (
        <AdminCard key={cert.id} title={cert.name.en || 'Untitled certification'} onRemove={() => removeCert(index)}>
          <BilingualField label="Name" value={cert.name} onChange={(v) => updateCert(index, { name: v })} />
          <BilingualField label="Issuer" value={cert.issuer} onChange={(v) => updateCert(index, { issuer: v })} />
          <TextField label="Year" value={cert.year} onChange={(v) => updateCert(index, { year: v })} />
        </AdminCard>
      ))}
      <AddButton label="Add certification" onClick={addCert} />
    </div>
  );
}

function SocialTab({ draft, setDraft }: TabProps) {
  const s = draft.social;
  const update = (patch: Partial<typeof s>) => setDraft({ ...draft, social: { ...s, ...patch } });
  return (
    <div className="max-w-2xl space-y-5">
      <TextField label="Email" value={s.email} onChange={(v) => update({ email: v })} />
      <TextField label="Phone" value={s.phone} onChange={(v) => update({ phone: v })} />
      <TextField label="GitHub URL" value={s.github} onChange={(v) => update({ github: v })} />
      <TextField label="LinkedIn URL" value={s.linkedin} onChange={(v) => update({ linkedin: v })} />
    </div>
  );
}
