'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { SiteContent } from './types';
import { defaultContent } from './content';
import { deepMerge } from './merge';

const STORAGE_KEY = 'portfolio_content_overrides';

interface ContentContextValue {
  content: SiteContent;
  overrides: Partial<SiteContent> | null;
  /** Replace the full overrides object (used by the admin panel). */
  setOverrides: (next: Partial<SiteContent>) => void;
  /** Merge a partial patch into the current overrides. */
  patchOverrides: (patch: Partial<SiteContent>) => void;
  resetToDefault: () => void;
  exportJSON: () => string;
  importJSON: (json: string) => { ok: boolean; error?: string };
  hydrated: boolean;
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverridesState] = useState<Partial<SiteContent> | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load overrides from localStorage once, on the client only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setOverridesState(JSON.parse(raw));
      }
    } catch {
      // Corrupt or missing data — fall back to defaults silently.
    } finally {
      setHydrated(true);
    }
  }, []);

  const persist = useCallback((next: Partial<SiteContent> | null) => {
    setOverridesState(next);
    try {
      if (next) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage may be unavailable (private mode, quota) — ignore.
    }
  }, []);

  const setOverrides = useCallback((next: Partial<SiteContent>) => persist(next), [persist]);

  const patchOverrides = useCallback(
    (patch: Partial<SiteContent>) => {
      const merged = deepMerge((overrides ?? {}) as SiteContent, patch);
      persist(merged as Partial<SiteContent>);
    },
    [overrides, persist]
  );

  const resetToDefault = useCallback(() => persist(null), [persist]);

  const exportJSON = useCallback(() => JSON.stringify(overrides ?? {}, null, 2), [overrides]);

  const importJSON = useCallback(
    (json: string) => {
      try {
        const parsed = JSON.parse(json);
        if (typeof parsed !== 'object' || parsed === null) {
          return { ok: false, error: 'JSON must be an object.' };
        }
        persist(parsed);
        return { ok: true };
      } catch {
        return { ok: false, error: 'Invalid JSON.' };
      }
    },
    [persist]
  );

  const content = useMemo(() => deepMerge(defaultContent, overrides), [overrides]);

  const value: ContentContextValue = {
    content,
    overrides,
    setOverrides,
    patchOverrides,
    resetToDefault,
    exportJSON,
    importJSON,
    hydrated,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
