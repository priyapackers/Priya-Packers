"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";
import { navItems } from "@/lib/site-data";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e1d8] bg-white/92 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-md bg-[#0b2341] text-base font-bold text-white">
            PP
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-[#111820]">
              Priya Packers
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a6b30]">
              Corrugated Packaging
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#f2eadf] text-[#0b2341]"
                    : "text-[#47505b] hover:bg-[#f7f1e8] hover:text-[#0b2341]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/brochure-priya-packers.pdf" variant="secondary">
            Download Brochure
          </Button>
          <Button href="/contact">Request Quote</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 items-center justify-center rounded-md border border-[#ddd5ca] text-[#0b2341] lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[#e7e1d8] bg-white px-5 py-5 shadow-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-semibold ${
                    active
                      ? "bg-[#f2eadf] text-[#0b2341]"
                      : "text-[#47505b] hover:bg-[#f7f1e8]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Button href="/brochure-priya-packers.pdf" variant="secondary">
                Download Brochure
              </Button>
              <Button href="/contact">Request Quote</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
