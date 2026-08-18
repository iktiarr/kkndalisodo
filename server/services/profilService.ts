import { profilDesaStatis } from "@/server/data/profilData";
import { ProfilDesa } from "@/types/profil";

/**
 * Mengambil data komprehensif profil Desa Dalisodo (statis / lokal).
 *
 * @returns {Promise<ProfilDesa>} Objek data profil desa lengkap.
 */
export async function getProfilDesa(): Promise<ProfilDesa> {
  return profilDesaStatis;
}
