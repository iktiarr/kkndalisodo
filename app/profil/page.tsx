import ProfilSection from "@/components/features/profil/ProfilSection";
import { getProfilDesa } from "@/server/services/profilService";

export const metadata = {
  title: "Profil Desa Dalisodo | Visi Misi & Geografis",
  description: "Profil lengkap Desa Dalisodo, Kecamatan Wagir, Kabupaten Malang.",
};

export default async function ProfilPage() {
  const data = await getProfilDesa();

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Profil Desa Dalisodo</h1>
        <p className="text-slate-400 mt-2">
          Mengenal lebih dekat gambaran umum, visi-misi, serta informasi demografis desa.
        </p>
      </div>

      <ProfilSection data={data} />
    </div>
  );
}
