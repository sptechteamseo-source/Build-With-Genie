import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/password";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const user = await User.findById(id).lean();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (err) {
    console.error("[admin/users/:id] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, email, role, avatar, active, password } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await connectToDatabase();

    const update: Record<string, unknown> = { name, email, role, avatar, active };
    if (password && password.length >= 6) {
      update.passwordHash = hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).lean();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    console.error("[admin/users/:id] PUT:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const user = await User.findByIdAndDelete(id).lean();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/users/:id] DELETE:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
