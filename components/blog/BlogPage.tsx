"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, CAT_HUE } from "@/constants/blog";
import type { PublicPost } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cardImg(hue: string) {
  return {
    position: "absolute" as const,
    inset: 0,
    backgroundImage: `radial-gradient(circle at 30% 22%, rgba(${hue},0.30), transparent 56%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 10px, transparent 10px 20px)`,
  };
}

function tagStyle(hue: string, size: "sm" | "md" = "sm") {
  const fs = size === "md" ? 10.5 : 10;
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: size === "md" ? "5px 11px" : "4px 9px",
    borderRadius: 9999,
    border: `1px solid rgba(${hue},0.4)`,
    background: `rgba(${hue},0.12)`,
    color: `rgb(${hue})`,
    fontFamily: "var(--font-mono)",
    fontSize: fs,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    alignSelf: "flex-start" as const,
    flexShrink: 0,
  };
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: PublicPost }) {
  const hue = CAT_HUE[post.category] ?? "93,139,244";
  return (
    <div style={{ padding: "24px 0 0" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: 16 }}>Latest</div>
      <Link
        href={`/blog/${post.slug}`}
        style={{ display: "flex", flexWrap: "wrap", gap: 0, textDecoration: "none", color: "inherit", border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", background: "var(--bg-1)", transition: "border-color 0.2s" }}
        className="featured-card"
      >
        {/* Text side */}
        <div style={{ flex: "1.15 1 360px", padding: "40px 44px", display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
          <span style={tagStyle(hue, "md")}>{post.category}</span>
          <h2 style={{ fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, fontSize: "clamp(28px,3vw,42px)", maxWidth: "18ch", margin: 0 }}>{post.title}</h2>
          <p style={{ margin: 0, color: "var(--fg-dim)", fontSize: 16, lineHeight: 1.6, maxWidth: "54ch" }}>{post.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, border: "1px solid var(--line-strong)", background: "var(--bg-2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>{post.authorInitials}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 13 }}>{post.author}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>{post.date} · {post.readTime} read</span>
            </div>
          </div>
        </div>
        {/* Image side */}
        <div style={{ flex: "1 1 340px", position: "relative", minHeight: 320, background: "var(--bg-2)", borderLeft: "1px solid var(--line)" }}>
          <div style={cardImg(hue)} />
          <span style={{ position: "absolute", top: 22, left: 24, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "rgba(245,245,245,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>/blog · featured</span>
          <span style={{ position: "absolute", bottom: 22, right: 24, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.1em" }}>{post.readTime}</span>
          <span style={{ position: "absolute", bottom: 22, left: 24, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>{post.tags.join("  ·  ")}</span>
        </div>
      </Link>
    </div>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: PublicPost }) {
  const hue = CAT_HUE[post.category] ?? "93,139,244";
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit", border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", background: "var(--bg-1)", minHeight: 360 }}
      className="post-card"
    >
      <div style={{ position: "relative", height: 172, background: "var(--bg-2)", overflow: "hidden" }}>
        <div style={cardImg(hue)} />
        <span style={{ position: "absolute", bottom: 14, left: 16, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.readTime} read</span>
      </div>
      <div style={{ padding: "22px 22px 24px", display: "flex", flexDirection: "column", gap: 13, flex: 1 }}>
        <span style={tagStyle(hue)}>{post.category}</span>
        <h3 style={{ fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.18, fontSize: 20, margin: 0 }}>{post.title}</h3>
        <p style={{ margin: 0, color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.55, flex: 1 }}>{post.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 11, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid var(--line-strong)", background: "var(--bg-2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--accent)", fontWeight: 500 }}>{post.authorInitials}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontSize: 12.5 }}>{post.author}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.04em" }}>{post.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Newsletter CTA ───────────────────────────────────────────────────────────

function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setState("done");
        setMsg(data.alreadySubscribed ? "You're already subscribed." : "You're in — check your inbox soon.");
      } else {
        setState("error");
        setMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setState("error");
      setMsg("Something went wrong.");
    }
  }

  return (
    <div style={{ padding: "60px 0 80px" }}>
      <div style={{ border: "1px solid var(--accent-line)", borderRadius: 18, padding: "48px 52px", background: "radial-gradient(circle at 0% 0%, var(--accent-soft), transparent 58%), var(--bg-1)", display: "flex", flexWrap: "wrap", gap: 36, alignItems: "center", justifyContent: "space-between" }} className="newsletter-inner">
        <div style={{ flex: "1 1 380px" }}>
          <h2 style={{ fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, fontSize: "clamp(26px,3vw,38px)", maxWidth: "20ch", margin: "0 0 12px" }}>Get field notes in your inbox.</h2>
          <p style={{ margin: 0, color: "var(--fg-dim)", fontSize: 16, maxWidth: "48ch" }}>One email, twice a month. New write-ups on building with AI — no fluff, unsubscribe anytime.</p>
        </div>
        {state === "done" ? (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--good)", letterSpacing: "0.04em" }}>✓ {msg}</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", flex: "0 1 420px" }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              style={{ flex: "1 1 220px", padding: "13px 16px", borderRadius: 8, border: "1px solid var(--line-strong)", background: "var(--bg-0)", color: "var(--fg)", fontFamily: "var(--font-sans)", fontSize: 14, outline: "none" }}
            />
            <button
              type="submit"
              disabled={state === "loading"}
              style={{ padding: "13px 20px", borderRadius: 8, border: "1px solid var(--accent)", background: "var(--accent)", color: "#0a0a0a", fontWeight: 500, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-sans)", whiteSpace: "nowrap", opacity: state === "loading" ? 0.7 : 1 }}
            >
              {state === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
            {state === "error" && <p style={{ margin: 0, width: "100%", fontSize: 12, color: "rgb(255,160,90)", fontFamily: "var(--font-mono)" }}>{msg}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BlogPage({ posts }: { posts: PublicPost[] }) {
  const [query, setQuery]   = useState("");
  const [cat, setCat]       = useState("All");

  const featured = posts[0];
  const isFiltering = query.trim() !== "" || cat !== "All";

  const q = query.trim().toLowerCase();
  const filtered = posts.filter(p => {
    const matchCat = cat === "All" || p.category === cat;
    const matchQ =
      q === "" ||
      [p.title, p.excerpt, ...p.tags, p.category, p.author]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return matchCat && matchQ;
  });

  const gridPosts = isFiltering ? filtered : posts.filter(p => p !== featured);

  const chipBase: React.CSSProperties = {
    padding: "9px 16px",
    borderRadius: 9999,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--line-strong)",
    background: "transparent",
    color: "var(--fg-dim)",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.04em",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  };

  return (
    <div>
      {/* Page hero */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--line)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse at 50% 30%, black 25%, transparent 70%)", pointerEvents: "none" }} />
        <div className="wrap" style={{ padding: "72px 40px 52px", position: "relative" }}>
          <span className="eyebrow">The Genie Blog</span>
          <h1 style={{ margin: "22px 0 22px", maxWidth: "17ch" }}>Field notes from shipping with AI.</h1>
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: "var(--fg-dim)", maxWidth: "60ch" }}>
            How we design, build, review and deliver production software with Claude, Gemini and OpenAI on every step. Honest write-ups — workflows, model choices, and the boring parts that actually decide whether shipping fast works.
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="wrap" style={{ paddingTop: 36, paddingBottom: 8 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
          {/* Category chips */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={cat === c ? { ...chipBase, background: "var(--accent)", color: "#0a0a0a", borderColor: "var(--accent)", fontWeight: 500 } : chipBase}
              >
                {c}
              </button>
            ))}
          </div>
          {/* Search */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", minWidth: 260, flex: "0 1 320px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-faint)" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: 14, pointerEvents: "none" }}>
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles, tags, topics…"
              style={{ width: "100%", padding: "11px 14px 11px 40px", borderRadius: 9999, border: "1px solid var(--line-strong)", background: "var(--bg-1)", color: "var(--fg)", fontFamily: "var(--font-sans)", fontSize: 13.5, outline: "none" }}
            />
          </div>
        </div>

        {/* Filter label */}
        {isFiltering && (
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>
            <span>{filtered.length} article{filtered.length !== 1 ? "s" : ""} found</span>
            <button
              onClick={() => { setQuery(""); setCat("All"); }}
              style={{ background: "transparent", border: "none", color: "var(--accent)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", padding: 0 }}
            >
              clear ✕
            </button>
          </div>
        )}
      </div>

      <div className="wrap">
        {/* Featured */}
        {!isFiltering && featured && <FeaturedCard post={featured} />}

        {/* Grid */}
        <div style={{ paddingTop: 40, paddingBottom: 16 }}>
          {gridPosts.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: 16 }}>
              {gridPosts.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", border: "1px dashed var(--line-strong)", borderRadius: 18, background: "var(--bg-1)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>No matches</div>
              <p style={{ margin: "0 0 22px", color: "var(--fg-dim)", fontSize: 16 }}>Nothing matched that filter. Try a different category or search term.</p>
              <button
                onClick={() => { setQuery(""); setCat("All"); }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 18px", fontSize: 13.5, borderRadius: 8, border: "1px solid var(--line-strong)", background: "transparent", color: "var(--fg)", cursor: "pointer", fontFamily: "var(--font-sans)" }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter */}
        <NewsletterCta />
      </div>

      <style>{`
        .featured-card:hover { border-color: var(--line-strong) !important; }
        .post-card { transition: border-color 0.2s, transform 0.2s; }
        .post-card:hover { border-color: var(--line-strong) !important; transform: translateY(-3px); }
        @media (max-width: 760px) {
          .newsletter-inner { padding: 32px 24px !important; }
        }
      `}</style>
    </div>
  );
}
