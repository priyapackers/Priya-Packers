import { readFileSync } from "node:fs";

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const url = new URL(databaseUrl);
url.protocol = "https:";
url.pathname = "/sql";
url.search = "";
url.hash = "";

const schema = readFileSync("db/schema.sql", "utf8");
const auth = Buffer.from(`${decodeURIComponent(new URL(databaseUrl).username)}:${decodeURIComponent(new URL(databaseUrl).password)}`).toString("base64");

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
    "Neon-Connection-String": databaseUrl,
  },
  body: JSON.stringify({ query: schema, params: [] }),
});

if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}

console.log("Database schema applied.");
