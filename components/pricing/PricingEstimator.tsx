"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ESTIMATOR_QUESTIONS } from "@/constants/pricing";

type Answers = Record<string, string | number>;

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

export function PricingEstimator() {
  const [answers, setAnswers] = useState<Answers>({
    kind: "new",
    size: "s",
    integ: 1,
    compliance: "none",
    design: "use",
  });

  const result = useMemo(() => {
    const kind = ESTIMATOR_QUESTIONS[0].options.find((o) => o.v === answers.kind)!;
    const size = ESTIMATOR_QUESTIONS[1].options.find((o) => o.v === answers.size)!;
    const integ = ESTIMATOR_QUESTIONS[2].options.find((o) => o.v === answers.integ)!;
    const comp = ESTIMATOR_QUESTIONS[3].options.find((o) => o.v === answers.compliance)!;
    const design = ESTIMATOR_QUESTIONS[4].options.find((o) => o.v === answers.design)!;

    const base = (size.base ?? 0) * (kind.mult ?? 1);
    const adds = (integ.add ?? 0) + (comp.add ?? 0) + (design.add ?? 0);
    const total = Math.round((base + adds) / 1000) * 1000;
    const days = Math.ceil((size.days ?? 14) * ((kind.mult ?? 1) > 1 ? 1.15 : 1));

    return {
      total,
      days,
      base: Math.round(base / 1000) * 1000,
      integ: integ.add ?? 0,
      comp: comp.add ?? 0,
      design: design.add ?? 0,
    };
  }, [answers]);

  return (
    <div
      className="estimator-wrapper"
      style={{
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        padding: 40,
        background: "var(--bg-1)",
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 48,
        alignItems: "start",
      }}
    >
      {/* Questions */}
      <div>
        {ESTIMATOR_QUESTIONS.map((q) => (
          <div key={q.id} style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 14,
                color: "var(--fg)",
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{q.label}</span>
              <span
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
              >
                {q.options.find((o) => o.v === answers[q.id])?.l}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {q.options.map((o) => {
                const isOn = answers[q.id] === o.v;
                return (
                  <button
                    key={String(o.v)}
                    onClick={() => setAnswers({ ...answers, [q.id]: o.v })}
                    style={{
                      background: isOn ? "var(--accent)" : "var(--bg-0)",
                      border: `1px solid ${isOn ? "var(--accent)" : "var(--line)"}`,
                      color: isOn ? "#0a0a0a" : "var(--fg-dim)",
                      padding: "8px 14px",
                      fontSize: 13,
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {o.l}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Result panel */}
      <div
        style={{
          position: "sticky",
          top: 100,
          border: "1px solid var(--accent-line)",
          background: "var(--accent-soft)",
          borderRadius: "var(--radius-md)",
          padding: 24,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-faint)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Ballpark
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 500,
            letterSpacing: "-0.025em",
            margin: "8px 0 4px",
          }}
        >
          {fmt(result.total)}
        </div>
        <div style={{ color: "var(--fg-dim)", fontSize: 13 }}>
          ~{result.days} days · 2-senior pod · all-in
        </div>

        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-dim)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Build</span>
            <span style={{ color: "var(--fg)" }}>{fmt(result.base)}</span>
          </div>
          {result.integ > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Integrations</span>
              <span style={{ color: "var(--fg)" }}>+{fmt(result.integ)}</span>
            </div>
          )}
          {result.comp > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Compliance</span>
              <span style={{ color: "var(--fg)" }}>+{fmt(result.comp)}</span>
            </div>
          )}
          {result.design > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Design</span>
              <span style={{ color: "var(--fg)" }}>+{fmt(result.design)}</span>
            </div>
          )}
        </div>

        <Link
          href="/contact"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 18,
            padding: "12px 18px",
            fontSize: 14,
            borderRadius: 8,
            border: "1px solid var(--accent)",
            background: "var(--accent)",
            color: "#0a0a0a",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Get a real quote <span>↗</span>
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .estimator-wrapper { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
