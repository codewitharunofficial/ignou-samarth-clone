import flat from "@/app/lib/models/flat";
import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const filters: any = {};
    const campus = url.searchParams.get("campus");
    const type = url.searchParams.get("type");
    const block = url.searchParams.get("block");

    if (campus) filters.campus = campus;
    if (type) filters.type = type;
    if (block) filters.block = { $regex: `^${block}`, $options: "i" };

    await connectToDatabase();

    const total = await flat.countDocuments(filters);
    const flats = await flat.find(filters).skip(skip).limit(limit);

    return NextResponse.json({ success: true, flats, total });
  } catch (err) {
    console.error("Error fetching flats:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
