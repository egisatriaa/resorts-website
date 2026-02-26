
"use client"

import React, { useEffect, useState } from 'react';
import { useResort } from './ResortContext';

export function LoadingOverlay() {
  const { loadProgress } = useResort();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (loadProgress >= 100) {
      const timer = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [loadProgress]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F0F4F5] dark:bg-[#0B151A] transition-opacity duration-1000 ${loadProgress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center space-y-8 max-w-xs w-full">
        <h1 className="text-4xl font-headline tracking-widest text-primary animate-pulse">SANCTUARY</h1>
        <div className="relative h-[2px] w-full bg-muted overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-body tracking-[0.3em] text-muted-foreground uppercase">{Math.round(loadProgress)}% CINEMATIC ASSETS LOADED</p>
          {loadProgress < 30 && (
            <p className="text-[9px] text-primary/60 tracking-widest uppercase">Initializing Drone Sequence...</p>
          )}
        </div>
      </div>
    </div>
  );
}
