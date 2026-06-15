"use client";

import { useRef } from "react";
import { useTerminal } from "@/hooks/use-terminal";

const TERMINAL_SCRIPT = [
  { kind: "prompt" as const, frags: [{ t: "claude ", c: "prompt" }, { t: 'plan "build payments dashboard with stripe + auth"' }] },
  { kind: "output" as const, frags: [{ t: "⏵ analyzing requirements", c: "meta" }], wait: 400 },
  { kind: "output" as const, frags: [{ t: "✓ ", c: "ok" }, { t: "14 features identified · 3 architecture options" }], wait: 300 },
  { kind: "prompt" as const, frags: [{ t: "codex ", c: "prompt" }, { t: "spec --from plan.md --target nextjs+supabase" }] },
  { kind: "output" as const, frags: [{ t: "✓ ", c: "ok" }, { t: "spec.md · 42 stories · 6 user flows" }], wait: 200 },
  { kind: "prompt" as const, frags: [{ t: "claude ", c: "prompt" }, { t: "design --tokens brand.json --pages 7" }] },
  { kind: "output" as const, frags: [{ t: "⏵ generating components", c: "meta" }], wait: 500 },
  { kind: "output" as const, frags: [{ t: "✓ ", c: "ok" }, { t: "7 pages · 23 components · figma-ready" }], wait: 200 },
  { kind: "prompt" as const, frags: [{ t: "gemini ", c: "prompt" }, { t: "review --pages * --browsers chrome,safari,firefox" }] },
  { kind: "output" as const, frags: [{ t: "⚠ ", c: "warn" }, { t: "safari: 2 layout shifts · auto-patched" }], wait: 300 },
  { kind: "prompt" as const, frags: [{ t: "pod ", c: "prompt" }, { t: "ship --env prod --review @sarah" }] },
  { kind: "output" as const, frags: [{ t: "✓ ", c: "ok" }, { t: "merged · deployed · " }, { t: "https://app.client.com", c: "dim" }], wait: 200 },
  { kind: "output" as const, frags: [{ t: "────────────────────────────────────", c: "meta" }], wait: 50 },
  { kind: "output" as const, frags: [{ t: "elapsed ", c: "meta" }, { t: "13 days", c: "ok" }, { t: "  ·  est. agency: ", c: "meta" }, { t: "17 weeks", c: "dim" }] },
];

export function HeroTerminal() {
  const bodyRef = useRef<HTMLDivElement>(null);
  useTerminal(TERMINAL_SCRIPT, bodyRef);

  return (
    <div
      style={{
        borderRadius: 14,
        background: "linear-gradient(180deg, #141414, #0d0d0d)",
        border: "1px solid var(--line-strong)",
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(93,139,244,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        lineHeight: 1.65,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Title bar */}
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          borderBottom: "1px solid var(--line)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "#2a2a2a", display: "block" }} />
          ))}
        </div>
        <span style={{ margin: "0 auto", color: "var(--fg-faint)", fontSize: 11 }}>
          genie — claude-code — pod-01
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        style={{ padding: "18px 22px", minHeight: 380, color: "var(--fg)" }}
      />

      <style>{`
        .line { display: flex; gap: 8px; }
        .prompt { color: var(--accent); user-select: none; }
        .meta { color: var(--fg-faint); }
        .ok { color: var(--good); }
        .warn { color: #ffd166; }
        .dim { color: var(--fg-dim); }
        .cursor {
          display: inline-block; width: 7px; height: 14px;
          background: var(--accent);
          vertical-align: -2px;
          margin-left: 2px;
          animation: blink 1s steps(2) infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
