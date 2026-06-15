import type { Metadata } from "next";
import { BlogPage } from "@/components/blog/BlogPage";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Field notes from shipping with AI",
  description:
    "How we design, build, review and deliver production software with Claude, Gemini and OpenAI on every step. Honest write-ups on workflows, model choices, and delivery.",
  openGraph: {
    title: "The Genie Blog",
    description: "Field notes from shipping with AI.",
    type: "website",
  },
};

export default async function BlogListPage() {
  const posts = await getPublishedPosts();
  return <BlogPage posts={posts} />;
}
