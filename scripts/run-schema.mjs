import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const sql = neon(databaseUrl);
const schema = readFileSync("db/schema.sql", "utf8");

const statements = schema
  .split(";")
  .map((statement) => statement.trim())
  .filter(Boolean);

try {
  for (const statement of statements) {
    await sql.query(statement);
  }

  console.log("Database schema applied.");
} catch (error) {
  console.error("Failed to apply database schema:");
  console.error(error);
  process.exit(1);
}