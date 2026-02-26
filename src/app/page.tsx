import React from 'react';
import { ResortProvider } from '@/components/resort/ResortContext';
import { WebGLHero } from '@/components/resort/WebGLHero';
import { HeroContent } from '@/components/resort/HeroContent';
import { VerticalNav } from '@/components/resort/Navigation';
import { LoadingOverlay } from '@/components/resort/LoadingOverlay';
import { ContentSections } from '@/components/resort/Sections';

export default function Home() {
  return (
    <ResortProvider>
      <main className="relative bg-background">
        <LoadingOverlay />
        
        {/* Cinematic Hero */}
        <section className="relative h-screen w-full">
          <WebGLHero />
          <HeroContent />
          <VerticalNav />
        </section>

        {/* Parallax Content Flow */}
        <ContentSections />
      </main>
    </ResortProvider>
  );
}
