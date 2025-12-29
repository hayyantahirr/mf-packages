"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: "/carousel/almunium-retort-pouch.png",
      title: "Aluminum Retort Pouch",
    },
    {
      image: "/carousel/brown-kraft-almunium-lamination.png",
      title: "Brown Kraft Aluminum",
    },
    {
      image: "/carousel/brown-kraft-flat-bottom.png",
      title: "Brown Kraft Flat Bottom",
    },
    {
      image: "/carousel/coffee-flat-bottom.png",
      title: "Coffee Flat Bottom",
    },
    {
      image: "/carousel/front-transparent-back-almunium.png",
      title: "Transparent Front Pouch",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-[80%] h-[80%] group">
      {/* Main Carousel Container */}
      <div className="relative w-full h-full overflow-hidden rounded-3xl ">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                    title={slide.title}
                  />
                </div>
              </div>

              {/* Slide Title */}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3  cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#1D2D44]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3  cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 text-[#1D2D44]" />
        </button>

        {/* Decorative Elements */}
      </div>
    </div>
  );
};

export default Carousel;
