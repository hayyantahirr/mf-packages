"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ProductImageGallery({ images, productName }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const thumbnailRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: "block",
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailRef.current) {
      const scrollAmount = thumbnailRef.current.offsetHeight / 2;
      thumbnailRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 animate-fade-in items-start">
      {/* Vertical Thumbnails - Left Side */}
      {images.length > 1 && (
        <div className="flex flex-row md:flex-col items-center shrink-0 w-full md:w-24 gap-4 no-scrollbar">
          {/* Top Arrow (Desktop Only) */}
          <button
            onClick={() => scrollThumbnails("up")}
            className="hidden md:flex items-center justify-center p-2 text-brand-dark hover:text-brand-orange transition-colors bg-white rounded-xl border border-gray-100 hover:border-brand-orange w-full"
          >
            <ChevronUp size={20} />
          </button>

          <div
            ref={thumbnailRef}
            className="flex flex-row md:flex-col gap-4 w-full h-auto md:max-h-[420px] overflow-x-auto md:overflow-y-auto no-scrollbar scroll-smooth snap-y"
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square w-20 md:w-full rounded-2xl overflow-hidden border-2 transition-all bg-white shrink-0 snap-center ${
                  activeImage === img
                    ? "border-brand-orange scale-95 shadow-lg shadow-brand-orange/20"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Bottom Arrow (Desktop Only) */}
          <button
            onClick={() => scrollThumbnails("down")}
            className="hidden md:flex items-center justify-center p-2 text-brand-dark hover:text-brand-orange transition-colors bg-white rounded-xl border border-gray-100 hover:border-brand-orange w-full"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 w-full aspect-square rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl bg-white cursor-zoom-in group"
      >
        <Image
          src={activeImage || "/carousel/brown-kraft-flat-bottom.png"}
          alt={productName}
          fill
          className="object-contain transition-opacity duration-300"
        />

        {/* Zoomed Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 bg-white"
          style={{
            ...zoomStyle,
            backgroundImage: `url(${activeImage})`,
            backgroundSize: "250%",
            backgroundPosition: zoomStyle.transformOrigin
              ? `${zoomStyle.transformOrigin.split(" ")[0]} ${zoomStyle.transformOrigin.split(" ")[1]}`
              : "center",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-gray-900/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
