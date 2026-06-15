import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/models/Blog";
import { BlogForm } from "@/components/admin/BlogForm";
import type { IBlogPostDoc } from "@/types";

export const metadata = { title: "Edit Post" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  await connectToDatabase();
  const doc = await BlogPost.findById(id).lean() as (IBlogPostDoc & { _id: { toString(): string } }) | null;
  if (!doc) notFound();

  const serialized: IBlogPostDoc = {
    ...doc,
    _id: doc._id.toString(),
    createdAt: undefined,
    updatedAt: undefined,
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Edit Post</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-2, #888)" }}>{serialized.title}</p>
      </div>
      <BlogForm initial={serialized} id={serialized._id} />
    </div>
  );
}
