"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Quote, FileText, ChevronRight, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

export function AdminSidebar() {
  const path = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      background: "var(--bg-1)",
      borderRight: "1px solid var(--line)",
      display: "flex",
      flexDirection: "column",
      padding: "24px 0",
      gap: 4,
    }}>
      <div style={{ padding: "0 20px 20px", borderBottom: "1px solid var(--line)", marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--fg)" }}>
          Admin
        </span>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 13, color: "var(--fg-dim)", display: "block", marginTop: 2 }}>
          Dashboard
        </span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? path === href : path.startsWith(href);
          return (
            <Link key={href} href={href} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: active ? 500 : 400,
              color: active ? "var(--accent)" : "var(--fg-dim)",
              background: active ? "var(--accent-soft)" : "transparent",
              transition: "all 150ms",
            }}>
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", padding: "20px 12px 0", borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 6 }}>
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 8,
          fontSize: 13,
          color: "var(--fg-faint)",
          textDecoration: "none",
          fontFamily: "var(--font-sans)",
        }}>
          ← Back to site
        </Link>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: 13,
            color: "#ff5555",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            textAlign: "left",
          }}
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
}
