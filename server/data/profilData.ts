import { ProfilDesa } from "@/types/profil";
import { gambaranUmumData } from "./profil/gambaranUmumData";
import { geografiData } from "./profil/geografiData";
import { dusunData } from "./profil/dusunData";
import { pemerintahanData } from "./profil/pemerintahanData";
import { demografiData } from "./profil/demografiData";
import { fasilitasData } from "./profil/fasilitasData";
import { ekonomiData } from "./profil/ekonomiData";
import { sosialBudayaData } from "./profil/sosialBudayaData";
import { catatanData } from "./profil/catatanData";

// Re-export individual section data modules for direct access
export * from "./profil/gambaranUmumData";
export * from "./profil/geografiData";
export * from "./profil/dusunData";
export * from "./profil/pemerintahanData";
export * from "./profil/demografiData";
export * from "./profil/fasilitasData";
export * from "./profil/ekonomiData";
export * from "./profil/sosialBudayaData";
export * from "./profil/catatanData";

// Combined full profile object
export const profilDesaStatis: ProfilDesa = {
  ...gambaranUmumData,
  batasWilayah: geografiData,
  dusunList: dusunData,
  perangkatDesa: pemerintahanData,
  kependudukan: demografiData,
  saranaPrasarana: fasilitasData,
  potensiEkonomi: ekonomiData,
  sosialBudaya: sosialBudayaData,
  kerawananBencana: {
    areaRawan: "Dusun Bedali (Lereng perbukitan Gunung Kawi)",
    sejarahKejadian: [
      "Tercatat pernah terjadi bencana tanah longsor pada tahun 2013.",
      "Tercatat pernah terjadi musibah kebakaran permukiman pada bulan Juni 2018."
    ],
    mitigasiCatatan: "Topografi perbukitan pada lereng Gunung Kawi memerlukan perencanaan mitigasi berkala."
  },
  catatanSumberData: catatanData
};
