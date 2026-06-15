import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { CASES } from "@/constants/cases";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Real software, shipped fast, in production today. Case studies from fintech, healthcare, SaaS, and dev tools.",
};

const METRICS = [
  { value: "47", label: "Engagements shipped" },
  { value: "21d", label: "Median time to ship" },
  { value: "$8.4M", label: "Saved vs. agency quotes" },
  { value: "96%", label: "Renewal / re-engage rate" },
];

const CLIENT_LOGOS = ["NORTHWIND", "PARALLAX FIN", "▲ ACME CO", "MERIDIAN", "PALOMA HEALTH", "VECTOR/LABS"];

const caseHeroStyles: Record<string, React.CSSProperties> = {
  fintech: { background: "radial-gradient(circle at 30% 30%, rgba(93,139,244,0.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(93,139,244,0.1), transparent 50%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px), var(--bg-2)" },
  health: { background: "radial-gradient(circle at 30% 30%, rgba(124,245,196,0.18), transparent 50%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px), var(--bg-2)" },
  saas: { background: "radial-gradient(circle at 30% 30%, rgba(197,163,255,0.18), transparent 50%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px), var(--bg-2)" },
  devtools: { background: "radial-gradient(circle at 30% 30%, rgba(255,209,102,0.18), transparent 50%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px), var(--bg-2)" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        heading="Real software, shipped fast, in production today."
        lede="A representative slice of recent engagements. Names changed where NDAs apply — happy to make a warm intro on request."
      >
        {/* Metrics strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            marginTop: 56,
          }}
          className="metrics-strip"
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              style={{
                padding: "24px 28px",
                borderRight: i < METRICS.length - 1 ? "1px solid var(--line)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <b style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.025em" }}>{m.value}</b>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <div className="wrap">
        {/* Client strip */}
        <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", background: "var(--bg-1)", padding: "28px 40px", margin: "64px 0" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
            A few of the teams we work with
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, alignItems: "center" }} className="client-row">
            {CLIENT_LOGOS.map((logo) => (
              <div key={logo} style={{ height: 36, border: "1px solid var(--line)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--fg-faint)", background: "var(--bg-0)" }}>
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Cases */}
        {CASES.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            style={{
              padding: "100px 0",
              borderBottom: i < CASES.length - 1 ? "1px solid var(--line)" : "none",
            }}
          >
            {/* Head */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 48 }} className="case-head-grid">
              <div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                  {c.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  <span className="tag accent">{c.accentTag}</span>
                </div>
                <h2 style={{ fontSize: "clamp(38px, 4vw, 56px)", letterSpacing: "-0.025em", maxWidth: "18ch" }}>{c.title}</h2>
              </div>
              <p style={{ color: "var(--fg-dim)", fontSize: 16, maxWidth: "50ch", lineHeight: 1.55 }}>{c.lede}</p>
            </div>

            {/* Hero image */}
            <div
              style={{
                height: 480,
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--line)",
                position: "relative",
                overflow: "hidden",
                marginBottom: 56,
                ...caseHeroStyles[c.imgClass],
              }}
            >
              <span style={{ position: "absolute", top: 24, left: 28, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {c.annotTl}
              </span>
            </div>

            {/* Body */}
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 64, alignItems: "start" }} className="case-body-grid">
              {/* Sidebar */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, display: "flex", flexDirection: "column", gap: 18, position: "sticky", top: 100 }}>
                {c.sidebar.map((b) => (
                  <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ color: "var(--fg-faint)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>{b.label}</span>
                    <span style={{ color: "var(--fg)" }}>{b.value}</span>
                  </div>
                ))}
              </div>

              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: "70ch" }}>
                <div>
                  <h3 style={{ fontSize: 24, letterSpacing: "-0.015em", marginBottom: 12 }}>The problem</h3>
                  <p style={{ color: "var(--fg-dim)", fontSize: 16, lineHeight: 1.65 }}>{c.problem}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 24, letterSpacing: "-0.015em", marginBottom: 12 }}>What we shipped</h3>
                  <p style={{ color: "var(--fg-dim)", fontSize: 16, lineHeight: 1.65 }}>{c.shipped}</p>
                </div>

                <blockquote style={{ margin: 0, padding: "20px 24px", borderLeft: "2px solid var(--accent)", background: "var(--bg-1)", borderRadius: "0 var(--radius-md) var(--radius-md) 0", fontSize: 18, color: "var(--fg)", lineHeight: 1.5 }}>
                  &ldquo;{c.quote}&rdquo;
                  <cite style={{ display: "block", marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase", fontStyle: "normal" }}>
                    — {c.quoteCite}
                  </cite>
                </blockquote>

                <div>
                  <h3 style={{ fontSize: 24, letterSpacing: "-0.015em", marginBottom: 12 }}>How AI shortened the timeline</h3>
                  <p style={{ color: "var(--fg-dim)", fontSize: 16, lineHeight: 1.65 }}>{c.aiNote}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {c.results.map((r) => (
                    <div key={r.label} style={{ background: "var(--bg-1)", border: "1px solid var(--line)", padding: 20, borderRadius: "var(--radius-md)" }}>
                      <b style={{ fontSize: 28, fontWeight: 500, color: "var(--accent)", letterSpacing: "-0.02em", display: "block" }}>{r.value}</b>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section style={{ padding: "80px 0", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <CtaStrip
            heading="Have a problem that looks like one of these?"
            body="Or one that looks totally different? We're equally interested. Drop a note — we reply within a business day."
            primaryLabel="Book a scoping call"
            primaryHref="/contact"
          />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .metrics-strip { grid-template-columns: 1fr 1fr !important; }
          .client-row { grid-template-columns: repeat(3, 1fr) !important; }
          .case-head-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .case-body-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 700px) {
          .metrics-strip { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
