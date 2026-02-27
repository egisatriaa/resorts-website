'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const VILLA_VIEWS = [
    'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/view-1.webp',
    'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/view-2.webp',
    'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/view-3.webp',
    'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/view-4.webp',
    'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/view-5.webp',
    'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/view-6.webp',
];

export function VillaSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);

    // Parallax logic
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Move the background image container vertically as we scroll for high-depth parallax
    // Range balanced to 15% to avoid requiring a massive image scale
    const yParallax = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

    const paginate = (newDirection: number) => {
        setIsAutoPlaying(false);
        setCurrentIndex(
            (prev) =>
                (prev + newDirection + VILLA_VIEWS.length) % VILLA_VIEWS.length,
        );
    };

    // Auto-play for Ken Burns showcase
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % VILLA_VIEWS.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black group"
        >
            {/* Gallery Label */}
            <div className="absolute top-12 left-8 md:left-24 z-30 flex items-center gap-4">
                <div className="w-8 h-[1px] bg-white/40" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/80 font-body">
                    Gallery
                </span>
            </div>

            {/* Slider Content */}
            <div className="relative w-full h-full">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
                        }}
                        className="absolute inset-0 w-full h-full overflow-hidden"
                    >
                        {/* Parallax Wrapper with balanced bounds */}
                        <motion.div
                            style={{ y: yParallax }}
                            className="absolute inset-[-13%] w-[120%] h-[125%]"
                        >
                            {/* Ken Burns Image Container */}
                            <motion.div
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.05 }}
                                transition={{
                                    duration: 10,
                                    ease: 'linear',
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                }}
                                className="w-full h-full"
                            >
                                <Image
                                    src={VILLA_VIEWS[currentIndex]}
                                    alt={`Villa View ${currentIndex + 1}`}
                                    fill
                                    priority
                                    className="object-cover brightness-90 transition-opacity duration-1000"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Vignette Overlay (Deeper for cinematic feel) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* Bottom Controls Wrapper */}
            <div className="absolute bottom-12 left-8 right-8 md:left-24 md:right-24 z-30 flex flex-col md:flex-row items-end justify-between gap-8">
                {/* Interaction & Counter */}
                <div className="flex flex-col items-start gap-6">
                    {/* Mode Toggle Pills */}
                    <div className="flex items-center p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                        <button className="px-6 py-2 rounded-full text-[9px] uppercase tracking-widest bg-white/10 text-white font-bold">
                            Villas
                        </button>
                        <button className="px-6 py-2 rounded-full text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                            Residences
                        </button>
                    </div>

                    {/* Counter with Motion reveal */}
                    <div className="flex items-end gap-3 overflow-hidden h-32 pb-2">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentIndex}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.5, ease: 'circOut' }}
                                className="text-6xl md:text-8xl font-headline font-bold text-white block leading-none"
                            >
                                {String(currentIndex + 1).padStart(2, '0')}
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-xl md:text-3xl font-headline text-white/20 mb-2">
                            / {String(VILLA_VIEWS.length).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => paginate(-1)}
                        className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-500 transform active:scale-90"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-500 transform active:scale-90"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Decorative Side Line */}
            <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1px] bg-white/5 z-20" />
        </section>
    );
}
