import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/models/Blog";
import type { PublicPost } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function readingTime(html: string): string {
  const text = (html ?? "").replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function formatDate(d: Date | string | undefined): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface BlogDoc {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  author: string;
  featuredImage?: string;
  createdAt?: Date | string;
}

function toPublic(doc: BlogDoc): PublicPost {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category || "General",
    tags: doc.tags ?? [],
    author: doc.author,
    authorInitials: initials(doc.author),
    date: formatDate(doc.createdAt),
    readTime: readingTime(doc.content),
    contentHtml: doc.content,
    featuredImage: doc.featuredImage || "",
  };
}

// ─── Queries (published only) ───────────────────────────────────────────────────

export async function getPublishedPosts(): Promise<PublicPost[]> {
  try {
    await connectToDatabase();
    const docs = await BlogPost.find({ status: "published" })
      .sort({ createdAt: -1 })
      .lean<BlogDoc[]>();
    return docs.map(toPublic);
  } catch (err) {
    console.error("[blog] getPublishedPosts failed:", err);
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<PublicPost | null> {
  try {
    await connectToDatabase();
    const doc = await BlogPost.findOne({ slug, status: "published" }).lean<BlogDoc | null>();
    return doc ? toPublic(doc) : null;
  } catch (err) {
    console.error("[blog] getPublishedPostBySlug failed:", err);
    return null;
  }
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<PublicPost[]> {
  try {
    await connectToDatabase();
    const docs = await BlogPost.find({ status: "published", slug: { $ne: slug } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<BlogDoc[]>();
    return docs.map(toPublic);
  } catch (err) {
    console.error("[blog] getRelatedPosts failed:", err);
    return [];
  }
}
