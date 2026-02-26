"use client"

import React from 'react';
import { useResort } from './ResortContext';
import { Button } from '@/components/ui/button';

export function HeroContent() {
  const { currentResort, isChanging } = useResort();

  return (
    <div className="relative z-10 min-h-screen flex items-center px-8 md:px-24">
      <div className={`max-w-2xl space-y-8 transition-all duration-1000 ${isChanging ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
        <div className="space-y-2">
          <p className="text-sm tracking-[0.4em] uppercase font-body text-primary opacity-90">
            {currentResort.tagline}
          </p>
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight tracking-tight text-white drop-shadow-lg">
            {currentResort.name}
          </h1>
        </div>
        
        <p className="text-lg md:text-xl font-body text-white/80 leading-relaxed max-w-lg drop-shadow">
          {currentResort.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 py-6 border-white text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-xs"
          >
            Explore Resort
          </Button>
          <Button 
            size="lg" 
            style={{ backgroundColor: currentResort.accentColor }}
            className="rounded-full px-8 py-6 text-white border-none hover:brightness-110 transition-all duration-500 uppercase tracking-widest text-xs shadow-xl"
          >
            Book Your Stay
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-50">
        <div className="w-[1px] h-12 bg-white/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
        <span className="text-[10px] tracking-widest uppercase text-white font-body">Scroll to explore</span>
      </div>
    </div>
  );
}
