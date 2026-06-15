// Read-only check: testimonials in the DB vs the 6 hardcoded ones (by name+company).
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

function loadUri() {
  const raw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*MONGODB_URI\s*=\s*(.+)\s*$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("MONGODB_URI not found in .env.local");
}

const HARDCODED = [
  ["Sarah Mitchell", "Deloitte"],
  ["James Okonkwo", "Wunderman Thompson"],
  ["Priya Anand", "Freshfields Bruckhaus Deringer"],
  ["Daniel Reeves", "Vanguard"],
  ["Dr. Leila Hartmann", "Northeastern University"],
  ["Marcus Chen", "KKR & Co."],
];

async function main() {
  const uri = loadUri();
  const dbName = (uri.match(/\/([^/?]+)\?/) || [])[1] || "ai-service";
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    const col = client.db(dbName).collection("testimonials");
    const total = await col.countDocuments();
    const docs = await col.find({}, { projection: { name: 1, company: 1, visible: 1 } }).toArray();

    console.log(`\nDatabase: ${dbName} · collection: testimonials`);
    console.log(`Total testimonials in DB: ${total}\n`);
    if (docs.length) {
      console.log("Existing:");
      docs.forEach((d) => console.log(`  - [${d.visible ? "visible" : "hidden"}] ${d.name} — ${d.company}`));
      console.log("");
    }

    const key = (n, c) => `${n}|||${c}`;
    const existing = new Set(docs.map((d) => key(d.name, d.company)));
    const present = HARDCODED.filter(([n, c]) => existing.has(key(n, c)));
    const missing = HARDCODED.filter(([n, c]) => !existing.has(key(n, c)));

    console.log(`Of the 6 hardcoded testimonials:`);
    console.log(`  Already in DB: ${present.length} -> ${present.map((p) => p[0]).join(", ") || "(none)"}`);
    console.log(`  Missing:       ${missing.length} -> ${missing.map((p) => p[0]).join(", ") || "(none)"}`);
  } catch (err) {
    console.error("ERROR:", err.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();
