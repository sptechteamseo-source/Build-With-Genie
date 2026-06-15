import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <span className="eyebrow">404</span>
      <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
        Page not found.
      </h1>
      <p style={{ color: "var(--fg-dim)", maxWidth: "50ch" }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        href="/"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 18px", fontSize: 14, borderRadius: 8, border: "1px solid var(--accent)", background: "var(--accent)", color: "#0a0a0a", fontWeight: 500, textDecoration: "none" }}
      >
        Back to home ↗
      </Link>
    </div>
  );
}
