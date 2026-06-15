import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog";
import { ArticlePage } from "@/components/blog/ArticlePage";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePageRoute({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);

  return <ArticlePage post={post} related={related} />;
}
