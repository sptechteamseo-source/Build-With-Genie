"use client";

import dynamic from "next/dynamic";
import { GeniButton } from "@/components/ui/GeniButton";

const HeroTerminal = dynamic(() => import("./HeroTerminal").then((m) => m.HeroTerminal), { ssr: false });

const STATS = [
  { value: "3–6×", label: "Faster delivery" },
  { value: "40–60%", label: "Lower cost" },
  { value: "14 days", label: "Avg. MVP" },
];

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        padding: "80px 0 120px",
        overflow: "hidden",
      }}
    >
      <div className="dotgrid" />

      <div className="wrap" style={{ position: "relative" }}>
        <div className="hero-grid">
          {/* Left — copy */}
          <div>
            <span className="eyebrow">A new model of development</span>

            <h1 style={{ marginTop: 28, marginBottom: 28 }}>
              Ship software at{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
                Genie speed
              </span>{" "}
              — without a 30-person team.
            </h1>

            <p
              style={{
                fontSize: 19,
                color: "var(--fg-dim)",
                maxWidth: "52ch",
                marginBottom: 36,
                lineHeight: 1.6,
              }}
            >
              We design, architect, build, test and deliver production software
              using Claude, Gemini and OpenAI on every step. Make a wish, get
              the build. A senior pod, not a body shop.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <GeniButton href="/contact" variant="primary">
                Book a 30-min scoping call <span>↗</span>
              </GeniButton>
              <GeniButton href="/work">See recent work</GeniButton>
            </div>

            {/* Stats row */}
            <div
              style={{
                marginTop: 56,
                display: "flex",
                gap: 48,
                borderTop: "1px solid var(--line)",
                paddingTop: 28,
                flexWrap: "wrap",
              }}
            >
              {STATS.map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <b
                    style={{
                      fontSize: 28,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
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
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — terminal */}
          <HeroTerminal />
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}
