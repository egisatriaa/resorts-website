"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ResortVariation = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  mode: 'light' | 'dark' | 'cinematic';
};

const VARIATIONS: ResortVariation[] = [
  {
    id: 1,
    name: "THE SANCTUARY UBUD",
    tagline: "A Private Escape Above the Ocean",
    description: "Experience the ultimate harmony between modern architecture and Balinese nature. Our sanctuaries offer unparalleled serenity amidst the lush tropical canopy.",
    accentColor: "#4DABCC",
    mode: 'cinematic',
  },
  {
    id: 2,
    name: "AMETHYST COVE",
    tagline: "Where the Jungle Meets the Sea",
    description: "Immerse yourself in a secluded paradise where the sound of the ocean serenades your soul. A masterclass in sustainable luxury and organic design.",
    accentColor: "#E6BE7A",
    mode: 'light',
  },
  {
    id: 3,
    name: "VILLA NIRVANA",
    tagline: "Timeless Luxury, Ancient Soul",
    description: "A retreat crafted for those who seek deep relaxation. Every element is inspired by traditional Balinese philosophy and contemporary comfort.",
    accentColor: "#8A7E72",
    mode: 'dark',
  }
];

type ResortContextType = {
  currentResort: ResortVariation;
  setVariation: (id: number) => void;
  nextVariation: () => void;
  prevVariation: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isChanging: boolean;
};

const ResortContext = createContext<ResortContextType | undefined>(undefined);

export function ResortProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isChanging, setIsChanging] = useState(false);

  const currentResort = VARIATIONS[index];

  const setVariation = (id: number) => {
    setIsChanging(true);
    setTimeout(() => {
      const idx = VARIATIONS.findIndex(v => v.id === id);
      if (idx !== -1) setIndex(idx);
      setIsChanging(false);
    }, 800);
  };

  const nextVariation = () => {
    setIsChanging(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % VARIATIONS.length);
      setIsChanging(false);
    }, 800);
  };

  const prevVariation = () => {
    setIsChanging(true);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + VARIATIONS.length) % VARIATIONS.length);
      setIsChanging(false);
    }, 800);
  };

  useEffect(() => {
    // Update body class for dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ResortContext.Provider value={{ 
      currentResort, 
      setVariation, 
      nextVariation, 
      prevVariation, 
      theme, 
      setTheme,
      isChanging
    }}>
      {children}
    </ResortContext.Provider>
  );
}

export const useResort = () => {
  const context = useContext(ResortContext);
  if (!context) throw new Error("useResort must be used within a ResortProvider");
  return context;
};
