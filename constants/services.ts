import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "mvp",
    num: "01 / MVP Sprint",
    title: "14-day MVP",
    meta: [
      { label: "Timeline", value: "14 days" },
      { label: "Team", value: "2 seniors + AI" },
      { label: "Starting at", value: "$24,000" },
      { label: "Best for", value: "Founders, 0→1" },
    ],
    ctaLabel: "Start an MVP",
    description:
      "Idea to live product in two weeks. We pick the smallest version of your product that a real user could pay for, and we ship it. Fixed scope, fixed price, fixed timeline.",
    sectionTitle: "What you get",
    items: [
      "Production web app with auth & payments",
      "Hi-fi prototype on day 4 you can click",
      "Postgres, S3 and CDN provisioned",
      "Daily staging URL, no surprise demo",
      "Full test suite — unit, e2e, a11y",
      "Repository transfer + 30-day warranty",
      "Lightweight admin panel",
      "Runbook + AI prompt library",
    ],
    callout: "Most founders close one paying customer before the warranty ends.",
    calloutSub: "Common outcome",
  },
  {
    id: "modernize",
    num: "02 / Modernize",
    title: "Legacy modernization",
    meta: [
      { label: "Timeline", value: "4–12 weeks" },
      { label: "Team", value: "2 seniors + AI" },
      { label: "Starting at", value: "$40,000 / mo" },
      { label: "Best for", value: "Mid-market CTOs" },
    ],
    ctaLabel: "Talk modernization",
    description:
      "You have a working codebase that's holding the company back. Rails 5 on Heroku. A jQuery admin. A monolith that nobody wants to touch. We come in, plan the smallest valuable rewrite, ship it incrementally, and leave your team faster than we found them.",
    sectionTitle: "Where we shine",
    items: [
      "Framework upgrades (Rails, Django, Next.js)",
      "Monolith → modular extraction",
      "jQuery / legacy front-end → React",
      "Replatform (Heroku → AWS, on-prem → cloud)",
      "Test backfills (0% → 60% coverage)",
      "Performance — 10× p95 targets",
      "Type-safety migrations (JS → TS, Py → typed)",
      "Dependency / security debt remediation",
    ],
    callout:
      "One pod handles work that traditionally takes 4–6 engineers a quarter.",
    calloutSub: "How it scales",
  },
  {
    id: "integrate",
    num: "03 / Integrate",
    title: "AI features in your product",
    meta: [
      { label: "Timeline", value: "3–8 weeks" },
      { label: "Team", value: "2 seniors + AI" },
      { label: "Starting at", value: "$32,000" },
      { label: "Best for", value: "Existing SaaS" },
    ],
    ctaLabel: "Scope an AI feature",
    description:
      "Your product needs a copilot, a search-over-docs, a summarizer, an agent, an autofill. We've shipped dozens. We bring the eval harness, the prompt library, the cost model and the safety review — not just the call to the model.",
    sectionTitle: "Patterns we deliver",
    items: [
      "In-product copilots (chat sidebar, slash menu)",
      "RAG search across your data",
      "Summarization & auto-tagging pipelines",
      "Voice-of-customer / feedback clustering",
      "Multi-step agents with human approval",
      "Eval harnesses & quality dashboards",
      "Cost & latency routing across models",
      "Safety, PII redaction, audit logs",
    ],
    callout:
      "Median time from kickoff to a feature behind a flag: 18 days.",
    calloutSub: "Tracked across engagements",
  },
  {
    id: "pod",
    num: "04 / Embedded Pod",
    title: "Embedded pod",
    meta: [
      { label: "Timeline", value: "Quarter min." },
      { label: "Team", value: "2 seniors + AI" },
      { label: "Starting at", value: "$60,000 / mo" },
      { label: "Best for", value: "Sustained throughput" },
    ],
    ctaLabel: "Embed a pod",
    description:
      "A senior pod joins your team for a quarter or longer. We use your repo, your Slack, your standup, your roadmap. Output of a department, headcount of two. Your engineers learn our AI workflows along the way — by the end of the quarter, they're shipping at the same speed.",
    sectionTitle: "Operating model",
    items: [
      "Daily standup with your team",
      "Pick from your existing backlog",
      "Same Linear / Jira / Notion you use",
      "Code review on both sides",
      "Weekly throughput report",
      "Quarterly review with leadership",
      "Hand-off doc updated weekly",
      "Your engineers, paired & upskilled",
    ],
    callout:
      "Most embedded engagements renew. The ones that don't, succeed differently — the in-house team scaled.",
    calloutSub: "Track record",
  },
];
