import Link from "next/link";

const CASES_PREVIEW = [
  {
    href: "/work#fintech",
    imgClass: "fintech",
    tag: "Fintech / B2B",
    title: "Reconciliation engine for a payments unicorn",
    stats: ["18d shipped", "3 people", "$2.1M saved/yr"],
  },
  {
    href: "/work#health",
    imgClass: "health",
    tag: "Healthcare",
    title: "HIPAA-grade intake workflow",
    stats: ["32d shipped", "40% faster"],
  },
  {
    href: "/work#saas",
    imgClass: "saas",
    tag: "SaaS",
    title: "AI search inside a 1M-doc product",
    stats: ["21d shipped", "4× retention"],
  },
];

const imgStyles: Record<string, React.CSSProperties> = {
  fintech: { backgroundImage: "linear-gradient(135deg, rgba(93,139,244,0.18), transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px)" },
  health: { backgroundImage: "linear-gradient(135deg, rgba(124,245,196,0.12), transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px)" },
  saas: { backgroundImage: "linear-gradient(135deg, rgba(197,163,255,0.12), transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px)" },
};

export function CasesPreview() {
  return (
    <div
      className="case-grid"
      style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16 }}
    >
      {CASES_PREVIEW.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="case-card"
          style={{
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            minHeight: 360,
            textDecoration: "none",
            transition: "border-color 0.2s",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "var(--bg-2)",
              ...imgStyles[c.imgClass],
            }}
          />
          <div
            style={{ padding: 20, borderTop: "1px solid var(--line)" }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-faint)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {c.tag}
            </div>
            <h4 style={{ fontSize: 18, marginTop: 6 }}>{c.title}</h4>
            <div
              style={{
                display: "flex",
                gap: 18,
                marginTop: 12,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-dim)",
              }}
            >
              {c.stats.map((s) => (
                <span key={s} style={{ color: "var(--accent)", fontWeight: 500 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}

      <style>{`
        @media (max-width: 900px) {
          .case-grid { grid-template-columns: 1fr !important; }
        }
        .case-card:hover { border-color: var(--line-strong) !important; }
      `}</style>
    </div>
  );
}
