import { ProfilDesa } from "@/types/profil";

export const profilDesaStatis: ProfilDesa = {
  namaDesa: "Dalisodo",
  kecamatan: "Wagir",
  kabupaten: "Malang",
  provinsi: "Jawa Timur",
  semboyan: "Madep Manteb Manetep",
  kodePos: "65158",
  ketinggian: "± 715 mdpl (Lereng Timur Gunung Kawi)",
  jumlahDusunCount: 7,
  luasWilayah: "± 14.5 km²",
  jumlahPenduduk: "6.451 Jiwa",

  deskripsi:
    "Desa Dalisodo adalah desa yang terletak di wilayah Kecamatan Wagir, Kabupaten Malang, Provinsi Jawa Timur. Secara geografis, desa ini berada di kawasan perbukitan, tepatnya di lereng timur Gunung Kawi, dengan topografi berupa dataran tinggi pada ketinggian sekitar 715 meter di atas permukaan laut. Kondisi ini menjadikan Dalisodo memiliki iklim sejuk khas dataran tinggi, dengan suhu udara berkisar antara 15°C pada malam hari hingga 19–20°C pada siang hari. Desa Dalisodo merupakan salah satu dari 12 desa di wilayah Kecamatan Wagir dengan semboyan khas 'Madep Manteb Manetep'.",

  visi: "MADEP MANTEB MANETEP: Terwujudnya Desa Dalisodo yang Mandiri, Sejahtera, Berbudaya, dan Berkelanjutan Berbasis Potensi Lokal Lereng Gunung Kawi.",

  misi: [
    "Meningkatkan kualitas pelayanan publik dan tata kelola pemerintahan desa yang transparan, akuntabel, dan profesional.",
    "Mengembangkan potensi ekonomi lokal sektor pertanian, perkebunan, peternakan, serta pariwisata berbasis kemasyarakatan.",
    "Melestarikan seni, budaya, tradisi keagamaan, serta kearifan lokal Desa Dalisodo.",
    "Meningkatkan sarana dan prasarana infrastruktur dasar pendukung aktivitas sosial-ekonomi warga.",
    "Mewujudkan lingkungan hidup yang lestari, bersih, mandiri dalam pengelolaan sampah, serta tanggap mitigasi bencana."
  ],

  sejarah:
    "Desa Dalisodo memiliki sejarah dan nilai budaya luhur yang tumbuh beriringan dengan kehidupan masyarakat lereng timur Gunung Kawi. Semboyan 'Madep Manteb Manetep' mencerminkan keteguhan tekad, kebersamaan, dan kemandirian warga dalam menjaga kelestarian alam serta mengembangkan kemajuan desa secara berkesinambungan.",

  batasWilayah: {
    utara: "Desa Kucur, Kecamatan Dau, Kabupaten Malang",
    selatan: "Desa Sukodadi, Kecamatan Wagir",
    timur: "Desa Jedong, Kecamatan Wagir",
    barat: "Kawasan Hutan Lereng Gunung Kawi (Wilayah Perhutani)",
    jarakKecamatan: "± 10 km",
    waktuKecamatan: "± 10 menit perjalanan",
    jarakKabupaten: "± 15 km",
    waktuKabupaten: "± 20 menit perjalanan",
    hidrologi: "Dialiri 2 (dua) sungai utama yang melintasi kawasan permukiman dan lahan pertanian warga.",
    curahHujan: "Curah hujan rata-rata tercatat sekitar 2.000 mm per tahun (Data BPS Kabupaten Malang).",
    catatanLongsor: "Sebagian wilayah desa, khususnya Dusun Bedali, tergolong rawan bencana tanah longsor."
  },

  dusunList: [
    { no: 1, nama: "Dusun Wangkal", keterangan: "Terbagi menjadi 6 RT (RT 34 – RT 39)." },
    { no: 2, nama: "Dusun Gandul", keterangan: "Kawasan permukiman & pertanian subur." },
    { no: 3, nama: "Dusun Sengon Utara", keterangan: "Pusat budidaya kayu & hasil kebun." },
    { no: 4, nama: "Dusun Sengon Selatan", keterangan: "Kawasan permukiman dan peternakan warga." },
    { no: 5, nama: "Dusun Precet", keterangan: "Lokasi dibentuknya Kampung Keluarga Berencana (Kampung KB)." },
    { no: 6, nama: "Dusun Bedali", keterangan: "Kawasan perbukitan lereng Kawi (area perhatian mitigasi longsor)." },
    { no: 7, nama: "Dusun Sempukerep", keterangan: "Kawasan pertanian & perkebunan warga." }
  ],

  perangkatDesa: [
    { id: "1", nama: "Kepala Desa Dalisodo", jabatan: "Kepala Desa" },
    { id: "2", nama: "Sekretaris Desa", jabatan: "Sekretaris Desa" },
    { id: "3", nama: "Kaur TU & Umum", jabatan: "Kaur Tata Usaha & Umum" },
    { id: "4", nama: "Kaur Keuangan", jabatan: "Kaur Keuangan" },
    { id: "5", nama: "Kaur Perencanaan", jabatan: "Kaur Perencanaan" },
    { id: "6", nama: "Kasi Pemerintahan", jabatan: "Kasi Pemerintahan" },
    { id: "7", nama: "Kasi Pelayanan", jabatan: "Kasi Pelayanan" },
    { id: "8", nama: "Kepala Dusun (7 Kasun)", jabatan: "Kepala Dusun (Wangkal, Gandul, Sengon U/S, Precet, Bedali, Sempukerep)" }
  ],

  kependudukan: {
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
  },

  saranaPrasarana: {
    fasilitasUmum: [
      "1 Balai / Kantor Desa Dalisodo dan 1 Balai Dusun",
      "4 Unit Sekolah PAUD & 4 Unit Sekolah Dasar (SD / Sederajat)",
      "2 Unit Polindes (Pondok Bersalin Desa) sebagai pusat layanan kesehatan dasar masyarakat",
      "7 Unit Posyandu aktif dengan jadwal pelayanan rutin di tiap dusun",
      "1 Masjid Raya dan 39 Musholla",
      "8 Area Tempat Pemakaman Umum (TPU) & Pos Ronda Lingkungan RT/Dusun",
      "1 Kantor Koperasi Desa"
    ],
    infrastrukturDasar: [
      "Jalan utama desa beraspal dengan Penerangan Jalan Umum (PJU), sebagian ruas berkerikil/batu",
      "Jaringan listrik PLN terhubung sejak tahun 1995 (rata-rata 900 Watt per rumah tangga)",
      "Sumber air bersih berasal dari mata air alami pegunungan",
      "Jaringan telekomunikasi seluler kuat dipancarkan oleh operator Telkomsel dan Indosat"
    ]
  },

  potensiEkonomi: {
    kehutanan: "Kayu Mahoni (tanaman tua) & Sengon Basia (masa tanam maksimal 5 tahun).",
    palawija: "Jagung sebagai komoditas palawija utama serta ubi-ubian (singkong).",
    sayuran: "Kacang panjang, terong, bayam, dan aneka sayur konsumsi harian.",
    peternakan: "Sapi perah (susu disetorkan ke KUD Kecamatan Dau), kambing, dan ayam.",
    perdagangan: "Penjualan langsung ke Kota Malang & tengkulak. Pasar rujukan utama: Pasar Wagir & Pasar Mergan (±10 km).",
    permodalan: "Akses kredit usaha masyarakat via Koperasi Wanita Sejahtera bekerjasama dengan Bank BRI.",
    inisiatifTambahan: "Pengembangan potensi wisata alam lereng Gunung Kawi, situs nilai sejarah, serta rintisan pengelolaan sampah mandiri berbasis kesadaran warga."
  },

  sosialBudaya: {
    keagamaan: "Kerukunan antarumat beragama terjaga harmonis (Islam mayoritas, Kristen Protestan, dan Hindu).",
    kelembagaan: [
      "Jama'ah Tahlil (wadah kegiatan silaturahmi & keagamaan rutin warga)",
      "Karang Taruna (organisasi kepemudaan pencetak kreativitas desa)",
      "Kampung Keluarga Berencana (Kampung KB) di Dusun Precet untuk isu kependudukan & kesejahteraan keluarga"
    ]
  },

  kerawananBencana: {
    areaRawan: "Dusun Bedali (Lereng perbukitan Gunung Kawi)",
    sejarahKejadian: [
      "Tercatat pernah terjadi bencana tanah longsor pada tahun 2013.",
      "Tercatat pernah terjadi musibah kebakaran permukiman pada bulan Juni 2018."
    ],
    mitigasiCatatan: "Topografi perbukitan pada lereng Gunung Kawi menjadi faktor krusial yang memerlukan perencanaan mitigasi bencana longsor serta pemetaan jalur evakuasi secara berkala."
  },

  catatanSumberData:
    "Profil ini disusun berdasarkan kompilasi data dari situs resmi Desa Dalisodo, Wikipedia Bahasa Indonesia, laman Kampung KB BKKBN, dan media lokal. Data kependudukan dan struktur pemerintahan bersumber dari data historis (sekitar tahun 2016–2019). Untuk keperluan administrasi resmi, disarankan memverifikasi dan memutakhirkan data langsung melalui Kantor Desa Dalisodo atau situs resmi dalisodo-malangkab.desa.id."
};

