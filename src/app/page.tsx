
"use client"

import React, { useEffect } from 'react';
import { ResortProvider, useResort } from '@/components/resort/ResortContext';
import { WebGLHero } from '@/components/resort/WebGLHero';
import { HeroContent } from '@/components/resort/HeroContent';
import { VerticalNav } from '@/components/resort/Navigation';
import { LoadingOverlay } from '@/components/resort/LoadingOverlay';
import { ContentSections } from '@/components/resort/Sections';

function PageContent() {
  const { setScrollProgress, loadProgress } = useResort();

  useEffect(() => {
    // Reveal hero only after minimum 30% frames are ready
    if (loadProgress < 30) return;

    let locomotiveScroll: any;
    
    const initScroll = async () => {
      // Locomotive Scroll v5 is a light wrapper using native scroll.
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScroll();
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // The hero section is 100vh. We want progress 0 -> 1 as we scroll through it.
      // progress = 0 at scroll top, progress = 1 when hero is fully scrolled out.
      const progress = Math.min(1, Math.max(0, scrollY / viewportHeight));
      setScrollProgress(progress);
    };

    initScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set progress based on current position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (locomotiveScroll && typeof locomotiveScroll.destroy === 'function') {
        locomotiveScroll.destroy();
      }
    };
  }, [setScrollProgress, loadProgress]);

  return (
    <div className="relative bg-background">
      <LoadingOverlay />
      
      {/* Cinematic Hero - Fixed and exactly 100vh */}
      <section className="relative h-screen w-full overflow-hidden">
        <WebGLHero />
        <HeroContent />
        <VerticalNav />
      </section>

      {/* Content Flow - Relative to allow scrolling over background */}
      <div className="relative z-10">
        <ContentSections />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ResortProvider>
      <PageContent />
    </ResortProvider>
  );
}
