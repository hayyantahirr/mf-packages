"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

export default function SamplesGallery({ images, method }) {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Keyboard navigation handler
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (activeImageIndex !== null) {
          setActiveImageIndex(null);
        }
      } else if (e.key === "ArrowRight" && activeImageIndex !== null) {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft" && activeImageIndex !== null) {
        setActiveImageIndex(
          (prev) => (prev - 1 + images.length) % images.length
        );
      }
    },
    [activeImageIndex, images.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    // Control body scroll when lightbox is active
    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey, activeImageIndex]);

  return (
    <div className="w-full">
      {images.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200/60 p-8 shadow-sm">
          <Images size={48} className="mx-auto mb-4 text-brand-dark/25 animate-pulse" />
          <h3 className="text-lg font-bold text-brand-dark mb-2">Coming Soon</h3>
          <p className="text-brand-dark/50 text-sm max-w-sm mx-auto leading-relaxed">
            We are currently compiling high-resolution printing samples for {method.title}. Please check back shortly!
          </p>
        </div>
      ) : (
        <>
          {/* Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {images.slice(0, visibleCount).map((s, i) => (
              <div
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className="group rounded-3xl overflow-hidden border border-gray-200/65 bg-white hover:border-brand-orange/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col shadow-sm"
              >
                <div className="relative h-52 sm:h-60 bg-brand-section border-b border-gray-100 overflow-hidden w-full shrink-0">
                  <Image
                    src={s.src}
                    alt={s.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-brand-orange text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl shadow-brand-orange/30">
                      View Large
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-brand-dark leading-snug mb-1 truncate">
                      {s.label}
                    </h4>
                    <p className="text-[10px] sm:text-xs font-medium text-brand-dark/60 truncate">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {images.length > visibleCount && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-8 py-4 border-2 border-brand-orange text-brand-orange bg-white hover:bg-brand-orange hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl shadow-brand-orange/5 flex items-center gap-2 animate-fade-in"
              >
                Load More Samples ({images.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── FULLSCREEN PORTALLED LIGHTBOX ───────────────────────────────── */}
      {activeImageIndex !== null && mounted && createPortal(
        <div
          className="fixed inset-0 z-99999 bg-black/90 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between w-full text-white z-10 select-none">
            <div className="text-xs sm:text-sm font-bold opacity-80 uppercase tracking-widest pl-2">
              {method.title} — Image {activeImageIndex + 1} of {images.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(null);
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer text-white"
              aria-label="Close fullscreen view"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main content: absolute centered viewport */}
          <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center">
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(
                  (prev) => (prev - 1 + images.length) % images.length
                );
              }}
              className="absolute left-2 sm:left-4 z-50 w-12 h-12 rounded-full bg-black/40 border border-white/15 hover:bg-white/20 hover:scale-105 flex items-center justify-center transition-all duration-200 cursor-pointer text-white shrink-0"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Active Image Container - Fixed height aspect to prevent collapse */}
            <div
              className="relative w-full h-[70vh] sm:h-[80vh] mx-12 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeImageIndex].src}
                alt={images[activeImageIndex].label}
                fill
                className="object-contain select-none"
                sizes="(max-width: 1024px) 100vw, 85vw"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-2 sm:right-4 z-50 w-12 h-12 rounded-full bg-black/40 border border-white/15 hover:bg-white/20 hover:scale-105 flex items-center justify-center transition-all duration-200 cursor-pointer text-white shrink-0"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Lightbox Footer */}
          <div className="text-center text-white/50 text-[11px] font-medium tracking-wide z-10 select-none pb-2">
            Use Left/Right arrow keys or click arrows to navigate. Click anywhere else or press ESC to exit.
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
