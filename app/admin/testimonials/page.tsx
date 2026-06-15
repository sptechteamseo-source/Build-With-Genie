"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Search, Edit2, RefreshCw, Plus, MessageSquare, Star, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import type { ITestimonial } from "@/types"

const PAGE_SIZE = 10

export default function TestimonialsPage() {
  const [items, setItems] = useState<ITestimonial[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [visibilityFilter, setVisibilityFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (visibilityFilter && visibilityFilter !== "all") params.set("visible", visibilityFilter)
      params.set("page", String(page))
      params.set("limit", String(PAGE_SIZE))
      const res = await fetch(`/api/admin/testimonials?${params}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setItems(data.testimonials)
      setTotal(data.total ?? data.testimonials.length)
    } catch {
      toast.error("Failed to load testimonials")
    } finally {
      setLoading(false)
    }
  }, [search, visibilityFilter, page])

  useEffect(() => { setPage(1) }, [search, visibilityFilter])
  useEffect(() => { fetchItems() }, [fetchItems])

  async function handleDelete(id: string, name: string) {
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" })
      toast.success(`${name}'s testimonial deleted`)
      fetchItems()
    } catch {
      toast.error("Failed to delete")
    }
  }

  async function toggleVisible(t: ITestimonial) {
    try {
      await fetch(`/api/admin/testimonials/${t._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !t.visible }),
      })
      toast.success(t.visible ? "Hidden from site" : "Now visible on site")
      fetchItems()
    } catch {
      toast.error("Failed to update visibility")
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "color-mix(in srgb, var(--accent) 15%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MessageSquare size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Testimonials</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2, #888)" }}>{total} total reviews</p>
          </div>
        </div>
        <Button asChild style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }}>
          <Link href="/admin/testimonials/new">
            <Plus size={16} />
            Add Testimonial
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 260px", minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--fg-2, #888)", pointerEvents: "none" }} />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or company..."
            style={{ paddingLeft: 32, background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }}
          />
        </div>
        <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
          <SelectTrigger style={{ width: 160, background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Visible</SelectItem>
            <SelectItem value="false">Hidden</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={fetchItems}
          style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--fg-2, #888)", fontSize: 14 }}>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottom: "1px solid var(--line)" }}>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Person</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Company</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Rating</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Preview</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Visibility</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)", textAlign: "right" }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center", padding: 48, color: "var(--fg-2, #888)" }}>
                    No testimonials found.
                  </TableCell>
                </TableRow>
              ) : items.map((t) => (
                <TableRow key={t._id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar style={{ width: 36, height: 36 }}>
                        {t.image && <AvatarImage src={t.image} alt={t.name} />}
                        <AvatarFallback style={{ background: "color-mix(in srgb, var(--accent) 20%, transparent)", color: "var(--accent)", fontSize: 13, fontWeight: 700 }}>
                          {t.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div style={{ fontSize: 14, color: "var(--fg)", fontWeight: 500 }}>{t.name}</div>
                        <div style={{ fontSize: 12, color: "var(--fg-2, #888)" }}>{t.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontSize: 13, color: "var(--fg-2, #888)" }}>{t.company}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: 2 }}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} size={13}
                          fill={n <= t.rating ? "#f59e0b" : "none"}
                          color={n <= t.rating ? "#f59e0b" : "var(--line)"}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell style={{ maxWidth: 200 }}>
                    <span style={{ fontSize: 12, color: "var(--fg-2, #888)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {t.text}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleVisible(t)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "4px 10px", borderRadius: 999, border: "1px solid",
                        cursor: "pointer", fontSize: 12, fontWeight: 500,
                        borderColor: t.visible ? "rgba(52,211,153,0.3)" : "rgba(239,68,68,0.3)",
                        background: t.visible ? "rgba(52,211,153,0.08)" : "rgba(239,68,68,0.08)",
                        color: t.visible ? "#34d399" : "#ef4444",
                        transition: "all 0.15s",
                      }}
                    >
                      {t.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                      {t.visible ? "Visible" : "Hidden"}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <Button asChild variant="outline" size="sm"
                        style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
                        <Link href={`/admin/testimonials/${t._id}/edit`}>
                          <Edit2 size={12} />
                          Edit
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm"
                            style={{ borderColor: "rgba(239,68,68,0.4)", color: "#ef4444", background: "transparent" }}>
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete testimonial?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t.name}&apos;s testimonial will be permanently deleted.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(t._id!, t.name)}
                              style={{ background: "#ef4444" }}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <span style={{ fontSize: 13, color: "var(--fg-2, #888)" }}>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, total)}–{Math.min(page * PAGE_SIZE, total)} of {total}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}
              style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
              <ChevronLeft size={14} />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => setPage(p)}
                style={p === page
                  ? { background: "var(--accent)", color: "#0a0a0a" }
                  : { borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }
                }>
                {p}
              </Button>
            ))}
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
