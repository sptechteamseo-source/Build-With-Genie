"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 8,
  border: "1px solid var(--line-strong)",
  background: "var(--bg-2)",
  color: "var(--fg)",
  fontSize: 14,
  fontFamily: "var(--font-sans)",
  outline: "none",
  boxSizing: "border-box",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

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
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      // Hard navigation ensures the new cookie is sent with the next request
      window.location.href = from;
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      width: 400,
      maxWidth: "90vw",
      background: "var(--bg-1)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 36,
    }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "var(--accent-soft)",
          border: "1px solid var(--accent-line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <LogIn size={20} color="var(--accent)" />
        </div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>
          Admin Login
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--fg-dim)" }}>
          Sign in to access the dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{
            padding: "10px 14px",
            borderRadius: 8,
            marginBottom: 20,
            background: "rgba(255,85,85,0.1)",
            border: "1px solid rgba(255,85,85,0.3)",
            color: "#ff5555",
            fontSize: 13,
            fontFamily: "var(--font-sans)",
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 500, color: "var(--fg-dim)" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
            placeholder="admin@example.com"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 500, color: "var(--fg-dim)" }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ ...inputStyle, paddingRight: 42 }}
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--fg-faint)",
                padding: 0,
                display: "flex",
              }}
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 8,
            border: "none",
            background: loading ? "var(--accent-line)" : "var(--accent)",
            color: "#0a0a0a",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "var(--font-sans)",
            transition: "background 150ms",
          }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "var(--fg-faint)" }}>
        Credentials are set via environment variables.
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
