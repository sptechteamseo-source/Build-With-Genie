import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({ lastLoginAt: { $exists: true, $ne: null } })
      .sort({ lastLoginAt: -1 })
      .limit(20)
      .select("name email role avatar lastLoginAt active")
      .lean();
    return NextResponse.json({ users });
  } catch (err) {
    console.error("[admin/activity] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
