"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useResort } from './ResortContext';

const TOTAL_FRAMES = 105;
const FRAME_START = 0;
const FRAME_END = 104;

export function WebGLHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentResort, isChanging } = useResort();
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Progressive Loading
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = FRAME_START; i <= FRAME_END; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/resorts/frame_${frameNum}_delay-0.04s.webp`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Scroll Handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setProgress(scrollFraction);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const frameIndex = Math.min(
        FRAME_END,
        Math.floor(progress * TOTAL_FRAMES)
      );
      
      const img = imagesRef.current[frameIndex];
      
      if (img && img.complete) {
        // High performance clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Aspect ratio cover logic
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [progress, loadedCount]);

  return (
    <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
