import type { UseCase } from "@/types";

export const USE_CASES: UseCase[] = [
  // ── 01 · Founders ────────────────────────────────────────────────────────────
  {
    slug: "founders",
    role: "Founders",
    icon: "rocket",
    index: "01",
    title: "Idea to investor-ready in a weekend",
    desc: "Size the market, draft the deck, build the model, and pressure-test the story before you ever pitch.",
    points: [
      "Market & competitor research with sources",
      "First-draft pitch deck and one-pager",
      "Financial model from your assumptions",
    ],
    heroHeading: "From a napkin idea to an investor-ready story in a single weekend.",
    heroLede:
      "Founders don't lose because the idea is bad — they lose because the proof takes too long. The genie compresses the research, the deck, the model and the narrative into the time you have, so you walk into the room ready.",
    intro: [
      "Early on, a founder is the whole team. You're the researcher, the designer, the analyst and the salesperson — and every hour spent formatting a deck is an hour not spent talking to customers. The work that makes you fundable is real work, but most of it is the kind a sharp operator can delegate.",
      "Build with Genie does that work alongside you. You bring the conviction and the context; it brings the speed. The result is the same artifacts a seed-stage team would spend three weeks producing — a sourced market analysis, a clean pitch deck, a defensible model — done in a focused weekend and shaped entirely by your assumptions.",
    ],
    capabilities: [
      {
        title: "Market & competitor research with sources",
        body: "Get a structured TAM/SAM/SOM view, a competitive landscape, and the macro tailwinds behind your thesis — every claim linked to a primary source you can actually cite in the room.",
      },
      {
        title: "First-draft pitch deck and one-pager",
        body: "Turn your raw thinking into a 10–12 slide narrative deck and a tight one-pager. On-message, on-brand, and structured the way investors expect to read it.",
      },
      {
        title: "Financial model from your assumptions",
        body: "A working three-statement-lite model driven by your own inputs — pricing, CAC, conversion, burn — so you can stress-test the story and answer the hard questions live.",
      },
      {
        title: "Narrative pressure-testing",
        body: "Before you pitch, the genie plays the skeptical investor: poking holes in the model, challenging the wedge, and surfacing the questions you'll actually get asked.",
      },
    ],
    workflow: [
      {
        title: "Brain-dump the idea",
        body: "Describe the problem, the wedge and what you believe in plain language. No template, no formatting — just the raw thesis and any data you already have.",
      },
      {
        title: "Research runs in parallel",
        body: "While you keep talking to customers, the genie sizes the market, maps competitors and pulls sourced evidence for every claim worth making.",
      },
      {
        title: "Artifacts get drafted",
        body: "Deck, one-pager and model come back as editable first drafts built around your assumptions — not generic boilerplate.",
      },
      {
        title: "Pressure-test and ship",
        body: "Run the skeptic pass, tighten the weak spots, and walk into the meeting with proof instead of a promise.",
      },
    ],
    scenario: {
      before: [
        "Three weeks of nights and weekends formatting slides",
        "A model copied from a template you don't fully trust",
        "Market size numbers with no citation behind them",
        "Walking into the pitch hoping nobody asks about churn",
      ],
      after: [
        "A sourced market analysis ready by Sunday night",
        "A model driven by your own assumptions, end to end",
        "A deck and one-pager that read like a Series A team made them",
        "Answers rehearsed against the questions you'll actually get",
      ],
    },
    outcomes: [
      { value: "1 weekend", label: "idea to data room" },
      { value: "10–12", label: "slides, first draft" },
      { value: "100%", label: "claims with sources" },
    ],
    faqs: [
      {
        question: "Will the deck look generic, like everyone else's?",
        answer:
          "No. Everything is built from your thesis, your assumptions and your voice. The structure follows what investors expect, but the content is yours — you're editing a sharp first draft, not accepting a template.",
      },
      {
        question: "Can it use my real numbers?",
        answer:
          "Yes. The model is driven entirely by the inputs you provide — pricing, CAC, conversion, burn — and recalculates as you change them, so you can test scenarios live in a meeting.",
      },
      {
        question: "How accurate is the market research?",
        answer:
          "Every material claim is tied to a primary source you can open and verify. The genie surfaces the evidence; you stay the final judge of what makes the cut.",
      },
    ],
  },

  // ── 02 · Product ─────────────────────────────────────────────────────────────
  {
    slug: "product",
    role: "Product",
    icon: "compass",
    index: "02",
    title: "Messy feedback into a ranked roadmap",
    desc: "Pull signal out of tickets, calls and reviews, then turn it into specs your team can actually build.",
    points: [
      "Synthesize feedback across every channel",
      "Draft PRDs and acceptance criteria",
      "Rank by impact, effort and reach",
    ],
    heroHeading: "Turn a firehose of feedback into a roadmap your team can actually build.",
    heroLede:
      "Product managers don't lack signal — they're drowning in it. Tickets, sales calls, reviews, Slack threads. The genie reads all of it, finds the patterns, and turns them into specs and a ranked roadmap you can defend.",
    intro: [
      "The hardest part of product isn't deciding what to build — it's reading everything first. Customer feedback arrives in a dozen formats across a dozen tools, and the synthesis work that turns it into a decision is slow, manual and easy to skip under pressure.",
      "Build with Genie does the reading. It ingests the raw material wherever it lives, clusters it into themes, and hands you back the signal: the recurring pains, the requests that map to real revenue, and a roadmap ranked by impact, effort and reach. You spend your time on judgment, not on tabs.",
    ],
    capabilities: [
      {
        title: "Synthesize feedback across every channel",
        body: "Support tickets, call transcripts, app-store reviews, sales notes and Slack — pulled together, deduped and clustered into the themes that actually matter.",
      },
      {
        title: "Draft PRDs and acceptance criteria",
        body: "Each prioritized theme becomes a spec: problem statement, user stories, acceptance criteria and edge cases — a document engineering can pick up without a second meeting.",
      },
      {
        title: "Rank by impact, effort and reach",
        body: "A transparent scoring pass across your backlog so you can sequence with a rationale, not a gut feel — and show your work when leadership asks why.",
      },
      {
        title: "Spot what's missing",
        body: "Beyond what users ask for, the genie flags the silent gaps — churn drivers and friction points that show up in behavior but never make it into a ticket.",
      },
    ],
    workflow: [
      {
        title: "Point it at the sources",
        body: "Drop in exports, transcripts and links from wherever feedback lives. No tagging or cleanup required up front.",
      },
      {
        title: "Themes emerge",
        body: "Raw feedback is clustered into ranked themes, each backed by the specific quotes and tickets that support it.",
      },
      {
        title: "Specs get written",
        body: "Pick the themes worth pursuing and the genie drafts the PRD and acceptance criteria for each.",
      },
      {
        title: "Roadmap, ranked",
        body: "Get a sequenced roadmap scored by impact, effort and reach — ready to share and defend.",
      },
    ],
    scenario: {
      before: [
        "Feedback scattered across six tools, read by no one fully",
        "Roadmap priorities driven by whoever spoke loudest",
        "PRDs that take a day each to write from scratch",
        "No clean answer when leadership asks 'why this, why now?'",
      ],
      after: [
        "Every channel synthesized into ranked, evidence-backed themes",
        "Priorities scored by impact, effort and reach",
        "First-draft PRDs and acceptance criteria in minutes",
        "A defensible rationale behind every roadmap decision",
      ],
    },
    outcomes: [
      { value: "12+", label: "channels synthesized" },
      { value: "minutes", label: "to a first-draft PRD" },
      { value: "1 view", label: "ranked, sourced roadmap" },
    ],
    faqs: [
      {
        question: "Does it work with my existing tools?",
        answer:
          "Yes. You can feed it exports and transcripts from your support desk, call recorder, review platforms and chat. It works with the raw material you already have — no migration required.",
      },
      {
        question: "How does it decide what to rank highest?",
        answer:
          "Scoring is transparent and based on the dimensions you care about — typically impact, effort and reach. You can see the reasoning behind each score and override it whenever your context says otherwise.",
      },
      {
        question: "Are the PRDs actually usable by engineering?",
        answer:
          "They're structured first drafts — problem, stories, acceptance criteria and edge cases — meant to save you the blank-page hours. You review and refine before handing them off, the same as with any draft.",
      },
    ],
  },

  // ── 03 · Engineering ─────────────────────────────────────────────────────────
  {
    slug: "engineering",
    role: "Engineering",
    icon: "code",
    index: "03",
    title: "Let the genie write the first draft",
    desc: "Scaffold features, generate tests and triage diffs — so senior time goes to judgment, not boilerplate.",
    points: [
      "Implement from a spec, tests included",
      "Explain and review unfamiliar code",
      "Refactors with a clear target",
    ],
    heroHeading: "Senior engineers should spend their time on judgment, not boilerplate.",
    heroLede:
      "The genie writes the first draft of the feature, the tests and the refactor — so your best engineers review and decide instead of typing the obvious parts. Same quality bar, a fraction of the keystrokes.",
    intro: [
      "Most of what slows a strong engineering team down isn't hard — it's voluminous. Scaffolding, test coverage, tracing an unfamiliar module, the mechanical half of a refactor. It's necessary work, and it's exactly the work that buries the judgment calls only a senior should make.",
      "Build with Genie takes the first pass. Give it a spec and it implements the feature with tests included. Point it at a gnarly file and it explains what the code does before you touch it. Hand it a refactor with a clear target and it does the legwork. Your engineers stay in the loop as reviewers and architects — where their time is actually worth it.",
    ],
    capabilities: [
      {
        title: "Implement from a spec, tests included",
        body: "Hand over a PRD or a ticket and get a working first implementation with unit tests, edge cases handled and a diff that's ready to review — not a wall of placeholder code.",
      },
      {
        title: "Explain and review unfamiliar code",
        body: "Drop in a file or a service you've never seen and get a clear walkthrough of what it does, where the risks are, and what a safe change looks like before you make it.",
      },
      {
        title: "Refactors with a clear target",
        body: "Describe the end state — extract this, untangle that, migrate to this pattern — and the genie does the mechanical work while preserving behavior and tests.",
      },
      {
        title: "Triage diffs and PRs",
        body: "A first-pass review on every diff: likely bugs, missing tests, security smells and style nits flagged before a human reviewer ever opens it.",
      },
    ],
    workflow: [
      {
        title: "Hand over the spec",
        body: "A ticket, a PRD or even a rough description of the change. The clearer the target, the cleaner the draft.",
      },
      {
        title: "Get a first draft with tests",
        body: "A working implementation lands as a reviewable diff, with tests and edge cases already covered.",
      },
      {
        title: "Review and steer",
        body: "Your engineer reads the diff, asks for changes in plain language, and the genie iterates until it meets the bar.",
      },
      {
        title: "Merge with confidence",
        body: "Ship a change that's been drafted, tested and reviewed — with senior judgment applied where it counts.",
      },
    ],
    scenario: {
      before: [
        "Seniors burning hours on scaffolding and boilerplate",
        "Test coverage skipped under deadline pressure",
        "Onboarding to a new codebase measured in weeks",
        "Refactors deferred because nobody has the time",
      ],
      after: [
        "First-draft features and tests generated from the spec",
        "Coverage written by default, not as an afterthought",
        "Unfamiliar code explained before anyone changes it",
        "Refactors done in hours, with behavior preserved",
      ],
    },
    outcomes: [
      { value: "3–6×", label: "faster first draft" },
      { value: "tests", label: "included by default" },
      { value: "senior", label: "time on judgment" },
    ],
    faqs: [
      {
        question: "Will this replace my engineers?",
        answer:
          "No — it changes what they spend time on. The genie writes the first draft; your engineers review, decide and own the result. Judgment, architecture and the hard calls stay with the humans.",
      },
      {
        question: "How does it keep code quality high?",
        answer:
          "Every change comes as a reviewable diff with tests, and nothing merges without a human in the loop. You keep your existing review process — the genie just gets you to the review faster.",
      },
      {
        question: "Does it work in my existing codebase?",
        answer:
          "Yes. It reads your conventions and existing patterns and writes code that fits in, rather than dropping in something that looks foreign to the rest of the repo.",
      },
    ],
  },

  // ── 04 · Marketing ───────────────────────────────────────────────────────────
  {
    slug: "marketing",
    role: "Marketing",
    icon: "megaphone",
    index: "04",
    title: "A campaign's worth of copy by lunch",
    desc: "Go from one brief to landing pages, emails and ad variants — all on brand, all ready to test.",
    points: [
      "On-brand copy from a single brief",
      "Landing pages, emails, ad variants",
      "A/B variations generated in bulk",
    ],
    heroHeading: "Ship a full campaign's worth of copy before lunch — all on brand.",
    heroLede:
      "One brief in, a complete campaign out: landing pages, an email sequence, ad variants and a stack of A/B options. The genie holds your voice across every asset so the only thing left to do is pick what to test.",
    intro: [
      "Marketing teams move at the speed of their content pipeline, and the pipeline is almost always the bottleneck. A single launch needs landing copy, a nurture sequence, paid variants and social — each in your voice, each ready to test. Produced by hand, that's a week. Produced under deadline, it's a compromise.",
      "Build with Genie collapses the timeline. Feed it the brief and your brand guidelines once, and it generates the full asset set in a consistent voice, plus the variations you need for real testing. You go from staring at a blank doc to choosing between strong options — the part of the job that's actually fun.",
    ],
    capabilities: [
      {
        title: "On-brand copy from a single brief",
        body: "Give it your positioning, audience and tone once. Every asset that follows lands in the same voice — no drift, no re-briefing for each piece.",
      },
      {
        title: "Landing pages, emails, ad variants",
        body: "A complete campaign set from one input: hero and landing copy, a multi-touch email sequence, and ad variants sized for each channel.",
      },
      {
        title: "A/B variations generated in bulk",
        body: "Not one headline — a dozen, with different angles and hooks, so you're testing real alternatives instead of guessing at a single line.",
      },
      {
        title: "Repurpose across channels",
        body: "Turn a single piece into the long-form post, the email, the thread and the ad — each adapted to how the channel actually reads, not just copy-pasted.",
      },
    ],
    workflow: [
      {
        title: "Write one brief",
        body: "Offer, audience, key message and tone. Add your brand guidelines once and they carry through everything.",
      },
      {
        title: "Generate the asset set",
        body: "Landing pages, emails and ad variants come back together, all in a consistent voice.",
      },
      {
        title: "Pull the variations",
        body: "Get bulk A/B options for the lines that matter so you can test angles, not typos.",
      },
      {
        title: "Pick, polish, launch",
        body: "Choose the strongest options, give them a final human pass, and ship.",
      },
    ],
    scenario: {
      before: [
        "A week to produce one launch's worth of copy",
        "Voice drifting between the page, the emails and the ads",
        "A/B tests with one variant because there was no time for more",
        "The writer stuck on the blank page instead of the strategy",
      ],
      after: [
        "A full campaign drafted in an afternoon",
        "One voice held consistently across every asset",
        "A dozen real variants ready to test",
        "The team choosing between strong options, not starting cold",
      ],
    },
    outcomes: [
      { value: "by lunch", label: "full campaign drafted" },
      { value: "1 brief", label: "every asset, one voice" },
      { value: "10+", label: "variants to test" },
    ],
    faqs: [
      {
        question: "Will the copy actually sound like us?",
        answer:
          "Yes — that's the point. You set the voice once with your guidelines and examples, and the genie holds it across every asset. You're editing on-brand drafts, not rewriting generic copy.",
      },
      {
        question: "Can it match different channels?",
        answer:
          "It adapts the same message to how each channel reads — punchy for ads, scannable for landing pages, conversational for email — rather than pasting the same text everywhere.",
      },
      {
        question: "Is the output ready to publish as-is?",
        answer:
          "Treat it as a strong first draft. The heavy lifting is done; a quick human pass for nuance and fact-checking gets it launch-ready fast.",
      },
    ],
  },

  // ── 05 · Design ──────────────────────────────────────────────────────────────
  {
    slug: "design",
    role: "Design",
    icon: "pen",
    index: "05",
    title: "Skip the blank canvas",
    desc: "Turn a prompt into wireframes and flows, then iterate variations and UX copy without starting over.",
    points: [
      "Wireframes and flows from a prompt",
      "Variation passes in seconds",
      "Microcopy that matches the design",
    ],
    heroHeading: "Skip the blank canvas. Start from a draft and iterate toward great.",
    heroLede:
      "Describe the screen and the genie hands back wireframes, flows and UX copy to react to. The slow part of design — getting to something to critique — disappears, so you spend your time making it better.",
    intro: [
      "The hardest pixel to place is the first one. Designers spend a surprising share of their time just getting to a starting point — blocking out a layout, mapping a flow, writing placeholder copy that won't embarrass the mock. It's necessary, it's not the craft, and it eats the hours that should go into refinement.",
      "Build with Genie gives you a draft to push against. Describe the screen or the journey and it returns wireframes, a flow and real UX copy in seconds. Then it iterates — variation passes, alternative layouts, tighter microcopy — as fast as you can react. You stay the designer; the blank canvas just stops being your problem.",
    ],
    capabilities: [
      {
        title: "Wireframes and flows from a prompt",
        body: "Describe a screen or an end-to-end journey in words and get back a structured wireframe and flow you can immediately critique and redirect.",
      },
      {
        title: "Variation passes in seconds",
        body: "Don't commit to the first idea. Generate alternative layouts and treatments instantly so you're choosing between directions, not defending the only one you had time for.",
      },
      {
        title: "Microcopy that matches the design",
        body: "Real button labels, empty states, error messages and helper text — written to fit the design instead of lorem ipsum that hides the hard UX questions.",
      },
      {
        title: "Fill in the edge states",
        body: "The loading, empty, error and success states that always get skipped under deadline — drafted up front so the flow is actually complete.",
      },
    ],
    workflow: [
      {
        title: "Describe the screen",
        body: "Explain the goal, the user and the key actions. No need to open the canvas first.",
      },
      {
        title: "Get a draft to react to",
        body: "Wireframes, a flow and real UX copy come back fast — a concrete starting point, not a blank artboard.",
      },
      {
        title: "Iterate at speed",
        body: "Ask for variations, alternative layouts and tighter copy as quickly as you can form an opinion.",
      },
      {
        title: "Refine to final",
        body: "Take the strongest direction into your tool and spend your time on craft, not catch-up.",
      },
    ],
    scenario: {
      before: [
        "Hours lost just getting to a first layout",
        "One direction explored because time ran out",
        "Lorem ipsum hiding the real UX problems",
        "Edge states bolted on at the very end, if at all",
      ],
      after: [
        "A draft wireframe and flow in seconds",
        "Multiple directions to compare instantly",
        "Real microcopy in the mock from the start",
        "Loading, empty and error states drafted up front",
      ],
    },
    outcomes: [
      { value: "seconds", label: "to first wireframe" },
      { value: "many", label: "directions, not one" },
      { value: "real copy", label: "no more lorem ipsum" },
    ],
    faqs: [
      {
        question: "Does this replace my design tools?",
        answer:
          "No. It gets you past the blank canvas fast — wireframes, flows and copy to react to. You take the direction you like into Figma or your tool of choice and do the craft there.",
      },
      {
        question: "Can it match our design system?",
        answer:
          "It works from the patterns, components and tone you describe, so the drafts line up with your system rather than inventing a new visual language each time.",
      },
      {
        question: "Is the UX copy any good?",
        answer:
          "It's written to fit the actual context — the button, the empty state, the error — which makes it a real starting point. You refine for voice and nuance, but you're never staring at placeholder text.",
      },
    ],
  },

  // ── 06 · Operations ──────────────────────────────────────────────────────────
  {
    slug: "operations",
    role: "Operations",
    icon: "settings",
    index: "06",
    title: "Automate the work nobody wants",
    desc: "Triage the queue, draft the SOPs and reconcile the spreadsheets — quietly, in the background.",
    points: [
      "Support triage and first responses",
      "SOPs and process docs on demand",
      "Spreadsheet cleanup and reconciliation",
    ],
    heroHeading: "Automate the repetitive work nobody wants — quietly, in the background.",
    heroLede:
      "The queue, the SOPs, the spreadsheet reconciliation. The genie handles the operational grind that keeps a company running so your team can spend its hours on the work that actually needs a human.",
    intro: [
      "Operations is the work that's invisible until it breaks. Tickets to triage, processes to document, spreadsheets to reconcile — none of it is glamorous, all of it is essential, and most of it is exactly the kind of repetitive task that drains a capable team.",
      "Build with Genie takes the grind. It triages the support queue and drafts first responses, writes the SOP from how the work is actually done, and reconciles the messy spreadsheet without complaint. It runs quietly in the background, escalating only what genuinely needs a person — so your team's hours go where judgment is required.",
    ],
    capabilities: [
      {
        title: "Support triage and first responses",
        body: "Incoming tickets categorized, prioritized and routed, with accurate first-response drafts ready to send — so the queue never piles up and nothing urgent gets buried.",
      },
      {
        title: "SOPs and process docs on demand",
        body: "Describe how a process works, or point at the steps, and get a clear, structured SOP that someone new could actually follow — written in minutes, not put off for months.",
      },
      {
        title: "Spreadsheet cleanup and reconciliation",
        body: "Deduping, normalizing, matching records across sources and flagging the anomalies — the tedious data work done reliably, with the exceptions surfaced for review.",
      },
      {
        title: "Quietly, in the background",
        body: "It handles the routine and escalates only what truly needs a human, so your team's attention goes to the exceptions instead of the volume.",
      },
    ],
    workflow: [
      {
        title: "Define the routine",
        body: "Show the genie the queue, the process or the spreadsheet and the rules it should follow.",
      },
      {
        title: "It handles the volume",
        body: "Tickets get triaged, docs get drafted and data gets reconciled — continuously and consistently.",
      },
      {
        title: "Exceptions escalate to you",
        body: "Anything ambiguous or genuinely judgment-bound is surfaced for a human, with the context attached.",
      },
      {
        title: "Your team stays focused",
        body: "The grind runs in the background while people spend their time on work that needs them.",
      },
    ],
    scenario: {
      before: [
        "A support queue that's always one day behind",
        "Tribal knowledge that never makes it into a doc",
        "Hours each week lost to spreadsheet cleanup",
        "Skilled people stuck on repetitive busywork",
      ],
      after: [
        "Tickets triaged and first responses drafted automatically",
        "SOPs written on demand, not deferred indefinitely",
        "Reconciliation done reliably with anomalies flagged",
        "The team's time spent on exceptions, not volume",
      ],
    },
    outcomes: [
      { value: "background", label: "runs without supervision" },
      { value: "11hrs", label: "saved per person / week" },
      { value: "exceptions", label: "only escalated to humans" },
    ],
    faqs: [
      {
        question: "Can I trust it with customer-facing responses?",
        answer:
          "You set the guardrails. It can draft responses for a human to approve, or auto-send only for the categories you explicitly trust — and anything outside those rules is escalated rather than guessed.",
      },
      {
        question: "How accurate is the spreadsheet reconciliation?",
        answer:
          "It applies your rules consistently and, crucially, flags the anomalies it can't resolve rather than silently forcing a match. You review the exceptions; it handles the routine.",
      },
      {
        question: "Does it need a lot of setup?",
        answer:
          "No. You describe the process or point it at the existing work once. It learns the routine from what you already do rather than requiring a long configuration project.",
      },
    ],
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((uc) => uc.slug === slug);
}
