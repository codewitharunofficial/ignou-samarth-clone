// app/api/validate-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const payload = jwt.verify(token, SECRET) as {
      userId: string;
      ip: string;
      userAgent: string;
    };

    const reqIP = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    if (payload.ip === reqIP && payload.userAgent === userAgent) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
