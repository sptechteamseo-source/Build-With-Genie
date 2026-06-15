"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { ImageUpload } from "@/components/admin/ImageUpload"
import type { IBlogPostDoc } from "@/types"

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim()
}

const schema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(500),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  status: z.enum(["draft", "published"]),
  author: z.string().min(1, "Author is required").max(100),
  tags: z.string().optional(),
  category: z.string().optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  seoKeywords: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface BlogFormProps {
  initial?: Partial<IBlogPostDoc>
  id?: string
}

export function BlogForm({ initial, id }: BlogFormProps) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      excerpt: initial?.excerpt ?? "",
      content: initial?.content ?? "",
      featuredImage: initial?.featuredImage ?? "",
      status: initial?.status ?? "draft",
      author: initial?.author ?? "",
      tags: initial?.tags?.join(", ") ?? "",
      category: initial?.category ?? "",
      seoTitle: initial?.seoTitle ?? "",
      seoDescription: initial?.seoDescription ?? "",
      seoKeywords: initial?.seoKeywords ?? "",
    },
  })

  const { watch, setValue } = form
  const isSubmitting = form.formState.isSubmitting
  const slugValue = watch("slug")
  const featuredImage = watch("featuredImage")

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    form.setValue("title", title)
    if (!id) {
      form.setValue("slug", toSlug(title), { shouldValidate: false })
    }
  }, [form, id])

  async function onSubmit(values: FormValues) {
    try {
      const payload = {
        ...values,
        tags: values.tags ? values.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      }
      const res = await fetch(id ? `/api/admin/blog/${id}` : "/api/admin/blog", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong")
        return
      }
      toast.success(id ? "Post updated" : "Post created")
      router.push("/admin/blog")
    } catch {
      toast.error("Network error. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Post title"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)", fontSize: 16 }}
                          {...field}
                          onChange={handleTitleChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Slug</FormLabel>
                      <FormControl>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 13, color: "var(--fg-2, #888)", whiteSpace: "nowrap" }}>/blog/</span>
                          <Input
                            placeholder="post-slug"
                            style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                            {...field}
                            onChange={(e) => field.onChange(toSlug(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Short description shown in listings..."
                          rows={3}
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)", resize: "vertical" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Content</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write your post content..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* SEO */}
            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>SEO Title <span style={{ color: "var(--fg-2, #888)", fontWeight: 400 }}>(max 70 chars)</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Override browser tab title"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Meta Description <span style={{ color: "var(--fg-2, #888)", fontWeight: 400 }}>(max 160 chars)</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Meta description for search engines..."
                          rows={3}
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)", resize: "vertical" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Keywords</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="keyword1, keyword2, keyword3"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Author</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Author name"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator style={{ background: "var(--line)" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Button type="button" variant="outline" onClick={() => router.back()}
                    style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent", width: "100%" }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}
                    style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600, width: "100%" }}>
                    {isSubmitting && <Loader2 size={14} className="animate-spin mr-1" />}
                    {isSubmitting ? "Saving..." : id ? "Update Post" : "Publish Post"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Categorization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Technology"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="nextjs, react, typescript"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription style={{ color: "var(--fg-2, #888)" }}>Comma-separated tags</FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={featuredImage}
                  onChange={(url) => setValue("featuredImage", url)}
                  label="Upload Featured Image"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}
