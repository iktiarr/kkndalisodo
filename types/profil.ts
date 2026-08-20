/**
 * Informasi dusun di Desa Dalisodo.
 */
export interface DusunInfo {
  no: number;
  nama: string;
  keterangan?: string;
}

/**
 * Data anggota perangkat Desa Dalisodo.
 */
export interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  fotoUrl?: string;
}

/**
 * Struktur item statistik jumlah dan kategori.
 */
export interface KategoriJumlah {
  kategori: string;
  jumlah: string | number;
  satuan?: string;
}

/**
 * Struktur data demografi dan statistik kependudukan desa.
 */
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

/**
 * Informasi geografis dan batas wilayah administrasi desa.
 */
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

/**
 * Sarana dan prasarana umum desa.
 */
export interface SaranaPrasarana {
  fasilitasUmum: string[];
  infrastrukturDasar: string[];
}

/**
 * Sektor komoditas dan potensi ekonomi desa.
 */
export interface PotensiEkonomi {
  kehutanan: string;
  palawija: string;
  sayuran: string;
  peternakan: string;
  perdagangan: string;
  permodalan: string;
  inisiatifTambahan: string;
}

/**
 * Aspek sosial, budaya, dan kelembagaan masyarakat.
 */
export interface SosialBudaya {
  keagamaan: string;
  kelembagaan: string[];
}

/**
 * Data kerawanan dan mitigasi bencana alam.
 */
export interface KerawananBencana {
  areaRawan: string;
  sejarahKejadian: string[];
  mitigasiCatatan: string;
}

/**
 * Struktur data lengkap Profil Desa Dalisodo.
 */
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
