import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Priya Packers for corrugated boxes, custom cartons, printed boxes, industrial packaging, and export packaging inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a quote for corrugated packaging"
        description="Send product dimensions, quantity, printing needs, destination, and timeline. Priya Packers will review your packaging requirement and respond by email."
        image="/images/contact-map.svg"
        imageLabel="Inquiry, email, phone, and location placeholders"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Inquiry form"
              title="Tell us what you need to pack"
              description="This form is prepared as a front-end placeholder and can be connected to email, CRM, or a server action."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="grid gap-5 self-start">
            <ScrollReveal>
              <div className="rounded-lg border border-[#e6e0d7] bg-[#fbfaf8] p-6">
                <h2 className="text-xl font-semibold text-[#111820]">
                  Contact information
                </h2>
                <div className="mt-6 grid gap-5 text-sm text-[#58606b]">
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-start gap-3 font-semibold text-[#0b2341]"
                  >
                    <Mail className="mt-0.5 size-5 text-[#9a6b30]" />
                    {company.email}
                  </a>
                  <p className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 text-[#9a6b30]" />
                    {company.phone}
                  </p>
                  <p className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 text-[#9a6b30]" />
                    {company.address}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="min-h-[320px] rounded-lg border border-[#e6e0d7] bg-[#f2eadf] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a6b30]">
                  Google Maps placeholder
                </p>
                <div className="mt-6 grid min-h-[220px] place-items-center rounded-md border border-dashed border-[#b9975e] bg-white/60 p-6 text-center">
                  <p className="max-w-xs text-sm font-semibold leading-7 text-[#303842]">
                    Embed the verified Priya Packers Google Maps location here
                    once the public business listing is available.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </>
  );
}
