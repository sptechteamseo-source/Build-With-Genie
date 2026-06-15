"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { UseCaseIcon } from "@/components/use-cases/UseCaseIcon";
import { USE_CASES } from "@/constants/use-cases";

type Role = "All" | (typeof USE_CASES)[number]["role"];

const ROLES: Role[] = ["All", "Founders", "Product", "Engineering", "Marketing", "Design", "Operations"];

const METRICS = [
  { value: "11hrs", label: "saved per person / week" },
  { value: "6 roles", label: "one shared workspace" },
  { value: "2 min", label: "from prompt to first draft" },
  { value: "SOC 2", label: "Type II · data never trained on" },
];

export default function UseCasesPage() {
  const [active, setActive] = useState<Role>("All");

  const filtered = active === "All" ? USE_CASES : USE_CASES.filter((c) => c.role === active);

  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        heading="One platform. Every role on your team."
        lede="Build with Genie does the real work — research, drafting, analysis, code — for whoever needs it. Pick your role and see exactly where it earns its keep."
      />

      {/* Role filter */}
      <div className="wrap" style={{ paddingTop: 48, paddingBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              justifyContent: "center",
              padding: 5,
              border: "1px solid var(--line)",
              borderRadius: 9999,
              background: "var(--bg-1)",
            }}
          >
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setActive(role)}
                style={{
                  padding: "9px 16px",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13.5,
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  transition: "all 150ms",
                  background: role === active ? "var(--fg)" : "transparent",
                  color: role === active ? "var(--bg-0)" : "var(--fg-dim)",
                  fontWeight: role === active ? 600 : 400,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="wrap" style={{ paddingTop: 36, paddingBottom: 0 }}>
        <div
          className="uc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {filtered.map((uc) => (
            <Link
              key={uc.slug}
              href={`/use-cases/${uc.slug}`}
              className="uc-card"
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                padding: 26,
                textDecoration: "none",
                color: "inherit",
                transition: "border-color 200ms, transform 200ms",
              }}
            >
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    border: "1px solid var(--line)",
                    background: "var(--bg-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--fg)",
                    flexShrink: 0,
                  }}
                >
                  <UseCaseIcon name={uc.icon} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 32,
                    letterSpacing: "-0.02em",
                    color: "var(--line-strong)",
                    lineHeight: 1,
                  }}
                >
                  {uc.index}
                </span>
              </div>

              {/* Card body */}
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--fg-faint)",
                  }}
                >
                  {uc.role}
                </span>
                <h3
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--fg)",
                    margin: 0,
                  }}
                >
                  {uc.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--fg-dim)",
                  }}
                >
                  {uc.desc}
                </p>
              </div>

              {/* Points */}
              <ul
                style={{
                  listStyle: "none",
                  margin: "20px 0 0",
                  padding: "18px 0 0",
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flexGrow: 1,
                }}
              >
                {uc.points.map((pt) => (
                  <li
                    key={pt}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 13.5,
                      lineHeight: 1.45,
                      color: "var(--fg-dim)",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Footer link */}
              <span
                className="uc-card-cta"
                style={{
                  marginTop: 22,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: "0.01em",
                  color: "var(--accent)",
                  transition: "gap 150ms",
                }}
              >
                Explore use case <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Metrics strip */}
      <div className="wrap" style={{ paddingTop: 64 }}>
        <div
          className="metrics-strip"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            background: "var(--bg-1)",
          }}
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              style={{
                padding: "32px 28px",
                borderRight: i < METRICS.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 40,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "var(--fg)",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--fg-faint)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ padding: "80px 0" }}>
        <div className="wrap">
          <CtaStrip
            heading="Make your first request."
            body="Free for your first 50 tasks. No card, no setup call — just describe the work and watch it get done."
            primaryLabel="Start free"
            primaryHref="/contact"
            secondaryLabel="Book a demo"
            secondaryHref="/contact"
          />
        </div>
      </section>

      <style>{`
        .uc-card:hover {
          border-color: var(--line-strong);
          transform: translateY(-3px);
        }
        .uc-card:hover .uc-card-cta {
          gap: 11px;
        }
        @media (max-width: 1024px) {
          .uc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .uc-grid { grid-template-columns: 1fr !important; }
          .metrics-strip { grid-template-columns: 1fr 1fr !important; }
          .metrics-strip > div { border-right: none !important; border-bottom: 1px solid var(--line); }
        }
      `}</style>
    </>
  );
}
