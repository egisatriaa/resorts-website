'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from 'framer-motion';

type CursorState = {
    active: boolean;
    text: string;
};

type CursorContextType = {
    setCursor: (state: Partial<CursorState>) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [cursor, setCursorState] = useState<CursorState>({
        active: false,
        text: 'DRAG',
    });

    // Use Framer Motion's values for buttery smooth 60fps tracking without React re-renders
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 400, mass: 0.3 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    const setCursor = (state: Partial<CursorState>) => {
        setCursorState((prev) => ({ ...prev, ...state }));
    };

    return (
        <CursorContext.Provider value={{ setCursor }}>
            {children}
            <AnimatePresence>
                {cursor.active && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                        }}
                    >
                        <div className="bg-[#2a3036]/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-2xl border border-white/10 flex items-center justify-center">
                            <span
                                className="text-white text-[9px] font-bold tracking-[0.2em] uppercase"
                                style={{
                                    textShadow:
                                        '1px 0 0 rgba(255,0,0,0.7), -1px 0 0 rgba(0,255,255,0.7)',
                                }}
                            >
                                {cursor.text}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
}
