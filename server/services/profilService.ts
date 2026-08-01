import { profilDesaStatis } from "@/server/data/profilData";
import { ProfilDesa } from "@/types/profil";

export async function getProfilDesa(): Promise<ProfilDesa> {
  // Data profil diambil dari data statis lokal
  return profilDesaStatis;
}
