"use client"

import React from 'react';
import { useResort } from './ResortContext';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function VerticalNav() {
  const { currentResort, nextVariation, prevVariation, isChanging } = useResort();

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-8">
      <div className="text-4xl font-headline opacity-60">0{currentResort.id}</div>
      
      <div className="flex flex-col items-center space-y-4">
        <button 
          onClick={prevVariation}
          disabled={isChanging}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors group"
        >
          <span className="sr-only">Previous Variation</span>
          <ChevronUp className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
        </button>
        
        <div className="w-[1px] h-24 bg-foreground/20 relative">
          <div 
            className={`absolute w-[1px] h-1/3 bg-primary transition-all duration-700`}
            style={{ top: `${(currentResort.id - 1) * 33.3}%` }}
          />
        </div>

        <button 
          onClick={nextVariation}
          disabled={isChanging}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors group"
        >
          <span className="sr-only">Next Variation</span>
          <ChevronDown className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <div className="vertical-text tracking-[0.3em] text-[10px] uppercase opacity-40 rotate-180" style={{ writingMode: 'vertical-rl' }}>
        Discover More
      </div>
    </div>
  );
}
