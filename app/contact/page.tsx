import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. Three steps. Two minutes. No pitch deck.",
};

const WHAT_NEXT = [
  "You hit submit. Within an hour you get a confirmation with a Calendly link.",
  "30-min scoping call with one of our seniors. No salespeople, no slides.",
  "Within 48h you get a fixed-scope proposal — timeline, price, what's in, what's out.",
];

const DIRECT = [
  { label: "email", value: "hello@buildwithgenie.com", href: "mailto:hello@buildwithgenie.com" },
  { label: "sales", value: "work@buildwithgenie.com", href: "mailto:work@buildwithgenie.com" },
  { label: "security", value: "security@buildwithgenie.com", href: "mailto:security@buildwithgenie.com" },
  { label: "signal", value: "+1 617 555 0118", href: null },
];

const HOURS = [
  { tz: "BOS", time: "Mon–Fri · 9–6 ET" },
  { tz: "LIS", time: "Mon–Fri · 9–6 WET" },
  { tz: "BLR", time: "Mon–Fri · 10–7 IST" },
];

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: 24, background: "var(--bg-1)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        heading="Tell us about it. We'll reply today."
        lede="Three steps. Two minutes. No pitch deck. Either we're a good fit and we'll book a 30-min call, or we'll tell you who is."
      />

      <div className="wrap">
        <div
          className="contact-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 80,
            padding: "80px 0 120px",
          }}
        >
          {/* Form */}
          <ContactForm />

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <InfoBlock title="What happens next">
              <div style={{ display: "flex", flexDirection: "column", gap: 14, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-dim)" }}>
                {WHAT_NEXT.map((step, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 14, alignItems: "start" }}>
                    <span style={{ width: 22, height: 22, border: "1px solid var(--line)", borderRadius: 5, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--fg-faint)", flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock title="Direct">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, display: "flex", flexDirection: "column", gap: 8 }}>
                {DIRECT.map((d) => (
                  <div key={d.label} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ color: "var(--fg-faint)" }}>{d.label}</span>
                    {d.href ? (
                      <a href={d.href} style={{ color: "var(--accent)", textDecoration: "none" }} className="direct-link">{d.value}</a>
                    ) : (
                      <span style={{ color: "var(--fg)" }}>{d.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock title="Operating">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, display: "flex", flexDirection: "column", gap: 8 }}>
                {HOURS.map((h) => (
                  <div key={h.tz} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ color: "var(--fg-faint)" }}>{h.tz}</span>
                    <span style={{ color: "var(--fg)" }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </InfoBlock>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        .direct-link:hover { text-decoration: underline; }
      `}</style>
    </>
  );
}
