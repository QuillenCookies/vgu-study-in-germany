// frontend/src/components/train/TransitKnowledgeBase.tsx
import React, { useState, useMemo } from 'react';
import { knowledgeData } from '../knowledge/data';
import type { KnowledgeCategory, KnowledgeItem } from '../knowledge/data';
import { ShortFormCard } from '../ui/ShortFormCard';
import { LongFormModal } from '../ui/LongFormModal';
import { NumberedPagination } from '../../../ui/numbered-pagination';
import { Badge } from '../../../ui/badge';
import { Train, Ticket, BookOpen } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const TransitKnowledgeBase: React.FC = () => {
    const [activeTab, setActiveTab] = useState<KnowledgeCategory>('Types');
    const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

    // State dictionary to remember the page number for each tab!
    const [pageState, setPageState] = useState<Record<KnowledgeCategory, number>>({
        Types: 1,
        Ticket: 1,
        Culture: 1
    });

    const tabs: { id: KnowledgeCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'Types', label: 'Train Types', icon: <Train className="w-4 h-4" /> },
        { id: 'Ticket', label: 'Tickets & Fares', icon: <Ticket className="w-4 h-4" /> },
        { id: 'Culture', label: 'Unwritten Culture', icon: <BookOpen className="w-4 h-4" /> },
    ];

    // Filter data based on active tab
    const currentData = useMemo(() => {
        return knowledgeData.filter(item => item.category === activeTab);
    }, [activeTab]);

    // Pagination Logic
    const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
    const currentPage = pageState[activeTab];

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return currentData.slice(start, start + ITEMS_PER_PAGE);
    }, [currentData, currentPage]);

    const handlePageChange = (page: number) => {
        setPageState(prev => ({ ...prev, [activeTab]: page }));
    };

    return (
        <>
            <section className="py-16 bg-white dark:bg-gray-900 px-4">
                <div className="max-w-screen-lg mx-auto">
                    <div className="text-center mb-10">
                        <Badge variant="orange" className="mb-3">German Transit Knowledge</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0a2463] dark:text-yellow-300 mb-4">Transit Knowledge Base</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">Your survival guide to the German railway network. Select a topic to learn more.</p>
                    </div>

                    {/* MAIN CONTAINER: Fixed size, shadow, border */}
                    <div className="w-full h-[650px] bg-gray-50 dark:bg-gray-950 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col overflow-hidden">

                        {/* Header / Tabs */}
                        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-center gap-2 md:gap-4 shrink-0 overflow-x-auto">
                            {tabs.map(tab => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap
                                            ${isActive
                                                ? 'bg-[#0a2463] dark:bg-yellow-600 text-white shadow-md'
                                                : 'bg-white dark:bg-gray-800 text-[#0a2463] dark:text-yellow-200 border border-gray-200 dark:border-gray-700 hover:bg-yellow-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {tab.icon} {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8">
                            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {paginatedData.map(item => (
                                    <ShortFormCard
                                        key={item.id}
                                        item={item}
                                        onOpen={setSelectedItem}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Pagination fixed at the bottom of the container */}
                        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shrink-0">
                            {totalPages > 1 && (
                                <NumberedPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    paginationItemsToDisplay={5}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* Renders the Fullscreen Modal if an item is selected */}
            {selectedItem && (
                <LongFormModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </>
    );
};

export default TransitKnowledgeBase;