"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Search, Edit2, Eye, RefreshCw, Plus, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import type { IBlogPostDoc } from "@/types"

const PAGE_SIZE = 10

export default function BlogPage() {
  const [posts, setPosts] = useState<IBlogPostDoc[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (status && status !== "all") params.set("status", status)
      params.set("page", String(page))
      params.set("limit", String(PAGE_SIZE))
      const res = await fetch(`/api/admin/blog?${params}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPosts(data.posts)
      setTotal(data.total ?? data.posts.length)
    } catch {
      toast.error("Failed to load posts")
    } finally {
      setLoading(false)
    }
  }, [search, status, page])

  useEffect(() => { setPage(1) }, [search, status])
  useEffect(() => { fetchPosts() }, [fetchPosts])

  async function handleDelete(id: string, title: string) {
    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" })
      toast.success(`"${title}" deleted`)
      fetchPosts()
    } catch {
      toast.error("Failed to delete post")
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "color-mix(in srgb, var(--accent) 15%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FileText size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Blog Posts</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2, #888)" }}>{total} total posts</p>
          </div>
        </div>
        <Button asChild style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }}>
          <Link href="/admin/blog/new">
            <Plus size={16} />
            Write Post
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
            placeholder="Search posts..."
            style={{ paddingLeft: 32, background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }}
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger style={{ width: 160, background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={fetchPosts}
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
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Title</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Author</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Category</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Status</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Slug</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)", textAlign: "right" }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center", padding: 48, color: "var(--fg-2, #888)" }}>
                    No posts found.
                  </TableCell>
                </TableRow>
              ) : posts.map((p) => (
                <TableRow key={p._id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <TableCell style={{ maxWidth: 280 }}>
                    <div style={{ fontSize: 14, color: "var(--fg)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.title}
                    </div>
                    {p.excerpt && (
                      <div style={{ fontSize: 12, color: "var(--fg-2, #888)", marginTop: 2 }}>
                        {p.excerpt.slice(0, 60)}{p.excerpt.length > 60 ? "..." : ""}
                      </div>
                    )}
                  </TableCell>
                  <TableCell style={{ fontSize: 13, color: "var(--fg)" }}>{p.author}</TableCell>
                  <TableCell style={{ fontSize: 13, color: "var(--fg-2, #888)" }}>{p.category ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "published" ? "success" : "warning"}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code style={{ fontSize: 11, color: "var(--fg-2, #888)", background: "var(--bg-2, #111)", padding: "2px 6px", borderRadius: 4 }}>
                      /{p.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      {p.status === "published" && (
                        <Button asChild variant="outline" size="sm"
                          style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
                          <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer">
                            <Eye size={12} />
                            View
                          </a>
                        </Button>
                      )}
                      <Button asChild variant="outline" size="sm"
                        style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
                        <Link href={`/admin/blog/${p._id}/edit`}>
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
                            <AlertDialogTitle>Delete post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              &ldquo;{p.title}&rdquo; will be permanently deleted.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(p._id!, p.title)}
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
