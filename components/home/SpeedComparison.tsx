"use client";

import { useEffect, useRef, useState } from "react";

const TRADITIONAL = [
  { stage: "Discovery", width: "14%", dur: "2w" },
  { stage: "Design", width: "28%", dur: "3w" },
  { stage: "Architect", width: "14%", dur: "1w" },
  { stage: "Build", width: "100%", dur: "8w" },
  { stage: "QA", width: "28%", dur: "2w" },
  { stage: "Deploy", width: "14%", dur: "1w" },
];

const GENIE = [
  { stage: "Discovery", width: "8%", dur: "2d" },
  { stage: "Design", width: "14%", dur: "3d" },
  { stage: "Architect", width: "8%", dur: "1d" },
  { stage: "Build", width: "56%", dur: "12d" },
  { stage: "QA", width: "18%", dur: "3d" },
  { stage: "Deploy", width: "4%", dur: "1d" },
];

function SpeedCol({ title, sub, rows, total, isUs }: {
  title: string;
  sub: string;
  rows: typeof TRADITIONAL;
  total: string;
  isUs: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        border: `1px solid ${isUs ? "var(--accent-line)" : "var(--line)"}`,
        borderRadius: "var(--radius-lg)",
        padding: 28,
        background: isUs
          ? "linear-gradient(180deg, rgba(93,139,244,0.06), var(--bg-1))"
          : "var(--bg-1)",
      }}
    >
      <h3 style={{ fontSize: 22, marginBottom: 4 }}>{title}</h3>
      <p style={{ color: "var(--fg-dim)", fontSize: 13, marginBottom: 24 }}>{sub}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((row) => (
          <div
            key={row.stage}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr 60px",
              gap: 12,
              alignItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
            }}
          >
            <span style={{ color: "var(--fg-dim)" }}>{row.stage}</span>
            <span
              style={{
                height: 10,
                borderRadius: 4,
                background: "var(--bg-3)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  background: isUs ? "var(--accent)" : "var(--fg-faint)",
                  borderRadius: 4,
                  width: animate ? row.width : "0%",
                  transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </span>
            <span style={{ color: "var(--fg-faint)", textAlign: "right" }}>{row.dur}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 22,
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          paddingTop: 22,
          borderTop: "1px solid var(--line)",
        }}
      >
        <b
          style={{
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: isUs ? "var(--accent)" : "var(--fg)",
          }}
        >
          {total}
        </b>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-faint)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          End-to-end
        </span>
      </div>
    </div>
  );
}

export function SpeedComparison() {
  return (
    <div
      className="speed-grid"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
    >
      <SpeedCol
        title="Traditional agency"
        sub="6 people · waterfall-ish · ~$120k"
        rows={TRADITIONAL}
        total="17 weeks"
        isUs={false}
      />
      <SpeedCol
        title="Genie pod"
        sub="2 seniors + AI stack · iterative · ~$48k"
        rows={GENIE}
        total="22 days"
        isUs
      />

      <style>{`
        @media (max-width: 900px) {
          .speed-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
