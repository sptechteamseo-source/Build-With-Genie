import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHead } from "@/components/ui/SectionHead";
import { PricingEstimator } from "@/components/pricing/PricingEstimator";
import { PRICING_TIERS, PRICING_FAQ } from "@/constants/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Honest pricing for unhonest speed. Fixed-scope packages and monthly pods. No hourly billing.",
};

const COMPARE_ROWS = [
  { label: "Headcount on engagement", traditional: "6 (PM, design, 3× eng, QA)", tradSub: "~$45k/wk fully-loaded", genie: "2 seniors + AI stack", genieSub: "~$15k/wk all-in" },
  { label: "Discovery & design", traditional: "3 weeks", tradSub: "workshops, deliverables", genie: "3 days", genieSub: "live prototype, signed brief" },
  { label: "Architecture", traditional: "1 week", tradSub: "solution architect billable", genie: "1 day", genieSub: "tradeoff doc, senior-signed" },
  { label: "Build velocity", traditional: "~12 stories / sprint", tradSub: "", genie: "~40 stories / sprint", genieSub: "human-reviewed, tested" },
  { label: "QA", traditional: "Dedicated QA, 2 weeks", tradSub: "", genie: "Continuous · Gemini Antigravity drives every browser", genieSub: "" },
  { label: "Project management", traditional: "20% overhead", tradSub: "", genie: "In-pod, no PM tax", genieSub: "" },
  { label: "Typical 3-month total", traditional: "$385,000", tradSub: "", genie: "$144,000", genieSub: "2.7× cheaper · 2× faster" },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        heading="Honest pricing for unhonest speed."
        lede="Fixed-scope packages for known work. Monthly pods for sustained throughput. No hourly billing, no change-order theatre."
      />

      {/* ── Tiers ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div
            className="tiers-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "var(--line)",
            }}
          >
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: tier.featured
                    ? "linear-gradient(180deg, rgba(93,139,244,0.06), var(--bg-1))"
                    : "var(--bg-1)",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    {tier.badge}
                  </div>
                  <h3 style={{ fontSize: 28, marginTop: 6, letterSpacing: "-0.02em" }}>{tier.name}</h3>
                  <p style={{ color: "var(--fg-dim)", fontSize: 14, marginTop: 8, maxWidth: "32ch" }}>{tier.description}</p>
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  {tier.priceFrom && <span style={{ color: "var(--fg-faint)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>From</span>}
                  <b style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.025em" }}>{tier.price}</b>
                  {tier.priceSuffix && <span style={{ color: "var(--fg-faint)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{tier.priceSuffix}</span>}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {tier.features.map((f) => (
                    <li key={f} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 10, color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.45, padding: "6px 0", borderBottom: "1px dashed var(--line)" }}>
                      <span style={{ color: "var(--accent)", fontSize: 11, alignSelf: "start", marginTop: 4 }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 18px", fontSize: 14, borderRadius: 8, border: `1px solid ${tier.featured ? "var(--accent)" : "var(--line-strong)"}`, background: tier.featured ? "var(--accent)" : "transparent", color: tier.featured ? "#0a0a0a" : "var(--fg)", fontWeight: tier.featured ? 500 : 400, textDecoration: "none", justifyContent: "center" }}
                >
                  {tier.ctaLabel} <span>↗</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Estimator ──────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Estimator"
            heading="Ballpark in 30 seconds."
            lede="Move the sliders. This is a rough estimate — your actual quote is fixed and signed before we start work."
          />
          <PricingEstimator />
        </div>
      </section>

      {/* ── Comparison ─────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <SectionHead
            eyebrow="vs. traditional agency"
            heading="Where the money used to go."
            lede="A like-for-like comparison on a typical 3-month build. Same outcome, different shape of cost."
          />
          <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "18px 22px", textAlign: "left", background: "var(--bg-2)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-faint)", fontWeight: 400, borderBottom: "1px solid var(--line)" }}>Line item</th>
                  <th style={{ padding: "18px 22px", textAlign: "left", background: "var(--bg-2)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-faint)", fontWeight: 400, borderBottom: "1px solid var(--line)" }}>Traditional agency</th>
                  <th style={{ padding: "18px 22px", textAlign: "left", background: "var(--bg-2)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 400, borderBottom: "1px solid var(--line)" }}>Genie pod</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label}>
                    <td style={{ padding: "18px 22px", fontSize: 14, color: "var(--fg)", fontWeight: 500, borderBottom: i < COMPARE_ROWS.length - 1 ? "1px solid var(--line)" : "none", verticalAlign: "top" }}>{row.label}</td>
                    <td style={{ padding: "18px 22px", fontSize: 14, color: "var(--fg-dim)", borderBottom: i < COMPARE_ROWS.length - 1 ? "1px solid var(--line)" : "none", verticalAlign: "top" }}>
                      {row.traditional}
                      {row.tradSub && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", display: "block", marginTop: 4 }}>{row.tradSub}</span>}
                    </td>
                    <td style={{ padding: "18px 22px", fontSize: 14, color: "var(--fg)", borderBottom: i < COMPARE_ROWS.length - 1 ? "1px solid var(--line)" : "none", verticalAlign: "top" }}>
                      {row.genie}
                      {row.genieSub && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", display: "block", marginTop: 4 }}>{row.genieSub}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <SectionHead
            eyebrow="FAQ"
            heading="Pricing questions, answered."
            lede=""
          />
          <FaqAccordion items={PRICING_FAQ} />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .tiers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
