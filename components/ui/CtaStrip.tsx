import { GeniButton } from "./GeniButton";

interface CtaStripProps {
  heading: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CtaStrip({
  heading,
  body,
  primaryLabel = "Book a scoping call",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: CtaStripProps) {
  return (
    <div
      className="cta-strip-wrapper"
      style={{
        border: "1px solid var(--accent-line)",
        borderRadius: "var(--radius-lg)",
        padding: 56,
        background: "radial-gradient(circle at 0% 0%, rgba(93,139,244,0.1), transparent 60%), var(--bg-1)",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 40,
        alignItems: "center",
      }}
    >
      <div>
        <h2 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", maxWidth: "22ch" }}>
          {heading}
        </h2>
        <p style={{ color: "var(--fg-dim)", marginTop: 10, maxWidth: "50ch" }}>
          {body}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
        <GeniButton href={primaryHref} variant="primary">
          {primaryLabel} <span>↗</span>
        </GeniButton>
        {secondaryLabel && secondaryHref && (
          <GeniButton href={secondaryHref}>{secondaryLabel}</GeniButton>
        )}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .cta-strip-wrapper { grid-template-columns: 1fr !important; padding: 32px !important; }
        }
      `}</style>
    </div>
  );
}
