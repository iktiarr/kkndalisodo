"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import { HeroSlideItem } from "@/types/hero";

interface SlideData {
  id: string | number;
  type: "image" | "video";
  src: string;
  videoSrc?: string;
  title: string;
  highlightTitle?: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  jenis?: string;
}

const DEFAULT_SLIDES: SlideData[] = [
  {
    id: "1",
    type: "image",
    src: "/assets/image/gambar.jpeg",
    title: "PESONA WISATA & POTENSI",
    highlightTitle: "DESA DALISODO",
    description:
      "MENJELAJAHI KEINDAHAN ALAM LERENG GUNUNG KAWI, KEBERAGAMAN BUDAYA LOKAL, SERTA PROGRAM KEGIATAN MAHASISWA KKN 10.",
    primaryCtaText: "JELAJAHI WISATA",
    primaryCtaLink: "/wisata",
    jenis: "Wisata",
  },
  {
    id: "2",
    type: "video",
    src: "/assets/image/gambar.jpeg",
    videoSrc: "/assets/videos/VIDEO PROFIL DESA BANCAK 1.mp4",
    title: "VIDEO PROFIL SINEMATIK",
    highlightTitle: "DESA DALISODO",
    description:
      "MENYAKSIKAN KEHIDUPAN MASYARAKAT, DOKUMENTASI KKNDALISODO, DAN POTENSI DESA DALAM TAYANGAN VIDEO SINEMATIK.",
    primaryCtaText: "PUTAR VIDEO PROFIL",
    primaryCtaLink: "#play-video",
    jenis: "Video",
  },
  {
    id: "3",
    type: "image",
    src: "/assets/image/gambar.jpeg",
    title: "INOVASI & POTENSI",
    highlightTitle: "EKONOMI KREATIF",
    description:
      "KOLABORASI MAHASISWA KKN 10 DENGAN WARGA DESA DALISODO UNTUK MENGEMBANGKAN POTENSI LOKAL SERTA DIGITALISASI DESA.",
    primaryCtaText: "BACA BERITA KKN",
    primaryCtaLink: "/berita",
    jenis: "Berita",
  },
];

interface HeroSectionProps {
  initialSlides?: HeroSlideItem[];
}

