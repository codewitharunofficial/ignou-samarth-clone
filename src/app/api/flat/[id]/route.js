import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import flat from "@/app/lib/models/flat";
import mongoose from "mongoose";

export async function GET(_req, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid flat ID" },
        { status: 400 }
      );
    }

    const flatData = await flat.findById(id);

    console.log(flatData);

    if (!flatData) {
      return NextResponse.json(
        { success: false, error: "Flat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, flat: flatData },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Flat Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
