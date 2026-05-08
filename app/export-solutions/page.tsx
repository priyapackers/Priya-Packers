import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { exportPillars } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Export Solutions",
  description:
    "Export packaging solutions from Priya Packers for global buyers, custom export cartons, sustainable packaging, bulk manufacturing, and logistics support.",
  alternates: { canonical: "/export-solutions" },
};

const checklist = [
  "Buyer-specific carton dimensions",
  "Product protection and stacking requirements",
  "Custom printed markings and handling labels",
  "Bulk manufacturing schedule planning",
  "Pallet, container, and warehouse handling considerations",
  "Paper-based recyclable packaging options",
];

export default function ExportSolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Export solutions"
        title="Export-ready packaging for Europe, USA, and Middle East buyers"
        description="Priya Packers supports international clients with custom corrugated packaging, sustainable paper solutions, bulk manufacturing capability, and logistics-ready packaging planning."
        image="/images/export-crates.svg"
        imageLabel="Global packaging and carton readiness"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="International supply"
            title="Packaging support for global procurement teams"
            description="From carton strength to shipment presentation, every export packaging conversation is shaped around practical logistics and buyer confidence."
            align="center"
          />
          <div className="mt-12">
            <FeatureGrid items={exportPillars} />
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf8] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionHeader
            eyebrow="Export checklist"
            title="Designed around movement, protection, and repeat buying"
            description="Priya Packers can help define packaging details that support smoother overseas procurement and shipment handling."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {checklist.map((item, index) => (
              <ScrollReveal key={item} delay={index * 60}>
                <div className="flex min-h-20 items-center gap-3 rounded-lg border border-[#e6e0d7] bg-white p-5">
                  <CheckCircle2 className="size-5 shrink-0 text-[#9a6b30]" />
                  <p className="text-sm font-semibold leading-6 text-[#303842]">
                    {item}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111820] py-20 text-white sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#c8aa73]">
              Start an export inquiry
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Share shipment details and receive practical packaging guidance.
            </h2>
          </div>
          <Button href="/contact" variant="secondary">
            Contact Export Team
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
