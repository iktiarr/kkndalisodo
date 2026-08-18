import { DataKependudukan } from "@/types/profil";

export const demografiData: DataKependudukan = {
  ringkasan: {
    kk: "2.052 KK",
    lakiLaki: "3.351 Jiwa",
    perempuan: "3.105 Jiwa",
    totalPenduduk: "6.451 Jiwa"
  },
  kelompokUsia: [
    { kategori: "0 – 12 Bulan", jumlah: 108, satuan: "Jiwa" },
    { kategori: "1 – 5 Tahun", jumlah: 390, satuan: "Jiwa" },
    { kategori: "0 – 7 Tahun", jumlah: 665, satuan: "Jiwa" },
    { kategori: "7 – 18 Tahun", jumlah: 1154, satuan: "Jiwa" },
    { kategori: "18 – 56 Tahun", jumlah: 4555, satuan: "Jiwa" },
    { kategori: "> 56 Tahun", jumlah: 579, satuan: "Jiwa" }
  ],
  tingkatPendidikan: [
    { kategori: "Tidak / Belum Sekolah", jumlah: 515, satuan: "Orang" },
    { kategori: "SD / Sederajat", jumlah: 4021, satuan: "Orang" },
    { kategori: "SLTP / Sederajat", jumlah: 1503, satuan: "Orang" },
    { kategori: "SLTA / Sederajat", jumlah: 381, satuan: "Orang" },
    { kategori: "Sarjana (S1)", jumlah: 18, satuan: "Orang" }
  ],
  mataPencaharian: [
    { kategori: "Petani", jumlah: 2150, satuan: "Orang" },
    { kategori: "Buruh Tani", jumlah: 1420, satuan: "Orang" },
    { kategori: "Buruh Industri / Karyawan", jumlah: 648, satuan: "Orang" },
    { kategori: "Wirausaha / Pedagang", jumlah: 54, satuan: "Orang" },
    { kategori: "Pegawai Negeri Sipil (PNS)", jumlah: 25, satuan: "Orang" },
    { kategori: "TNI / Polri", jumlah: 1, satuan: "Orang" }
  ],
  agama: [
    { kategori: "Islam", jumlah: 6257, satuan: "Jiwa" },
    { kategori: "Kristen Protestan", jumlah: 145, satuan: "Jiwa" },
    { kategori: "Hindu", jumlah: 49, satuan: "Jiwa" }
  ]
};
