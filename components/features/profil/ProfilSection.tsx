"use client";

import { useState } from "react";
import { ProfilDesa } from "@/types/profil";

interface ProfilSectionProps {
  data: ProfilDesa;
}

export default function ProfilSection({ data }: ProfilSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const navigationTabs = [
    { id: "all", label: "SEMUA" },
    { id: "overview", label: "GAMBARAN UMUM" },
    { id: "geografi", label: "GEOGRAFI & BATAS" },
    { id: "dusun", label: "WILAYAH DUSUN" },
    { id: "pemerintahan", label: "PEMERINTAHAN" },
    { id: "demografi", label: "DEMOGRAFI" },
    { id: "fasilitas", label: "SARANA & INFRASTRUKTUR" },
    { id: "ekonomi", label: "POTENSI EKONOMI" },
    { id: "sosbud", label: "SOSIAL & BUDAYA" },
    { id: "bencana", label: "MITIGASI BENCANA" },
  ];

  const shouldShow = (tabId: string) => {
    return activeTab === "all" || activeTab === tabId;
  };

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* STICKY CATEGORY FILTER (Clean Modern Pills) */}
      <div className="sticky top-16 sm:top-20 z-40 bg-carbon-deep/90 backdrop-blur-md p-2 sm:p-3 rounded-xl border border-white/10 shadow-xl overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2">
        {navigationTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-lambo text-xs font-semibold tracking-[0.023em] uppercase px-3.5 sm:px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-giallo text-black font-bold shadow-md"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. GAMBARAN UMUM & VISI MISI */}
      {shouldShow("overview") && (
        <section id="overview" className="space-y-8 scroll-mt-28">
          {/* Section Title Block (DESIGN.md Style) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                IDENTITAS & WILAYAH
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                GAMBARAN UMUM DESA
              </h2>
            </div>
            <span className="font-lambo text-xs text-giallo-dark font-bold uppercase tracking-wider bg-giallo/15 px-3 py-1 rounded-md border border-giallo/30 self-start sm:self-auto">
              MADEP MANTEB MANETEP
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Geografi & Iklim */}
            <div className="lg:col-span-7 bg-white border border-ash/20 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-lambo text-lg sm:text-xl font-bold uppercase text-carbony">
                  TENTANG DESA DALISODO
                </h3>
                <p className="font-sans text-sm sm:text-base text-anvil leading-relaxed">
                  {data.deskripsi}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-marble">
                <div className="bg-marble p-4 rounded-lg border border-ash/10">
                  <span className="font-lambo text-xs font-bold uppercase text-steel block mb-1">
                    SUHU MALAM
                  </span>
                  <span className="font-lambo text-xl font-bold text-carbony">
                    15°C
                  </span>
                  <span className="font-sans text-[11px] text-steel block mt-0.5">Sejuk dataran tinggi</span>
                </div>
                <div className="bg-marble p-4 rounded-lg border border-ash/10">
                  <span className="font-lambo text-xs font-bold uppercase text-steel block mb-1">
                    SUHU SIANG
                  </span>
                  <span className="font-lambo text-xl font-bold text-carbony">
                    19° – 20°C
                  </span>
                  <span className="font-sans text-[11px] text-steel block mt-0.5">Iklim segar lereng Kawi</span>
                </div>
              </div>
            </div>

            {/* Right Card: Visi & Misi */}
            <div className="lg:col-span-5 bg-carbon-deep text-white border border-anvil rounded-xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-giallo"></span>
                  <span className="font-lambo text-xs font-bold uppercase text-giallo tracking-wider">
                    VISI UTAMA DESA
                  </span>
                </div>
                <p className="font-lambo text-base sm:text-lg text-white font-semibold uppercase leading-snug tracking-[0.023em] bg-white/5 p-4 rounded-lg border border-white/10">
                  &quot;{data.visi}&quot;
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <span className="font-lambo text-xs font-bold uppercase text-slate-300 tracking-wider block">
                  MISI PEMBANGUNAN
                </span>
                <ul className="space-y-2">
                  {data.misi.slice(0, 4).map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-giallo shrink-0 font-bold">✓</span>
                      <span className="font-sans leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. GEOGRAFI & BATAS WILAYAH */}
      {shouldShow("geografi") && (
        <section id="geografi" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                LOKASI & LINGKUNGAN
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                LETAK GEOGRAFIS & BATAS
              </h2>
            </div>
            <span className="font-lambo text-xs text-steel uppercase tracking-wider">
              KABUPATEN MALANG • JAWA TIMUR
            </span>
          </div>

          {/* Compass / Boundary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-ash/20 shadow-sm hover:border-emerald-dalisodo transition-colors">
              <span className="font-lambo text-xs font-bold uppercase tracking-wider text-emerald-dalisodo block mb-2">
                UTARA
              </span>
              <p className="font-sans text-sm text-carbony font-medium leading-snug">
                {data.batasWilayah.utara}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ash/20 shadow-sm hover:border-giallo transition-colors">
              <span className="font-lambo text-xs font-bold uppercase tracking-wider text-giallo-dark block mb-2">
                SELATAN
              </span>
              <p className="font-sans text-sm text-carbony font-medium leading-snug">
                {data.batasWilayah.selatan}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ash/20 shadow-sm hover:border-emerald-dalisodo transition-colors">
              <span className="font-lambo text-xs font-bold uppercase tracking-wider text-emerald-dalisodo block mb-2">
                TIMUR
              </span>
              <p className="font-sans text-sm text-carbony font-medium leading-snug">
                {data.batasWilayah.timur}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ash/20 shadow-sm hover:border-giallo transition-colors">
              <span className="font-lambo text-xs font-bold uppercase tracking-wider text-giallo-dark block mb-2">
                BARAT
              </span>
              <p className="font-sans text-sm text-carbony font-medium leading-snug">
                {data.batasWilayah.barat}
              </p>
            </div>
          </div>

          {/* Access & Hydrology Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-marble p-5 rounded-xl border border-ash/20 space-y-1">
              <span className="font-lambo text-xs font-bold uppercase text-emerald-dalisodo block">
                AKSES KE WAGIR
              </span>
              <span className="font-lambo text-xl font-bold text-carbony block">
                {data.batasWilayah.jarakKecamatan} ({data.batasWilayah.waktuKecamatan})
              </span>
              <p className="font-sans text-xs text-steel">Ibu kota Kecamatan Wagir</p>
            </div>

            <div className="bg-marble p-5 rounded-xl border border-ash/20 space-y-1">
              <span className="font-lambo text-xs font-bold uppercase text-emerald-dalisodo block">
                AKSES KE MALANG
              </span>
              <span className="font-lambo text-xl font-bold text-carbony block">
                {data.batasWilayah.jarakKabupaten} ({data.batasWilayah.waktuKabupaten})
              </span>
              <p className="font-sans text-xs text-steel">Pusat Kabupaten Malang</p>
            </div>

            <div className="bg-marble p-5 rounded-xl border border-ash/20 space-y-1">
              <span className="font-lambo text-xs font-bold uppercase text-emerald-dalisodo block">
                ALIRAN SUNGAI & HUJAN
              </span>
              <p className="font-sans text-xs text-anvil leading-relaxed">
                Dialiri 2 sungai permukiman & curah hujan ±2.000 mm/tahun.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. WILAYAH DUSUN */}
      {shouldShow("dusun") && (
        <section id="dusun" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                PEMBAGIAN WILAYAH
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                7 DUSUN DALISODO
              </h2>
            </div>
            <span className="font-lambo text-xs text-steel uppercase tracking-wider">
              WILAYAH ADMINISTRATIF
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.dusunList.map((dusun) => (
              <div
                key={dusun.no}
                className="bg-white p-5 rounded-xl border border-ash/20 shadow-sm hover:border-emerald-dalisodo hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between border-b border-marble pb-2">
                  <span className="font-lambo text-xs font-bold text-emerald-dalisodo uppercase tracking-wider">
                    DUSUN
                  </span>
                  {dusun.nama.includes("Precet") && (
                    <span className="font-lambo text-[10px] font-bold bg-giallo text-black px-2 py-0.5 rounded uppercase">
                      KAMPUNG KB
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-lambo text-lg font-bold uppercase text-carbony tracking-[0.023em] group-hover:text-emerald-dalisodo transition-colors">
                    {dusun.nama}
                  </h3>
                  {dusun.keterangan && (
                    <p className="font-sans text-xs text-steel mt-1 leading-relaxed">
                      {dusun.keterangan}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. PEMERINTAHAN */}
      {shouldShow("pemerintahan") && (
        <section id="pemerintahan" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                TATA KELOLA
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                PERANGKAT DESA
              </h2>
            </div>
            <span className="font-lambo text-xs text-steel uppercase tracking-wider">
              PEMERINTAHAN DESA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.perangkatDesa.map((p) => (
              <div
                key={p.id}
                className="bg-white p-5 rounded-xl border border-ash/20 shadow-sm hover:border-giallo transition-colors space-y-2"
              >
                <span className="font-lambo text-xs font-bold uppercase text-emerald-dalisodo tracking-wider block">
                  {p.jabatan}
                </span>
                <h4 className="font-lambo text-base font-bold uppercase text-carbony tracking-[0.023em]">
                  {p.nama}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. DEMOGRAFI */}
      {shouldShow("demografi") && (
        <section id="demografi" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                KEPENDUDUKAN
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                DEMOGRAFI WARGA
              </h2>
            </div>
            <span className="font-lambo text-xs text-steel uppercase tracking-wider">
              6.451 JIWA • 2.052 KK
            </span>
          </div>

          {/* Quick Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-carbon-deep text-white p-5 rounded-xl border border-anvil space-y-1">
              <span className="font-lambo text-xs text-giallo font-bold uppercase tracking-wider block">
                KEPALA KELUARGA
              </span>
              <span className="font-lambo text-2xl font-bold">2.052 KK</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-1">
              <span className="font-lambo text-xs text-emerald-dalisodo font-bold uppercase tracking-wider block">
                LAKI-LAKI
              </span>
              <span className="font-lambo text-2xl font-bold text-carbony">3.351 Jiwa</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-1">
              <span className="font-lambo text-xs text-emerald-dalisodo font-bold uppercase tracking-wider block">
                PEREMPUAN
              </span>
              <span className="font-lambo text-2xl font-bold text-carbony">3.105 Jiwa</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-1">
              <span className="font-lambo text-xs text-emerald-dalisodo font-bold uppercase tracking-wider block">
                TOTAL PENDUDUK
              </span>
              <span className="font-lambo text-2xl font-bold text-emerald-dalisodo">6.451 Jiwa</span>
            </div>
          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Age Distribution */}
            <div className="bg-white p-6 rounded-xl border border-ash/20 space-y-4">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony border-b border-marble pb-2">
                KELOMPOK USIA
              </h3>
              <div className="space-y-2.5">
                {data.kependudukan.kelompokUsia.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-sans text-steel">{item.kategori}</span>
                    <span className="font-lambo font-bold text-carbony">{item.jumlah} {item.satuan}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Levels */}
            <div className="bg-white p-6 rounded-xl border border-ash/20 space-y-4">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony border-b border-marble pb-2">
                TINGKAT PENDIDIKAN
              </h3>
              <div className="space-y-2.5">
                {data.kependudukan.tingkatPendidikan.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-sans text-steel">{item.kategori}</span>
                    <span className="font-lambo font-bold text-carbony">{item.jumlah} {item.satuan}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Livelihoods */}
            <div className="bg-white p-6 rounded-xl border border-ash/20 space-y-4">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony border-b border-marble pb-2">
                MATA PENCAHARIAN
              </h3>
              <div className="space-y-2.5">
                {data.kependudukan.mataPencaharian.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-sans text-steel">{item.kategori}</span>
                    <span className="font-lambo font-bold text-carbony">{item.jumlah} {item.satuan}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Religious Breakdown Pills */}
          <div className="bg-marble p-5 rounded-xl border border-ash/20 flex flex-wrap items-center justify-between gap-4">
            <span className="font-lambo text-xs font-bold uppercase text-carbony tracking-wider">
              PEMELUK AGAMA & KEPERCAYAAN:
            </span>
            <div className="flex flex-wrap items-center gap-4">
              {data.kependudukan.agama.map((item, idx) => (
                <span key={idx} className="font-sans text-xs text-anvil bg-white px-3 py-1.5 rounded-lg border border-ash/15">
                  <strong className="font-lambo uppercase text-emerald-dalisodo">{item.kategori}:</strong> {item.jumlah} Jiwa
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. SARANA & PRASARANA */}
      {shouldShow("fasilitas") && (
        <section id="fasilitas" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                FASILITAS DESA
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                SARANA & PRASARANA
              </h2>
            </div>
            <span className="font-lambo text-xs text-steel uppercase tracking-wider">
              INFRASTRUKTUR PUBLIK
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-ash/20 space-y-4">
              <h3 className="font-lambo text-lg font-bold uppercase text-carbony border-b border-marble pb-2">
                FASILITAS UMUM & SOSIAL
              </h3>
              <ul className="space-y-2.5">
                {data.saranaPrasarana.fasilitasUmum.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-anvil">
                    <span className="text-emerald-dalisodo font-bold">✓</span>
                    <span className="font-sans leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-ash/20 space-y-4">
              <h3 className="font-lambo text-lg font-bold uppercase text-carbony border-b border-marble pb-2">
                INFRASTRUKTUR DASAR
              </h3>
              <ul className="space-y-2.5">
                {data.saranaPrasarana.infrastrukturDasar.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-anvil">
                    <span className="text-giallo-dark font-bold">⚡</span>
                    <span className="font-sans leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 7. POTENSI EKONOMI */}
      {shouldShow("ekonomi") && (
        <section id="ekonomi" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                SEKTOR UNGGULAN
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                POTENSI EKONOMI
              </h2>
            </div>
            <span className="font-lambo text-xs text-steel uppercase tracking-wider">
              PERTANIAN & PERKEBUNAN KAWI
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-2">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony">KEHUTANAN & KAYU</h3>
              <p className="font-sans text-xs text-steel leading-relaxed">{data.potensiEkonomi.kehutanan}</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-2">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony">PALAWIJA & JAGUNG</h3>
              <p className="font-sans text-xs text-steel leading-relaxed">{data.potensiEkonomi.palawija}</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-2">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony">SAYUR-MAYUR</h3>
              <p className="font-sans text-xs text-steel leading-relaxed">{data.potensiEkonomi.sayuran}</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-2">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony">PETERNAKAN SAPI PERAH</h3>
              <p className="font-sans text-xs text-steel leading-relaxed">{data.potensiEkonomi.peternakan}</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-2">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony">PASAR & PERDAGANGAN</h3>
              <p className="font-sans text-xs text-steel leading-relaxed">{data.potensiEkonomi.perdagangan}</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ash/20 space-y-2">
              <h3 className="font-lambo text-base font-bold uppercase text-carbony">AKSES PERMODALAN</h3>
              <p className="font-sans text-xs text-steel leading-relaxed">{data.potensiEkonomi.permodalan}</p>
            </div>
          </div>
        </section>
      )}

      {/* 8. SOSIAL & BUDAYA */}
      {shouldShow("sosbud") && (
        <section id="sosbud" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
                KEHIDUPAN WARGA
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                SOSIAL & KELEMBAGAAN
              </h2>
            </div>
            <span className="font-lambo text-xs text-steel uppercase tracking-wider">
              KEBUDAYAAN & ORGANISASI
            </span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-ash/20 space-y-5">
            <p className="font-sans text-sm text-anvil leading-relaxed">
              {data.sosialBudaya.keagamaan}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-marble">
              {data.sosialBudaya.kelembagaan.map((item, idx) => (
                <div key={idx} className="bg-marble p-4 rounded-lg border border-ash/10">
                  <p className="font-sans text-xs text-carbony font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. MITIGASI BENCANA */}
      {shouldShow("bencana") && (
        <section id="bencana" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-carbony">
            <div>
              <span className="font-lambo text-xs tracking-[0.15em] text-amber-600 font-bold uppercase block mb-1">
                TANGGAP MITIGASI
              </span>
              <h2 className="font-lambo text-2xl sm:text-4xl font-bold uppercase tracking-[0.023em] text-carbony">
                KERAWANAN BENCANA
              </h2>
            </div>
            <span className="font-lambo text-xs text-amber-700 font-bold uppercase tracking-wider bg-amber-50 px-3 py-1 rounded border border-amber-200">
              ATENSI LERENG KAWI
            </span>
          </div>

          <div className="bg-carbon-deep text-white p-6 sm:p-8 rounded-xl border border-anvil shadow-md space-y-5">
            <div className="space-y-1">
              <span className="font-lambo text-xs text-giallo font-bold uppercase tracking-wider">
                AREA RAWAN
              </span>
              <h3 className="font-lambo text-xl sm:text-2xl font-bold uppercase">
                {data.kerawananBencana.areaRawan}
              </h3>
            </div>

            <div className="space-y-2">
              <span className="font-lambo text-xs text-slate-300 font-bold uppercase tracking-wider">
                CATATAN HISTORIS
              </span>
              <ul className="space-y-1.5">
                {data.kerawananBencana.sejarahKejadian.map((kejadian, idx) => (
                  <li key={idx} className="font-sans text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-giallo"></span>
                    <span>{kejadian}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-sans text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
              {data.kerawananBencana.mitigasiCatatan}
            </p>
          </div>
        </section>
      )}

      {/* FOOTNOTE DISCLAIMER */}
      <div className="bg-marble p-5 rounded-xl border border-ash/15 text-slate-500 text-xs italic leading-relaxed">
        {data.catatanSumberData}
      </div>
    </div>
  );
}
