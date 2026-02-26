
"use client"

import React, { useEffect, useRef } from 'react';
import { ResortProvider, useResort } from '@/components/resort/ResortContext';
import { WebGLHero } from '@/components/resort/WebGLHero';
import { HeroContent } from '@/components/resort/HeroContent';
import { VerticalNav } from '@/components/resort/Navigation';
import { LoadingOverlay } from '@/components/resort/LoadingOverlay';
import { ContentSections } from '@/components/resort/Sections';

function PageContent() {
  const { setScrollProgress, loadProgress } = useResort();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal hero only after minimum 30% frames are ready
    if (loadProgress < 30) return;

    let locomotiveScroll: any;
    
    const initScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScroll();
    };

    const handleScroll = () => {
      if (!heroRef.current) return;

      const hero = heroRef.current;
      const heroTop = hero.offsetTop;
      const heroHeight = hero.offsetHeight;
      
      // Calculate scroll position relative to the hero section
      const scrollPosition = window.scrollY - heroTop;
      
      // Calculate normalized progress (0 -> 1)
      // We use (heroHeight - window.innerHeight) because progress is complete 
      // when the bottom of the section reaches the bottom of the viewport.
      const scrollableDistance = heroHeight - window.innerHeight;
      const progress = Math.min(
        Math.max(scrollPosition / scrollableDistance, 0),
        1
      );

      setScrollProgress(progress);
    };

    initScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set progress
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
      
      {/* Cinematic Hero Wrapper - 400vh height to allow full animation scroll */}
      <section 
        ref={heroRef}
        className="relative h-[400vh] w-full" 
        data-scroll-section
        data-scroll-id="hero"
      >
        {/* Sticky container to keep the canvas and content in view while scrolling the 400vh */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <WebGLHero />
          <HeroContent />
          <VerticalNav />
        </div>
      </section>

      {/* Content Flow - Relative to allow scrolling over background */}
      <div className="relative z-10 bg-background">
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
