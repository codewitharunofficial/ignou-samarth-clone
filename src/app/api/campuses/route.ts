import { Campus } from "@/app/lib/models/campus";
import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const campuses = await Campus.find({});
    return NextResponse.json({ success: true, campuses });
  } catch (err) {
    console.error("Error fetching campuses:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
