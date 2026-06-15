"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { NAV_LINKS } from "@/constants/nav";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        backdropFilter: "blur(14px)",
        background: "rgba(10, 10, 10, 0.72)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <div
          className="nav-inner"
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          {/* Brand */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "-0.01em" }}>
            <Image
              src="/assets/askthegenie-logo-dark.svg"
              alt="Ask the Genie"
              width={30}
              height={30}
              unoptimized
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
            <b style={{ fontWeight: 600, letterSpacing: 0 }}>&lt;&nbsp;BUILD&nbsp;WITH&nbsp;GENIE&nbsp;&gt;</b>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links-desktop" style={{ display: "flex", gap: 28, fontSize: 13, color: "var(--fg-dim)", marginLeft: 16 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  padding: "4px 0",
                  transition: "color 0.15s",
                  color: isActive(link.href) ? "var(--fg)" : undefined,
                  textDecoration: "none",
                }}
                className="nav-link"
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: -22,
                      height: 1,
                      background: "var(--accent)",
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              background: "transparent",
              border: "1px solid var(--line-strong)",
              borderRadius: 8,
              color: "var(--fg-dim)",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.18s",
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              fontSize: 12.5,
              borderRadius: 8,
              border: "1px solid var(--accent)",
              background: "var(--accent)",
              color: "#0a0a0a",
              fontWeight: 500,
              whiteSpace: "nowrap",
              transition: "all 0.18s",
            }}
            className="nav-cta"
          >
            Book a scoping call <span>↗</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "1px solid var(--line-strong)",
              borderRadius: 8,
              color: "var(--fg)",
              padding: 8,
              display: "none",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--bg-1)",
            borderTop: "1px solid var(--line)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "12px 0",
                fontSize: 15,
                color: isActive(link.href) ? "var(--fg)" : "var(--fg-dim)",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 12,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 18px",
              fontSize: 14,
              borderRadius: 8,
              border: "1px solid var(--accent)",
              background: "var(--accent)",
              color: "#0a0a0a",
              fontWeight: 500,
            }}
          >
            Book a scoping call ↗
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .nav-inner { gap: 14px !important; }
          .nav-links-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
        .nav-link:hover { color: var(--fg) !important; }
      `}</style>
    </nav>
  );
}
