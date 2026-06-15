import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { verifyPassword } from "@/lib/password";

function buildSessionToken(userId: string): string {
  const secret = process.env.AUTH_SECRET ?? "changeme";
  const payload = `${userId}:${Date.now()}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

interface UserDoc {
  _id: { toString(): string };
  passwordHash?: string;
  active: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase(), active: true })
      .select("+passwordHash")
      .lean() as UserDoc | null;

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("user_session", buildSessionToken(user._id.toString()), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("[auth/login]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
