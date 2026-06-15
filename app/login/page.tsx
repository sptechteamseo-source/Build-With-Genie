"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const FEATURES = [
  "Ship production software 3–6× faster",
  "Senior engineers on every engagement",
  "AI-assisted at every step of the process",
  "14-day MVPs, not 14-week estimates",
];

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      window.location.href = from;
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      {error && (
        <div style={{
          padding: "12px 14px",
          borderRadius: 8,
          marginBottom: 20,
          background: "rgba(255,85,85,0.08)",
          border: "1px solid rgba(255,85,85,0.25)",
          color: "#ff6b6b",
          fontSize: 13,
          fontFamily: "var(--font-sans)",
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Email address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
          autoComplete="email"
          placeholder="you@example.com"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <label style={labelStyle}>Password</label>
          <a href="#" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>
        <div style={{ position: "relative" }}>
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            style={{ ...inputStyle, paddingRight: 44 }}
          />
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            style={{
              position: "absolute", right: 12, top: "50%",
              transform: "translateY(-50%)", background: "none",
              border: "none", cursor: "pointer", color: "var(--fg-faint)",
              display: "flex", padding: 4,
            }}
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input
            type="checkbox"
            style={{ width: 15, height: 15, accentColor: "var(--accent)" }}
          />
          <span style={{ fontSize: 13, color: "var(--fg-dim)", fontFamily: "var(--font-sans)" }}>
            Remember me for 30 days
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%", padding: "12px 0", borderRadius: 8, border: "none",
          background: loading ? "var(--accent-line)" : "var(--accent)",
          color: "#0a0a0a", fontSize: 14, fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "var(--font-sans)", transition: "background 150ms",
          letterSpacing: "0.01em",
        }}
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--fg-dim)", fontFamily: "var(--font-sans)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" style={{ color: "var(--accent)", fontWeight: 500 }}>
          Create one
        </Link>
      </p>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", marginBottom: 6,
  fontSize: 13, fontWeight: 500, color: "var(--fg-dim)",
  fontFamily: "var(--font-sans)",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 8,
  border: "1px solid var(--line-strong)", background: "var(--bg-2)",
  color: "var(--fg)", fontSize: 14, fontFamily: "var(--font-sans)",
  outline: "none", boxSizing: "border-box",
  transition: "border-color 150ms",
};

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      fontFamily: "var(--font-sans)",
    }}
      className="login-grid"
    >
      {/* ── Left panel: brand ── */}
      <div style={{
        background: "var(--bg-1)",
        borderRight: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 64px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dot grid */}
        <div className="dotgrid" />

        {/* Accent glow */}
        <div style={{
          position: "absolute", top: -80, left: -80,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(93,139,244,0.12), transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          <span className="eyebrow" style={{ marginBottom: 28, display: "inline-flex" }}>
            Build with Genie
          </span>

          <h2 style={{
            fontSize: "clamp(28px, 3vw, 42px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 20,
          }}>
            Ship faster.<br />
            <span style={{ color: "var(--accent)" }}>Without the bloat.</span>
          </h2>

          <p style={{ fontSize: 15, color: "var(--fg-dim)", lineHeight: 1.65, maxWidth: "38ch", marginBottom: 40 }}>
            Sign in to your Genie account to track projects, view deliverables, and collaborate with your pod.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {FEATURES.map(f => (
              <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--fg-dim)" }}>
                <span style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  background: "var(--accent-soft)", border: "1px solid var(--accent-line)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 1,
                }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* Mini testimonial */}
          <div style={{
            marginTop: 48,
            padding: "18px 20px",
            background: "var(--bg-2)",
            border: "1px solid var(--line)",
            borderRadius: 12,
          }}>
            <p style={{ fontSize: 14, color: "var(--fg-dim)", lineHeight: 1.6, fontStyle: "italic", marginBottom: 12 }}>
              &ldquo;Genie shipped our MVP in 12 days. We raised our seed round 3 weeks later.&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "var(--accent-soft)", border: "1px solid var(--accent-line)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 600, color: "var(--accent)",
              }}>
                SK
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fg)" }}>Sarah Kim</div>
                <div style={{ fontSize: 12, color: "var(--fg-faint)" }}>CTO, Verdant AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 64px",
        background: "var(--bg-0)",
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h1 style={{
            fontSize: 26, fontWeight: 700, color: "var(--fg)",
            letterSpacing: "-0.03em", marginBottom: 6,
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: "var(--fg-dim)", marginBottom: 32 }}>
            Sign in to your account to continue.
          </p>

          <Suspense>
            <LoginForm />
          </Suspense>

          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            margin: "28px 0",
          }}>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ fontSize: 12, color: "var(--fg-faint)" }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
          </div>

          <button
            type="button"
            style={{
              width: "100%", padding: "11px 0", borderRadius: 8,
              border: "1px solid var(--line-strong)", background: "transparent",
              color: "var(--fg-dim)", fontSize: 14, cursor: "pointer",
              fontFamily: "var(--font-sans)", display: "flex",
              alignItems: "center", justifyContent: "center", gap: 10,
              transition: "border-color 150ms, color 150ms",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-grid { grid-template-columns: 1fr !important; }
          .login-grid > div:first-child { display: none !important; }
        }
        input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
      `}</style>
    </div>
  );
}
