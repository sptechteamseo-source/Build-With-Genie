import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { LogoStrip } from "@/components/home/LogoStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ToolsGrid } from "@/components/home/ToolsGrid";
import { SpeedComparison } from "@/components/home/SpeedComparison";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { CasesPreview } from "@/components/home/CasesPreview";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { SectionHead } from "@/components/ui/SectionHead";
import { TestimonialsSection } from "@/components/services/TestimonialsSection";
import { HOME_FAQ } from "@/constants/pricing";

export const metadata: Metadata = {
  title: "Build with Genie — Ship faster with AI",
};

// Testimonials are read live from MongoDB (see TestimonialsSection).
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoStrip />

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section
        id="process"
        style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <SectionHead
            eyebrow="How it works"
            heading="A Genie pipeline from idea to production."
            lede="Six steps, each one accelerated by AI. Click any step to see what happens inside the pod."
          />
          <HowItWorks />
        </div>
      </section>

      {/* ── Tools ──────────────────────────────────────────────────────── */}
      <section
        id="tools"
        style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <SectionHead
            eyebrow="Our stack"
            heading="The AI tools we run, every day."
            lede="We don't pick one model. We orchestrate the best one for each step — and route the rest to humans only when judgment matters most."
          />
          <ToolsGrid />
        </div>
      </section>

      {/* ── Speed ──────────────────────────────────────────────────────── */}
      <section
        id="speed"
        style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <SectionHead
            eyebrow="Speed"
            heading="A typical MVP, side-by-side."
            lede="Same scope. A web app with auth, a dashboard, an admin panel and a payments integration. Below: a traditional 6-person agency vs. one Genie pod."
          />
          <SpeedComparison />
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section
        id="services"
        style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <SectionHead
            eyebrow="Services"
            heading="What we build for you."
            lede="From a 14-day MVP to a multi-quarter modernization. Each engagement is delivered by a pod of two seniors plus our AI stack."
          />
          <ServicesPreview />
        </div>
      </section>

      {/* ── Cases preview ──────────────────────────────────────────────── */}
      <section
        id="cases"
        style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <SectionHead
            eyebrow="Selected work"
            heading="Shipped, in production, paying for themselves."
            lede="A small slice of recent work, with names and details swapped where NDAs apply."
          />
          <CasesPreview />
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <SectionHead
            eyebrow="FAQ"
            heading="The questions we hear most."
            lede="Don't see yours? Drop us a note — we reply within a business day."
          />
          <FaqAccordion items={HOME_FAQ} />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <CtaStrip
            heading="Have an idea sitting in a doc somewhere?"
            body="Show it to us. 30 minutes, no pitch deck, no slides. We'll tell you the smallest version we'd ship and how long it'd take."
            primaryLabel="Book a scoping call"
            primaryHref="/contact"
            secondaryLabel="See pricing"
            secondaryHref="/pricing"
          />
        </div>
      </section>
    </>
  );
}
