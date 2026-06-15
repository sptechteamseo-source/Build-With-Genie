"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { IAdminUser } from "@/types"

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "editor", "user"]),
  avatar: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  active: z.boolean(),
  password: z.string().min(6, "Minimum 6 characters").or(z.literal("")).optional(),
})

type FormValues = z.infer<typeof schema>

interface UserFormProps {
  initial?: Partial<IAdminUser>
  id?: string
}

export function UserForm({ initial, id }: UserFormProps) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name ?? "",
      email: initial?.email ?? "",
      role: (initial?.role as "admin" | "editor" | "user") ?? "user",
      avatar: initial?.avatar ?? "",
      active: initial?.active ?? true,
      password: "",
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: FormValues) {
    try {
      const body: Record<string, unknown> = {
        name: values.name,
        email: values.email,
        role: values.role,
        avatar: values.avatar,
        active: values.active,
      }
      if (values.password) body.password = values.password

      const res = await fetch(id ? `/api/admin/users/${id}` : "/api/admin/users", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong")
        return
      }
      toast.success(id ? "User updated successfully" : "User created successfully")
      router.push("/admin/users")
    } catch {
      toast.error("Network error. Please try again.")
    }
  }

  const labelStyle = { color: "var(--fg)", fontSize: 13, fontWeight: 500 as const }
  const inputStyle = { background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} style={{ maxWidth: 580 }}>
        <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <p style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600, color: "var(--fg)" }}>User Details</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" style={inputStyle} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" style={inputStyle} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <FormField control={form.control} name="role" render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger style={inputStyle}>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <FormField control={form.control} name="avatar" render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>
                  Avatar URL <span style={{ color: "var(--fg-faint)", fontWeight: 400 }}>(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/avatar.jpg" style={inputStyle} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>
                  Password <span style={{ color: "var(--fg-faint)", fontWeight: 400 }}>{id ? "(leave blank to keep current)" : "(min 6 chars)"}</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" style={inputStyle} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="active" render={({ field }) => (
            <FormItem style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel style={{ ...labelStyle, margin: 0, cursor: "pointer", fontWeight: 400 }}>
                Active account
              </FormLabel>
            </FormItem>
          )} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/users")}
            style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}
            style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }}>
            {isSubmitting && <Loader2 size={14} style={{ marginRight: 4, animation: "spin 1s linear infinite" }} />}
            {isSubmitting ? "Saving..." : id ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
