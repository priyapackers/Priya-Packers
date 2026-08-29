import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { markUsedAction, updateReelAction } from "../../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { WeightBar } from "@/components/admin/WeightBar";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { getReel, getUsageEvents } from "@/lib/admin/reels";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Reel Details", robots: { index: false, follow: false } };

export default async function ReelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  if (!isDatabaseConfigured()) return <AdminShell><SetupNotice /></AdminShell>;
  const { id } = await params;
  const [reel, events] = await Promise.all([getReel(id), getUsageEvents(id)]);
  if (!reel) notFound();

  const update = updateReelAction.bind(null, reel.id);
  const markUsed = markUsedAction.bind(null, reel.id);
  const remainingPercent = reel.originalWeightKg > 0 ? Math.round((reel.remainingWeightKg / reel.originalWeightKg) * 100) : 0;

  return (
    <AdminShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">Reel / Stock ID</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{reel.reelId}</h1>
        </div>
        <span className="w-fit rounded-full bg-[#f2eadf] px-4 py-2 text-sm font-bold text-[#0b2341]">{reel.status === "partial" ? "Partially Used" : reel.status === "used" ? "Used" : "Available"}</span>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <form action={update} className="grid gap-5 rounded-lg border border-[#e6e0d7] bg-white p-6">
          <h2 className="text-xl font-semibold">Update Reel Information</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">Date<input required name="date" type="date" defaultValue={reel.date} className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold">GSM<input required name="gsm" type="number" min="1" defaultValue={reel.gsm} className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold">Reel Size<input required name="reelSize" defaultValue={reel.reelSize} className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold">Source<input required name="source" defaultValue={reel.source} className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold">Original Weight<input required name="originalWeight" type="number" min="0.01" step="0.01" defaultValue={reel.originalWeightKg} className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold">Remaining Weight<input required name="remainingWeight" type="number" min="0" step="0.01" defaultValue={reel.remainingWeightKg} className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
          </div>
          <button type="submit" className="min-h-12 rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white">Update Reel</button>
        </form>

        <aside className="grid gap-6">
          <div className="rounded-lg border border-[#e6e0d7] bg-white p-6">
            <h2 className="text-xl font-semibold">Partial Usage</h2>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-[#58606b]">Original</dt><dd className="font-bold">{reel.originalWeightKg.toFixed(2)} KG</dd></div>
              <div><dt className="text-[#58606b]">Remaining</dt><dd className="font-bold">{reel.remainingWeightKg.toFixed(2)} KG</dd></div>
              <div><dt className="text-[#58606b]">Used</dt><dd className="font-bold">{(reel.originalWeightKg - reel.remainingWeightKg).toFixed(2)} KG</dd></div>
              <div><dt className="text-[#58606b]">Remaining %</dt><dd className="font-bold">{remainingPercent}%</dd></div>
            </dl>
            <div className="mt-5"><WeightBar original={reel.originalWeightKg} remaining={reel.remainingWeightKg} /></div>
          </div>

          <form action={markUsed} className="grid gap-5 rounded-lg border border-[#e6e0d7] bg-white p-6">
            <h2 className="text-xl font-semibold">Mark Reel as Used</h2>
            <label className="grid gap-2 text-sm font-semibold">Used / Company Name<input required name="companyName" className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold">Usage Date<input required name="usageDate" type="date" className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold">Usage Type<select required name="usageType" className="min-h-12 rounded-md border border-[#ddd5ca] px-4"><option value="partial">Partially Used</option><option value="full">Fully Used</option></select></label>
            <label className="grid gap-2 text-sm font-semibold">Used Weight for Partial Usage<input name="usedWeight" type="number" min="0.01" max={reel.remainingWeightKg} step="0.01" placeholder="Required for partial usage" className="min-h-12 rounded-md border border-[#ddd5ca] px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold">Notes<textarea name="notes" rows={3} className="rounded-md border border-[#ddd5ca] px-4 py-3" /></label>
            <button type="submit" disabled={reel.remainingWeightKg <= 0} className="min-h-12 rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#aeb5bf]">Save Usage</button>
          </form>
        </aside>
      </section>

      <section className="mt-8 rounded-lg border border-[#e6e0d7] bg-white p-6">
        <h2 className="text-xl font-semibold">Usage History</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-[720px] w-full text-left text-sm">
            <thead className="bg-[#f2eadf] text-xs uppercase tracking-[0.12em]"><tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Company</th><th className="px-4 py-3">Used KG</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Notes</th></tr></thead>
            <tbody className="divide-y divide-[#e6e0d7]">{events.map((event) => <tr key={event.id}><td className="px-4 py-3">{event.usageDate}</td><td className="px-4 py-3">{event.companyName}</td><td className="px-4 py-3">{event.usedWeightKg.toFixed(2)}</td><td className="px-4 py-3">{event.usageType === "full" ? "Fully Used" : "Partially Used"}</td><td className="px-4 py-3">{event.notes || "—"}</td></tr>)}</tbody>
          </table>
          {!events.length ? <p className="py-5 text-sm text-[#58606b]">No usage recorded yet.</p> : null}
        </div>
      </section>
    </AdminShell>
  );
}
