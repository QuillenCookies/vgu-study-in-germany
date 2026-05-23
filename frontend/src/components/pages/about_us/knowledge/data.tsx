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

export const TEAM = [
    {
        emoji: '🦆',
        gradient: 'from-[#FFCC00] to-[#e6b800]',
        name: 'Phạm Trọng Quý',
        role: 'Co-Founder & Lead',
        funFact: 'The one who turns coffee into the very first lines of Die Ente\'s code.',
        linkedin: '#',
    },
    {
        emoji: '🎨',
        gradient: 'from-purple-400 to-purple-600',
        name: 'Hồ Nguyễn Phú',
        role: 'Co-Founder & Database Lead',
        funFact: 'Crafting every pixel and layout to make your browsing experience seamless.',
        linkedin: '#',
    },
    {
        emoji: '✍️',
        gradient: 'from-emerald-400 to-emerald-600',
        name: 'Cao Tuệ Anh',
        role: 'Co-Founder & Product Lead',
        funFact: 'Demystifying complex Bahn rules and German paperwork into simple guides.',
        linkedin: '#',
    },
];