"use client";

import { useState, useCallback } from "react";
import { VideoItem } from "@/types/video";

interface VideoSectionProps {
  videos?: VideoItem[];
}

export default function VideoSection({ videos = [] }: VideoSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalVideos = videos.length;

  const goTo = useCallback(
    (index: number) => {
      if (totalVideos === 0) return;
      setCurrentIndex(((index % totalVideos) + totalVideos) % totalVideos);
    },
    [totalVideos]
  );

  const nextSlide = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prevSlide = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      id="video-profil-section"
      aria-labelledby="video-heading"
      className="w-full bg-[#ffffff] text-carbony py-8 sm:py-20 px-4 sm:px-12 lg:px-16 max-w-360 mx-auto border-t border-marble"
    >
      {/* Section Heading Block (Two-column row per DESIGN.md) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-carbony mb-5 sm:mb-12">
        <div>
          <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            DOKUMENTASI & PROFIL DESA
          </span>
          <h2
            id="video-heading"
            className="font-lambo text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-carbony"
          >
            VIDEO PROFIL
          </h2>
        </div>

        {totalVideos > 1 && (
          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="font-lambo text-xs font-bold text-steel tracking-widest mr-2 select-none">
              <span className="text-carbony">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              <span>{String(totalVideos).padStart(2, "0")}</span>
            </span>

            <button
              type="button"
              id="video-prev-btn"
              onClick={prevSlide}
              aria-label="Video Sebelumnya"
              className="p-2.5 rounded-lg border border-carbony/20 bg-white hover:bg-giallo hover:text-pure-black text-carbony transition-all duration-200 cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              id="video-next-btn"
              onClick={nextSlide}
              aria-label="Video Selanjutnya"
              className="p-2.5 rounded-lg border border-carbony/20 bg-white hover:bg-giallo hover:text-pure-black text-carbony transition-all duration-200 cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Main Video Display Area */}
      {totalVideos === 0 ? (
        <div
          id="video-empty-state"
          className="w-full min-h-80 sm:min-h-105 rounded-2xl bg-marble/60 border border-ash/20 flex flex-col items-center justify-center text-center p-8 space-y-4 select-none"
        >
          <div className="w-16 h-16 rounded-2xl bg-white border border-ash/30 flex items-center justify-center text-emerald-dalisodo shadow-xs">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="font-lambo text-lg sm:text-xl font-bold uppercase tracking-[0.023em] text-carbony">
            BELUM ADA VIDEO TERSEDIA
          </h3>
          <p className="font-lambo text-xs sm:text-sm text-steel max-w-md uppercase tracking-[0.023em]">
            VIDEO PROFIL DESA AKAN DITAMPILKAN DI SINI SETELAH DITAMBAHKAN PADA CONTENTFUL.
          </p>
        </div>
      ) : (
        <div
          className="relative w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Active Video Player Container (16:9 Aspect Ratio) */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-carbony shadow-lg border border-carbony/10">
            {videos.map((video, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={video.id}
                  id={`video-player-slide-${idx}`}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {isActive && (
                    <iframe
                      src={video.embedUrl}
                      title={`Video Profil Desa Dalisodo ${idx + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Video Title & Text Description Block */}
          {videos[currentIndex] && (videos[currentIndex].judul || videos[currentIndex].deskripsi) && (
            <div
              id={`video-description-${currentIndex}`}
              className="mt-6 p-6 sm:p-8 rounded-2xl bg-marble/80 border border-ash/20 shadow-xs space-y-3 transition-all duration-300"
            >
              {videos[currentIndex].judul && (
                <h3 className="font-lambo text-lg sm:text-2xl font-bold uppercase tracking-[0.023em] text-carbony flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-giallo shrink-0" />
                  <span>{videos[currentIndex].judul}</span>
                </h3>
              )}
              {videos[currentIndex].deskripsi && (
                <div className="font-lambo text-xs sm:text-sm text-steel leading-relaxed uppercase tracking-[0.023em] whitespace-pre-line border-t border-carbony/10 pt-3">
                  {typeof videos[currentIndex].deskripsi === "string"
                    ? videos[currentIndex].deskripsi
                    : String(videos[currentIndex].deskripsi)}
                </div>
              )}
            </div>
          )}

          {/* Dots / Tab Indicators if more than 1 video */}
          {totalVideos > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {videos.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Pilih Video ${idx + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-8 h-2.5 bg-giallo"
                      : "w-2.5 h-2.5 bg-carbony/20 hover:bg-carbony/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
