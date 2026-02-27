'use client';

import React, { useEffect, useRef } from 'react';
import { ResortProvider, useResort } from '@/components/resort/ResortContext';
import { CursorProvider } from '@/components/resort/CursorContext';
import { WebGLHero } from '@/components/resort/WebGLHero';
import { HeroContent } from '@/components/resort/HeroContent';
import { VerticalNav } from '@/components/resort/Navigation';
import { LoadingOverlay } from '@/components/resort/LoadingOverlay';
import { ContentSections } from '@/components/resort/Sections';
import { Header } from '@/components/resort/Header';

function PageContent() {
    const { loadProgress } = useResort();
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let locomotiveScroll: any;

        const initScroll = async () => {
            const LocomotiveScroll = (await import('locomotive-scroll'))
                .default;
            locomotiveScroll = new LocomotiveScroll({
                lenisOptions: {
                    wrapper: window,
                    content: document.documentElement,
                    lerp: 0.1,
                    duration: 1.2,
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                    wheelMultiplier: 1,
                    touchMultiplier: 2,
                    infinite: false,
                },
            });
        };

        if (typeof window !== 'undefined') {
            initScroll();
        }

        return () => {
            if (
                locomotiveScroll &&
                typeof locomotiveScroll.destroy === 'function'
            ) {
                locomotiveScroll.destroy();
            }
        };
    }, []);

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

                    {/* Subtle black overlay for better content contrast */}
                    <div className="absolute inset-0 bg-black/20 z-[5]" />

                    <HeroContent />
                    <VerticalNav />
                </div>
            </section>

            {/* Content Flow - Relative to allow scrolling over background */}
            <Header />
            <div className="relative z-10 bg-background">
                <ContentSections />
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <ResortProvider>
            <CursorProvider>
                <PageContent />
            </CursorProvider>
        </ResortProvider>
    );
}
