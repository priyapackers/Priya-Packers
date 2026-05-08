import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { company, navItems, products } from "@/lib/site-data";
import { Button } from "./Button";

export function Footer() {
  return (
    <footer className="bg-[#111820] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-md bg-[#c8aa73] text-base font-bold text-[#111820]">
              PP
            </span>
            <span>
              <span className="block text-xl font-bold">{company.name}</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#c8aa73]">
                Packaging for global buyers
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#c9ced6]">
            Indian manufacturer of corrugated boxes and paper-based packaging
            solutions for industrial, custom, printed, and export-ready use.
          </p>
          <div className="mt-7">
            <Button href="/contact" variant="secondary">
              Request Quote
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#c8aa73]">
            Company
          </h2>
          <div className="mt-5 grid gap-3">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#d7dbe1] transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#c8aa73]">
            Products
          </h2>
          <div className="mt-5 grid gap-3">
            {products.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#d7dbe1] transition hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#c8aa73]">
            Contact
          </h2>
          <div className="mt-5 grid gap-4 text-sm text-[#d7dbe1]">
            <a
              href={`mailto:${company.email}`}
              className="flex items-start gap-3 hover:text-white"
            >
              <Mail className="mt-0.5 size-4 text-[#c8aa73]" />
              {company.email}
            </a>
            <p className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-[#c8aa73]" />
              {company.phone}
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-[#c8aa73]" />
              {company.address}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-[#aeb5bf] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Priya Packers. All rights reserved.</p>
          <p>Built for professional packaging buyers and export clients.</p>
        </div>
      </div>
    </footer>
  );
}
