"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";

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

function StrengthBar({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const colors = ["", "#ff5555", "#f59e0b", "#f59e0b", "var(--good)"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= score ? colors[score] : "var(--line-strong)",
            transition: "background 300ms",
          }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: colors[score], fontFamily: "var(--font-sans)" }}>
        {labels[score]}
      </span>
    </div>
  );
}

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, val: string) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Signup failed");
        return;
      }
      window.location.href = "/";
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const pwMatch = form.confirm.length > 0 && form.password === form.confirm;

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      fontFamily: "var(--font-sans)",
    }}
      className="signup-grid"
    >
      {/* ── Left panel ── */}
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
        <div className="dotgrid" />
        <div style={{
          position: "absolute", bottom: -100, right: -80,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,245,196,0.08), transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          <span className="eyebrow" style={{ marginBottom: 28, display: "inline-flex" }}>
            Get started free
          </span>

          <h2 style={{
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg)", marginBottom: 20,
          }}>
            Join the teams<br />
            <span style={{ color: "var(--good)" }}>shipping faster.</span>
          </h2>

          <p style={{ fontSize: 15, color: "var(--fg-dim)", lineHeight: 1.65, maxWidth: "38ch", marginBottom: 40 }}>
            Create an account to manage your projects, track deliverables, and collaborate with your engineering pod.
          </p>

          {[
            { icon: "⚡", title: "Instant setup", sub: "Your account is ready in seconds" },
            { icon: "🔒", title: "Secure by default", sub: "Your data is encrypted at rest" },
            { icon: "🤝", title: "Dedicated pod", sub: "A senior team, not a ticket queue" },
          ].map(item => (
            <div key={item.title} style={{
              display: "flex", alignItems: "flex-start",
              gap: 14, marginBottom: 20,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "var(--bg-2)", border: "1px solid var(--line)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)", marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: "var(--fg-dim)" }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
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
            Create an account
          </h1>
          <p style={{ fontSize: 14, color: "var(--fg-dim)", marginBottom: 32 }}>
            Already have one?{" "}
            <Link href="/login" style={{ color: "var(--accent)", fontWeight: 500 }}>
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: "12px 14px", borderRadius: 8, marginBottom: 20,
                background: "rgba(255,85,85,0.08)", border: "1px solid rgba(255,85,85,0.25)",
                color: "#ff6b6b", fontSize: 13,
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Full name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                required
                autoFocus
                autoComplete="name"
                placeholder="Jane Smith"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                required
                autoComplete="email"
                placeholder="jane@example.com"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={e => set("password", e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  style={{ ...inputStyle, paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--fg-faint)", display: "flex", padding: 4,
                }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <StrengthBar password={form.password} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Confirm password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={e => set("confirm", e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  style={{
                    ...inputStyle,
                    paddingRight: 44,
                    borderColor: form.confirm
                      ? pwMatch ? "var(--good)" : "rgba(255,85,85,0.5)"
                      : undefined,
                  }}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--fg-faint)", display: "flex", padding: 4,
                }}>
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                {pwMatch && (
                  <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)" }}>
                    <Check size={14} color="var(--good)" />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "12px 0", borderRadius: 8,
                border: "none", background: loading ? "var(--accent-line)" : "var(--accent)",
                color: "#0a0a0a", fontSize: 14, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-sans)", transition: "background 150ms",
              }}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>

            <p style={{
              fontSize: 12, color: "var(--fg-faint)",
              textAlign: "center", marginTop: 16, lineHeight: 1.6,
            }}>
              By creating an account you agree to our{" "}
              <a href="#" style={{ color: "var(--fg-dim)" }}>Terms</a>
              {" "}and{" "}
              <a href="#" style={{ color: "var(--fg-dim)" }}>Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .signup-grid { grid-template-columns: 1fr !important; }
          .signup-grid > div:first-child { display: none !important; }
        }
        input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
      `}</style>
    </div>
  );
}
