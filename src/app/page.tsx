
"use client"

import React, { useEffect, useRef } from 'react';
import { ResortProvider, useResort } from '@/components/resort/ResortContext';
import { WebGLHero } from '@/components/resort/WebGLHero';
import { HeroContent } from '@/components/resort/HeroContent';
import { VerticalNav } from '@/components/resort/Navigation';
import { LoadingOverlay } from '@/components/resort/LoadingOverlay';
import { ContentSections } from '@/components/resort/Sections';

function PageContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setScrollProgress, loadProgress } = useResort();

  useEffect(() => {
    // Reveal hero only after minimum 30% frames are ready
    if (loadProgress < 30) return;

    let locomotiveScroll: any;
    const initScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1.0,
        lerp: 0.1,
      });

      // Map scroll progress (0 -> 1)
      locomotiveScroll.on('scroll', (args: any) => {
        const progress = args.scroll.y / args.limit.y;
        setScrollProgress(progress);
      });
    };

    initScroll();
    return () => locomotiveScroll?.destroy();
  }, [setScrollProgress, loadProgress]);

  return (
    <div ref={scrollRef} data-scroll-container className="relative bg-background">
      <LoadingOverlay />
      
      {/* Cinematic Hero */}
      <section className="relative h-screen w-full" data-scroll-section>
        <WebGLHero />
        <HeroContent />
        <VerticalNav />
      </section>

      {/* Content Flow */}
      <div data-scroll-section>
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
