import {
    BookOpen, FileText, ShoppingBag, Network,
} from 'lucide-react';

// ── ALUMNI NOTES DATA ───────────────────────────────────────────────────────
export const ALUMNI_NOTES = [
    {
        city: 'Munich',
        emoji: '🍺',
        snippet:
            "The most important thing I learned about my first winter in Munich wasn't on a brochure. It was about keeping a 'Pfand' stash and knowing which Mensa closes early on Fridays...",
        author: 'VGU Alumni \'22',
        authorAvatar: 'https://i.pravatar.cc/150?u=munich',
        badges: [{ type: 'Golden Feather', icon: '🪶' }, { type: 'Top 10', icon: '🏆' }],
        topic: 'Life Hacks',
        stars: 5,
        color: 'from-blue-600/20 to-indigo-600/10',
        border: 'border-blue-400/30',
        tagColor: 'text-blue-400',
        badge: 'bg-blue-500/20 text-blue-300',
    },
    {
        city: 'Berlin',
        emoji: '🎨',
        snippet:
            "Getting registered (Anmeldung) in Berlin felt like a boss battle. I waited 6 weeks for an appointment. Here's the shortcut no one tells you about German bureaucracy...",
        author: 'VGU Alumni \'23',
        authorAvatar: 'https://i.pravatar.cc/150?u=berlin',
        badges: [{ type: 'Early Bird', icon: '🐦' }, { type: 'Helpful', icon: '💡' }],
        topic: 'Bureaucracy',
        stars: 5,
        color: 'from-orange-600/20 to-amber-600/10',
        border: 'border-amber-400/30',
        tagColor: 'text-amber-400',
        badge: 'bg-[#FFCC00]/20 text-orange-300',
    },
    {
        city: 'Frankfurt',
        emoji: '🏦',
        snippet:
            'Opening a German bank account as a student is tricky without a registered address. I tried 3 banks before finding one that works — no Schufa needed and full English support...',
        author: 'VGU Alumni \'21',
        authorAvatar: 'https://i.pravatar.cc/150?u=frankfurt',
        badges: [{ type: 'Golden Feather', icon: '🪶' }, { type: 'Finance Pro', icon: '💰' }],
        topic: 'Finance',
        stars: 4,
        color: 'from-green-600/20 to-emerald-600/10',
        border: 'border-green-400/30',
        tagColor: 'text-green-400',
        badge: 'bg-green-500/20 text-green-300',
    },
];

// ── FORUM CATEGORIES DATA ───────────────────────────────────────────────────
export const FORUM_CATEGORIES = [
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: 'The Bureaucracy Maze',
        subtitle: 'Visa · Anmeldung · Health Insurance',
        desc: 'Deciphering the paperwork — one form at a time.',
        color: '#FFCC00',
        gradient: 'from-amber-400/30 to-amber-500/5',
        border: 'border-amber-400/30',
        posts: 248,
    },
    {
        icon: <FileText className="w-6 h-6" />,
        title: 'Academic Nest',
        subtitle: 'Exams · Thesis · Prof. Tips',
        desc: 'Passing the German way — structured, punctual, and thorough.',
        color: '#3b82f6',
        gradient: 'from-blue-500/20 to-indigo-500/5',
        border: 'border-blue-400/30',
        posts: 184,
    },
    {
        icon: <ShoppingBag className="w-6 h-6" />,
        title: 'The Marketplace',
        subtitle: 'Furniture · Books · WG Spots',
        desc: "One duck's trash, another duck's treasure.",
        color: '#22c55e',
        gradient: 'from-green-500/20 to-emerald-500/5',
        border: 'border-green-400/30',
        posts: 312,
    },
    {
        icon: <Network className="w-6 h-6" />,
        title: 'VGU Connection',
        subtitle: 'Alumni Networking · Mentorship',
        desc: 'Direct bridge to those who were here before you.',
        color: '#a855f7',
        gradient: 'from-purple-500/20 to-violet-500/5',
        border: 'border-purple-400/30',
        posts: 97,
    },
];

// ── SURVIVAL STATS ──────────────────────────────────────────────────────────
export const SURVIVAL_STATS = [
    { emoji: '🦆', value: '500+', label: 'Active Ducks' },
    { emoji: '📜', value: '1,200+', label: 'Validated Notes' },
    { emoji: '🌉', value: '1', label: 'Bridge: VGU ↔ Germany' },
];

// ── NETWORK GRAPH (SVG duck-node animation) ─────────────────────────────────
export const NODE_POSITIONS = [
    { cx: 50, cy: 50 },
    { cx: 20, cy: 78 },
    { cx: 80, cy: 78 },
    { cx: 10, cy: 40 },
    { cx: 90, cy: 40 },
    { cx: 35, cy: 25 },
    { cx: 65, cy: 25 },
    { cx: 50, cy: 90 },
];

export const EDGES = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 2], [1, 7], [2, 7], [3, 5], [4, 6],
];