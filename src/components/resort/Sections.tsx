
"use client"

import React from 'react';
import Image from 'next/image';
import { useResort } from './ResortContext';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ContentSections() {
  const { currentResort } = useResort();

  const aboutImage = PlaceHolderImages.find(i => i.id === 'resort-about');
  const villa1 = PlaceHolderImages.find(i => i.id === 'villa-1');
  const villa2 = PlaceHolderImages.find(i => i.id === 'villa-2');

  return (
    <div className="relative z-10 bg-background pt-24 pb-48">
      {/* About Section */}
      <section className="container mx-auto px-8 mb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-headline leading-tight">
              Where the Ocean Meets <br />
              <span className="text-primary italic">Absolute Serenity</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Our architectural philosophy is simple: let nature speak first. Every villa and sanctuary at {currentResort.name} is meticulously carved into the Balinese landscape, ensuring minimal impact and maximal immersion.
              </p>
              <p>
                From the locally sourced volcanic stone to the reclaimed teakwood, our materials tell a story of sustainability and timeless elegance. Here, luxury isn't about excess—it's about the space between you and the horizon.
              </p>
            </div>
          </div>
          <div className="relative h-[600px] overflow-hidden rounded-2xl shadow-2xl group">
            <Image 
              src={aboutImage?.imageUrl || ""} 
              alt="Architecture" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Villas Section */}
      <section className="bg-muted py-24 mb-48">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <p className="text-sm tracking-widest uppercase font-body text-primary">Your Private Sanctuary</p>
              <h2 className="text-4xl md:text-6xl font-headline">Villas & Suites</h2>
            </div>
            <button className="text-sm tracking-widest uppercase font-body border-b border-foreground/20 pb-2 hover:border-primary transition-colors">
              View All Accommodations
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                name: "Oceanic Infinity Suite", 
                price: "$1,200", 
                img: villa1,
                desc: "A sprawling open-plan sanctuary with a private 15m infinity pool overlooking the Indian Ocean."
              },
              { 
                name: "Tropical Jungle Canopy", 
                price: "$850", 
                img: villa2,
                desc: "Nestled high above the tree line, offering panoramic views of the Sacred Monkey Forest."
              }
            ].map((villa, idx) => (
              <Card key={idx} className="border-none bg-transparent overflow-hidden group shadow-none">
                <div className="relative h-[500px] mb-6 overflow-hidden rounded-xl">
                  <Image 
                    src={villa.img?.imageUrl || ""} 
                    alt={villa.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-sm dark:bg-black/80 rounded-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-xs uppercase tracking-widest text-primary mb-2">Starting from {villa.price} / night</p>
                    <button className="text-sm font-headline font-bold">DISCOVER VILLA →</button>
                  </div>
                </div>
                <CardContent className="px-0">
                  <h3 className="text-2xl font-headline mb-3">{villa.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{villa.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-8 text-center py-24 mb-48">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="w-12 h-1 bg-primary mx-auto opacity-30" />
          <blockquote className="text-3xl md:text-5xl font-headline leading-tight italic">
            "A transcendent experience where time seems to slow down. The architecture blends so perfectly with the jungle that you feel like a guest of nature herself."
          </blockquote>
          <div className="space-y-2">
            <p className="font-headline text-xl">Elena Richardson</p>
            <p className="text-xs tracking-widest uppercase font-body opacity-50">Global Traveler & Architect</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-8 py-24 mb-24">
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
              style={{ backgroundColor: currentResort.accentColor }}
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
            <h2 className="text-2xl font-headline tracking-widest text-primary">SANCTUARY</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A luxury tropical retreat in Bali offering immersive beachfront and jungle sanctuary experiences with refined architectural elegance.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-bold">Discover</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Villas & Suites</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Culinary Journey</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-bold">Experiences</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Spa Sanctuary</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cultural Tours</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Private Events</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-bold">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Ubud, Bali, Indonesia</li>
              <li>concierge@sanctuarybali.com</li>
              <li>+62 361 1234 5678</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
          <p>© 2024 Sanctuary Bali Resort. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
