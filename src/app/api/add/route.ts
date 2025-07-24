import { connectToDatabase } from "@/app/lib/mongodb";
import FlatDetail from "@/app/lib/models/flat";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const flat = await FlatDetail.create({
      ...body,
    });

    return NextResponse.json({ success: true, flat });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 }
    );
  }
}
