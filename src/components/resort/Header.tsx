'use client';

import React, { useState, useEffect } from 'react';
import { useResort } from './ResortContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
    const { currentResort } = useResort();
    const [headerMode, setHeaderMode] = useState<'initial' | 'sticky' | 'none'>(
        'initial',
    );

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            // Originally 0.05 and 0.15 of a 300vh scrollable distance = 0.15vh and 0.45vh
            const threshold1 = window.innerHeight * 0.15;
            const threshold2 = window.innerHeight * 0.45;

            if (scroll < threshold1) {
                setHeaderMode((prev) =>
                    prev !== 'initial' ? 'initial' : prev,
                );
            } else if (scroll > threshold2) {
                setHeaderMode((prev) => (prev !== 'sticky' ? 'sticky' : prev));
            } else {
                setHeaderMode((prev) => (prev !== 'none' ? 'none' : prev));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Villas', href: '#villas' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Reserve', href: '#reserve' },
    ];

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Shared typography constants to ensure balance
    const logoStyles = 'font-headline font-bold tracking-[0.3em] uppercase';
    const navStyles =
        'text-[15px] md:text-[16px] uppercase tracking-[0.3em] font-body transition-all duration-300';

    return (
        <AnimatePresence mode="wait">
            {headerMode === 'initial' && (
                <motion.header
                    key="initial-header"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute top-0 left-0 right-0 z-50 w-full"
                >
                    <div className="w-full flex items-center justify-between px-8 md:px-24 py-10 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-[2px]">
                        {/* Logo */}
                        <div className={`${logoStyles} text-2xl text-white`}>
                            SANCTUARY
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-4 lg:gap-8">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            onClick={(e) =>
                                                handleNavClick(e, item.href)
                                            }
                                            className={`${navStyles} px-5 py-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300 flex items-center justify-center`}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Status/Location with matching typography */}
                        <div className="hidden sm:flex items-center gap-6">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-body">
                                    Bali, Indonesia
                                </span>
                                <div className="w-8 h-[1px] bg-white/20 mt-1" />
                            </div>
                        </div>
                    </div>
                </motion.header>
            )}

            {headerMode === 'sticky' && (
                <motion.header
                    key="sticky-header"
                    initial={{ y: -100, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -100, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-4 rounded-full bg-background/70 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                        {/* Logo - Synced with Initial */}
                        <div className={`${logoStyles} text-xl text-primary`}>
                            SANCTUARY
                        </div>

                        {/* Navigation - Synced with Initial */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center gap-2">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            onClick={(e) =>
                                                handleNavClick(e, item.href)
                                            }
                                            className={`${navStyles} px-5 py-2.5 rounded-full text-foreground/70 hover:text-white hover:bg-black/80 dark:hover:bg-white/20 transition-all duration-300 flex items-center justify-center`}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Action - More prominent but balanced */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                document
                                    .getElementById('reserve')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                                backgroundColor: currentResort.accentColor,
                            }}
                            className="px-8 py-2.5 rounded-full text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg"
                        >
                            Book Your Stay
                        </button>
                    </div>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
