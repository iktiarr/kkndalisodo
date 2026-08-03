import ProfilSection from "@/components/features/profil/ProfilSection";
import { getProfilDesa } from "@/server/services/profilService";

export const metadata = {
  title: "Profil Desa Dalisodo | Visi Misi & Geografis",
  description: "Profil lengkap Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang.",
};

export default async function ProfilPage() {
  const data = await getProfilDesa();

  return (
    <div className="max-w-350 mx-auto space-y-12 py-10 px-4 sm:px-6">
      <div className="text-center space-y-4 mb-16 border-b border-slate-200 pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Profil Desa Dalisodo</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Mengenal lebih dekat gambaran umum, visi-misi, serta informasi demografis desa.
        </p>
      </div>

      <ProfilSection data={data} />
    </div>
  );
}
