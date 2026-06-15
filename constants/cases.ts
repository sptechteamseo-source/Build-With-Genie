import type { Case } from "@/types";

export const CASES: Case[] = [
  {
    id: "fintech",
    tags: ["Fintech", "B2B"],
    accentTag: "18 days",
    title: "Reconciliation engine that pays for itself in 3 months.",
    lede: "A growth-stage payments company had 6 finance ops people closing the books on a 4-day cycle. The COO wanted it down to a day. We shipped the engine in 18.",
    imgClass: "fintech",
    annotTl: "/recon · in production · v1.2.4",
    sidebar: [
      { label: "Client", value: "A Series C payments co. (NDA)" },
      { label: "Engagement", value: "MVP Sprint" },
      { label: "Timeline", value: "18 calendar days" },
      { label: "Team", value: "2 seniors · Claude · Codex" },
      { label: "Stack", value: "Next.js · Postgres · S3 · BullMQ" },
    ],
    problem:
      "The finance team was reconciling against three banks, two card processors and an internal ledger using a 1,200-line spreadsheet and a small bag of Python scripts. Month-end took four days. New entities took a week to onboard.",
    shipped:
      "A web app that ingests bank files, runs a rules-then-ML matching pipeline, surfaces conflicts to a human reviewer and exports SOX-compliant evidence. Built in two sprints, hardened in a third.",
    quote:
      "We expected a prototype. They shipped the production system, with tests, with audit trails, with a SOC 2 control already mapped. The next month-end closed in a day.",
    quoteCite: "VP Finance Ops, Series C payments",
    aiNote:
      "Claude generated the matching rules from sample data on day 2. Codex backfilled tests overnight. Gemini drove the browser through every edge case while we slept. The seniors spent their time on the matching ML and the SOC 2 evidence trail — the parts that needed taste.",
    results: [
      { value: "4d → 6h", label: "Close cycle" },
      { value: "$2.1M", label: "Annual savings" },
      { value: "SOC 2", label: "Ready out of the gate" },
    ],
  },
  {
    id: "health",
    tags: ["Healthcare", "HIPAA"],
    accentTag: "32 days",
    title: "HIPAA-grade intake, designed for clinicians who hate forms.",
    lede: "A mental-health network was losing patients at intake. We rebuilt the journey end-to-end — patient app, clinician dashboard, EHR sync — in a month.",
    imgClass: "health",
    annotTl: "paloma · intake v3 · BAA-signed",
    sidebar: [
      { label: "Client", value: "Paloma Health (alias)" },
      { label: "Engagement", value: "Embedded Pod · Q3" },
      { label: "Timeline", value: "32 days to launch" },
      { label: "Team", value: "2 seniors · 1 client eng" },
      { label: "Stack", value: "Remix · Postgres · Pomelo EHR" },
    ],
    problem:
      "Patient intake was a 14-page PDF, faxed. 40% of new patients never finished. Clinicians had no view of risk before the first session. Compliance had been blocking a rewrite for two years.",
    shipped:
      "A web/mobile intake with adaptive questions, an e-consent flow, a clinician triage view, and a one-way sync to the existing EHR. HIPAA BAA signed in week one. PHI never leaves the customer's VPC.",
    quote:
      "Compliance signed off because the audit trail was already there. That alone saved us a quarter.",
    quoteCite: "CTO, Paloma Health",
    aiNote:
      "Claude drafted the 60-page security plan in three sessions. Codex generated the EHR adapter test suite from a 400-page vendor PDF. Our seniors handled the triage logic — that one needed careful clinical review.",
    results: [
      { value: "40% → 12%", label: "Intake drop-off" },
      { value: "14p PDF → 6m", label: "Avg. completion" },
      { value: "0", label: "Compliance escalations" },
    ],
  },
  {
    id: "saas",
    tags: ["SaaS", "AI feature"],
    accentTag: "21 days",
    title: "AI search across a million documents, in a product that already shipped.",
    lede: "A B2B knowledge product had a search bar that returned keyword matches. Users wanted answers. We shipped grounded RAG with citations in three weeks, behind a flag, no downtime.",
    imgClass: "saas",
    annotTl: "/search · with citations · in production",
    sidebar: [
      { label: "Client", value: "Vector/Labs (alias)" },
      { label: "Engagement", value: "Integrate" },
      { label: "Timeline", value: "21 days" },
      { label: "Team", value: "2 seniors · Claude · Gemini" },
      { label: "Stack", value: "Python · pgvector · Claude · Cohere rerank" },
    ],
    problem:
      "Customer success was answering 200 support tickets a week with 'the answer is in the docs.' Users wanted to ask the docs directly. The team had tried; the off-the-shelf chatbot hallucinated and got pulled in a week.",
    shipped:
      "A grounded RAG search with mandatory citations, a quality eval harness, a cost router (Haiku for small queries, Sonnet for hard ones) and a kill switch by document class. Live behind a feature flag in week 2, rolled to 100% in week 4.",
    quote:
      "The eval harness is the part that made it real. We could finally answer 'is the model getting better?' with a number.",
    quoteCite: "Head of Product, Vector/Labs",
    aiNote:
      "Claude generated the eval set from a year of support tickets in an afternoon. Gemini Antigravity drove the search UI against it nightly. Our seniors built the retrieval architecture and the kill-switch UX — humans, slowly, by hand.",
    results: [
      { value: "4×", label: "Search → action retention" },
      { value: "−38%", label: "Support tickets" },
      { value: "$0.004", label: "Cost per answer" },
    ],
  },
  {
    id: "devtools",
    tags: ["Dev tools", "Modernization"],
    accentTag: "9 weeks",
    title: "From a Rails 4 monolith to a typed, tested, modern stack.",
    lede: "A profitable but slow-moving dev-tools company had a 9-year-old Rails 4 codebase. Hiring was hard. Velocity had halved. We modernized it in a quarter — without a rewrite.",
    imgClass: "devtools",
    annotTl: "migration · 412 PRs · 9 weeks",
    sidebar: [
      { label: "Client", value: "Northwind DevTools" },
      { label: "Engagement", value: "Modernize" },
      { label: "Timeline", value: "9 weeks · 412 PRs" },
      { label: "Team", value: "2 seniors · Codex async" },
      { label: "Stack", value: "Rails 4 → 7 · Ruby 2.7 → 3.3 · Sorbet" },
    ],
    problem:
      "A profitable B2B dev-tools company with 30 engineers had been quoting 'Q3 next year' for any new product. Their codebase was Rails 4, 9 years deep, with thousands of N+1s and 0% test coverage. Two attempts at a rewrite had failed.",
    shipped:
      "No rewrite. A 9-week incremental modernization: Ruby upgrade, Rails upgrade, Sorbet types added file-by-file, test coverage built behind feature flags, and a CI overhaul. 412 PRs, all human-reviewed by the client team.",
    quote:
      "They didn't 'do the migration for us' — they did half of it and trained our team to do the rest. That ratio mattered.",
    quoteCite: "Director of Engineering, Northwind",
    aiNote:
      "Codex ran nightly: type stubs, test backfills, deprecation fixes. By morning, ~20 small PRs were waiting for a senior's eye. Claude handled the meaningful refactors. The client team did review and steered direction — and learned the workflow.",
    results: [
      { value: "0% → 64%", label: "Test coverage" },
      { value: "38m → 8m", label: "CI time" },
      { value: "2.4×", label: "Velocity post-engagement" },
    ],
  },
];
