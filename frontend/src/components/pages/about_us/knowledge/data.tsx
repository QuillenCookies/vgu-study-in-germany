import { Heart, Users, Globe, Lightbulb } from 'lucide-react';

// ── DATA ────────────────────────────────────────────────────────────────────
export const VALUES = [
    {
        Icon: Heart,
        title: 'Student-First',
        desc: 'Every decision we make starts with one question: does this help a student navigate Germany better?',
        color: 'text-rose-500',
        bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
    {
        Icon: Globe,
        title: 'Open & Inclusive',
        desc: 'We are international students ourselves. We build for every background, every language, every duck.',
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
        Icon: Lightbulb,
        title: 'Practical Knowledge',
        desc: 'No fluff, no filler — just real, tested tips gathered from students who have been there.',
        color: 'text-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
        Icon: Users,
        title: 'Community Driven',
        desc: 'Our best content comes from the community. Everyone contributes, everyone benefits.',
        color: 'text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
];

export const STATS = [
    { value: '500+', label: 'Students Helped' },
    { value: '6', label: 'Guide Sections' },
    { value: '3', label: 'Languages' },
    { value: '100%', label: 'Student Built' },
];