import "server-only";

interface NeonRow {
  [key: string]: unknown;
}

interface NeonResponse {
  rows?: NeonRow[];
}

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

export function isDatabaseConfigured() {
  return Boolean(getDatabaseUrl());
}

function getSqlEndpoint(databaseUrl: string) {
  const url = new URL(databaseUrl);
  url.protocol = "https:";
  url.username = "";
  url.password = "";
  url.pathname = "/sql";
  url.search = "";
  url.hash = "";
  return url.toString();
}

function getAuthHeader(databaseUrl: string) {
  const url = new URL(databaseUrl);
  const username = decodeURIComponent(url.username);
  const password = decodeURIComponent(url.password);
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

export async function sql<T extends NeonRow = NeonRow>(
  query: string,
  params: Array<string | number | null> = [],
): Promise<T[]> {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const response = await fetch(getSqlEndpoint(databaseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(databaseUrl),
      "Neon-Connection-String": databaseUrl,
    },
    body: JSON.stringify({ query, params }),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Database query failed: ${message}`);
  }

  const payload = (await response.json()) as NeonResponse;
  return (payload.rows || []) as T[];
}
