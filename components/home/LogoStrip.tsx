const LOGOS = [
  "CLAUDE CODE",
  "CLAUDE COWORK",
  "OPENAI CODEX",
  "GEMINI ANTIGRAVITY",
  "VERCEL",
  "SUPABASE",
  "LINEAR",
  "GITHUB",
];

// Doubled for seamless infinite loop
const ALL_LOGOS = [...LOGOS, ...LOGOS];

export function LogoStrip() {
  return (
    <section
      aria-label="Tools and partners"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "28px 0",
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 56,
          animation: "marquee 40s linear infinite",
          width: "max-content",
        }}
      >
        {ALL_LOGOS.map((logo, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              whiteSpace: "nowrap",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--fg-faint)",
              letterSpacing: "0.04em",
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                background: "var(--fg-faint)",
                borderRadius: 3,
                opacity: 0.7,
                flexShrink: 0,
              }}
            />
            {logo}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
