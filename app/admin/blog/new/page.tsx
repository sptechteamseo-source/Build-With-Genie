import { BlogForm } from "@/components/admin/BlogForm";

export const metadata = { title: "Write Post" };

export default function NewBlogPage() {
  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Write Post</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-2, #888)" }}>Create a new blog article</p>
      </div>
      <BlogForm />
    </div>
  );
}
