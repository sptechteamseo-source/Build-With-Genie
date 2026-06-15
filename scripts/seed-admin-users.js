const { MongoClient } = require("mongodb");
const { scryptSync, randomBytes } = require("crypto");

const uri = "mongodb://sptechteamseo_db_user:IeIEFUO7vs1o3So7@ac-ffh4nji-shard-00-00.a1kfcpz.mongodb.net:27017,ac-ffh4nji-shard-00-01.a1kfcpz.mongodb.net:27017,ac-ffh4nji-shard-00-02.a1kfcpz.mongodb.net:27017/ai-service?replicaSet=atlas-fktiuk-shard-0&authSource=admin&ssl=true&retryWrites=true&w=majority";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = scryptSync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

const users = [
  {
    name: "Admin",
    email: "admin@sptechusa.com",
    password: "Admin@1234",
    role: "admin",
    active: true,
  },
  {
    name: "Editor",
    email: "editor@sptechusa.com",
    password: "Editor@1234",
    role: "editor",
    active: true,
  },
  {
    name: "Author",
    email: "author@sptechusa.com",
    password: "Author@1234",
    role: "editor",
    active: true,
  },
];

async function seed() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    const db = client.db("ai-service");
    const col = db.collection("users");

    for (const user of users) {
      const existing = await col.findOne({ email: user.email });
      if (existing) {
        // Update password hash in case it changed
        await col.updateOne(
          { email: user.email },
          { $set: { passwordHash: hashPassword(user.password), role: user.role, active: true } }
        );
        console.log(`✅ Updated: ${user.email} (${user.role})`);
      } else {
        await col.insertOne({
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
          passwordHash: hashPassword(user.password),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`✅ Created: ${user.email} (${user.role})`);
      }
    }

    console.log("\n--- Credentials ---");
    users.forEach(u => console.log(`${u.role.toUpperCase().padEnd(8)} ${u.email} / ${u.password}`));
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.close();
  }
}

seed();
