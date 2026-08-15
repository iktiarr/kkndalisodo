import { NextResponse } from "next/server";
import { getProfilDesa } from "@/server/services/profilService";

export async function GET() {
  try {
    const data = await getProfilDesa();
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data profil desa" },
      { status: 500 }
    );
  }
}
