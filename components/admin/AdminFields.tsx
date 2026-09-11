'use client';

import type { Bilingual } from '@/lib/types';
import { Trash2, Plus } from 'lucide-react';

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium text-ink/50 dark:text-paper/50">{children}</label>;
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-paper-line bg-transparent px-3 py-2 text-sm outline-none focus:border-signal-violet dark:border-ink-line"
      />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-paper-line bg-transparent px-3 py-2 text-sm outline-none focus:border-signal-violet dark:border-ink-line"
      />
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-paper-line bg-transparent px-3 py-2 text-sm outline-none focus:border-signal-violet dark:border-ink-line"
      />
    </div>
  );
}

/** Paired EN / AR text inputs bound to a Bilingual value. */
export function BilingualField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: Bilingual;
  onChange: (v: Bilingual) => void;
  multiline?: boolean;
}) {
  const Field = multiline ? TextAreaField : TextField;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label={`${label} (EN)`} value={value.en} onChange={(v) => onChange({ ...value, en: v })} />
      <Field label={`${label} (AR)`} value={value.ar} onChange={(v) => onChange({ ...value, ar: v })} />
    </div>
  );
}

export function AdminCard({ title, children, onRemove }: { title: string; children: React.ReactNode; onRemove?: () => void }) {
  return (
    <div className="rounded-2xl border border-paper-line p-5 dark:border-ink-line">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-medium">{title}</h4>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-red-500/70 transition-colors hover:bg-red-500/10 hover:text-red-500"
            aria-label="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-paper-line px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-signal-violet/60 hover:text-signal-violet dark:border-ink-line dark:text-paper/70"
    >
      <Plus className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
