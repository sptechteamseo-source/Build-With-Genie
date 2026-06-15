"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/admin/ImageUpload"
import type { ITestimonial } from "@/types"

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  company: z.string().min(1, "Company is required").max(100),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, "Testimonial must be at least 10 characters").max(1000),
  image: z.string().optional(),
  visible: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface TestimonialFormProps {
  initial?: Partial<ITestimonial>
  id?: string
}

export function TestimonialForm({ initial, id }: TestimonialFormProps) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name ?? "",
      role: initial?.role ?? "",
      company: initial?.company ?? "",
      rating: initial?.rating ?? 5,
      text: initial?.text ?? "",
      image: initial?.image ?? "",
      visible: initial?.visible ?? true,
    },
  })

  const { watch, setValue } = form
  const isSubmitting = form.formState.isSubmitting
  const rating = watch("rating")
  const image = watch("image")

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch(id ? `/api/admin/testimonials/${id}` : "/api/admin/testimonials", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong")
        return
      }
      toast.success(id ? "Testimonial updated" : "Testimonial created")
      router.push("/admin/testimonials")
    } catch {
      toast.error("Network error. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
          <CardHeader style={{ paddingBottom: 12 }}>
            <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: "var(--fg)" }}>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe"
                        style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: "var(--fg)" }}>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="CEO"
                        style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ color: "var(--fg)" }}>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corp"
                      style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Star Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={() => (
                <FormItem>
                  <FormLabel style={{ color: "var(--fg)" }}>Rating</FormLabel>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setValue("rating", n, { shouldValidate: true })}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
                      >
                        <Star
                          size={24}
                          fill={n <= rating ? "#f59e0b" : "none"}
                          color={n <= rating ? "#f59e0b" : "var(--line)"}
                        />
                      </button>
                    ))}
                    <span style={{ fontSize: 13, color: "var(--fg-2, #888)", marginLeft: 4 }}>{rating}/5</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ color: "var(--fg)" }}>Testimonial</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What the customer said about your service..."
                      rows={5}
                      style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)", resize: "vertical" }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
          <CardHeader style={{ paddingBottom: 12 }}>
            <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={image}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
              label="Upload Profile Photo"
            />
          </CardContent>
        </Card>

        <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
          <CardContent style={{ paddingTop: 20 }}>
            <FormField
              control={form.control}
              name="visible"
              render={({ field }) => (
                <FormItem style={{ display: "flex", alignItems: "center", gap: 12, margin: 0 }}>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div>
                    <FormLabel style={{ color: "var(--fg)", margin: 0, cursor: "pointer", fontWeight: 500 }}>
                      Visible on site
                    </FormLabel>
                    <p style={{ fontSize: 12, color: "var(--fg-2, #888)", margin: "2px 0 0" }}>
                      Display this testimonial publicly
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div style={{ display: "flex", gap: 10 }}>
          <Button type="button" variant="outline" onClick={() => router.back()}
            style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}
            style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }}>
            {isSubmitting && <Loader2 size={14} className="animate-spin mr-1" />}
            {isSubmitting ? "Saving..." : id ? "Update Testimonial" : "Add Testimonial"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
