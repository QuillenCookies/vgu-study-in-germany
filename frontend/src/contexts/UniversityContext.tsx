import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { LocationType, LocationState } from '../types/university';

export type { LocationType, LocationState };

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
