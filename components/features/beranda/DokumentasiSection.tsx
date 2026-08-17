"use client";

import { useState } from "react";
import Image from "next/image";
import { BannerItem } from "@/types/banner";

interface DokumentasiSectionProps {
  items?: BannerItem[];
}

export default function DokumentasiSection({ items = [] }: DokumentasiSectionProps) {
  const [activePhoto, setActivePhoto] = useState<BannerItem | null>(null);

  return (
    <section
      id="dokumentasi"
      aria-labelledby="dokumentasi-heading"
      className="w-full bg-marble text-carbony py-16 sm:py-20 px-6 sm:px-12 lg:px-16 max-w-360 mx-auto border-t border-b border-ash/20"
    >
      {/* Section Heading Block (Two-column row per DESIGN.md) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-carbony mb-8 sm:mb-12">
        <div>
          <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            GALERI & DOKUMENTASI KEGIATAN
          </span>
          <h2
            id="dokumentasi-heading"
            className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-carbony"
          >
            DOKUMENTASI FOTO
          </h2>
        </div>
        <p className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-[0.023em] max-w-sm">
          ARSIP FOTO KEGIATAN DESA, POTENSI ALAM, DAN PROGRAM PENGABDIAN MASYARAKAT DALISODO.
        </p>
      </div>

      {/* 4-Column Photo Grid on Desktop */}
      {items.length === 0 ? (
        <div
          id="dokumentasi-empty-state"
          className="w-full min-h-60 rounded-2xl bg-white/60 border border-ash/20 flex flex-col items-center justify-center text-center p-8 space-y-3 select-none"
        >
          <div className="w-14 h-14 rounded-2xl bg-white border border-ash/30 flex items-center justify-center text-emerald-dalisodo shadow-xs">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="font-lambo text-base sm:text-lg font-bold uppercase tracking-[0.023em] text-carbony">
            BELUM ADA DOKUMENTASI FOTO
          </h3>
          <p className="font-lambo text-xs text-steel max-w-sm uppercase tracking-[0.023em]">
            DOKUMENTASI FOTO AKAN DITAMPILKAN DI SINI SETELAH DITAMBAHKAN PADA CONTENTFUL.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-carbony border border-ash/30 shadow-xs hover:shadow-xl hover:border-giallo transition-all duration-300 cursor-pointer"
            >
              {/* Photo Image */}
              <Image
                src={item.mediaUrl}
                alt={item.judul}
                fill
                unoptimized={true}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Hover Dark Gradient Overlay & Title */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="font-lambo text-[10px] text-giallo font-bold tracking-widest uppercase mb-1">
                  DOKUMENTASI
                </span>
                <h3 className="font-lambo text-sm sm:text-base font-bold text-white uppercase tracking-[0.023em] line-clamp-2 leading-snug">
                  {item.judul}
                </h3>
              </div>

              {/* Zoom Icon Button on Hover */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal for Photo Preview */}
      {activePhoto && (
        <div
          id="photo-lightbox-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan Foto Penuh"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              type="button"
              id="close-lightbox-btn"
              onClick={() => setActivePhoto(null)}
              aria-label="Tutup Tampilan Foto"
              className="absolute -top-12 right-0 font-lambo text-white hover:text-giallo text-sm font-bold tracking-wider flex items-center gap-1.5 uppercase cursor-pointer"
            >
              <span>TUTUP</span>
              <span className="text-lg">✕</span>
            </button>

            {/* Modal Image */}
            <div className="relative w-full aspect-16/10 sm:aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <Image
                src={activePhoto.mediaUrl}
                alt={activePhoto.judul}
                fill
                unoptimized={true}
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <h4 className="font-lambo text-base sm:text-xl font-bold text-white uppercase tracking-[0.023em]">
                {activePhoto.judul}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
