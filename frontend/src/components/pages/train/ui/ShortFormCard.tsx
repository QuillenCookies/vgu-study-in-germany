// frontend/src/components/train/knowledge/ShortFormCard.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { KnowledgeItem } from '../knowledge/data';
import { Button } from '../../../ui/button';

interface Props {
    item: KnowledgeItem;
    onOpen: (item: KnowledgeItem) => void;
}

export const ShortFormCard: React.FC<Props> = ({ item, onOpen }) => {
    return (
        <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover shrink-0"
            />
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <h4 className="text-lg font-bold text-[#0a2463] mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.shortDesc}</p>
                </div>
                <div className="flex justify-end mt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpen(item)}
                        className="text-[#f97316] hover:text-[#ea580c] hover:bg-orange-50 font-bold"
                    >
                        See More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
};