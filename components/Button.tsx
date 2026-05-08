import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
}

const variants = {
  primary:
    "bg-[#0b2341] text-white shadow-sm hover:bg-[#12345d] focus-visible:outline-[#0b2341]",
  secondary:
    "border border-[#c8aa73] bg-white text-[#0b2341] hover:bg-[#f7f1e8] focus-visible:outline-[#c8aa73]",
  dark: "bg-[#20252b] text-white hover:bg-[#111820] focus-visible:outline-[#20252b]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const isDownload = href.endsWith(".pdf");

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
      {...(isDownload ? { download: true } : {})}
    >
      {children}
    </Link>
  );
}
