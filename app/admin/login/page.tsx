import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loginAction } from "../actions";
import { isAdminAuthenticated, isAuthConfigured } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) redirect("/admin/stock");
  const params = await searchParams;
  const configured = isAuthConfigured();

  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf8] px-5 py-12">
      <section className="w-full max-w-md rounded-xl border border-[#e6e0d7] bg-white p-7 shadow-[0_18px_60px_rgba(17,24,32,0.08)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">Owner access</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#111820]">Admin Login</h1>
        <p className="mt-3 text-sm leading-7 text-[#58606b]">
          Sign in to manage Priya Packers paper reel stock.
        </p>

        {!configured ? (
          <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Admin access is not configured yet. Add <strong>ADMIN_PASSWORD_HASH</strong> and <strong>SESSION_SECRET</strong> in Vercel environment variables.
          </div>
        ) : null}

        {params.error === "invalid" ? (
          <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Invalid password. Please try again.</p>
        ) : null}
        {params.error === "setup" ? (
          <p className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">Admin credentials are not configured.</p>
        ) : null}

        <form action={loginAction} className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-[#111820]">
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="min-h-12 rounded-md border border-[#ddd5ca] px-4 text-sm outline-none transition focus:border-[#0b2341]"
              placeholder="Enter owner password"
            />
          </label>
          <button type="submit" className="min-h-12 rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12345d]">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
