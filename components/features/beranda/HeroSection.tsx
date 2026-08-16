"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import { HeroSlideItem } from "@/types/hero";
import { parseVideoUrl } from "@/lib/videoUtils";

interface SlideData {
  id: string | number;
  type: "image" | "video";
  src: string;
  videoSrc?: string;
  embedUrl?: string;
  videoProvider?: "youtube" | "drive" | "direct" | string;
  title: string;
  highlightTitle?: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  jenis?: string;
}



interface HeroSectionProps {
  initialSlides?: HeroSlideItem[];
}

export default function HeroSection({ initialSlides }: HeroSectionProps) {
  const slides: SlideData[] =
    initialSlides && initialSlides.length > 0
      ? initialSlides.map((s) => {
          const videoInfo = s.mediaUrl ? parseVideoUrl(s.mediaUrl) : { provider: "direct" as const, rawUrl: "" };
          const provider = (s.videoProvider || videoInfo.provider) as SlideData["videoProvider"];
          const embedUrl = s.embedUrl || videoInfo.embedUrl;
          const fallbackImage = videoInfo.thumbnailUrl || "/assets/image/gambar.jpeg";
          const imageSrc = (s.mediaType === "image" ? s.mediaUrl : fallbackImage) || "/assets/image/gambar.jpeg";

          return {
            id: s.id || `slide-${Math.random()}`,
            type: s.mediaType || "image",
            src: imageSrc.trim() ? imageSrc : "/assets/image/gambar.jpeg",
            videoSrc: s.mediaType === "video" ? s.mediaUrl : undefined,
            embedUrl: s.mediaType === "video" ? embedUrl : undefined,
            videoProvider: s.mediaType === "video" ? provider : undefined,
            title: s.judul || "DESA DALISODO",
            description: s.deskripsi || "INFORMASI RESMI DESA DALISODO KECAMATAN WAGIR KABUPATEN MALANG.",
            primaryCtaText: s.primaryCtaText || "LIHAT DETAIL",
            primaryCtaLink: s.primaryCtaLink || "/",
            jenis: s.jenis || "Berita",
          };
        })
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInlineVideoPlaying, setIsInlineVideoPlaying] = useState(false);
  const [isVideoFrameReady, setIsVideoFrameReady] = useState(false);
  const [isFullPreviewOpen, setIsFullPreviewOpen] = useState(false);
  const [isMobileRotated, setIsMobileRotated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);

  if (slides.length === 0) {
    return (
      <section
        id="hero-empty-state"
        aria-label="Tampilan Hero Kosong"
        className="relative w-full h-[50vh] min-h-96 sm:h-[65vh] bg-carbony text-white flex items-center justify-center border-b border-anvil overflow-hidden select-none"
      >
        {/* Ambient Dark Gradient & Glow */}
        <div className="absolute inset-0 bg-linear-to-b from-carbon-deep via-carbony to-black opacity-95 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-giallo/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-carbon-deep border border-white/10 text-giallo shadow-xl backdrop-blur-md">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="font-lambo text-xl sm:text-2xl font-bold uppercase tracking-[0.023em] text-white">
            BELUM ADA KONTEN HERO BANNER
          </h2>

          <p className="font-lambo text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed tracking-[0.023em]">
            Belum ada data slide hero yang diunggah di Contentful. Silakan tambahkan banner baru di Contentful untuk menampilkan slide hero di halaman utama.
          </p>
        </div>
      </section>
    );
  }

  const nextSlide = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause();
      inlineVideoRef.current.currentTime = 0;
    }
    setIsInlineVideoPlaying(false);
    setIsVideoFrameReady(false);
    setIsFullPreviewOpen(false);
    setIsMobileRotated(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause();
      inlineVideoRef.current.currentTime = 0;
    }
    setIsInlineVideoPlaying(false);
    setIsVideoFrameReady(false);
    setIsFullPreviewOpen(false);
    setIsMobileRotated(false);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Halt and reset video when changing slides
  useEffect(() => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause();
      inlineVideoRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  // Autoplay slider: auto-pauses when user hovers mouse, interacts, or when video is playing
  useEffect(() => {
    if (!isPlaying || isInlineVideoPlaying || isFullPreviewOpen || isHovered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, isInlineVideoPlaying, isFullPreviewOpen, isHovered, currentIndex, nextSlide]);

  // Toggle inline video playback directly and instantly
  const handleToggleInlineVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (isInlineVideoPlaying) {
      if (inlineVideoRef.current) {
        inlineVideoRef.current.pause();
      }
      setIsInlineVideoPlaying(false);
      setIsVideoFrameReady(false);
      setIsFullPreviewOpen(false);
      setIsMobileRotated(false);
      setIsPlaying(true);
    } else {
      setIsInlineVideoPlaying(true);
      setIsPlaying(false);
      
      const currentProvider = currentSlide.videoProvider || (currentSlide.videoSrc ? parseVideoUrl(currentSlide.videoSrc).provider : "direct");
      if (currentProvider === "direct" && inlineVideoRef.current) {
        inlineVideoRef.current.muted = false;
        const playPromise = inlineVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsVideoFrameReady(true);
            })
            .catch((err) => {
              console.warn("Direct inline play error:", err);
              setIsVideoFrameReady(true);
            });
        }
      } else {
        setIsVideoFrameReady(true);
      }
    }
  };

  // Open Full Preview Mode without stopping or restarting video
  const handleOpenFullPreview = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFullPreviewOpen(true);

    const video = inlineVideoRef.current;
    if (video) {
      // Attempt landscape orientation lock for mobile
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scr = typeof window !== "undefined" ? (window.screen as any) : null;
      if (scr?.orientation?.lock) {
        scr.orientation.lock("landscape").catch(() => {});
      }

      // iOS Safari native landscape full screen player
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vidAny = video as any;
      if (vidAny.webkitEnterFullscreen && typeof navigator !== "undefined" && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        vidAny.webkitEnterFullscreen();
      }
    }
  };

  // Close Full Preview Mode
  const handleCloseFullPreview = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFullPreviewOpen(false);
    setIsMobileRotated(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docAny = document as any;
    if (document.fullscreenElement || docAny.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (docAny.webkitExitFullscreen) {
        docAny.webkitExitFullscreen();
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scr = typeof window !== "undefined" ? (window.screen as any) : null;
    if (scr?.orientation?.unlock) {
      try {
        scr.orientation.unlock();
      } catch {}
    }
  };

  // Sync native fullscreen exit
  useEffect(() => {
    const handleFsChange = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const docAny = document as any;
      const isFs = !!(
        document.fullscreenElement ||
        docAny.webkitFullscreenElement ||
        docAny.mozFullScreenElement ||
        docAny.msFullscreenElement
      );
      if (!isFs && isFullPreviewOpen) {
        setIsFullPreviewOpen(false);
        setIsMobileRotated(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, [isFullPreviewOpen]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY || isFullPreviewOpen) {
      setTimeout(() => setIsHovered(false), 2000);
      return;
    }
    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;

    // Hanya geser slide jika gesekan horizontal (X) lebih dominan dari vertikal (Y)
    if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > 50) {
      if (distanceX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
    setTouchStartY(null);
    setTouchEndY(null);
    setTimeout(() => setIsHovered(false), 2000);
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      id="hero-slider"
      aria-label="Hero Slider sinematik Desa Dalisodo"
      className="relative w-full h-[55vh] min-h-105 sm:h-screen sm:min-h-screen bg-carbony text-white overflow-hidden select-none border-b border-anvil touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        const isPlayingThisVideo = idx === currentIndex && isInlineVideoPlaying;

        return (
          <div
            key={slide.id}
            id={`hero-slide-${slide.id}`}
            aria-hidden={!isActive}
            className={`transition-all duration-700 ease-out ${
              isFullPreviewOpen && isPlayingThisVideo
                ? "fixed inset-0 z-50 w-screen h-screen bg-black flex items-center justify-center overflow-hidden"
                : `absolute inset-0 ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`
            }`}
          >
            {/* Full Preview Header Controls (Seamless In-Page Fullscreen) */}
            {isFullPreviewOpen && isPlayingThisVideo && (
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 sm:gap-3">
                {/* Mobile Rotate Lanskap Toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileRotated(!isMobileRotated);
                  }}
                  className="sm:hidden font-lambo bg-carbon-deep/90 border border-white/20 text-white px-3 py-2 text-xs font-bold tracking-wider hover:bg-giallo hover:text-black transition-all uppercase flex items-center gap-1.5 rounded-lg cursor-pointer shadow-xl backdrop-blur-md"
                  title="Putar Video Lanskap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{isMobileRotated ? "POTRAIT" : "PUTAR LANSKAP"}</span>
                </button>

                {/* Close Fullscreen Button */}
                <button
                  type="button"
                  id="hero-close-full-preview-btn"
                  onClick={handleCloseFullPreview}
                  className="font-lambo bg-giallo text-black px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-[0.023em] hover:bg-white transition-all uppercase flex items-center gap-1.5 rounded-lg cursor-pointer shadow-2xl"
                >
                  <span>✕ KEMBALI</span>
                </button>
              </div>
            )}

            {/* Dark Cinematic Canvas & Overlay */}
            <div
              className={`absolute inset-0 bg-linear-to-r from-carbon-deep/85 via-carbon-deep/45 to-transparent z-10 transition-opacity duration-500 ${
                (isPlayingThisVideo && isVideoFrameReady) || isFullPreviewOpen
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            />
            <div
              className={`absolute inset-0 bg-linear-to-t from-carbon-deep/90 via-transparent to-carbon-deep/40 z-10 transition-opacity duration-500 ${
                (isPlayingThisVideo && isVideoFrameReady) || isFullPreviewOpen
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            />

            {/* Slide Background Visual */}
            <figure className={`relative w-full h-full m-0 p-0 flex items-center justify-center ${isFullPreviewOpen && isPlayingThisVideo ? "bg-black" : ""}`}>
              {/* Poster Image Base (Stays 100% visible until video renders frames) */}
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={idx === 0}
                unoptimized={slide.src.startsWith("http")}
                className={`object-cover object-center transition-opacity duration-500 ${
                  (isPlayingThisVideo && isVideoFrameReady) || isFullPreviewOpen
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
                sizes="100vw"
              />

              {/* Video Element Overlay (YouTube, Google Drive iframe, or Direct MP4 Video) */}
              {slide.type === "video" && (slide.embedUrl || slide.videoSrc) && (
                slide.videoProvider === "youtube" || slide.videoProvider === "drive" || (slide.embedUrl && !slide.videoSrc?.endsWith(".mp4")) ? (
                  isPlayingThisVideo ? (
                    <iframe
                      src={slide.embedUrl || slide.videoSrc}
                      title={slide.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={() => setIsVideoFrameReady(true)}
                      className={`transition-all duration-500 border-0 ${
                        isFullPreviewOpen && isPlayingThisVideo
                          ? isMobileRotated
                            ? "rotate-90 w-[100vh] h-[100vw] max-w-none max-h-none object-contain z-20"
                            : "w-full h-full max-h-screen object-contain z-20"
                          : "absolute inset-0 w-full h-full object-cover z-20"
                      }`}
                    />
                  ) : null
                ) : slide.videoSrc ? (
                  <video
                    ref={idx === currentIndex ? inlineVideoRef : null}
                    preload="auto"
                    playsInline
                    loop
                    controls={isFullPreviewOpen && isPlayingThisVideo}
                    muted={!isPlayingThisVideo}
                    onLoadedData={() => {
                      if (isPlayingThisVideo) setIsVideoFrameReady(true);
                    }}
                    onCanPlay={() => {
                      if (isPlayingThisVideo) setIsVideoFrameReady(true);
                    }}
                    onCanPlayThrough={() => {
                      if (isPlayingThisVideo) setIsVideoFrameReady(true);
                    }}
                    onPlaying={() => setIsVideoFrameReady(true)}
                    onTimeUpdate={(e) => {
                      if (e.currentTarget.currentTime > 0) {
                        setIsVideoFrameReady(true);
                      }
                    }}
                    className={`transition-all duration-500 ${
                      isFullPreviewOpen && isPlayingThisVideo
                        ? isMobileRotated
                          ? "rotate-90 w-[100vh] h-[100vw] max-w-none max-h-none object-contain z-20"
                          : "w-full h-full max-h-screen object-contain z-20"
                        : isPlayingThisVideo && isVideoFrameReady
                        ? "absolute inset-0 w-full h-full object-cover object-center opacity-100 z-10"
                        : "absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none z-0"
                    }`}
                  >
                    <source src={slide.videoSrc} type="video/mp4" />
                    <source src={slide.videoSrc} />
                  </video>
                ) : null
              )}
            </figure>
          </div>
        );
      })}

      {/* Main Content Stage (Hidden when in Fullscreen Mode) */}
      <div className={`relative z-20 h-full max-w-360 mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-end pb-20 sm:pb-24 lg:pb-28 pointer-events-none ${isFullPreviewOpen ? "hidden" : ""}`}>
        <article className="max-w-xl space-y-4 pointer-events-auto">
          {/* Scaled-down Uppercase Headline & Description */}
          <div
            className={`space-y-4 transition-all duration-500 ${
              isInlineVideoPlaying && isVideoFrameReady
                ? "opacity-0 pointer-events-none max-h-0 overflow-hidden"
                : "opacity-100 max-h-96"
            }`}
          >
            <h1
              id="hero-headline"
              className="font-lambo text-2xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[0.023em] text-white uppercase font-bold"
            >
              {currentSlide.title}{" "}
              {currentSlide.highlightTitle && (
                <span className="block text-giallo mt-1">
                  {currentSlide.highlightTitle}
                </span>
              )}
            </h1>

            {/* Subtitle / Description */}
            <p
              id="hero-description"
              className="font-lambo text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed tracking-[0.023em]"
            >
              {currentSlide.description}
            </p>
          </div>

          {/* Action Buttons Area */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {currentSlide.type === "video" ? (
              <div className="flex flex-wrap items-center gap-3">
                {/* 1. Putar / Hentikan Video Button */}
                <button
                  id="hero-toggle-video-btn"
                  onClick={handleToggleInlineVideo}
                  className="font-lambo bg-giallo text-pure-black px-5 py-3 text-xs sm:text-sm font-bold tracking-[0.023em] hover:bg-giallo-dark hover:text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 uppercase flex items-center gap-2 group rounded-lg cursor-pointer shadow-md"
                >
                  {isInlineVideoPlaying ? (
                    <>
                      {isVideoFrameReady ? (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                          <span>HENTIKAN VIDEO</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-pure-black border-t-transparent rounded-full animate-spin" />
                          <span>MEMUTAR VIDEO...</span>
                        </>
                      )}
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

                {/* 2. Fullscreen Button (Clean & Minimalist) */}
                {isInlineVideoPlaying && (
                  <button
                    id="hero-full-preview-btn"
                    onClick={handleOpenFullPreview}
                    title="Masuk Mode Fullscreen"
                    aria-label="Mode Fullscreen"
                    className="p-2.5 text-giallo hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
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
                className="font-lambo bg-giallo text-pure-black px-5 py-3 text-xs sm:text-sm font-bold tracking-[0.023em] hover:bg-giallo-dark hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 uppercase flex items-center gap-2 group rounded-lg"
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

      {/* Manual Arrow Controls (Hidden when in Fullscreen Mode) */}
      <button
        id="hero-prev-slide-btn"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Slide Sebelumnya"
        className={`absolute left-4 sm:left-8 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-giallo text-white hover:text-black border border-white/20 hover:border-giallo transition-all duration-200 group flex items-center justify-center cursor-pointer rounded-lg ${isFullPreviewOpen ? "hidden" : ""}`}
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
        className={`absolute right-4 sm:right-8 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-giallo text-white hover:text-black border border-white/20 hover:border-giallo transition-all duration-200 group flex items-center justify-center cursor-pointer rounded-lg ${isFullPreviewOpen ? "hidden" : ""}`}
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

      {/* Hero Bottom Slide Counter (Simple Minimalist Numbers) */}
      <div
        id="hero-slide-counter"
        aria-label="Nomor Slide Hero"
        className={`absolute bottom-6 sm:bottom-10 right-6 sm:right-12 z-30 flex items-center bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-lg select-none font-lambo text-xs sm:text-sm tracking-widest font-bold ${
          isFullPreviewOpen ? "hidden" : ""
        }`}
      >
        <span className="text-giallo">0{currentIndex + 1}</span>
        <span className="text-slate-400 mx-1.5">/</span>
        <span className="text-slate-400">0{slides.length}</span>
      </div>
    </section>
  );
}

