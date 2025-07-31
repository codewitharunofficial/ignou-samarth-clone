// app/api/search/route.ts
import { connectToDatabase } from "@/app/lib/mongodb";
import Flat from "@/app/lib/models/flat";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || typeof q !== "string") {
    return NextResponse.json(
      { message: "Missing or invalid search query" },
      { status: 400 }
    );
  }

  try {
    const searchRegex = new RegExp(q, "i");

    const flats = await Flat.find({
      $or: [
        { name: { $regex: searchRegex } },
        { flatNo: { $regex: searchRegex } },
      ],
    }).lean();

    return NextResponse.json({ success: true, flats });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
