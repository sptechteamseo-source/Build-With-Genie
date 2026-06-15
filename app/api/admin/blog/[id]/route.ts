import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/models/Blog";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const post = await BlogPost.findById(id).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err) {
    console.error("[admin/blog/:id] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title, slug, excerpt, content, featuredImage,
      status, author, tags, category,
      seoTitle, seoDescription, seoKeywords,
    } = body;

    if (!title || !slug || !excerpt || !content || !author) {
      return NextResponse.json({ error: "Title, slug, excerpt, content, and author are required" }, { status: 400 });
    }

    await connectToDatabase();
    const post = await BlogPost.findByIdAndUpdate(
      id,
      {
        title, slug, excerpt, content, featuredImage,
        status, author, tags, category,
        seoTitle, seoDescription, seoKeywords,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    console.error("[admin/blog/:id] PUT:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const post = await BlogPost.findByIdAndDelete(id).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/blog/:id] DELETE:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
