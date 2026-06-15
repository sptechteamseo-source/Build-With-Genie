import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  heading: ReactNode;
  lede: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, heading, lede, children }: PageHeroProps) {
  return (
    <section
      style={{
        padding: "80px 0 60px",
        borderBottom: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="dotgrid" />
      <div className="wrap" style={{ position: "relative" }}>
        <span className="eyebrow">{eyebrow}</span>
        <h1
          style={{
            fontSize: "clamp(48px, 6vw, 84px)",
            maxWidth: "18ch",
            margin: "20px 0 24px",
          }}
        >
          {heading}
        </h1>
        <p
          style={{
            fontSize: 19,
            color: "var(--fg-dim)",
            maxWidth: "60ch",
            lineHeight: 1.6,
          }}
        >
          {lede}
        </p>
        {children}
      </div>
    </section>
  );
}
