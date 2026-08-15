import { NextResponse } from "next/server";
import { getWisataList } from "@/server/services/wisataService";

export async function GET() {
  try {
    const data = await getWisataList();
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
      { success: false, message: "Gagal mengambil data wisata" },
      { status: 500 }
    );
  }
}
