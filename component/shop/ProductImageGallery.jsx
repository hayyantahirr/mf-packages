"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

export default function ProductImageGallery({ images, productName }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
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

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 animate-fade-in items-start">
      {/* Vertical Thumbnails - Left Side */}
      {images.length > 1 && (
        <div className="flex flex-row md:flex-col gap-4 w-full md:w-24 shrink-0 overflow-auto no-scrollbar pb-4 md:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square w-20 md:w-full rounded-2xl overflow-hidden border-2 transition-all bg-white/5 shrink-0 ${
                activeImage === img
                  ? "border-[#D00000] scale-95 shadow-lg shadow-[#D00000]/20"
                  : "border-white/10 hover:border-white/30"
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
      )}

      {/* Main Image with Hover Zoom */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 cursor-zoom-in group"
      >
        <Image
          src={activeImage || "/carousel/brown-kraft-flat-bottom.png"}
          alt={productName}
          fill
          className="object-cover transition-opacity duration-300"
        />
        
        {/* Zoomed Overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 bg-[#1D2D44]"
          style={{
            ...zoomStyle,
            backgroundImage: `url(${activeImage})`,
            backgroundSize: "250%",
            backgroundPosition: zoomStyle.transformOrigin ? 
              `${zoomStyle.transformOrigin.split(' ')[0]} ${zoomStyle.transformOrigin.split(' ')[1]}` : "center"
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
