import {
    Key, Shield, Route, Sparkles
} from 'lucide-react';

export type DocFilter = 'All' | 'Admission' | 'Career' | 'Academic' | 'Visa';
export const FILTERS: DocFilter[] = ['All', 'Admission', 'Career', 'Academic', 'Visa'];

// Bento Grid Categories Data
export const BENTO_CATEGORIES = [
    {
        id: 'templates',
        title: 'Featured Templates',
        desc: 'The most downloaded Lebenslauf and cover letters to kickstart your career in Germany.',
        icon: <Sparkles size={24} />,
        colSpan: 'md:col-span-2 md:row-span-2',
        isLarge: true,
    },
    {
        id: 'admission',
        title: 'Admission',
        desc: 'TUM, RWTH & TU Berlin successful profiles.',
        icon: <Key size={20} className="text-amber-400" />,
        colSpan: 'md:col-span-1',
        isLarge: false,
        color: 'bg-orange-50 border-orange-100',
    },
    {
        id: 'career',
        title: 'Career',
        desc: 'Bewerbung & Interview Path',
        icon: <Route size={20} className="text-blue-500" />,
        colSpan: 'md:col-span-1',
        isLarge: false,
        color: 'bg-blue-50 border-blue-100',
    },
    {
        id: 'academic',
        title: 'Academic',
        desc: 'Data Science & Thesis Shield',
        icon: <Shield size={20} className="text-emerald-500" />,
        colSpan: 'md:col-span-2',
        isLarge: false,
        color: 'bg-emerald-50 border-emerald-100',
    },
];

export const DOCUMENTS = [
    {
        id: 1,
        title: 'TUM Data Engineering Master Motivation Letter',
        category: 'Admission',
        verified: true,
        fileType: 'PDF',
        size: '1.2 MB',
        stats: { read: '5 min read', views: '1.2k views', desc: '400 downloads' }
    },
    {
        id: 2,
        title: 'German Style Lebenslauf Template (Tech)',
        category: 'Career',
        verified: true,
        fileType: 'Word',
        size: '45 KB',
        stats: { read: '3 min read', views: '3.4k views', desc: '1.2k downloads' }
    },
    {
        id: 3,
        title: 'Machine Learning Flight Delay Prediction',
        category: 'Academic',
        verified: false,
        fileType: 'PDF',
        size: '3.4 MB',
        stats: { read: '12 min read', views: '800 views', desc: '120 downloads' }
    },
    {
        id: 4,
        title: 'TestDaF TDN 4/5 Complete Cheatsheet',
        category: 'Academic',
        verified: true,
        fileType: 'PDF',
        size: '800 KB',
        stats: { read: '8 min read', views: '4.1k views', desc: '2k downloads' }
    },
    {
        id: 5,
        title: 'Student Visa Blocked Account Proof Template',
        category: 'Visa',
        verified: true,
        fileType: 'PDF',
        size: '120 KB',
        stats: { read: '2 min read', views: '1.5k views', desc: '600 downloads' }
    },
    {
        id: 6,
        title: 'RWTH Aachen Mechanical Eng. Essay',
        category: 'Admission',
        verified: false,
        fileType: 'PDF',
        size: '2.1 MB',
        stats: { read: '10 min read', views: '500 views', desc: '80 downloads' }
    },
];

export const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 250, damping: 24 } }
};