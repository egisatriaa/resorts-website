'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useResort } from './ResortContext';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { VillaSlider } from './VillaSlider';
import { useCursor } from './CursorContext';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const TESTIMONIALS = [
    {
        quote: 'A transcendent experience where time seems to slow down. The architecture blends so perfectly with the landscape that you feel like a guest of nature herself.',
        name: 'Elena Richardson',
        title: 'Global Traveler & Architect',
    },
    {
        quote: 'From the moment we arrived, we were enveloped in absolute serenity. The attention to detail in the villas and the personalized service are unmatched.',
        name: 'Marcus Wong',
        title: 'Creative Director',
    },
    {
        quote: "Sanctuary isn't just a place to stay; it's a profound journey into tranquility. Waking up to the sound of the ocean and the lush surroundings was pure magic.",
        name: 'Sophia Laurent',
        title: 'Wellness Advocate',
    },
    {
        quote: 'An absolute masterpiece of design and hospitality. The private villas offer an unparalleled sense of seclusion, making it the perfect retreat from the world.',
        name: 'James Harrington',
        title: 'CEO & Founder',
    },
    {
        quote: 'The culinary experiences combined with the breathtaking sunset views created memories we will cherish forever. Every detail was flawlessly executed.',
        name: 'Isabella Chen',
        title: 'Food Critic',
    },
    {
        quote: 'I have traveled the world, but the dedication to sustainability and deep connection to Balinese culture here is truly unique. A must-visit luxury destination.',
        name: "Liam O'Connor",
        title: 'Documentary Filmmaker',
    },
];

export function ContentSections() {
    const { currentResort } = useResort();
    const { setCursor } = useCursor();
    const [currentAboutIndex, setCurrentAboutIndex] = useState(0);

    const ABOUT_IMAGES = [
        'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/ocean-view1.jpg',
        'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/ocean-view2.jpg',
        'https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/villa/ocean-view3.jpg',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAboutIndex((prev) => (prev + 1) % ABOUT_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative z-10 bg-background pt-24 pb-0">
            {/* About Section */}
            <section id="about" className="container mx-auto px-8 mb-48">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-headline leading-tight">
                            Where the Ocean Meets <br />
                            <span className="text-primary italic">
                                Absolute Serenity
                            </span>
                        </h2>
                        <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                            <p>
                                Our architectural philosophy is simple: let
                                nature speak first. Every villa and sanctuary at{' '}
                                {currentResort.name} is meticulously carved into
                                the Balinese landscape, ensuring minimal impact
                                and maximal immersion.
                            </p>
                            <p>
                                From the locally sourced volcanic stone to the
                                reclaimed teakwood, our materials tell a story
                                of sustainability and timeless elegance. Here,
                                luxury isn't about excess—it's about the space
                                between you and the horizon.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[600px] overflow-hidden rounded-2xl shadow-2xl group bg-black/5">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={currentAboutIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 1.5,
                                    ease: 'easeInOut',
                                }}
                                className="absolute inset-0"
                            >
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
                                        src={ABOUT_IMAGES[currentAboutIndex]}
                                        alt={`Architecture ${currentAboutIndex + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Villas Gallery Slider */}
            <div id="villas" className="mb-48">
                <VillaSlider />
            </div>

            {/* Testimonials - Shadcn Carousel */}
            <section
                id="testimonials"
                className="container mx-auto px-8 py-24 mb-48"
            >
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-xs tracking-[0.4em] uppercase text-primary/80 font-bold">
                        Guest Stories
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-headline">
                        Voices of Sanctuary
                    </h3>
                </div>

                <div
                    className="w-full max-w-7xl mx-auto px-4 cursor-grab active:cursor-grabbing"
                    onMouseEnter={() =>
                        setCursor({ active: true, text: 'DRAG' })
                    }
                    onMouseLeave={() => setCursor({ active: false })}
                >
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 2500,
                                stopOnInteraction: false,
                                stopOnMouseEnter: true,
                            }),
                        ]}
                        className="w-full relative"
                    >
                        <CarouselContent className="-ml-4 md:-ml-8">
                            {TESTIMONIALS.map((testimonial, idx) => (
                                <CarouselItem
                                    key={idx}
                                    className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/3"
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.02,
                                            backgroundColor:
                                                currentResort.accentColor,
                                            color: '#ffffff',
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeOut',
                                        }}
                                        className="h-full p-10 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-8 select-none group min-h-[320px]"
                                    >
                                        <p className="text-lg md:text-xl italic leading-relaxed opacity-90 transition-opacity duration-300">
                                            "{testimonial.quote}"
                                        </p>
                                        <div className="space-y-1">
                                            <p className="font-headline text-lg font-bold">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-xs tracking-widest uppercase font-body opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                                                {testimonial.title}
                                            </p>
                                        </div>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:flex items-center justify-end gap-4 mt-8">
                            <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-transparent border-white/20 hover:bg-white/10 hover:text-white" />
                            <CarouselNext className="static translate-y-0 h-14 w-14 bg-transparent border-white/20 hover:bg-white/10 hover:text-white" />
                        </div>
                    </Carousel>
                </div>
            </section>

            {/* Final CTA */}
            <section
                id="reserve"
                className="container mx-auto px-8 py-24 mb-24"
            >
                <div className="relative h-[600px] rounded-3xl overflow-hidden flex items-center justify-center text-center">
                    <Image
                        src="https://picsum.photos/seed/bali-final/1920/1080"
                        alt="Final Call"
                        fill
                        className="object-cover brightness-50"
                    />
                    <div className="relative z-10 space-y-10 max-w-2xl px-8">
                        <h2 className="text-5xl md:text-7xl font-headline text-white leading-tight">
                            Escape to Timeless Bali
                        </h2>
                        <button
                            className="px-12 py-5 rounded-full text-white uppercase tracking-widest text-xs font-body shadow-2xl transition-transform hover:scale-105"
                            style={{
                                backgroundColor: currentResort.accentColor,
                            }}
                        >
                            Reserve Your Experience
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-8 pt-24 pb-12 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <h2 className="text-2xl font-headline tracking-widest text-primary">
                            SANCTUARY
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A luxury tropical retreat in Bali offering immersive
                            beachfront and jungle sanctuary experiences with
                            refined architectural elegance.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest font-bold">
                            Discover
                        </h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Our Story
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Villas & Suites
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Culinary Journey
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest font-bold">
                            Experiences
                        </h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Spa Sanctuary
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Cultural Tours
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Private Events
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest font-bold">
                            Contact
                        </h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>Nusa Dua, Bali, Indonesia</li>
                            <li>concierge@sanctuarybali.com</li>
                            <li>+62 361 1234 5678</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <p>© 2024 Sanctuary Bali Resort. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-primary">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-primary">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-primary">
                            Instagram
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
