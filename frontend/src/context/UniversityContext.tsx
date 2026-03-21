import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

export type LocationType = 'city' | 'university';

export interface LocationState {
  id: number;
  name: string;
  type: LocationType;
}

interface UniversityContextType {
  selectedLocation: LocationState | null;
  setSelectedLocation: (location: LocationState | null) => void;
}

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

export const UniversityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationState | null>(null);

  return (
    <UniversityContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </UniversityContext.Provider>
  );
};

export const useUniversity = (): UniversityContextType => {
  const context = useContext(UniversityContext);
  if (!context) {
    throw new Error('useUniversity must be used within a UniversityProvider');
  }
  return context;
};
