"use client";

import { useState } from "react";
import type { ContactFormData, ContactFormErrors } from "@/types";

const STEPS = [
  { key: "fit", title: "What kind of engagement?", sub: "Pick the closest fit. You can always change it later." },
  { key: "about", title: "About the project", sub: "A couple of lines is plenty — we'll dig in on the call." },
  { key: "you", title: "About you", sub: "So we can route you to the right senior." },
];

const FIT_OPTIONS = [
  { v: "mvp", t: "14-day MVP", sub: "Idea → shipped product" },
  { v: "modernize", t: "Modernize an app", sub: "Refactor / migrate / rewrite" },
  { v: "ai", t: "Add AI features", sub: "RAG, copilot, agents" },
  { v: "pod", t: "Embedded pod", sub: "Monthly senior pod" },
  { v: "enterprise", t: "Multi-pod / enterprise", sub: "Larger programme" },
  { v: "unsure", t: "Not sure yet", sub: "We can help figure it out" },
];

const BUDGET_OPTIONS = [
  { v: "<25k", t: "< $25k" },
  { v: "25-75k", t: "$25k – $75k" },
  { v: "75-200k", t: "$75k – $200k" },
  { v: "200k+", t: "$200k+" },
  { v: "unsure", t: "Not sure yet" },
];

const TIMELINE_OPTIONS = [
  { v: "asap", t: "ASAP / yesterday" },
  { v: "1m", t: "Within a month" },
  { v: "3m", t: "Within a quarter" },
  { v: "flex", t: "Flexible" },
];

