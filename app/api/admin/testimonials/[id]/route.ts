import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const testimonial = await Testimonial.findById(id).lean();
    if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ testimonial });
  } catch (err) {
    console.error("[admin/testimonials/:id] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, role, company, rating, text, image, visible } = body;

    if (!name || !role || !company || !text) {
      return NextResponse.json({ error: "Name, role, company, and text are required" }, { status: 400 });
    }

    await connectToDatabase();
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, role, company, rating, text, image, visible },
      { new: true, runValidators: true }
    ).lean();

    if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ testimonial });
  } catch (err) {
    console.error("[admin/testimonials/:id] PUT:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ testimonial });
  } catch (err) {
    console.error("[admin/testimonials/:id] PATCH:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const testimonial = await Testimonial.findByIdAndDelete(id).lean();
    if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/testimonials/:id] DELETE:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
