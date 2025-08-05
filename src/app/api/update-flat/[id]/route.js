import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Flat from "@/app/lib/models/flat";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Enforce vacant logic
    if (body.vacant === true) {
      body.name = "";
      body.designation = "";
      body.odlId = "";
      body.vacant = true
    }

    const updated = await Flat.findByIdAndUpdate(
      { _id: id },
      { ...body, date: body.date?.split("-").reverse().join("-") },
      {
        new: true,
      }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Flat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, flat: updated });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
