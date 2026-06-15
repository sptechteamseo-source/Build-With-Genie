import type { Tool } from "@/types";

export const TOOLS: Tool[] = [
  {
    mark: "C",
    name: "Claude Code",
    role: "Senior engineer",
    body: "Lead implementation, refactors, code review and architectural reasoning. Our default for any non-trivial change to a codebase.",
    uses: ["Build", "Review", "Refactor"],
  },
  {
    mark: "C",
    name: "Claude Cowork",
    role: "Pair-programming partner",
    body: "Long-running collaborative sessions for product spec, planning and exploratory design. Where our engineers and Claude share a workspace.",
    uses: ["Spec", "Design", "Plan"],
  },
  {
    mark: "O",
    name: "OpenAI Codex",
    role: "Background agent",
    body: "Async batch work — migrations, test backfills, dependency upgrades, evaluation runs. Triggered nightly, results reviewed in the morning.",
    uses: ["Async", "Migrations", "Tests"],
  },
  {
    mark: "G",
    name: "Gemini Antigravity",
    role: "Multi-agent surface",
    body: "Used for parallel browser, IDE and terminal agents — research, screenshot inspection, web-aware testing and competitive teardowns.",
    uses: ["Browser", "QA", "Research"],
  },
  {
    mark: "M",
    name: "Model router",
    role: "Cost / capability matching",
    body: "Internal router that picks the right model per task: Haiku for tiny ops, Opus for hard reasoning, Gemini Flash for image, GPT-mini for utility code.",
    uses: ["Routing", "Cost-aware"],
  },
  {
    mark: "H",
    name: "Senior humans",
    role: "Architecture · taste · accountability",
    body: "Every pod has two senior engineers who set direction, review every commit and own the relationship. AI accelerates them — never replaces them.",
    uses: ["Always-on"],
    accent: true,
  },
];
