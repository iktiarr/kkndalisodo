export default function ContactSection() {
  return (
    <section className="space-y-4 md:space-y-6 pt-8 md:pt-12">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        
        {/* Contact Info */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center space-y-4 md:space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">Informasi Kontak</h2>
            <p className="text-slate-500 mt-1 md:mt-2 text-xs md:text-sm leading-relaxed">
              Jika Anda memiliki pertanyaan mengenai Desa Dalisodo, wisata, maupun pelayanan masyarakat, silakan hubungi kami.
            </p>
          </div>
          
          <div className="space-y-4 md:space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-lg md:text-xl">
                📍
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base">Alamat Balai Desa</h4>
                <p className="text-slate-600 text-xs md:text-sm mt-0.5 md:mt-1 leading-relaxed">Jl. Raya Dalisodo No. 123, Kecamatan Wagir, Kabupaten Malang, Jawa Timur 65158</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-lg md:text-xl">
                📞
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base">Telepon</h4>
                <p className="text-slate-600 text-xs md:text-sm mt-0.5 md:mt-1">+62 812-3456-7890</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-lg md:text-xl">
                ✉️
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base">Email</h4>
                <p className="text-slate-600 text-xs md:text-sm mt-0.5 md:mt-1 break-all">layanan@dalisodo.desa.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="w-full lg:w-2/3 h-64 md:h-80 lg:h-auto lg:min-h-75 rounded-xl overflow-hidden bg-slate-200 relative border border-slate-100 mt-4 lg:mt-0">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15804.85521096782!2d112.51939105!3d-8.012558699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e789db8e3bbca7b%3A0xc3b86dbb531cd8d4!2sDalisodo%2C%20Wagir%2C%20Malang%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
            className="absolute inset-0 w-full h-full"
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
