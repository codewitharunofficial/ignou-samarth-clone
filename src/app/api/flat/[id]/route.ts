import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import flat from "@/app/lib/models/flat";

// GET /api/flat/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const flatData = await flat.findById(params.id); // ✅ params.id is safe here

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
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
