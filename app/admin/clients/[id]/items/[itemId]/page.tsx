import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getClient, getClientItem } from "@/lib/admin/clients";
import { EditItemForm } from "@/components/admin/EditItemForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Item",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditItemPage({
  params,
}: {
  params: Promise<{
    id: string;
    itemId: string;
  }>;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id, itemId } = await params;

  const [client, item] = await Promise.all([
    getClient(id),
    getClientItem(itemId),
  ]);

  if (!client || !item || item.clientId !== id) {
    notFound();
  }

  return (
    <AdminShell>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
          Edit Item
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {item.itemName}
        </h1>

        <p className="mt-2 text-sm text-[#58606b]">
          {client.name}
        </p>
      </div>

      <div className="mt-8">
        <EditItemForm
          clientId={client.id}
          item={item}
        />
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