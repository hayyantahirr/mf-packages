"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Award, Zap, Globe } from "lucide-react";
import Link from "next/link";

const galleryImages = [
  "/carousel/coffee-flat-bottom.png",
  "/carousel/almunium-retort-pouch.png",
  "/carousel/brown-kraft-flat-bottom.png",
  "/carousel/front-transparent-back-almunium.png",
  "/carousel/brown-kraft-almunium-lamination.png",
];

const features = [
  {
    icon: <Award className="text-[#1B3022]" size={20} />,
    title: "High-Fidelity Colors",
    text: "Precision Pantone matching for flawless brand consistency.",
  },
  {
    icon: <Zap className="text-[#1B3022]" size={20} />,
    title: "Rapid Turnaround",
    text: "Efficient digital printing for faster speed-to-market.",
  },
  {
    icon: <Globe className="text-[#1B3022]" size={20} />,
    title: "Eco-Friendly Inks",
    text: "Sustainable water-based inks that protect the environment.",
  },
];

const Sec5 = () => {
  // Double the images to create a seamless loop
  const loopImages = [...galleryImages, ...galleryImages];

  return (
    <section className="relative overflow-hidden bg-[#FDFAF6] py-16 lg:py-24">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-[#1B3022]/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B3022]/10 border border-[#1B3022]/20">
                <CheckCircle2 size={16} className="text-[#1B3022]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1B3022]">
                  Premium Printing Services
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight uppercase">
                Elevate Your Brand <br />
                <span className="text-[#1B3022]">With High-End </span>
                Printing
              </h2>
              <p className="text-brand-dark/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                We transform sustainable packaging into powerful branding assets with our state-of-the-art printing capabilities, designed for the global stage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white/50 border border-[#1B3022]/10 hover:border-[#1B3022]/30 transition-colors shadow-sm">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-[#1B3022]/5">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-brand-dark text-sm uppercase tracking-wider mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-brand-dark/60 text-sm font-medium leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#1B3022] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#2D3748] transition-all duration-500 shadow-2xl shadow-[#1B3022]/20"
              >
                Explore Printing Solutions
                <Zap size={16} fill="white" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Moving Gallery */}
          <div className="relative h-[450px] lg:h-[550px] overflow-hidden rounded-[2.5rem] border border-[#1B3022]/10 shadow-inner bg-[#2D3748]/5">
            {/* Gradient Overlays for smooth blend */}
            <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#FDFAF6] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#FDFAF6] to-transparent z-10" />

            <motion.div 
              animate={{ 
                y: [0, "-50%"] 
              }}
              transition={{ 
                duration: 25, 
                ease: "linear", 
                repeat: Infinity 
              }}
              className="flex flex-col gap-6 p-6"
            >
              {loopImages.map((src, idx) => (
                <div 
                  key={idx} 
                  className="relative group aspect-4/5 w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-[#1B3022]/5 transition-all duration-700 hover:shadow-2xl"
                >
                  <Image
                    src={src}
                    alt={`Printed Sample ${idx}`}
                    fill
                    className="object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1B3022]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Sec5;