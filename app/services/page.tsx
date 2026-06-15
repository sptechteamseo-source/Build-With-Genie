import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { TestimonialsSection } from "@/components/services/TestimonialsSection";
import { SERVICES } from "@/constants/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four ways to engage. 14-day MVPs, legacy modernization, AI feature integration, and embedded pods.",
};

// Testimonials are read live from MongoDB (see TestimonialsSection).
export const dynamic = "force-dynamic";

const TIMELINE_CELLS = [
  { d: "D1", lbl: "Discover", active: true },
  { d: "D2", lbl: "Design", active: true },
  { d: "D3", lbl: "Design", active: true },
  { d: "D4", lbl: "Architect", active: true },
  { d: "D5", lbl: "Build", active: true },
  { d: "D6–D11", lbl: "Build · daily staging", active: false },
  { d: "D12", lbl: "QA", active: true },
];

function TimelineVis() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, fontFamily: "var(--font-mono)", fontSize: 11 }}>
      {TIMELINE_CELLS.map((c) => (
        <div
          key={c.d}
          style={{
            padding: "12px 8px",
            border: `1px solid ${c.active ? "var(--accent-line)" : "var(--line)"}`,
            borderRadius: 6,
            background: c.active ? "var(--accent-soft)" : "var(--bg-1)",
            color: c.active ? "var(--fg)" : "var(--fg-dim)",
            minHeight: 56,
          }}
        >
          <span style={{ color: "var(--fg-faint)", fontSize: 10 }}>{c.d}</span>
          <span style={{ display: "block", marginTop: 6, fontSize: 11 }}>{c.lbl}</span>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        heading="Four ways to engage. Each shaped around how fast you need to ship."
        lede="Pick the shape that matches your moment. Every engagement is staffed by a pod of two seniors and our AI stack — same people, different cadence."
      />

      <div className="wrap">
        {SERVICES.map((svc, i) => (
          <div
            key={svc.id}
            id={svc.id}
            className="service-row"
            style={{
              display: "grid",
              gridTemplateColumns: "360px 1fr",
              gap: 80,
              padding: "80px 0",
              borderBottom: i < SERVICES.length - 1 ? "1px solid var(--line)" : "none",
              alignItems: "start",
            }}
          >
            {/* Sticky left */}
            <div style={{ position: "sticky", top: 100 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--accent)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  display: "block",
                }}
              >
                {svc.num}
              </span>
              <h2 style={{ fontSize: 38, letterSpacing: "-0.02em", marginBottom: 16 }}>{svc.title}</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-dim)", marginBottom: 28 }}>
                {svc.meta.map((m) => (
                  <div key={m.label} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ color: "var(--fg-faint)" }}>{m.label}</span>
                    <span>{m.value}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 18px", fontSize: 14, borderRadius: 8, border: "1px solid var(--accent)", background: "var(--accent)", color: "#0a0a0a", fontWeight: 500, textDecoration: "none" }}
              >
                {svc.ctaLabel} <span>↗</span>
              </Link>
            </div>

            {/* Right content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <p style={{ color: "var(--fg-dim)", fontSize: 15, lineHeight: 1.6, maxWidth: "65ch" }}>
                {svc.description}
              </p>

              {/* Timeline only for MVP */}
              {svc.id === "mvp" && (
                <div>
                  <h4 style={{ marginBottom: 14, fontSize: 14, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
                    Two-week shape
                  </h4>
                  <TimelineVis />
                </div>
              )}

              <div>
                <h4 style={{ marginBottom: 14, fontSize: 14, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
                  {svc.sectionTitle}
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px" }} className="includes-list">
                  {svc.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "18px 1fr",
                        gap: 10,
                        fontSize: 14,
                        color: "var(--fg-dim)",
                        lineHeight: 1.45,
                        padding: "10px 0",
                        borderBottom: "1px dashed var(--line)",
                      }}
                    >
                      <span style={{ color: "var(--accent)", fontSize: 10, alignSelf: "start", marginTop: 4 }}>▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", border: "1px solid var(--accent-line)", background: "var(--accent-soft)", borderRadius: "var(--radius-md)" }}>
                <b style={{ fontSize: 18 }}>{svc.callout}</b>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: "auto", flexShrink: 0 }}>
                  {svc.calloutSub}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TestimonialsSection />

      <section style={{ padding: "80px 0", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <CtaStrip
            heading="Not sure which one fits?"
            body="Tell us the problem. We'll suggest the smallest engagement that solves it."
            primaryLabel="Book a scoping call"
            primaryHref="/contact"
          />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .service-row { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 700px) {
          .includes-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
