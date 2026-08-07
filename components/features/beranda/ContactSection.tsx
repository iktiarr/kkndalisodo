export default function ContactSection() {
  return (
    <section
      id="kontak"
      aria-labelledby="kontak-heading"
      className="w-full bg-[#ffffff] text-carbony py-16 sm:py-20 px-6 sm:px-12 lg:px-16 max-w-360 mx-auto border-t border-marble"
    >
      {/* Section Heading Block (Two-column row per DESIGN.md) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-carbony mb-8 sm:mb-12">
        <div>
          <span className="font-lambo text-xs tracking-[0.15em] text-emerald-dalisodo font-bold uppercase block mb-1">
            LAYANAN & LOKASI BALAI DESA
          </span>
          <h2
            id="kontak-heading"
            className="font-lambo text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.023em] text-carbony"
          >
            INFORMASI KONTAK
          </h2>
        </div>
        <p className="font-lambo text-xs sm:text-sm text-steel uppercase tracking-[0.023em] max-w-sm">
          SILAKAN HUBUNGI KAMI UNTUK INFORMASI PELAYANAN MASYARAKAT, POTENSI DESA, SERTA PROGRAM KKN 10.
        </p>
      </div>

      {/* Main Layout: Clean Open Editorial List + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Contact Info List (Left Column - 5 cols, Open & Elegant without heavy boxes) */}
        <address className="not-italic lg:col-span-5 space-y-6">
          
          {/* Item 1: Alamat Balai Desa */}
          <div className="flex items-start gap-4 pb-5 border-b border-marble group hover:translate-x-1.5 transition-transform duration-300 cursor-default">
            <span className="text-xl text-giallo shrink-0 pt-0.5">📍</span>
            <div className="space-y-1">
              <h3 className="font-lambo text-sm sm:text-base font-bold uppercase text-carbony tracking-[0.023em] group-hover:text-giallo-dark transition-colors">
                ALAMAT BALAI DESA
              </h3>
              <p className="font-sans text-xs sm:text-sm text-steel leading-relaxed">
                Jl. Raya Dalisodo No. 123, Kecamatan Wagir, Kabupaten Malang, Jawa Timur 65158
              </p>
            </div>
          </div>

          {/* Item 2: Telepon & Hotline */}
          <div className="flex items-start gap-4 pb-5 border-b border-marble group hover:translate-x-1.5 transition-transform duration-300 cursor-default">
            <span className="text-xl text-giallo shrink-0 pt-0.5">📞</span>
            <div className="space-y-1">
              <h3 className="font-lambo text-sm sm:text-base font-bold uppercase text-carbony tracking-[0.023em] group-hover:text-giallo-dark transition-colors">
                TELEPON / HOTLINE
              </h3>
              <p className="font-lambo text-sm sm:text-base text-carbony tracking-[0.023em] font-bold">
                +62 812-3456-7890
              </p>
              <span className="font-lambo text-[10px] text-giallo-dark uppercase tracking-wider block">
                PELAYANAN MASYARAKAT DESA
              </span>
            </div>
          </div>

          {/* Item 3: Email Resmi */}
          <div className="flex items-start gap-4 pb-5 border-b border-marble group hover:translate-x-1.5 transition-transform duration-300 cursor-default">
            <span className="text-xl text-giallo shrink-0 pt-0.5">✉️</span>
            <div className="space-y-1">
              <h3 className="font-lambo text-sm sm:text-base font-bold uppercase text-carbony tracking-[0.023em] group-hover:text-giallo-dark transition-colors">
                EMAIL RESMI
              </h3>
              <p className="font-sans text-xs sm:text-sm text-carbony font-semibold break-all">
                layanan@dalisodo.desa.id
              </p>
              <span className="font-lambo text-[10px] text-giallo-dark uppercase tracking-wider block">
                TIM KKN 10 & PERANGKAT DESA
              </span>
            </div>
          </div>

          {/* Item 4: Jam Operasional Kantor */}
          <div className="flex items-start gap-4 pt-1 group hover:translate-x-1.5 transition-transform duration-300 cursor-default">
            <span className="text-xl text-giallo shrink-0 pt-0.5">🕒</span>
            <div className="space-y-1">
              <h3 className="font-lambo text-sm sm:text-base font-bold uppercase text-carbony tracking-[0.023em] group-hover:text-giallo-dark transition-colors">
                JAM PELAYANAN BALAI DESA
              </h3>
              <p className="font-lambo text-xs sm:text-sm text-anvil uppercase tracking-wider font-semibold">
                SENIN - JUMAT: 08:00 - 15:30 WIB
              </p>
              <span className="font-lambo text-[10px] text-steel uppercase tracking-wider block">
                SABTU, MINGGU & HARI LIBUR: TUTUP
              </span>
            </div>
          </div>

        </address>

        {/* Map Embed Container (Right Column - 7 cols, Clean 8px Rounded) */}
        <div className="lg:col-span-7 min-h-[380px] lg:min-h-[460px] rounded-lg overflow-hidden bg-carbony relative border border-ash/20 shadow-sm hover:shadow-xl hover:border-giallo/50 transition-all duration-500">
          <iframe
            id="kontak-map-iframe"
            title="Peta Lokasi Desa Dalisodo Wagir Malang"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15804.85521096782!2d112.51939105!3d-8.012558699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e789db8e3bbca7b%3A0xc3b86dbb531cd8d4!2sDalisodo%2C%20Wagir%2C%20Malang%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
            className="absolute inset-0 w-full h-full filter contrast-[1.05] opacity-95"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}

