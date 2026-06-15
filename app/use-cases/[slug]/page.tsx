import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { USE_CASES, getUseCase } from "@/constants/use-cases";
import { UseCaseIcon } from "@/components/use-cases/UseCaseIcon";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaStrip } from "@/components/ui/CtaStrip";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return USE_CASES.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) return {};
  return {
    title: `${uc.role} — ${uc.title}`,
    description: uc.heroLede,
    openGraph: {
      title: `Build with Genie for ${uc.role}`,
      description: uc.heroLede,
      type: "article",
    },
  };
}

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--fg-faint)",
};

export default async function UseCaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) notFound();

  const related = USE_CASES.filter((c) => c.slug !== uc.slug).slice(0, 3);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "56px 0 60px",
          borderBottom: "1px solid var(--line)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="dotgrid" />
        <div className="wrap" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <Link
            href="/use-cases"
            style={{ ...mono, color: "var(--fg-dim)", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <span>←</span> All use cases
          </Link>

          {/* Role badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 0 24px" }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                border: "1px solid var(--accent-line)",
                background: "var(--accent-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              <UseCaseIcon name={uc.icon} size={24} />
            </div>
            <div>
              <span style={mono}>
                Use case {uc.index} · {uc.role}
              </span>
            </div>
          </div>

          <h1 style={{ fontSize: "clamp(38px, 5vw, 68px)", maxWidth: "20ch", margin: "0 0 24px" }}>
            {uc.heroHeading}
          </h1>
          <p style={{ fontSize: 19, color: "var(--fg-dim)", maxWidth: "62ch", lineHeight: 1.6 }}>
            {uc.heroLede}
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 8,
                background: "var(--accent)",
                color: "#0a0a0a",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Start free <span>↗</span>
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 8,
                border: "1px solid var(--line-strong)",
                color: "var(--fg)",
                fontSize: 14,
              }}
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Intro ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div
            className="uc-intro-grid"
            style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 64, alignItems: "start" }}
          >
            <span style={{ ...mono, position: "sticky", top: 100 }}>The opportunity</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: "68ch" }}>
              {uc.intro.map((para, i) => (
                <p key={i} style={{ fontSize: 18, lineHeight: 1.7, color: "var(--fg-dim)", margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ───────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <span style={mono}>What the genie handles</span>
          <h2 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.02em", margin: "16px 0 48px", maxWidth: "20ch" }}>
            Everything this role needs, done for them.
          </h2>
          <div
            className="uc-cap-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
          >
            {uc.capabilities.map((cap, i) => (
              <div
                key={cap.title}
                style={{
                  background: "var(--bg-1)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-lg)",
                  padding: 28,
                }}
              >
                <span style={{ ...mono, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: 20, letterSpacing: "-0.01em", margin: "14px 0 10px" }}>{cap.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--fg-dim)", margin: 0 }}>{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <span style={mono}>How it works</span>
          <h2 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.02em", margin: "16px 0 48px", maxWidth: "18ch" }}>
            From your input to a finished result.
          </h2>
          <div className="uc-step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {uc.workflow.map((step, i) => (
              <div
                key={step.title}
                style={{
                  position: "relative",
                  padding: "28px 22px",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 28,
                    fontWeight: 500,
                    color: "var(--accent)",
                    letterSpacing: "-0.02em",
                    marginBottom: 16,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={{ fontSize: 16, letterSpacing: "-0.01em", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-dim)", margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ─────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <span style={mono}>The difference</span>
          <h2 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.02em", margin: "16px 0 48px", maxWidth: "20ch" }}>
            Before the genie, and after.
          </h2>
          <div className="uc-ba-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Before */}
            <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", padding: 32, background: "var(--bg-1)" }}>
              <span style={{ ...mono, color: "var(--fg-faint)" }}>Before</span>
              <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {uc.scenario.before.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.5, color: "var(--fg-dim)" }}>
                    <span style={{ color: "var(--fg-faint)", flexShrink: 0 }}>✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* After */}
            <div
              style={{
                border: "1px solid var(--accent-line)",
                borderRadius: "var(--radius-lg)",
                padding: 32,
                background: "radial-gradient(circle at 0% 0%, rgba(93,139,244,0.1), transparent 60%), var(--bg-1)",
              }}
            >
              <span style={{ ...mono, color: "var(--accent)" }}>After</span>
              <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {uc.scenario.after.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.5, color: "var(--fg)" }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0, marginTop: 3 }}
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Outcomes ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div
            className="uc-outcome-strip"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "var(--bg-1)",
            }}
          >
            {uc.outcomes.map((o, i) => (
              <div key={o.label} style={{ padding: "36px 32px", borderRight: i < uc.outcomes.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-0.03em", color: "var(--accent)", lineHeight: 1 }}>
                  {o.value}
                </div>
                <div style={{ ...mono, marginTop: 10 }}>{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <span style={mono}>Questions</span>
          <h2 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.02em", margin: "16px 0 40px", maxWidth: "16ch" }}>
            Good to know.
          </h2>
          <FaqAccordion items={uc.faqs} />
        </div>
      </section>

      {/* ── Related use cases ──────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <span style={mono}>Explore more</span>
          <h2 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.02em", margin: "16px 0 40px", maxWidth: "18ch" }}>
            One genie, every other role too.
          </h2>
          <div className="uc-related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {related.map((rc) => (
              <Link
                key={rc.slug}
                href={`/use-cases/${rc.slug}`}
                className="uc-related-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  padding: 26,
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--bg-1)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color 200ms, transform 200ms",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    border: "1px solid var(--line)",
                    background: "var(--bg-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--fg)",
                  }}
                >
                  <UseCaseIcon name={rc.icon} size={18} />
                </div>
                <span style={mono}>{rc.role}</span>
                <h3 style={{ fontSize: 18, letterSpacing: "-0.01em", margin: 0, lineHeight: 1.2 }}>{rc.title}</h3>
                <span style={{ ...mono, color: "var(--accent)", marginTop: 4 }}>Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0" }}>
        <div className="wrap">
          <CtaStrip
            heading={`Put the genie to work for ${uc.role.toLowerCase()}.`}
            body="Free for your first 50 tasks. No card, no setup call — just describe the work and watch it get done."
            primaryLabel="Start free"
            primaryHref="/contact"
            secondaryLabel="Book a demo"
            secondaryHref="/contact"
          />
        </div>
      </section>

      <style>{`
        .uc-related-card:hover { border-color: var(--line-strong); transform: translateY(-3px); }
        @media (max-width: 900px) {
          .uc-intro-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .uc-cap-grid { grid-template-columns: 1fr !important; }
          .uc-step-grid { grid-template-columns: 1fr 1fr !important; }
          .uc-ba-grid { grid-template-columns: 1fr !important; }
          .uc-related-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .uc-step-grid { grid-template-columns: 1fr !important; }
          .uc-outcome-strip { grid-template-columns: 1fr !important; }
          .uc-outcome-strip > div { border-right: none !important; border-bottom: 1px solid var(--line); }
        }
      `}</style>
    </>
  );
}
