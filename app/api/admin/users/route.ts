import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/password";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const role = searchParams.get("role") ?? "";

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "10", 10));
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (role) filter.role = role;

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(filter),
    ]);
    return NextResponse.json({ users, total, page, limit });
  } catch (err) {
    console.error("[admin/users] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role = "user", avatar, active = true } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await connectToDatabase();
    const doc: Record<string, unknown> = { name, email, role, avatar, active };
    if (body.password && body.password.length >= 6) {
      doc.passwordHash = hashPassword(body.password);
    }
    const user = await User.create(doc);
    return NextResponse.json({ user }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    console.error("[admin/users] POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
