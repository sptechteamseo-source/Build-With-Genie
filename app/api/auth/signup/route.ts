import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/password";

function buildSessionToken(userId: string): string {
  const secret = process.env.AUTH_SECRET ?? "changeme";
  const payload = `${userId}:${Date.now()}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await User.findOne({ email: email.toLowerCase() }).lean();
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const passwordHash = hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role: "user", active: true });

    const res = NextResponse.json({ success: true, userId: user._id.toString() }, { status: 201 });
    res.cookies.set("user_session", buildSessionToken(user._id.toString()), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res;
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }
    console.error("[auth/signup]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
