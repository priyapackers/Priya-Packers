import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <AdminShell>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
          Priya Packers
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#58606b]">
          Manage paper reel stock and client box specifications from one place.
        </p>
      </div>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <Link
          href="/admin/stock"
          className="group rounded-lg border border-[#e6e0d7] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#c8aa73]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a6b30]">
            Inventory
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-[#0b2341]">
            Paper Reel Stock
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#58606b]">
            View available reels, check remaining weight, add new stock,
            update reels, and record reel usage.
          </p>

          <span className="mt-6 inline-block text-sm font-semibold text-[#0b2341]">
            Open Stock →
          </span>
        </Link>

        <Link
          href="/admin/clients"
          className="group rounded-lg border border-[#e6e0d7] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#c8aa73]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a6b30]">
            Customer Records
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-[#0b2341]">
            Clients & Box Sizes
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#58606b]">
            Manage companies and store their item names, box dimensions,
            bandhan, ply, flap kind, and pricing.
          </p>

          <span className="mt-6 inline-block text-sm font-semibold text-[#0b2341]">
            Open Clients →
          </span>
        </Link>
      </section>
    </AdminShell>
  );
}