import Link from "next/link";

const SERVICES_PREVIEW = [
  { num: "01 / MVP Sprint", title: "14-day MVP", desc: "Idea to working product, ready for paying users. Fixed scope, fixed price.", href: "/services#mvp" },
  { num: "02 / Modernize", title: "Legacy modernization", desc: "Refactor, migrate or rewrite an existing codebase. AI handles the toil, humans steer.", href: "/services#modernize" },
  { num: "03 / Integrate", title: "AI features in your product", desc: "Add copilots, summarizers, RAG search and agents to an existing app.", href: "/services#integrate" },
  { num: "04 / Embedded Pod", title: "Embedded pod", desc: "A senior Genie pod that joins your team for a quarter. Output of a department.", href: "/services#pod" },
];

export function ServicesPreview() {
  return (
    <div
      className="svc-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        background: "var(--line)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {SERVICES_PREVIEW.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="svc-cell"
          style={{
            background: "var(--bg-1)",
            padding: 28,
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "background 0.2s",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {s.num}
          </div>
          <div>
            <h4 style={{ fontSize: 20, marginTop: 16, letterSpacing: "-0.01em" }}>{s.title}</h4>
            <p style={{ color: "var(--fg-dim)", fontSize: 13, marginTop: 8 }}>{s.desc}</p>
          </div>
          <div
            style={{
              color: "var(--fg-faint)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
            }}
          >
            Learn more →
          </div>
        </Link>
      ))}

      <style>{`
        @media (max-width: 900px) {
          .svc-grid { grid-template-columns: 1fr 1fr !important; }
        }
        .svc-cell:hover { background: var(--bg-2) !important; }
      `}</style>
    </div>
  );
}
