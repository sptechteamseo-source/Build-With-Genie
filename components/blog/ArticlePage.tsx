"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { CAT_HUE } from "@/constants/blog";
import type { PublicPost } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cardImg(hue: string) {
  return {
    position: "absolute" as const,
    inset: 0,
    backgroundImage: `radial-gradient(circle at 30% 22%, rgba(${hue},0.30), transparent 56%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px)`,
  };
}

function relTagStyle(hue: string) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "4px 9px",
    borderRadius: 9999,
    border: `1px solid rgba(${hue},0.4)`,
    background: `rgba(${hue},0.12)`,
    color: `rgb(${hue})`,
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    alignSelf: "flex-start" as const,
  };
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  post: PublicPost;
  related: PublicPost[];
}

export function ArticlePage({ post, related }: Props) {
  const [toc, setToc]                     = useState<{ id: string; text: string }[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const [progress, setProgress]           = useState(0);
  const [copyLabel, setCopyLabel]         = useState("Copy link");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Build the table of contents from the rendered <h2> headings, assigning
  // ids to any heading that doesn't already have one (e.g. dashboard content).
  useEffect(() => {
    const article = document.querySelector(".article-prose");
    if (!article) return;
    const headings = Array.from(article.querySelectorAll("h2")) as HTMLElement[];
    const items = headings.map((h, i) => {
      let id = h.id;
      if (!id) {
        id = slugify(h.textContent || `section-${i + 1}`) || `section-${i + 1}`;
        h.id = id;
      }
      h.style.scrollMarginTop = "90px";
      return { id, text: h.textContent || "" };
    });
    setToc(items);
  }, [post.slug]);

  const updateScroll = useCallback(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);

    if (toc.length === 0) return;
    const y = window.scrollY + 130;
    let cur = toc[0].id;
    for (const { id } of toc) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) cur = id;
    }
    setActiveSection(cur);
  }, [toc]);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  function copyPage() {
    try { navigator.clipboard?.writeText(location.href.split("#")[0]); } catch { /* no-op */ }
    setCopyLabel("Copied ✓");
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyLabel("Copy link"), 1400);
  }

  const hue = CAT_HUE[post.category] ?? "93,139,244";
  const headerTagStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px",
    borderRadius: 9999, border: `1px solid rgba(${hue},0.4)`, background: `rgba(${hue},0.12)`,
    color: `rgb(${hue})`, fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  return (
    <>
      {/* Reading progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: "100%", zIndex: 40 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent)", transition: "width 0.1s linear" }} />
      </div>

      {/* Article header */}
      <header style={{ maxWidth: 820, margin: "0 auto", padding: "48px 40px 0" }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--fg-dim)", fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.15s" }} className="back-link">
          ← Back to blog
        </Link>
        <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={headerTagStyle}>{post.category}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>
            {[post.date, `${post.readTime} read`].filter(Boolean).join(" · ")}
          </span>
        </div>
        <h1 style={{ margin: "22px 0 22px", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.02, fontSize: "clamp(36px,5vw,60px)" }}>{post.title}</h1>
        <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, color: "var(--fg-dim)", maxWidth: "60ch" }}>{post.excerpt}</p>
        <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 14, paddingBottom: 36, borderBottom: "1px solid var(--line)" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, border: "1px solid var(--line-strong)", background: "var(--bg-2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--accent)", fontWeight: 500 }}>{post.authorInitials}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 14 }}>{post.author}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.04em" }}>Author</span>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div style={{ maxWidth: 1100, margin: "36px auto 0", padding: "0 40px" }}>
        <div style={{ position: "relative", height: "clamp(280px,38vw,440px)", border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", background: "var(--bg-2)" }}>
          {post.featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.featuredImage} alt={post.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 28% 24%, rgba(${hue},0.26), transparent 52%), radial-gradient(circle at 78% 80%, rgba(93,139,244,0.16), transparent 50%), repeating-linear-gradient(45deg, rgba(255,255,255,0.022) 0 11px, transparent 11px 22px)` }} />
              <span style={{ position: "absolute", top: 20, left: 24, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "rgba(245,245,245,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.category}</span>
              <span style={{ position: "absolute", bottom: 22, right: 24, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.1em" }}>{post.readTime}</span>
            </>
          )}
        </div>
      </div>

      {/* Body: TOC sidebar + prose */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 40px 0", display: "grid", gridTemplateColumns: "240px minmax(0,1fr)", gap: 64, alignItems: "start" }} className="article-grid">
        {/* Sidebar */}
        <aside style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 26 }} className="article-aside">
          {toc.length > 0 && (
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: 14 }}>On this page</div>
              <nav style={{ display: "flex", flexDirection: "column" }}>
                {toc.map(({ id, text }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    style={{
                      display: "block",
                      padding: "6px 0 6px 14px",
                      borderLeft: `2px solid ${activeSection === id ? "var(--accent)" : "transparent"}`,
                      color: activeSection === id ? "var(--fg)" : "var(--fg-faint)",
                      fontWeight: activeSection === id ? 500 : 400,
                      fontSize: 13,
                      lineHeight: 1.4,
                      textDecoration: "none",
                      transition: "color 0.15s, border-color 0.15s",
                    }}
                  >
                    {text}
                  </a>
                ))}
              </nav>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: toc.length > 0 ? 22 : 0, borderTop: toc.length > 0 ? "1px solid var(--line)" : "none" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-faint)" }}>Share</div>
            <button
              onClick={copyPage}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--line-strong)", background: "transparent", color: "var(--fg-dim)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", transition: "all 0.15s" }}
            >
              {copyLabel}
            </button>
          </div>
        </aside>

        {/* Prose — content from MongoDB (HTML string) */}
        <article
          className="article-prose"
          style={{ maxWidth: 720 }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>

      {/* Author bio */}
      <div style={{ maxWidth: 1100, margin: "64px auto 0", padding: "0 40px" }}>
        <div style={{ maxWidth: 820, marginLeft: "auto", marginRight: "auto", border: "1px solid var(--line)", borderRadius: 18, background: "var(--bg-1)", padding: "32px 36px", display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, border: "1px solid var(--line-strong)", background: "var(--bg-2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--accent)", fontWeight: 500, flexShrink: 0 }}>{post.authorInitials}</div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: 8 }}>Written by</div>
            <h4 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", margin: 0 }}>{post.author}</h4>
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div style={{ maxWidth: 1100, margin: "56px auto 0", padding: "0 40px" }}>
        <div style={{ border: "1px solid var(--accent-line)", borderRadius: 18, padding: "48px 52px", background: "radial-gradient(circle at 0% 0%, var(--accent-soft), transparent 58%), var(--bg-1)", display: "grid", gridTemplateColumns: "1fr auto", gap: 36, alignItems: "center" }} className="article-cta">
          <div>
            <h2 style={{ fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, fontSize: "clamp(26px,3vw,40px)", maxWidth: "18ch", margin: "0 0 12px" }}>Have an idea sitting in a doc somewhere?</h2>
            <p style={{ margin: 0, color: "var(--fg-dim)", fontSize: 16, maxWidth: "50ch" }}>Show it to us. 30 minutes, no slides. We&apos;ll tell you the smallest version we&apos;d ship and how long it&apos;d take.</p>
          </div>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 20px", borderRadius: 8, background: "var(--accent)", color: "#0a0a0a", fontWeight: 500, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>Book a scoping call ↗</Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{ maxWidth: 1100, margin: "72px auto 0", padding: "0 40px 80px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <h3 style={{ fontWeight: 500, letterSpacing: "-0.02em", fontSize: 24, margin: 0 }}>More field notes</h3>
            <Link href="/blog" style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--accent)", textDecoration: "none", letterSpacing: "0.06em" }}>All articles →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
            {related.map(p => {
              const h = CAT_HUE[p.category] ?? "93,139,244";
              return (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit", border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", background: "var(--bg-1)", minHeight: 300 }} className="post-card">
                  <div style={{ position: "relative", height: 130, background: "var(--bg-2)", overflow: "hidden" }}>
                    <div style={cardImg(h)} />
                  </div>
                  <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
                    <span style={relTagStyle(h)}>{p.category}</span>
                    <h4 style={{ fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.22, fontSize: 17, margin: 0 }}>{p.title}</h4>
                    <p style={{ margin: 0, color: "var(--fg-dim)", fontSize: 13.5, lineHeight: 1.55, flex: 1 }}>{p.excerpt}</p>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.04em" }}>{p.author} · {p.readTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .back-link:hover { color: var(--fg) !important; }
        .post-card { transition: border-color 0.2s, transform 0.2s; }
        .post-card:hover { border-color: var(--line-strong) !important; transform: translateY(-3px); }

        /* Prose styling for DB (HTML) content */
        .article-prose { display: flex; flex-direction: column; gap: 24px; color: rgba(245,245,245,0.7); font-size: 17px; line-height: 1.72; }
        .article-prose > * { margin: 0; }
        .article-prose h2 { display: flex; align-items: center; gap: 10px; font-weight: 500; letter-spacing: -0.02em; font-size: 28px; line-height: 1.2; color: var(--fg); margin-top: 20px; }
        .article-prose h3 { font-weight: 500; letter-spacing: -0.01em; font-size: 20px; line-height: 1.3; color: var(--fg); margin-top: 8px; }
        .article-prose p { margin: 0; }
        .article-prose a { color: var(--accent); text-decoration: underline; }
        .article-prose ul, .article-prose ol { margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 8px; color: var(--fg-dim); }
        .article-prose li { line-height: 1.6; }
        .article-prose strong { color: var(--fg); font-weight: 600; }
        .article-prose blockquote { margin: 8px 0; padding: 22px 26px; border-left: 2px solid var(--accent); background: var(--bg-1); border-radius: 0 10px 10px 0; font-size: 19px; line-height: 1.5; color: var(--fg); }
        .article-prose blockquote p { margin: 0; }
        .article-prose blockquote cite { display: block; margin-top: 14px; font-family: var(--font-mono); font-size: 11px; color: var(--fg-faint); letter-spacing: 0.1em; text-transform: uppercase; font-style: normal; }
        .article-prose pre { background: linear-gradient(180deg,#141414,#0d0d0d); border: 1px solid var(--line-strong); border-radius: 12px; padding: 18px 22px; overflow-x: auto; font-family: var(--font-mono); font-size: 13px; line-height: 1.75; color: var(--fg-dim); }
        .article-prose pre code { background: none; padding: 0; color: inherit; white-space: pre; }
        .article-prose code { background: var(--bg-2); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.875em; }
        .article-prose hr { border: none; border-top: 1px solid var(--line); margin: 8px 0; }
        .article-prose img { max-width: 100%; height: auto; border-radius: 12px; border: 1px solid var(--line); }

        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
          .article-aside { display: none !important; }
          .article-cta { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
