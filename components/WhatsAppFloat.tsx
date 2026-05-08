import { MessageCircle } from "lucide-react";
import { company } from "@/lib/site-data";

export function WhatsAppFloat() {
  return (
    <a
      href={company.whatsapp}
      aria-label="Open WhatsApp inquiry"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#1f8f5f] text-white shadow-[0_18px_40px_rgba(31,143,95,0.3)] transition hover:-translate-y-1 hover:bg-[#187a50]"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
