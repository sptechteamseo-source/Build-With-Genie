import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  sub?: string;
  accent?: boolean;
}

export function StatCard({ label, value, icon, sub, accent }: StatCardProps) {
  return (
    <div style={{
      background: "var(--bg-1)",
      border: `1px solid ${accent ? "var(--accent-line)" : "var(--line)"}`,
      borderRadius: 12,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 13, color: "var(--fg-dim)", fontFamily: "var(--font-sans)" }}>{label}</span>
        <span style={{ color: accent ? "var(--accent)" : "var(--fg-faint)" }}>{icon}</span>
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fg)", fontFamily: "var(--font-sans)", lineHeight: 1 }}>
          {value}
        </div>
        {sub && (
          <div style={{ fontSize: 12, color: "var(--fg-faint)", marginTop: 4, fontFamily: "var(--font-sans)" }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
