'use client';

import React from 'react';
import { useResort } from './ResortContext';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function VerticalNav() {
    const { currentResort, nextVariation, prevVariation, isChanging } =
        useResort();

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-8">
            <div className="text-4xl font-headline text-white drop-shadow-md opacity-90">
                0{currentResort.id}
            </div>

            <div className="flex flex-col items-center space-y-4">
                <button
                    onClick={prevVariation}
                    disabled={isChanging}
                    className="p-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 shadow-xl transition-all duration-300 group relative flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="absolute right-full mr-4 text-[10px] tracking-widest uppercase font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md text-white">
                        Previous Resort
                    </span>
                    <ChevronUp className="w-5 h-5 text-white opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5" />
                </button>

                <div className="w-[1px] h-24 bg-white/20 relative shadow-xl">
                    <div
                        className={`absolute w-[1px] h-1/3 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-700`}
                        style={{ top: `${(currentResort.id - 1) * 33.3}%` }}
                    />
                </div>

                <button
                    onClick={nextVariation}
                    disabled={isChanging}
                    className="p-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 shadow-xl transition-all duration-300 group relative flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="absolute right-full mr-4 text-[10px] tracking-widest uppercase font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md text-white">
                        Next Resort
                    </span>
                    <ChevronDown className="w-5 h-5 text-white opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0.5" />
                </button>
            </div>

            <div
                className="vertical-text tracking-[0.3em] text-[10px] uppercase text-white opacity-80 rotate-180 drop-shadow-md"
                style={{ writingMode: 'vertical-rl' }}
            >
                Discover More
            </div>
        </div>
    );
}
