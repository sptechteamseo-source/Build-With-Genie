"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Search, Edit2, RefreshCw, Plus, Users, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import type { IAdminUser } from "@/types"

const PAGE_SIZE = 10

const roleVariant: Record<string, "default" | "destructive" | "warning" | "secondary"> = {
  admin: "destructive",
  editor: "warning",
  user: "secondary",
}

export default function UsersPage() {
  const [users, setUsers] = useState<IAdminUser[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("all")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const searchRef = useRef(search)
  const roleRef = useRef(role)
  const pageRef = useRef(page)

  async function fetchUsers(s = search, r = role, p = page) {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (s) params.set("search", s)
      if (r && r !== "all") params.set("role", r)
      params.set("page", String(p))
      params.set("limit", String(PAGE_SIZE))
      const res = await fetch(`/api/admin/users?${params}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setUsers(data.users ?? [])
      setTotal(data.total ?? 0)
    } catch {
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearch(val: string) {
    setSearch(val)
    searchRef.current = val
    setPage(1)
    pageRef.current = 1
    fetchUsers(val, roleRef.current, 1)
  }

  function handleRole(val: string) {
    setRole(val)
    roleRef.current = val
    setPage(1)
    pageRef.current = 1
    fetchUsers(searchRef.current, val, 1)
  }

  function handlePage(p: number) {
    setPage(p)
    pageRef.current = p
    fetchUsers(searchRef.current, roleRef.current, p)
  }

  async function handleDelete(id: string, name: string) {
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast.success(`${name} deleted`)
      fetchUsers(searchRef.current, roleRef.current, pageRef.current)
    } catch {
      toast.error("Failed to delete user")
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "color-mix(in srgb, var(--accent) 15%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Users size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Users</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2, #888)" }}>{total} total users</p>
          </div>
        </div>
        <Button asChild style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600 }}>
          <Link href="/admin/users/new">
            <Plus size={16} />
            Add User
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 260px", minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--fg-2, #888)", pointerEvents: "none" }} />
          <Input
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search by name or email..."
            style={{ paddingLeft: 32, background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }}
          />
        </div>
        <Select value={role} onValueChange={handleRole}>
          <SelectTrigger style={{ width: 160, background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => fetchUsers()}
          style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--fg-2, #888)", fontSize: 14 }}>Loading...</div>
        ) : users.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--fg-2, #888)", fontSize: 14 }}>No users found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottom: "1px solid var(--line)" }}>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>User</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Email</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Role</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Status</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)", textAlign: "right" }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar style={{ width: 32, height: 32 }}>
                        {u.avatar && <AvatarImage src={u.avatar} alt={u.name} />}
                        <AvatarFallback style={{ background: "var(--accent)", color: "#fff", fontSize: 12, fontWeight: 700 }}>
                          {u.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span style={{ fontSize: 14, color: "var(--fg)", fontWeight: 500 }}>{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontSize: 13, color: "var(--fg-2, #888)" }}>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={roleVariant[u.role] ?? "secondary"} style={{ textTransform: "capitalize" }}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.active ? "success" : "destructive"}>
                      {u.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <Button asChild variant="outline" size="sm"
                        style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
                        <Link href={`/admin/users/${u._id}/edit`}>
                          <Edit2 size={12} />
                          Edit
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm"
                            style={{ borderColor: "rgba(239,68,68,0.4)", color: "#ef4444", background: "transparent" }}>
                            <Trash2 size={12} />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete user?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {u.name} will be permanently deleted. This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(u._id!, u.name)}
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
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => handlePage(page - 1)}
              style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
              <ChevronLeft size={14} />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => handlePage(p)}
                style={p === page
                  ? { background: "var(--accent)", color: "#0a0a0a" }
                  : { borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
                {p}
              </Button>
            ))}
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => handlePage(page + 1)}
              style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