export default function HeroSection({ initialSlides }: HeroSectionProps) {
  const slides: SlideData[] =
    initialSlides && initialSlides.length > 0
      ? initialSlides.map((s) => ({
          id: s.id,
          type: s.mediaType,
          src: s.mediaType === "image" ? s.mediaUrl : "/assets/image/gambar.jpeg",
          videoSrc: s.mediaType === "video" ? s.mediaUrl : undefined,
          title: s.judul,
          description: s.deskripsi,
          primaryCtaText: s.primaryCtaText || "LIHAT DETAIL",
          primaryCtaLink: s.primaryCtaLink || "/",
          jenis: s.jenis,
        }))
      : DEFAULT_SLIDES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInlineVideoPlaying, setIsInlineVideoPlaying] = useState(false);
  const [isFullPreviewOpen, setIsFullPreviewOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const fullVideoRef = useRef<HTMLVideoElement | null>(null);

  // Warm video assets into browser HTTP disk cache on mount
  useEffect(() => {
    slides.forEach((slide) => {
      if (slide.type === "video" && slide.videoSrc) {
        fetch(slide.videoSrc, { cache: "force-cache" }).catch(() => {
          // Silent fallback for cross-origin or local video assets
        });
      }
    });
  }, [slides]);

  const nextSlide = useCallback(() => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause();
      inlineVideoRef.current.currentTime = 0;
    }
    setIsInlineVideoPlaying(false);
    setIsFullPreviewOpen(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause();
      inlineVideoRef.current.currentTime = 0;
    }
    setIsInlineVideoPlaying(false);
    setIsFullPreviewOpen(false);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause();
      inlineVideoRef.current.currentTime = 0;
    }
    setIsInlineVideoPlaying(false);
    setIsFullPreviewOpen(false);
    setCurrentIndex(index);
  };

  // Halt and reset video when changing slides
  useEffect(() => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause();
      inlineVideoRef.current.currentTime = 0;
    }
    if (fullVideoRef.current) {
      fullVideoRef.current.pause();
    }
    setIsInlineVideoPlaying(false);
    setIsFullPreviewOpen(false);
  }, [currentIndex]);

  // Autoplay slider (paused automatically when video is playing inline or in full preview)
  useEffect(() => {
    if (isPlaying && !isInlineVideoPlaying && !isFullPreviewOpen) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isInlineVideoPlaying, isFullPreviewOpen, nextSlide]);

  // Toggle inline video playback directly in background without changing page layout
  const handleToggleInlineVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (isInlineVideoPlaying) {
      if (inlineVideoRef.current) {
        inlineVideoRef.current.pause();
      }
      setIsInlineVideoPlaying(false);
      setIsPlaying(true);
    } else {
      setIsInlineVideoPlaying(true);
      setIsPlaying(false);
      setTimeout(() => {
        if (inlineVideoRef.current) {
          inlineVideoRef.current.currentTime = 0;
          inlineVideoRef.current.play().catch((err) => {
            console.warn("Inline play error:", err);
          });
        }
      }, 100);
    }
  };

  // Open Full Preview Mode
  const handleOpenFullPreview = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFullPreviewOpen(true);
    setIsPlaying(false);

    setTimeout(() => {
      if (fullVideoRef.current) {
        if (inlineVideoRef.current) {
          fullVideoRef.current.currentTime = inlineVideoRef.current.currentTime;
          inlineVideoRef.current.pause();
        }
        fullVideoRef.current.play().catch((err) => {
          console.warn("Full preview play error:", err);
        });
      }
    }, 150);
  };

  // Close Full Preview Mode
  const handleCloseFullPreview = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (fullVideoRef.current) {
      fullVideoRef.current.pause();
    }
    setIsFullPreviewOpen(false);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX || isFullPreviewOpen) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      id="hero-slider"
      aria-label="Hero Slider sinematik Desa Dalisodo"
      className="relative w-full h-screen min-h-screen bg-[#202020] text-white overflow-hidden select-none border-b border-[#313131]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full Preview Modal Mode */}
      {isFullPreviewOpen && currentSlide.videoSrc ? (
        <div id="hero-full-preview-modal" className="absolute inset-0 z-50 bg-black flex flex-col justify-center items-center" role="dialog" aria-modal="true">
          {/* Close Header Bar */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
            <button
              id="hero-close-full-preview-btn"
              onClick={handleCloseFullPreview}
              className="font-lambo bg-[#ffc000] text-black px-5 py-2.5 text-xs sm:text-sm font-bold tracking-[0.023em] hover:bg-white transition-all uppercase flex items-center gap-2 rounded-[8px] cursor-pointer shadow-2xl z-50"
            >
              <span>✕ KEMBALI</span>
            </button>
          </div>

          {/* Full Screen Video Player */}
          <video
            ref={fullVideoRef}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain max-h-[90vh]"
          >
            <source src={currentSlide.videoSrc} type="video/mp4" />
            <source src={currentSlide.videoSrc} />
          </video>
        </div>
      ) : null}

      {/* Background Slides */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        const isPlayingThisVideo = idx === currentIndex && isInlineVideoPlaying;

        return (
          <div
            key={slide.id}
            id={`hero-slide-${slide.id}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Dark Cinematic Canvas & Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#181818]/85 via-[#181818]/45 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/90 via-transparent to-[#181818]/40 z-10" />

            {/* Slide Background Visual */}
            <figure className="relative w-full h-full m-0 p-0">
              {/* Poster Image Base (Guarantees no black boxes for Contentful video slides) */}
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={idx === 0}
                className={`object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-opacity duration-500 ${
                  isPlayingThisVideo ? "opacity-0" : "opacity-100"
                }`}
                sizes="100vw"
              />

              {/* Video Element Overlay */}
              {slide.type === "video" && slide.videoSrc && (
                <video
                  ref={idx === currentIndex ? inlineVideoRef : null}
                  preload={isPlayingThisVideo ? "auto" : "none"}
                  playsInline
                  loop
                  muted={!isPlayingThisVideo}
                  className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-opacity duration-500 ${
                    isPlayingThisVideo ? "opacity-100 z-0" : "opacity-0 pointer-events-none z-0"
                  }`}
                >
                  <source src={slide.videoSrc} type="video/mp4" />
                  <source src={slide.videoSrc} />
                </video>
              )}
            </figure>
          </div>
        );
      })}

      {/* Main Content Stage */}
      <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-end pb-20 sm:pb-24 lg:pb-28 pointer-events-none">
        <article className="max-w-xl space-y-4 pointer-events-auto">
          {/* Scaled-down Uppercase Headline */}
          <h1 id="hero-headline" className="font-lambo text-2xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[0.023em] text-white uppercase font-bold">
            {currentSlide.title}{" "}
            {currentSlide.highlightTitle && (
              <span className="block text-[#ffc000] mt-1">
                {currentSlide.highlightTitle}
              </span>
            )}
          </h1>

          {/* Subtitle / Description */}
          <p id="hero-description" className="font-lambo text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed tracking-[0.023em]">
            {currentSlide.description}
          </p>

          {/* Action Buttons Area */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary Action Button Only */}
            {currentSlide.type === "video" ? (
              <div className="flex flex-wrap items-center gap-3">
                {/* 1. Putar / Hentikan Video Button */}
                <button
                  id="hero-toggle-video-btn"
                  onClick={handleToggleInlineVideo}
                  className="font-lambo bg-[#ffc000] text-[#000000] px-5 py-3 text-xs sm:text-sm font-bold tracking-[0.023em] hover:bg-[#917300] hover:text-white transition-all duration-200 uppercase flex items-center gap-2 group rounded-[8px] cursor-pointer shadow-xl"
                >
                  {isInlineVideoPlaying ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                      <span>HENTIKAN VIDEO</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>PUTAR VIDEO PROFIL</span>
                    </>
                  )}
                </button>

                {/* 2. Full Preview Icon Only (Unboxed) */}
                {isInlineVideoPlaying && (
                  <button
                    id="hero-full-preview-btn"
                    onClick={handleOpenFullPreview}
                    title="Masuk Mode Full Preview"
                    aria-label="Mode Full Preview"
                    className="p-2.5 text-[#ffc000] hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <Link
                id="hero-primary-cta-link"
                href={currentSlide.primaryCtaLink}
                className="font-lambo bg-[#ffc000] text-[#000000] px-5 py-3 text-xs sm:text-sm font-bold tracking-[0.023em] hover:bg-[#917300] hover:text-white transition-all duration-200 uppercase flex items-center gap-2 group rounded-[8px]"
              >
                <span>{currentSlide.primaryCtaText}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            )}
          </div>
        </article>
      </div>

      {/* Manual Arrow Controls */}
      <button
        id="hero-prev-slide-btn"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Slide Sebelumnya"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-[#ffc000] text-white hover:text-black border border-white/20 hover:border-[#ffc000] transition-all duration-200 group hidden sm:flex items-center justify-center cursor-pointer rounded-[8px]"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        id="hero-next-slide-btn"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Slide Selanjutnya"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-[#ffc000] text-white hover:text-black border border-white/20 hover:border-[#ffc000] transition-all duration-200 group hidden sm:flex items-center justify-center cursor-pointer rounded-[8px]"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Hero Bottom Bar Navigasi */}
      <nav id="hero-slider-nav" aria-label="Indikator Slider Hero" className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 z-30 flex items-center gap-6 bg-black/60 backdrop-blur-md px-5 py-3 border border-white/10 rounded-[8px]">
        {/* Slide Counter */}
        <div id="hero-slide-counter" className="font-lambo text-xs sm:text-sm tracking-[0.1em] text-slate-400 font-bold">
          <span className="text-[#ffc000]">0{currentIndex + 1}</span> / 0{slides.length}
        </div>

        {/* Carousel Navigation Pips */}
        <div className="flex items-center gap-3" role="tablist">
          {slides.map((_, idx) => (
            <button
              key={idx}
              id={`hero-pip-${idx + 1}`}
              role="tab"
              aria-selected={idx === currentIndex}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(idx);
              }}
              aria-label={`Pindah ke slide ${idx + 1}`}
              className={`h-[4px] transition-all duration-300 cursor-pointer rounded-[4px] ${
                idx === currentIndex
                  ? "w-10 bg-[#ffc000]"
                  : "w-5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Pause/Play Autoplay Control */}
        <button
          id="hero-toggle-autoplay-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
          aria-label={isPlaying ? "Jeda autoplay slider" : "Jalankan autoplay slider"}
          className="p-1.5 border border-white/30 text-white hover:border-[#ffc000] hover:text-[#ffc000] transition-colors cursor-pointer rounded-[8px]"
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </nav>
    </section>
  );
}
