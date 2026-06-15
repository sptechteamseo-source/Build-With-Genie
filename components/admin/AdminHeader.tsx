"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header
      style={{
        padding: "16px 24px",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--bg-0)",
        flexShrink: 0,
      }}
    >
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--fg)", margin: 0 }}>{title}</h1>
        {description && (
          <p style={{ fontSize: 13, color: "var(--fg-2, #888)", margin: "2px 0 0" }}>{description}</p>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--fg-2, #888)" }} />
          <Input
            placeholder="Search..."
            style={{ paddingLeft: 32, width: 200, height: 36, fontSize: 13, background: "var(--bg-1)", border: "1px solid var(--line)" }}
          />
        </div>
        <Button variant="ghost" size="icon" style={{ color: "var(--fg)", position: "relative" }}>
          <Bell size={18} />
        </Button>
        <Avatar style={{ width: 32, height: 32 }}>
          <AvatarFallback style={{ background: "var(--accent)", color: "#fff", fontSize: 12, fontWeight: 700 }}>A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
