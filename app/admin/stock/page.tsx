import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { isDatabaseConfigured } from "@/lib/admin/db";
import { getDashboardStats, getReels } from "@/lib/admin/reels";
import type { StockFilters } from "@/lib/admin/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Stock Dashboard", robots: { index: false, follow: false } };

const statusLabels = { available: "Available", partial: "Partially Used", used: "Used" } as const;

export default async function StockPage({ searchParams }: { searchParams: Promise<StockFilters> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const filters = await searchParams;

  if (!isDatabaseConfigured()) {
    return <AdminShell><SetupNotice /></AdminShell>;
  }

  const [stats, reels] = await Promise.all([getDashboardStats(), getReels(filters)]);

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">Paper reel stock</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Stock Dashboard</h1>
        </div>
        <Link href="/admin/stock/new" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white">Add Stock</Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Total Reels", stats.totalReels],
          ["Available", stats.availableReels],
          ["Partially Used", stats.partialReels],
          ["Fully Used", stats.usedReels],
          ["Available KG", stats.totalAvailableWeight.toFixed(2)],
        ].map(([label, value]) => (
          <article key={label} className="rounded-lg border border-[#e6e0d7] bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a6b30]">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-[#0b2341]">{value}</p>
          </article>
        ))}
      </section>

      <form className="mt-8 grid gap-3 rounded-lg border border-[#e6e0d7] bg-white p-5 md:grid-cols-3 lg:grid-cols-6">
        <input name="dateFrom" type="date" defaultValue={filters.dateFrom || ""} className="min-h-11 rounded-md border border-[#ddd5ca] px-3 text-sm" aria-label="Date from" />
        <input name="dateTo" type="date" defaultValue={filters.dateTo || ""} className="min-h-11 rounded-md border border-[#ddd5ca] px-3 text-sm" aria-label="Date to" />
        <input name="gsm" inputMode="numeric" defaultValue={filters.gsm || ""} placeholder="GSM" className="min-h-11 rounded-md border border-[#ddd5ca] px-3 text-sm" />
        <input name="reelSize" defaultValue={filters.reelSize || ""} placeholder="Reel Size" className="min-h-11 rounded-md border border-[#ddd5ca] px-3 text-sm" />
        <input name="source" defaultValue={filters.source || ""} placeholder="Source" className="min-h-11 rounded-md border border-[#ddd5ca] px-3 text-sm" />
        <select name="status" defaultValue={filters.status || ""} className="min-h-11 rounded-md border border-[#ddd5ca] px-3 text-sm">
          <option value="">Any Status</option>
          <option value="available">Available</option>
          <option value="partial">Partially Used</option>
          <option value="used">Used</option>
        </select>
        <input name="company" defaultValue={filters.company || ""} placeholder="Company" className="min-h-11 rounded-md border border-[#ddd5ca] px-3 text-sm lg:col-span-2" />
        <button className="min-h-11 rounded-md bg-[#0b2341] px-4 text-sm font-semibold text-white" type="submit">Apply Filters</button>
        <Link href="/admin/stock" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#ddd5ca] px-4 text-sm font-semibold">Clear</Link>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg border border-[#e6e0d7] bg-white">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-[#f2eadf] text-xs uppercase tracking-[0.12em] text-[#303842]">
            <tr>
              {["Reel ID", "Date", "GSM", "Reel Size", "Original KG", "Remaining KG", "Source", "Status", "Company", "Action"].map((h) => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6e0d7]">
            {reels.map((reel) => (
              <tr key={reel.id} className="hover:bg-[#fbfaf8]">
                <td className="px-4 py-4 font-bold text-[#0b2341]"><Link href={`/admin/stock/${reel.id}`}>{reel.reelId}</Link></td>
                <td className="px-4 py-4">{reel.date}</td><td className="px-4 py-4">{reel.gsm}</td><td className="px-4 py-4">{reel.reelSize}</td>
                <td className="px-4 py-4">{reel.originalWeightKg.toFixed(2)}</td><td className="px-4 py-4">{reel.remainingWeightKg.toFixed(2)}</td>
                <td className="px-4 py-4">{reel.source}</td>
                <td className="px-4 py-4">{statusLabels[reel.status]}</td>
                <td className="px-4 py-4">{reel.lastCompanyName || "—"}</td>
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/stock/${reel.id}`}
                    className="inline-flex rounded-md border border-[#0b2341] px-3 py-2 text-xs font-semibold text-[#0b2341] hover:bg-[#0b2341] hover:text-white"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!reels.length ? <p className="p-6 text-sm text-[#58606b]">No reels found for the selected filters.</p> : null}
      </div>
    </AdminShell>
  );
}
