'use client';

import React, { useState, useEffect } from 'react';
import { useResort } from './ResortContext';
import { Button } from '@/components/ui/button';

export function HeroContent() {
    const { currentResort, isChanging } = useResort();
    const [localScrollProgress, setLocalScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            // The Hero section has 400vh height total, meaning 300vh of scrollable space
            const scrollableDistance = window.innerHeight * 3;
            const progress = Math.min(
                Math.max(scroll / scrollableDistance, 0),
                1,
            );
            setLocalScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial measure

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation constants
    const startScale = 1;
    const endScale = 0.5;
    const scale = startScale - localScrollProgress * (startScale - endScale);

    // As localScrollProgress goes from 0 to 1:
    // - opacity of other elements should go from 1 to 0
    // - translateY of the title container should move it towards the top
    const contentOpacity = Math.max(0, 1 - localScrollProgress * 3); // Fades out early

    return (
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 md:px-24">
            <div
                className={`w-full flex flex-col items-center text-center transition-all duration-1000 ${isChanging ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
            >
                <div
                    style={{
                        transform: `translateY(${localScrollProgress * -35}vh) scale(${scale})`,
                        transition: 'transform 0.1s ease-out',
                    }}
                    className="space-y-4 will-change-transform"
                >
                    <p
                        style={{ opacity: contentOpacity }}
                        className="text-md tracking-[0.4em] uppercase font-bold bg-gradient-to-r from-white to-cyan-600 bg-clip-text text-transparent opacity-20 transition-opacity duration-300"
                    >
                        {currentResort.tagline}
                    </p>
                    <h1
                        style={{ opacity: contentOpacity }}
                        className="text-4xl md:text-8xl font-headline font-bold leading-tight tracking-tight text-white drop-shadow-2xl uppercase transition-opacity duration-300"
                    >
                        {currentResort.name}
                    </h1>
                </div>

                <div
                    style={{ opacity: contentOpacity }}
                    className="mt-8 space-y-8 flex flex-col items-center transition-opacity duration-300"
                >
                    <p className="text-lg md:text-xl font-body text-white/80 leading-relaxed max-w-lg drop-shadow">
                        {currentResort.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-6 text-gray-900 hover:bg-green-400 hover:font-bold hover:scale-105 transition-all duration-500 uppercase tracking-widest text-xs"
                        >
                            Explore Resort
                        </Button>
                        <Button
                            size="lg"
                            style={{
                                backgroundColor: currentResort.accentColor,
                            }}
                            className="rounded-full px-8 py-6 text-white border-none hover:scale-105 hover:brightness-105 transition-all duration-500 uppercase tracking-widest text-sm shadow-xl"
                        >
                            Book Your Stay
                        </Button>
                    </div>
                </div>
            </div>

            {/* Secondary Luxury Text Sequence - Appears on Scroll */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 md:px-16"
                style={{
                    // Fade in after the main content fades out (progress > 0.3)
                    opacity: Math.max(0, (localScrollProgress - 0.3) * 2.5),
                    // Slight upward parallax
                    transform: `translateY(${-50 + localScrollProgress * 20}px) scale(${1 + (localScrollProgress - 0.3) * 0.1})`,
                    transition:
                        'opacity 0.1s ease-out, transform 0.1s ease-out',
                }}
            >
                <div className="text-center text-white drop-shadow-xl max-w-6xl mx-auto px-6 antialiased">
                    <h2 className="playfair-title font-light uppercase leading-[1.2] tracking-tight">
                        {/* Row 1 */}
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                            {currentResort.secondaryText.row1Main}
                            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans tracking-[0.15em] mx-3 align-middle font-light text-white/90">
                                {currentResort.secondaryText.row1Highlight}
                            </span>
                            {currentResort.secondaryText.row1Tail}
                        </div>

                        {/* Row 2 */}
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-3">
                            {currentResort.secondaryText.row2Main}
                            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans tracking-[0.15em] mx-3 align-middle font-light text-white/90">
                                {currentResort.secondaryText.row2Highlight}
                            </span>
                        </div>

                        {/* Row 3 */}
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-3">
                            {currentResort.secondaryText.row3Main}
                        </div>
                    </h2>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                style={{ opacity: contentOpacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 transition-opacity duration-300"
            >
                <div className="w-[4px] h-12 bg-white/20 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-white animate-bounce"
                        style={{ animationDuration: '2s' }}
                    />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-white font-body">
                    Scroll to explore
                </span>
            </div>
        </div>
    );
}
