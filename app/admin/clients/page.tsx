import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getClients } from "@/lib/admin/clients";
import { createClientAction } from "../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ClientsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const clients = await getClients();

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
            Clients & items
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Clients
          </h1>

          <p className="mt-2 text-sm text-[#58606b]">
            Store and manage box sizes for each client.
          </p>
        </div>

        <Link
          href="/admin/stock"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#ddd5ca] px-4 py-3 text-sm font-semibold"
        >
          Back to Stock
        </Link>
      </div>

      <section className="mt-8 rounded-lg border border-[#e6e0d7] bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0b2341]">
          Add Company
        </h2>

        <form action={createClientAction} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            name="name"
            required
            placeholder="Company name"
            className="min-h-11 flex-1 rounded-md border border-[#ddd5ca] px-3 text-sm"
          />

          <button
            type="submit"
            className="min-h-11 rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white"
          >
            Add Company
          </button>
        </form>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0b2341]">
            Companies
          </h2>

          <span className="text-sm text-[#58606b]">
            {clients.length} {clients.length === 1 ? "company" : "companies"}
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#e6e0d7] bg-white">
          {clients.length ? (
            <div className="divide-y divide-[#e6e0d7]">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-[#0b2341]">
                      {client.name}
                    </p>

                    <p className="mt-1 text-xs text-[#58606b]">
                      Company
                    </p>
                  </div>

                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#f2eadf] px-4 py-2 text-sm font-semibold text-[#0b2341]"
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-6 text-sm text-[#58606b]">
              No companies added yet.
            </p>
          )}
        </div>
      </section>
    </AdminShell>
  );
}