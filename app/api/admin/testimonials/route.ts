import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const visible = searchParams.get("visible");

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "10", 10));
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }
    if (visible !== null && visible !== "") filter.visible = visible === "true";

    const [testimonials, total] = await Promise.all([
      Testimonial.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Testimonial.countDocuments(filter),
    ]);
    return NextResponse.json({ testimonials, total, page, limit });
  } catch (err) {
    console.error("[admin/testimonials] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, rating, text, image, visible = true } = body;

    if (!name || !role || !company || !text) {
      return NextResponse.json({ error: "Name, role, company, and text are required" }, { status: 400 });
    }

    await connectToDatabase();
    const testimonial = await Testimonial.create({ name, role, company, rating, text, image, visible });
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (err) {
    console.error("[admin/testimonials] POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
