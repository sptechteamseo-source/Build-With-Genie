import type { ReactNode } from "react";

interface SectionHeadProps {
  eyebrow: string;
  heading: ReactNode;
  lede: string;
}

export function SectionHead({ eyebrow, heading, lede }: SectionHeadProps) {
  return (
    <div
      className="section-head-wrapper"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: 80,
        marginBottom: 64,
        alignItems: "end",
      }}
    >
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 style={{ marginTop: 18 }}>{heading}</h2>
      </div>
      <p
        style={{
          fontSize: 18,
          color: "var(--fg-dim)",
          maxWidth: "56ch",
          lineHeight: 1.6,
        }}
      >
        {lede}
      </p>

      <style>{`
        @media (max-width: 900px) {
          .section-head-wrapper { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
