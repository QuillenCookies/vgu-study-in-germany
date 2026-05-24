import type { Language } from '../lib/translations';

/* ─── Types for Data ─────────────────────────────────────────── */
type ML = Record<Language, string>;
export interface ChecklistRaw {
    id: string;
    label: ML;
    germanTerm?: string;
}
export interface ArticleRaw {
    id: string;
    tag: 'new' | 'residency' | 'tax';
    title: ML;
    germanAnchor: string;
    icon: React.ReactNode;
    isUrgent?: boolean;
    urgencyText?: ML;
    summary: ML;
    checklist?: ChecklistRaw[];
    dependsOn?: string; // article ID prerequisite
    extraContent?: (lang: Language) => React.ReactNode;
}

/* ─── Multilingual helper ────────────────────────────────────── */
export interface ChecklistItem { id: string; label: string; germanTerm?: string; }
export interface Article {
    id: string;
    tag: 'new' | 'residency' | 'tax';
    title: string;
    germanAnchor: string;
    icon: React.ReactNode;
    isUrgent?: boolean;
    urgencyText?: string;
    summary: string;
    checklist?: ChecklistItem[];
    dependsOn?: string;
    extraContent?: React.ReactNode;
}

/* ─── Category Config ────────────────────────────────────────── */
export type CategoryKey = 'new' | 'residency' | 'tax';
export interface CategoryConfig {
    key: CategoryKey;
    icon: React.ReactNode;
    articleIds: string[];
}