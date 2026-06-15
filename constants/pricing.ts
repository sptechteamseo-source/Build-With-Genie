import type { PricingTier, EstimatorQuestion, FaqItem } from "@/types";

export const PRICING_TIERS: PricingTier[] = [
  {
    badge: "Starter",
    name: "MVP Sprint",
    description: "Idea → live product, in 14 days. Fixed scope, fixed price.",
    price: "$24k",
    priceSuffix: "fixed",
    features: [
      "14 calendar days",
      "2 senior engineers + AI stack",
      "Hi-fi prototype on day 4",
      "Production deploy on day 14",
      "Auth, payments, admin panel",
      "Full test suite + a11y audit",
      "30-day warranty",
    ],
    ctaLabel: "Start an MVP",
  },
  {
    badge: "Most chosen",
    name: "Embedded Pod",
    description:
      "A senior pod on your team, monthly. Output of a department.",
    price: "$60k",
    priceSuffix: "/ month",
    priceFrom: true,
    features: [
      "2 seniors, full-time",
      "Claude / Gemini / Codex licenses",
      "Standup, slack, code review",
      "Weekly throughput report",
      "Pair-and-upskill with your team",
      "Monthly retainer, quarterly minimum",
      "One month notice to wind down",
    ],
    ctaLabel: "Embed a pod",
    featured: true,
  },
  {
    badge: "Enterprise",
    name: "Multi-pod",
    description:
      "Two or more pods on a coordinated programme. Custom scope.",
    price: "Talk to us",
    priceSuffix: "",
    features: [
      "2–6 pods coordinated by an EM",
      "Dedicated technical lead",
      "SOC 2 / HIPAA / GDPR scoped",
      "Custom contract terms",
      "On-prem / VPC deployable",
      "Named senior architect",
      "Source escrow available",
    ],
    ctaLabel: "Discuss programme",
  },
];

export const ESTIMATOR_QUESTIONS: EstimatorQuestion[] = [
  {
    id: "kind",
    label: "What are we building?",
    options: [
      { v: "new", l: "New product (MVP)", mult: 1.0 },
      { v: "feature", l: "Add to existing product", mult: 0.7 },
      { v: "modernize", l: "Modernize / rewrite", mult: 1.2 },
      { v: "ai", l: "AI feature integration", mult: 0.85 },
    ],
  },
  {
    id: "size",
    label: "How big does it feel?",
    options: [
      { v: "s", l: "One core flow", weeks: 2, days: 14, base: 24000 },
      { v: "m", l: "3–5 flows", weeks: 4, days: 28, base: 48000 },
      { v: "l", l: "A whole product", weeks: 8, days: 56, base: 96000 },
      { v: "xl", l: "Multi-product platform", weeks: 16, days: 112, base: 180000 },
    ],
  },
  {
    id: "integ",
    label: "How many integrations? (Stripe, auth, email, S3, etc.)",
    options: [
      { v: 1, l: "None", add: 0 },
      { v: 2, l: "1–2", add: 4000 },
      { v: 3, l: "3–5", add: 12000 },
      { v: 4, l: "6+", add: 24000 },
    ],
  },
  {
    id: "compliance",
    label: "Compliance needs?",
    options: [
      { v: "none", l: "None", add: 0 },
      { v: "soc2", l: "SOC 2", add: 8000 },
      { v: "hipaa", l: "HIPAA", add: 14000 },
      { v: "fin", l: "PCI / FinReg", add: 18000 },
    ],
  },
  {
    id: "design",
    label: "Design fidelity?",
    options: [
      { v: "use", l: "Use our design system", add: 0 },
      { v: "hifi", l: "Custom hi-fi", add: 6000 },
      { v: "brand", l: "New brand identity", add: 18000 },
    ],
  },
];

export const PRICING_FAQ: FaqItem[] = [
  {
    question: "What's actually included in a fixed-price MVP?",
    answer:
      "A working web app with auth, a payment integration, an admin panel, your core flow end-to-end, a deploy to production, a domain set up, an architecture doc, runbooks, a test suite and 30-day warranty support. The scope is signed before we start; anything outside it is either dropped or quoted separately.",
  },
  {
    question: "Do you bill for AI usage on top?",
    answer:
      "No. AI tokens are part of our cost of doing business. The price you sign is the price you pay.",
  },
  {
    question: "What if we want to pause or stop an embedded pod?",
    answer:
      "Quarterly minimum on embedded pods, 30 days notice to wind down. We hand off everything we've built and the team you've been paired with stays available for follow-up questions for 60 days.",
  },
  {
    question: "Equity instead of cash?",
    answer:
      "For pre-seed / seed founders we'll consider a 30/70 cash/equity split on MVP work, post-vetting. We don't do 100% equity.",
  },
  {
    question: "What does the warranty cover?",
    answer:
      "For 30 days after delivery we fix bugs in what we built at no cost. Not new features. We define 'bug' together — there's a clause in the contract.",
  },
];

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Is AI-generated code safe to ship?",
    answer:
      "Every line is reviewed by a senior engineer before it lands on main. We treat AI like a fast, tireless junior — its output is checked, tested and owned by a human. Our pods carry malpractice-equivalent professional liability insurance on every engagement.",
  },
  {
    question: "Who owns the code, the IP and the models?",
    answer:
      "You own 100% of the code and all IP from day one. We use enterprise tiers of Claude, Gemini and OpenAI which do not train on your data. We can also run fully on-prem or in your VPC for regulated workloads.",
  },
  {
    question: "What if AI gets it wrong?",
    answer:
      "It will, regularly. The humans in the loop catch it. We run automated review, unit tests, type checks, security scans and a human PR review on every change — same as any disciplined engineering team. AI being wrong is a normal part of the process, not a crisis.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Yes. About a third of our engagements are embedded — a pod sits inside your team, uses your tools and processes, and ramps your engineers on the same AI workflows. By the end of the quarter, your team is faster too.",
  },
  {
    question: "What does it cost?",
    answer:
      "A 14-day MVP starts at $24k. A modernization or embedded pod is typically $30–80k per month depending on size. See the pricing page for fixed-scope packages and an estimator.",
  },
  {
    question: "How do you handle compliance — SOC 2, HIPAA, GDPR?",
    answer:
      "We are SOC 2 Type II. HIPAA BAA available. For GDPR / data residency we deploy to the region you need. For air-gapped requirements we deliver source + a hand-off doc.",
  },
  {
    question: "What stacks do you work in?",
    answer:
      "Defaults: TypeScript / React / Next.js / Python / Postgres / AWS or Vercel. We've shipped in Rust, Go, Swift, Kotlin, Elixir and a half-dozen others. Tell us your stack — if our seniors know it, we'll match a pod to it.",
  },
];
