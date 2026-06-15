import Link from "next/link";
import Image from "next/image";

const footerSections = [
  {
    title: "Blog",
    links: [
      { label: "All articles", href: "/blog" },
      { label: "Engineering", href: "/blog?cat=Engineering" },
      { label: "AI Models", href: "/blog?cat=AI+Models" },
      { label: "Process", href: "/blog?cat=Process" },
      { label: "Case Notes", href: "/blog?cat=Case+Notes" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "SOC 2 Type II", href: "#" },
      { label: "HIPAA", href: "#" },
      { label: "Security", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "64px 0 40px",
        background: "var(--bg-0)",
      }}
    >
      <div className="wrap">
        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr repeat(3, 1fr)",
            gap: 60,
            marginBottom: 60,
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                marginBottom: 14,
              }}
            >
              <Image
                src="/assets/askthegenie-logo-dark.svg"
                alt="Ask the Genie"
                width={30}
                height={30}
                unoptimized
                style={{ objectFit: "contain" }}
              />
              <b style={{ fontWeight: 600 }}>&lt;&nbsp;BUILD&nbsp;WITH&nbsp;GENIE&nbsp;&gt;</b>
            </Link>
            <p
              style={{
                color: "var(--fg-dim)",
                fontSize: 14,
                maxWidth: "38ch",
                lineHeight: 1.6,
              }}
            >
              A senior pod, an AI stack, and the discipline to ship. Operating
              from Boston, Lisbon and Bengaluru.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h5
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--fg-faint)",
                  margin: "0 0 18px",
                  fontWeight: 400,
                }}
              >
                {section.title}
              </h5>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: 10,
                }}
              >
                {section.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      style={{
                        color: "var(--fg-dim)",
                        fontSize: 14,
                        transition: "color 0.15s",
                      }}
                      className="footer-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-faint)",
            paddingTop: 32,
            borderTop: "1px solid var(--line)",
          }}
        >
          <span>© 2026 BUILD WITH GENIE</span>
          <span>BUILT FAST · REVIEWED CAREFULLY</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        .footer-link:hover { color: var(--fg) !important; }
      `}</style>
    </footer>
  );
}
