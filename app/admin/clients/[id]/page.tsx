import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getClient, getClientItems } from "@/lib/admin/clients";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Items",
  robots: {
    index: false,
    follow: false,
  },
};

function getReelSize(breadth: number, height: number) {
  return breadth + height + 1;
}

function getCuttingSize(
  length: number,
  breadth: number,
  bandhan: 1 | 2,
) {
  if (bandhan === 1) {
    return (length + breadth) * 2 + 2;
  }

  return length + breadth + 2;
}

function formatNumber(value: number) {
  return Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(/\.?0+$/, "");
}

export default async function ClientPage({
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
    notFound();
  }

  const items = await getClientItems(id);

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
            Client
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {client.name}
          </h1>

          <p className="mt-2 text-sm text-[#58606b]">
            Box sizes and specifications
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/clients"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#ddd5ca] px-4 py-3 text-sm font-semibold"
          >
            Back to Clients
          </Link>

          <Link
            href={`/admin/clients/${id}/new`}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white"
          >
            Add Item
          </Link>
        </div>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0b2341]">
            Items
          </h2>

          <span className="text-sm text-[#58606b]">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#e6e0d7] bg-white">
          {items.length ? (
            <table className="min-w-[1200px] w-full text-left text-sm">
              <thead className="bg-[#f2eadf] text-xs uppercase tracking-[0.1em] text-[#303842]">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Reel Size</th>
                  <th className="px-4 py-3">Cutting Size</th>
                  <th className="px-4 py-3">Bandhan</th>
                  <th className="px-4 py-3">Ply</th>
                  <th className="px-4 py-3">Flap</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#e6e0d7]">
                {items.map((item) => {
                  const reelSize = getReelSize(
                    item.breadth,
                    item.height,
                  );

                  const cuttingSize = getCuttingSize(
                    item.length,
                    item.breadth,
                    item.bandhan,
                  );

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#fbfaf8]"
                    >
                      <td className="px-4 py-4 font-semibold text-[#0b2341]">
                        {item.itemName}
                      </td>

                      <td className="px-4 py-4">
                        {formatNumber(item.length)} ×{" "}
                        {formatNumber(item.breadth)} ×{" "}
                        {formatNumber(item.height)}
                      </td>

                      <td className="px-4 py-4 font-medium">
                        {formatNumber(reelSize)}
                      </td>

                      <td className="px-4 py-4 font-medium">
                        {formatNumber(cuttingSize)}
                      </td>

                      <td className="px-4 py-4">
                        {item.bandhan}
                      </td>

                      <td className="px-4 py-4">
                        {item.ply}
                      </td>

                      <td className="px-4 py-4 capitalize">
                        {item.flapKind}
                      </td>

                      <td className="px-4 py-4">
                        ₹{item.price.toFixed(2)}
                      </td>

                      <td className="px-4 py-4">
                        <Link
                          href={`/admin/clients/${id}/items/${item.id}`}
                          className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#f2eadf] px-3 py-2 text-sm font-semibold text-[#0b2341]"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-[#58606b]">
                No items have been added for this company yet.
              </p>

              <Link
                href={`/admin/clients/${id}/new`}
                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-[#0b2341] px-4 py-2 text-sm font-semibold text-white"
              >
                Add First Item
              </Link>
            </div>
          )}
        </div>
      </section>
    </AdminShell>
  );
}