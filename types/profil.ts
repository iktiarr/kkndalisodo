export interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  fotoUrl?: string;
}

export interface ProfilDesa {
  namaDesa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string;
  visi: string;
  misi: string[];
  sejarah: string;
  luasWilayah: string;
  jumlahPenduduk: string;
  perangkatDesa: PerangkatDesa[];
}
