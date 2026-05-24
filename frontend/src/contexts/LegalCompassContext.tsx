// contexts/legal_compass/LegalCompassContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { CategoryKey } from '../types/legal_compass';

interface LegalCompassContextType {
    activeCategory: CategoryKey | null;
    setActiveCategory: (category: CategoryKey | null) => void;
    activeSubTag: string | null;
    setActiveSubTag: (tag: string | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const LegalCompassContext = createContext<LegalCompassContextType | undefined>(undefined);

export const LegalCompassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
    const [activeSubTag, setActiveSubTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <LegalCompassContext.Provider value={{
            activeCategory, setActiveCategory,
            activeSubTag, setActiveSubTag,
            searchQuery, setSearchQuery
        }}>
            {children}
        </LegalCompassContext.Provider>
    );
};

export const useLegalCompass = () => {
    const context = useContext(LegalCompassContext);
    if (!context) throw new Error('useLegalCompass must be used within LegalCompassProvider');
    return context;
};