export interface DusunInfo {
  no: number;
  nama: string;
  keterangan?: string;
}

export interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  fotoUrl?: string;
}

export interface KategoriJumlah {
  kategori: string;
  jumlah: string | number;
  satuan?: string;
}

export interface DataKependudukan {
  ringkasan: {
    kk: string;
    lakiLaki: string;
    perempuan: string;
    totalPenduduk: string;
  };
  kelompokUsia: KategoriJumlah[];
  tingkatPendidikan: KategoriJumlah[];
  mataPencaharian: KategoriJumlah[];
  agama: KategoriJumlah[];
}

export interface BatasWilayah {
  utara: string;
  selatan: string;
  timur: string;
  barat: string;
  jarakKecamatan: string;
  waktuKecamatan: string;
  jarakKabupaten: string;
  waktuKabupaten: string;
  hidrologi: string;
  curahHujan: string;
  catatanLongsor: string;
}

export interface SaranaPrasarana {
  fasilitasUmum: string[];
  infrastrukturDasar: string[];
}

export interface PotensiEkonomi {
  kehutanan: string;
  palawija: string;
  sayuran: string;
  peternakan: string;
  perdagangan: string;
  permodalan: string;
  inisiatifTambahan: string;
}

export interface SosialBudaya {
  keagamaan: string;
  kelembagaan: string[];
}

export interface KerawananBencana {
  areaRawan: string;
  sejarahKejadian: string[];
  mitigasiCatatan: string;
}

export interface ProfilDesa {
  namaDesa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  semboyan: string;
  kodePos: string;
  ketinggian: string;
  jumlahDusunCount: number;
  deskripsi: string;
  visi: string;
  misi: string[];
  sejarah: string;
  luasWilayah: string;
  jumlahPenduduk: string;
  batasWilayah: BatasWilayah;
  dusunList: DusunInfo[];
  perangkatDesa: PerangkatDesa[];
  kependudukan: DataKependudukan;
  saranaPrasarana: SaranaPrasarana;
  potensiEkonomi: PotensiEkonomi;
  sosialBudaya: SosialBudaya;
  kerawananBencana: KerawananBencana;
  catatanSumberData: string;
}
