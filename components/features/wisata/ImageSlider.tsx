"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  judul: string;
}

export default function ImageSlider({ images, judul }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="w-full h-80 sm:h-96 md:h-[450px] relative rounded-lg overflow-hidden bg-carbony shadow-md border border-anvil">
        <Image
          src={images[0]}
          alt={judul}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
      </div>
    );
  }

  // Clone first and last images for seamless infinite loop
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(images.length);
    } else if (currentIndex === extendedImages.length - 1) {
      setCurrentIndex(1);
    }
  };

  return (
    <div className="relative group overflow-hidden w-full h-80 sm:h-96 md:h-[450px] bg-carbony rounded-lg border border-anvil shadow-md">
      <div
        onTransitionEnd={handleTransitionEnd}
        className="flex w-full h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning
            ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
        }}
      >
        {extendedImages.map((imgUrl, idx) => (
          <div key={idx} className="w-full shrink-0 h-full relative">
            <Image
              src={imgUrl}
              alt={`${judul} - Foto ${idx}`}
              fill
              priority={idx === 1}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover select-none pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Nav Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-carbon-deep/80 hover:bg-giallo text-white hover:text-black p-3 rounded-lg shadow-lg backdrop-blur-md transition-all opacity-90 group-hover:opacity-100 focus:opacity-100 z-10 cursor-pointer border border-white/10"
        aria-label="Geser ke kiri"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-carbon-deep/80 hover:bg-giallo text-white hover:text-black p-3 rounded-lg shadow-lg backdrop-blur-md transition-all opacity-90 group-hover:opacity-100 focus:opacity-100 z-10 cursor-pointer border border-white/10"
        aria-label="Geser ke kanan"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Counter Pill */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white font-lambo text-xs px-3 py-1 rounded-md border border-white/10 tracking-widest font-bold z-10">
        {currentIndex > images.length ? 1 : currentIndex < 1 ? images.length : currentIndex} / {images.length}
      </div>
    </div>
  );
}

