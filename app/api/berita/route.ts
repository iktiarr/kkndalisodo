import { NextResponse } from "next/server";
import { getBeritaList } from "@/server/services/beritaService";

export async function GET() {
  try {
    const data = await getBeritaList();
    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}
