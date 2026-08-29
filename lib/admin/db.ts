import "server-only";

import { neon } from "@neondatabase/serverless";

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

export function isDatabaseConfigured() {
  return Boolean(getDatabaseUrl());
}

export async function sql<T extends Record<string, unknown> = Record<string, unknown>>(
  query: string,
  params: Array<string | number | null> = [],
): Promise<T[]> {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const client = neon(databaseUrl);

  const rows = await client.query(query, params);

  return rows as T[];
}