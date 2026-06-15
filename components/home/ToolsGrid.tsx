import { TOOLS } from "@/constants/tools";

export function ToolsGrid() {
  return (
    <div
      className="tools-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14,
      }}
    >
      {TOOLS.map((tool) => (
        <div
          key={tool.name}
          className="tool-card"
          style={{
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-lg)",
            padding: 28,
            background: "var(--bg-1)",
            display: "grid",
            gridTemplateRows: "auto auto 1fr auto",
            gap: 16,
            minHeight: 280,
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}
        >
          {/* Hover glow */}
          <div
            className="tool-glow"
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 80% 0%, rgba(93,139,244,0.12), transparent 60%)",
              opacity: 0,
              transition: "opacity 0.3s",
              pointerEvents: "none",
            }}
          />

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "var(--bg-2)",
                border: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              {tool.mark}
            </div>
            <div>
              <h3 style={{ fontSize: 20 }}>{tool.name}</h3>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--fg-faint)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {tool.role}
              </div>
            </div>
          </div>

          {/* Body */}
          <p style={{ color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.55 }}>
            {tool.body}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tool.uses.map((u) => (
              <span key={u} className={`tag${tool.accent && u === "Always-on" ? " accent" : ""}`}>
                {u}
              </span>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 900px) {
          .tools-grid { grid-template-columns: 1fr !important; }
        }
        .tool-card:hover { border-color: var(--line-strong) !important; }
        .tool-card:hover .tool-glow { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
