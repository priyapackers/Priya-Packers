"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession, requireAdmin, verifyPassword } from "@/lib/admin/auth";
import { sql } from "@/lib/admin/db";

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function positiveNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  if (!Number.isFinite(value) || value <= 0) throw new Error(`${key} must be greater than 0.`);
  return value;
}

function nonNegativeNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  if (!Number.isFinite(value) || value < 0) throw new Error(`${key} cannot be negative.`);
  return value;
}

function getStatus(original: number, remaining: number) {
  if (remaining <= 0) return "used";
  if (remaining < original) return "partial";
  return "available";
}

export async function loginAction(formData: FormData) {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const password = text(formData, "password");

  if (!passwordHash || !process.env.SESSION_SECRET) {
    redirect("/admin/login?error=setup");
  }

  if (!verifyPassword(password, passwordHash)) {
    redirect("/admin/login?error=invalid");
  }

  await createAdminSession();
  redirect("/admin/stock");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function createReelAction(formData: FormData) {
  await requireAdmin();
  const date = text(formData, "date");
  const gsm = positiveNumber(formData, "gsm");
  const reelSize = text(formData, "reelSize");
  const weight = positiveNumber(formData, "weight");
  const source = text(formData, "source");

  if (!date || !reelSize || !source) throw new Error("Date, reel size, and source are required.");

  const [row] = await sql<{ reel_id: string }>(
    "SELECT 'PR-' || to_char($1::date, 'YYYYMMDD') || '-' || lpad((COUNT(*) + 1)::text, 4, '0') AS reel_id FROM paper_reels WHERE reel_date = $1::date",
    [date],
  );

  await sql(
    `INSERT INTO paper_reels (reel_id, reel_date, gsm, reel_size, original_weight_kg, remaining_weight_kg, source, status)
     VALUES ($1, $2, $3, $4, $5, $5, $6, 'available')`,
    [row.reel_id, date, gsm, reelSize, weight, source],
  );

  revalidatePath("/admin/stock");
  redirect("/admin/stock");
}

export async function updateReelAction(id: string, formData: FormData) {
  await requireAdmin();
  const date = text(formData, "date");
  const gsm = positiveNumber(formData, "gsm");
  const reelSize = text(formData, "reelSize");
  const originalWeight = positiveNumber(formData, "originalWeight");
  const remainingWeight = nonNegativeNumber(formData, "remainingWeight");
  const source = text(formData, "source");

  if (remainingWeight > originalWeight) throw new Error("Remaining weight cannot exceed original weight.");

  await sql(
    `UPDATE paper_reels
     SET reel_date = $1, gsm = $2, reel_size = $3, original_weight_kg = $4,
         remaining_weight_kg = $5, source = $6, status = $7, updated_at = now()
     WHERE id = $8`,
    [date, gsm, reelSize, originalWeight, remainingWeight, source, getStatus(originalWeight, remainingWeight), id],
  );

  revalidatePath("/admin/stock");
  revalidatePath(`/admin/stock/${id}`);
}

export async function markUsedAction(id: string, formData: FormData) {
  await requireAdmin();
  const companyName = text(formData, "companyName");
  const usageDate = text(formData, "usageDate");
  const usageType = text(formData, "usageType");
  const notes = text(formData, "notes") || null;
  const usedWeightInput = Number(formData.get("usedWeight"));

  if (!companyName || !usageDate || !["partial", "full"].includes(usageType)) {
    throw new Error("Company, usage date, and usage type are required.");
  }

  const [reel] = await sql<{ original_weight_kg: string; remaining_weight_kg: string }>(
    "SELECT original_weight_kg, remaining_weight_kg FROM paper_reels WHERE id = $1",
    [id],
  );

  if (!reel) throw new Error("Reel not found.");
  const currentRemaining = Number(reel.remaining_weight_kg);
  const usedWeight = usageType === "full" ? currentRemaining : usedWeightInput;

  if (!Number.isFinite(usedWeight) || usedWeight <= 0 || usedWeight > currentRemaining) {
    throw new Error("Used weight must be greater than 0 and less than or equal to remaining weight.");
  }

  const nextRemaining = Number((currentRemaining - usedWeight).toFixed(2));
  const status = getStatus(Number(reel.original_weight_kg), nextRemaining);

  await sql(
    `INSERT INTO reel_usage_events (paper_reel_id, company_name, usage_date, used_weight_kg, usage_type, notes)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, companyName, usageDate, usedWeight, usageType, notes],
  );

  await sql(
    `UPDATE paper_reels
     SET remaining_weight_kg = $1, status = $2, last_company_name = $3, updated_at = now()
     WHERE id = $4`,
    [nextRemaining, status, companyName, id],
  );

  revalidatePath("/admin/stock");
  revalidatePath(`/admin/stock/${id}`);
}
