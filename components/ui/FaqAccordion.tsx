"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ borderTop: "1px solid var(--line)" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{ borderBottom: "1px solid var(--line)", padding: "22px 0", cursor: "pointer" }}
            onClick={() => setOpenIndex(isOpen ? null : i)}
          >
            {/* Question row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                fontSize: 18,
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              <span>{item.question}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  color: isOpen ? "var(--accent)" : "var(--fg-faint)",
                  fontSize: 14,
                  transition: "transform 0.2s, color 0.2s",
                  transform: isOpen ? "rotate(45deg)" : "none",
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </div>

            {/* Answer */}
            <div
              style={{
                maxHeight: isOpen ? 300 : 0,
                overflow: "hidden",
                transition: "max-height 0.3s ease, padding 0.3s ease",
                color: "var(--fg-dim)",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: "76ch",
                paddingTop: isOpen ? 14 : 0,
              }}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
