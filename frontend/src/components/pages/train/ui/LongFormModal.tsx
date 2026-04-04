// frontend/src/components/train/knowledge/LongFormModal.tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { KnowledgeItem } from '../knowledge/data';
import { Badge } from '../../../ui/badge';

interface Props {
    item: KnowledgeItem;
    onClose: () => void;
}

export const LongFormModal: React.FC<Props> = ({ item, onClose }) => {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <div className="fixed inset-0 z-[999] bg-[#0a2463]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl max-h-full rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto">
                    <div className="h-48 md:h-64 relative w-full">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <Badge className="bg-[#f97316] text-white hover:bg-[#ea580c] mb-2">{item.category}</Badge>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white">{item.title}</h2>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        <p className="text-xl text-gray-500 font-medium mb-8 leading-relaxed">
                            {item.shortDesc}
                        </p>
                        <div className="prose prose-lg text-gray-700 max-w-none leading-relaxed">
                            <p>{item.longDesc}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};