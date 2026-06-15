import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { verifyPassword } from "@/lib/password";
import { signSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email: email.toLowerCase().trim(), active: true }).select("+passwordHash");

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });

    const token = signSession({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    const res = NextResponse.json({ success: true, role: user.role });
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
