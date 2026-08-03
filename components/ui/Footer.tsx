export default function Footer() {
  return (
    <footer className="bg-white text-slate-500 border-t border-slate-200 py-8 mt-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm space-y-2">
        <p className="font-semibold text-slate-800">
          Website Resmi Pemerintah Desa Dalisodo & Tim KKN
        </p>
        <p>© {new Date().getFullYear()} Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang, Jawa Timur.</p>
      </div>
    </footer>
  );
}
