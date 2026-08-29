import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "@/app/admin/actions";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#111820]">
      <header className="border-b border-[#e6e0d7] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link href="/admin/stock" className="font-bold text-[#0b2341]">Priya Packers Stock Admin</Link>
          <nav className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/admin/stock" className="rounded-md border border-[#ddd5ca] px-4 py-2">Stock</Link>
            <Link href="/admin/stock/new" className="rounded-md bg-[#0b2341] px-4 py-2 text-white">Add Reel</Link>
            <form action={logoutAction}>
              <button className="rounded-md border border-[#ddd5ca] px-4 py-2" type="submit">Logout</button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">{children}</div>
    </main>
  );
}
