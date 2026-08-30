import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getClient } from "@/lib/admin/clients";
import { AddItemForm } from "@/components/admin/AddItemForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Add Item",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AddItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const client = await getClient(id);

  if (!client) {
    redirect("/admin/clients");
  }

  return (
    <AdminShell>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
          Add Item
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {client.name}
        </h1>

        <p className="mt-2 text-sm text-[#58606b]">
          Add a box specification for this company.
        </p>
      </div>

      <div className="mt-8">
        <AddItemForm clientId={client.id} />
      </div>

      <Link
        href={`/admin/clients/${client.id}`}
        className="mt-6 inline-flex text-sm font-semibold text-[#0b2341] underline"
      >
        ← Back to {client.name}
      </Link>
    </AdminShell>
  );
}