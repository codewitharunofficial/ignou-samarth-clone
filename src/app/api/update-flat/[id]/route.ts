import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Flat from "@/app/lib/models/flat";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();
    console.log("body: ", body);

    // Enforce vacant logic: if vacant is true, set name, designation, and odlId to ""
    if (body.vacant === true) {
      body.name = "";
      body.designation = "";
      body.odlId = "";
    }

    const updated = await Flat.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("Updated flat: ", updated);

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
