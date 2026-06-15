"use client";

import { useState, useEffect } from "react";
import type { PublicTestimonial } from "@/types";

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsCarousel({ testimonials }: { testimonials: PublicTestimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = (idx: number) => { setActive(idx); setPaused(false); };
  const prev = () => go((active - 1 + total) % total);
  const next = () => go((active + 1) % total);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % total), 4000);
    return () => clearInterval(id);
  }, [paused, total]);

  if (total === 0) return null;

  const t = testimonials[active];

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <div
        key={active}
        className="testimonial-slide"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: 0,
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-1)",
          overflow: "hidden",
          minHeight: 320,
        }}
      >
        {/* Left — identity panel */}
        <div
          style={{
            padding: "48px 40px",
            borderRight: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "var(--bg-2)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <StarRating count={t.rating} />
            <div>
              <span style={{ display: "block", fontSize: 18, fontWeight: 600, color: "var(--fg)", lineHeight: 1.3 }}>
                {t.name}
              </span>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.04em", marginTop: 6 }}>
                {t.role}
              </span>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.04em", marginTop: 2 }}>
                {t.company}
              </span>
            </div>
          </div>
        </div>

        {/* Right — quote panel */}
        <div
          style={{
            padding: "48px 48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 28,
          }}
        >
          <svg width="28" height="20" viewBox="0 0 24 18" fill="var(--accent)" style={{ opacity: 0.35, flexShrink: 0 }} aria-hidden="true">
            <path d="M0 18V10.8C0 4.68 3.84 1.2 11.52 0l1.44 2.16C9.12 3 7.2 5.04 6.72 8.4H10.8V18H0zm13.2 0V10.8C13.2 4.68 17.04 1.2 24.72 0l1.44 2.16C22.32 3 20.4 5.04 19.92 8.4H24V18H13.2z" />
          </svg>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--fg-dim)", margin: 0, flex: 1 }}>
            {t.text}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 28,
        }}
      >
        {/* Dots */}
        <div style={{ display: "flex", gap: 8 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                border: "none",
                cursor: "pointer",
                background: i === active ? "var(--accent)" : "var(--line-strong)",
                padding: 0,
                transition: "width 0.25s, background 0.2s",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--line-strong)",
              background: "var(--bg-1)",
              color: "var(--fg-dim)",
              cursor: "pointer",
              fontSize: 16,
              transition: "border-color 0.2s, color 0.2s",
            }}
            className="slider-btn"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--line-strong)",
              background: "var(--bg-1)",
              color: "var(--fg-dim)",
              cursor: "pointer",
              fontSize: 16,
              transition: "border-color 0.2s, color 0.2s",
            }}
            className="slider-btn"
          >
            →
          </button>
        </div>
      </div>

      <style>{`
        .testimonial-slide {
          animation: slide-in 0.3s ease;
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slider-btn:hover {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
        @media (max-width: 768px) {
          .testimonial-slide { grid-template-columns: 1fr !important; }
          .testimonial-slide > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line); }
        }
      `}</style>
    </div>
  );
}
