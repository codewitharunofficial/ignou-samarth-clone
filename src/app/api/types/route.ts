import { Campus } from "@/app/lib/models/campus";
import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const campusId = url.searchParams.get("campus");
    const campus = await Campus.findById(campusId);
    if (!campus) {
      return NextResponse.json(
        { success: false, error: "Campus not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, campus });
  } catch (err) {
    console.error("Error fetching campuses:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