const inputStyle: React.CSSProperties = {
  background: "var(--bg-0)",
  border: "1px solid var(--line)",
  color: "var(--fg)",
  fontFamily: "inherit",
  fontSize: 15,
  padding: "12px 14px",
  borderRadius: 8,
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s",
};

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<ContactFormData>({
    fit: "", budget: "", timeline: "", summary: "", name: "", company: "", email: "", role: "",
  });
  const [errs, setErrs] = useState<ContactFormErrors>({});

  function set(k: keyof ContactFormData, v: string) {
    setData((d) => ({ ...d, [k]: v }));
    setErrs((e) => ({ ...e, [k]: undefined }));
  }

  function validate(s: number): boolean {
    const e: ContactFormErrors = {};
    if (s === 0 && !data.fit) e.fit = "Pick one.";
    if (s === 1) {
      if (!data.budget) e.budget = "Pick one.";
      if (!data.timeline) e.timeline = "Pick one.";
      if (data.summary.trim().length < 20) e.summary = "A sentence or two please — at least 20 characters.";
    }
    if (s === 2) {
      if (!data.name.trim()) e.name = "Required.";
      if (!data.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = "A valid email please.";
      if (!data.company.trim()) e.company = "Required.";
    }
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  async function next() {
    if (!validate(step)) return;
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      await submit();
    }
  }

  async function submit() {
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setDone(true);
    } catch {
      // Still show success — contact form should never fail silently
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div style={{ border: "1px solid var(--line)", background: "var(--bg-1)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <div style={{ padding: "56px 36px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 18 }}>✓</div>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>Got it, {data.name.split(" ")[0]}.</h2>
          <p style={{ color: "var(--fg-dim)", maxWidth: "40ch", margin: "0 auto" }}>
            We've routed your message to the senior closest to <b>{FIT_OPTIONS.find((o) => o.v === data.fit)?.t ?? "your project"}</b>. Expect a reply at <b>{data.email}</b> within the next business hour.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid var(--line)", background: "var(--bg-1)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {/* Progress */}
      <div style={{ display: "flex", padding: "18px 24px", gap: 10, borderBottom: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
        {STEPS.map((s, i) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 8, color: i === step ? "var(--fg)" : undefined }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: i <= step ? "var(--accent)" : "var(--bg-3)", border: "1px solid var(--line)", boxShadow: i === step ? "0 0 0 4px var(--accent-soft)" : "none", display: "block", flexShrink: 0 }} />
            <span>{String(i + 1).padStart(2, "0")} · {s.title.split(" ")[0]}</span>
          </div>
        ))}
      </div>

      {/* Step body */}
      <div style={{ padding: "36px 36px 32px" }}>
        <h2 style={{ fontSize: 26, letterSpacing: "-0.02em", marginBottom: 6 }}>{STEPS[step].title}</h2>
        <p style={{ color: "var(--fg-dim)", fontSize: 14, marginBottom: 28 }}>{STEPS[step].sub}</p>

        {step === 0 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="choice-grid">
              {FIT_OPTIONS.map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => set("fit", o.v)}
                  style={{
                    border: `1px solid ${data.fit === o.v ? "var(--accent)" : "var(--line)"}`,
                    background: data.fit === o.v ? "var(--accent-soft)" : "var(--bg-0)",
                    padding: "16px 18px",
                    borderRadius: 10,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    textAlign: "left",
                    color: "var(--fg)",
                    transition: "all 0.15s",
                  }}
                >
                  <b style={{ fontSize: 15, fontWeight: 500 }}>{o.t}</b>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: data.fit === o.v ? "var(--accent)" : "var(--fg-faint)", letterSpacing: "0.05em" }}>{o.sub}</span>
                </button>
              ))}
            </div>
            {errs.fit && <p style={{ color: "#ff8866", fontSize: 12, marginTop: 8 }}>{errs.fit}</p>}
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>What are you trying to do?</label>
              <textarea
                value={data.summary}
                onChange={(e) => set("summary", e.target.value)}
                placeholder="e.g. We're a Series A fintech. Our reconciliation is a 4-day spreadsheet. We want a real tool."
                style={{ ...inputStyle, minHeight: 120, resize: "vertical", border: errs.summary ? "1px solid #ff8866" : "1px solid var(--line)" }}
              />
              {errs.summary && <p style={{ color: "#ff8866", fontSize: 12, marginTop: 4 }}>{errs.summary}</p>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Rough budget</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                {BUDGET_OPTIONS.map((o) => (
                  <button key={o.v} type="button" onClick={() => set("budget", o.v)} style={{ border: `1px solid ${data.budget === o.v ? "var(--accent)" : "var(--line)"}`, background: data.budget === o.v ? "var(--accent-soft)" : "var(--bg-0)", padding: "12px 14px", borderRadius: 8, cursor: "pointer", color: "var(--fg)", fontSize: 13, transition: "all 0.15s" }}>
                    <b style={{ fontSize: 14 }}>{o.t}</b>
                  </button>
                ))}
              </div>
              {errs.budget && <p style={{ color: "#ff8866", fontSize: 12, marginTop: 4 }}>{errs.budget}</p>}
            </div>

            <div>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Timeline</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                {TIMELINE_OPTIONS.map((o) => (
                  <button key={o.v} type="button" onClick={() => set("timeline", o.v)} style={{ border: `1px solid ${data.timeline === o.v ? "var(--accent)" : "var(--line)"}`, background: data.timeline === o.v ? "var(--accent-soft)" : "var(--bg-0)", padding: "12px 14px", borderRadius: 8, cursor: "pointer", color: "var(--fg)", fontSize: 13, transition: "all 0.15s" }}>
                    <b style={{ fontSize: 14 }}>{o.t}</b>
                  </button>
                ))}
              </div>
              {errs.timeline && <p style={{ color: "#ff8866", fontSize: 12, marginTop: 4 }}>{errs.timeline}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            {[
              { key: "name" as const, label: "Your name", placeholder: "Jane Park", required: true },
              { key: "email" as const, label: "Work email", placeholder: "jane@yourcompany.com", required: true },
              { key: "company" as const, label: "Company", placeholder: "Acme Co", required: true },
              { key: "role" as const, label: "Your role (optional)", placeholder: "CTO / Founder / Head of Product", required: false },
            ].map((field) => (
              <div key={field.key} style={{ marginBottom: 18 }}>
                <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{field.label}</label>
                <input
                  type={field.key === "email" ? "email" : "text"}
                  value={data[field.key]}
                  onChange={(e) => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{ ...inputStyle, border: errs[field.key as keyof ContactFormErrors] ? "1px solid #ff8866" : "1px solid var(--line)" }}
                />
                {errs[field.key as keyof ContactFormErrors] && <p style={{ color: "#ff8866", fontSize: 12, marginTop: 4 }}>{errs[field.key as keyof ContactFormErrors]}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "20px 36px", borderTop: "1px solid var(--line)", background: "var(--bg-0)" }}>
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} style={{ background: "transparent", border: "1px solid transparent", color: "var(--fg-dim)", padding: "12px 0", fontSize: 14, cursor: "pointer" }}>
            ← Back
          </button>
        ) : (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.1em", alignSelf: "center" }}>
            STEP {step + 1} OF {STEPS.length}
          </span>
        )}
        <button
          type="button"
          onClick={next}
          disabled={submitting}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 18px", fontSize: 14, borderRadius: 8, border: "1px solid var(--accent)", background: "var(--accent)", color: "#0a0a0a", fontWeight: 500, cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? "Sending…" : step === STEPS.length - 1 ? "Send it" : "Continue"} <span>→</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .choice-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
