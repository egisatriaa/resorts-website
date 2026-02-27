'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ResortVariation = {
    id: number;
    name: string;
    tagline: string;
    description: string;
    accentColor: string;
    mode: 'light' | 'dark' | 'cinematic';
    secondaryText: {
        row1Main: string;
        row1Highlight: string;
        row1Tail: string;
        row2Main: string;
        row2Highlight: string;
        row3Main: string;
    };
};

const VARIATIONS: ResortVariation[] = [
    {
        id: 1,
        name: 'THE SANCTUARY BALI',
        tagline: 'A Private Escape Above the Ocean',
        description:
            'Where modern elegance meets the spirit of Bali. Private villas embraced by lush nature, crafted for serene escapes, romantic moments, and unforgettable family stays.',
        accentColor: '#2F86A6',
        mode: 'cinematic',
        secondaryText: {
            row1Main: 'Panoramic',
            row1Highlight: 'Views,',
            row1Tail: 'Spacious Layouts,',
            row2Main: 'Gated Community — Spending Time',
            row2Highlight: 'At',
            row3Main: 'Home Is Simply A Pleasure.',
        },
    },
    {
        id: 2,
        name: 'AMETHYST COVE',
        tagline: 'Where the Jungle Meets the Sea',
        description:
            'Immerse yourself in a secluded paradise where the sound of the ocean serenades your soul. A masterclass in sustainable luxury and organic design.',
        accentColor: '#a37a33ff',
        mode: 'light',
        secondaryText: {
            row1Main: 'Untouched',
            row1Highlight: 'Nature,',
            row1Tail: 'Private Beaches,',
            row2Main: 'Tropical Sanctuary — Finding Peace',
            row2Highlight: 'By',
            row3Main: 'The Sea Is Rejuvenating.',
        },
    },
    {
        id: 3,
        name: 'VILLA NIRVANA',
        tagline: 'Timeless Luxury, Ancient Soul',
        description:
            'A retreat crafted for those who seek deep relaxation. Every element is inspired by traditional Balinese philosophy and contemporary comfort.',
        accentColor: '#5C4E40',
        mode: 'dark',
        secondaryText: {
            row1Main: 'Ancient',
            row1Highlight: 'Wisdom,',
            row1Tail: 'Modern Comfort,',
            row2Main: 'Soulful Architecture — Returning',
            row2Highlight: 'To',
            row3Main: 'Balance Feels Effortless.',
        },
    },
];

type ResortContextType = {
    currentResort: ResortVariation;
    setVariation: (id: number) => void;
    nextVariation: () => void;
    prevVariation: () => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    isChanging: boolean;
    loadProgress: number;
    setLoadProgress: (progress: number) => void;
    scrollProgress: number;
    setScrollProgress: (progress: number) => void;
};

const ResortContext = createContext<ResortContextType | undefined>(undefined);

export function ResortProvider({ children }: { children: React.ReactNode }) {
    const [index, setIndex] = useState(0);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isChanging, setIsChanging] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const currentResort = VARIATIONS[index];

    const setVariation = (id: number) => {
        setIsChanging(true);
        setTimeout(() => {
            const idx = VARIATIONS.findIndex((v) => v.id === id);
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
            setIndex(
                (prev) => (prev - 1 + VARIATIONS.length) % VARIATIONS.length,
            );
            setIsChanging(false);
        }, 800);
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ResortContext.Provider
            value={{
                currentResort,
                setVariation,
                nextVariation,
                prevVariation,
                theme,
                setTheme,
                isChanging,
                loadProgress,
                setLoadProgress,
                scrollProgress,
                setScrollProgress,
            }}
        >
            {children}
        </ResortContext.Provider>
    );
}

export const useResort = () => {
    const context = useContext(ResortContext);
    if (!context)
        throw new Error('useResort must be used within a ResortProvider');
    return context;
};
