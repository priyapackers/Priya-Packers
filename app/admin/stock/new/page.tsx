import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createReelAction } from "../../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { isDatabaseConfigured } from "@/lib/admin/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Add Reel", robots: { index: false, follow: false } };

export default async function NewReelPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  if (!isDatabaseConfigured()) return <AdminShell><SetupNotice /></AdminShell>;
  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold tracking-tight">Add Paper Reel</h1>
      <form action={createReelAction} className="mt-8 grid max-w-2xl gap-5 rounded-lg border border-[#e6e0d7] bg-white p-6">
        <label className="grid gap-2 text-sm font-semibold">Date<input required name="date" type="date" className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
        <label className="grid gap-2 text-sm font-semibold">GSM<input required name="gsm" type="number" min="1" className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
        <label className="grid gap-2 text-sm font-semibold">Reel Size<input required name="reelSize" placeholder="Example: 40 inch" className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
        <label className="grid gap-2 text-sm font-semibold">Weight of Reel (KG)<input required name="weight" type="number" min="0.01" step="0.01" className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
        <label className="grid gap-2 text-sm font-semibold">Source<input required name="source" placeholder="Supplier or source" className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
        <button type="submit" className="min-h-12 rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white">Save Reel</button>
      </form>
    </AdminShell>
  );
}
