"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";

interface DeleteConfirmProps {
  label: string;
  onConfirm: () => Promise<void>;
}

export function DeleteConfirm({ label, onConfirm }: DeleteConfirmProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid rgba(255,85,85,0.3)",
          background: "transparent",
          color: "#ff5555",
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
        }}
      >
        <Trash2 size={13} />
        Delete
      </button>

      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.6)", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "var(--bg-2)", borderRadius: 12,
            border: "1px solid var(--line)", padding: 28,
            width: 400, maxWidth: "90vw",
            fontFamily: "var(--font-sans)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--fg)" }}>
                Confirm Delete
              </h3>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg-dim)", padding: 4 }}>
                <X size={16} />
              </button>
            </div>
            <p style={{ color: "var(--fg-dim)", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
              Are you sure you want to delete <strong style={{ color: "var(--fg)" }}>{label}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: "8px 16px", borderRadius: 6, border: "1px solid var(--line-strong)",
                  background: "transparent", color: "var(--fg-dim)", fontSize: 14, cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                style={{
                  padding: "8px 16px", borderRadius: 6, border: "none",
                  background: "#ff5555", color: "#fff", fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-sans)", opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
