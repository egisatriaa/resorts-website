"use client"

import React, { useEffect, useState } from 'react';
import { useResort } from './ResortContext';

export function LoadingOverlay() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F0F4F5] dark:bg-[#0B151A] transition-opacity duration-1000">
      <div className="text-center space-y-8 max-w-xs w-full">
        <h1 className="text-4xl font-headline tracking-widest text-primary">SANCTUARY</h1>
        <div className="relative h-[2px] w-full bg-muted overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm font-body tracking-[0.2em] text-muted-foreground uppercase">{progress}% PRELOADING EXPERIENCE</p>
      </div>
    </div>
  );
}
