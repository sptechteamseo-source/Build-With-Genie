import type { ReactNode } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  createHref?: string;
  createLabel?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ title, subtitle, createHref, createLabel, actions }: AdminPageHeaderProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 28,
      gap: 16,
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--fg)", fontFamily: "var(--font-sans)" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--fg-dim)", fontFamily: "var(--font-sans)" }}>
            {subtitle}
          </p>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {actions}
        {createHref && (
          <Link href={createHref} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            borderRadius: 8,
            background: "var(--accent)",
            color: "#0a0a0a",
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
          }}>
            <Plus size={14} />
            {createLabel ?? "Create New"}
          </Link>
        )}
      </div>
    </div>
  );
}
