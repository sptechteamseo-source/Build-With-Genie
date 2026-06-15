import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/models/Blog";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status") ?? "";

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "10", 10));
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }
    if (status) filter.status = status;

    const [posts, total] = await Promise.all([
      BlogPost.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      BlogPost.countDocuments(filter),
    ]);
    return NextResponse.json({ posts, total, page, limit });
  } catch (err) {
    console.error("[admin/blog] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title, slug, excerpt, content, featuredImage,
      status = "draft", author, tags = [], category,
      seoTitle, seoDescription, seoKeywords,
    } = body;

    if (!title || !slug || !excerpt || !content || !author) {
      return NextResponse.json({ error: "Title, slug, excerpt, content, and author are required" }, { status: 400 });
    }

    await connectToDatabase();
    const post = await BlogPost.create({
      title, slug, excerpt, content, featuredImage,
      status, author, tags, category,
      seoTitle, seoDescription, seoKeywords,
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    console.error("[admin/blog] POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
