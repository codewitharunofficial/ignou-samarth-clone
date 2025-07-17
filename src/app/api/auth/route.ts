import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/app/lib/models/user";
import { connectToDatabase } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectToDatabase();

  const { userId, password } = await req.json();
  const userAgent = req.headers.get("user-agent") || "";
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("host");

  const user = await User.findOne({ userId, password });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      userId,
      ip,
      userAgent,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  return NextResponse.json({ success: true, token });
}
