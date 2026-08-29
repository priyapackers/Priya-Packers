import "server-only";
import { sql } from "./db";
import type { PaperReel, ReelUsageEvent, StockFilters } from "./types";

function mapReel(row: Record<string, unknown>): PaperReel {
  return {
    id: String(row.id),
    reelId: String(row.reel_id),
    date: String(row.reel_date),
    gsm: Number(row.gsm),
    reelSize: String(row.reel_size),
    originalWeightKg: Number(row.original_weight_kg),
    remainingWeightKg: Number(row.remaining_weight_kg),
    source: String(row.source),
    status: row.status as PaperReel["status"],
    lastCompanyName: row.last_company_name ? String(row.last_company_name) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapUsage(row: Record<string, unknown>): ReelUsageEvent {
  return {
    id: String(row.id),
    paperReelId: String(row.paper_reel_id),
    companyName: String(row.company_name),
    usageDate: String(row.usage_date),
    usedWeightKg: Number(row.used_weight_kg),
    usageType: row.usage_type as ReelUsageEvent["usageType"],
    notes: row.notes ? String(row.notes) : null,
    createdAt: String(row.created_at),
  };
}

export async function getDashboardStats() {
  const [row] = await sql(`
    SELECT
      COUNT(*)::int AS total_reels,
      COUNT(*) FILTER (WHERE status = 'available')::int AS available_reels,
      COUNT(*) FILTER (WHERE status = 'partial')::int AS partial_reels,
      COUNT(*) FILTER (WHERE status = 'used')::int AS used_reels,
      COALESCE(SUM(remaining_weight_kg), 0)::float AS total_available_weight
    FROM paper_reels
  `);

  return {
    totalReels: Number(row?.total_reels || 0),
    availableReels: Number(row?.available_reels || 0),
    partialReels: Number(row?.partial_reels || 0),
    usedReels: Number(row?.used_reels || 0),
    totalAvailableWeight: Number(row?.total_available_weight || 0),
  };
}

export async function getReels(filters: StockFilters = {}) {
  const clauses: string[] = [];
  const params: Array<string | number> = [];
  const add = (clause: string, value: string | number) => {
    params.push(value);
    clauses.push(clause.replace("?", `$${params.length}`));
  };

  if (filters.dateFrom) add("reel_date >= ?", filters.dateFrom);
  if (filters.dateTo) add("reel_date <= ?", filters.dateTo);
  if (filters.gsm) add("gsm = ?", Number(filters.gsm));
  if (filters.reelSize) add("reel_size ILIKE ?", `%${filters.reelSize}%`);
  if (filters.source) add("source ILIKE ?", `%${filters.source}%`);
  if (filters.status) add("status = ?", filters.status);
  if (filters.company) add("last_company_name ILIKE ?", `%${filters.company}%`);

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = await sql(`
    SELECT * FROM paper_reels
    ${where}
    ORDER BY reel_date DESC, created_at DESC
  `, params);

  return rows.map(mapReel);
}

export async function getReel(id: string) {
  const [row] = await sql("SELECT * FROM paper_reels WHERE id = $1", [id]);
  return row ? mapReel(row) : null;
}

export async function getUsageEvents(reelId: string) {
  const rows = await sql(
    "SELECT * FROM reel_usage_events WHERE paper_reel_id = $1 ORDER BY usage_date DESC, created_at DESC",
    [reelId],
  );
  return rows.map(mapUsage);
}
