export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm space-y-2">
        <p className="font-semibold text-slate-200">
          Website Resmi Pemerintah Desa Dalisodo & Tim KKN
        </p>
        <p>© {new Date().getFullYear()} Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang, Jawa Timur.</p>
      </div>
    </footer>
  );
}
