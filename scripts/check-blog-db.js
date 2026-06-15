// Read-only check: what blog posts exist in the DB vs the 8 hardcoded slugs.
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

// Load MONGODB_URI from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*MONGODB_URI\s*=\s*(.+)\s*$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("MONGODB_URI not found in .env.local");
}

const HARDCODED_SLUGS = [
  "claude-first-draft-every-pr",
  "rag-search-nine-days",
  "model-router-opus-haiku-flash",
  "code-review-more-important",
  "fourteen-day-mvp-hour-by-hour",
  "stop-prompting-start-specifying",
  "eval-driven-development",
  "47-ai-built-apps-tech-debt",
];

async function main() {
  const uri = loadEnv();
  const dbName = (uri.match(/\/([^/?]+)\?/) || [])[1] || "ai-service";
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("blogposts");

    const total = await col.countDocuments();
    const docs = await col.find({}, { projection: { slug: 1, title: 1, status: 1 } }).toArray();
    const dbSlugs = new Set(docs.map((d) => d.slug));

    console.log(`\nDatabase: ${dbName} · collection: blogposts`);
    console.log(`Total posts in DB: ${total}\n`);

    if (docs.length) {
      console.log("Existing posts:");
      docs.forEach((d) => console.log(`  - [${d.status || "?"}] ${d.slug}  (${d.title})`));
      console.log("");
    }

    const present = HARDCODED_SLUGS.filter((s) => dbSlugs.has(s));
    const missing = HARDCODED_SLUGS.filter((s) => !dbSlugs.has(s));

    console.log(`Of the 8 hardcoded posts:`);
    console.log(`  Already in DB: ${present.length} -> ${present.join(", ") || "(none)"}`);
    console.log(`  Missing:       ${missing.length} -> ${missing.join(", ") || "(none)"}`);
  } catch (err) {
    console.error("ERROR:", err.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();
