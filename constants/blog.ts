// Presentational config for the public blog UI.
// Blog post DATA now lives in MongoDB (collection: blogposts) and is read via
// lib/blog.ts. There is intentionally no static POSTS array here anymore.

export const CATEGORIES = ["All", "Engineering", "AI Models", "Process", "Case Notes", "Opinion"];

export const CAT_HUE: Record<string, string> = {
  Engineering:  "93,139,244",
  "AI Models":  "124,245,196",
  Process:      "197,163,255",
  "Case Notes": "120,161,248",
  Opinion:      "255,160,90",
};
