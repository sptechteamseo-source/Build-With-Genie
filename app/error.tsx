"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        fontFamily: "var(--font-mono)",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <span className="eyebrow">Error</span>
      <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
        Something went wrong.
      </h1>
      <p style={{ color: "var(--fg-dim)", maxWidth: "50ch" }}>
        An unexpected error occurred. You can try again or head back to the homepage.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={reset}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 18px", fontSize: 14, borderRadius: 8, border: "1px solid var(--accent)", background: "var(--accent)", color: "#0a0a0a", fontWeight: 500, cursor: "pointer" }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 18px", fontSize: 14, borderRadius: 8, border: "1px solid var(--line-strong)", color: "var(--fg)", textDecoration: "none" }}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
