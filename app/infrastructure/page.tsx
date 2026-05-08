import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { VisualPanel } from "@/components/VisualPanel";
import { capabilities, infrastructureItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Priya Packers infrastructure includes manufacturing plant, machinery, warehouse, quality control, and production capabilities for corrugated packaging.",
  alternates: { canonical: "/infrastructure" },
};

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title="Manufacturing infrastructure for consistent packaging supply"
        description="A production setup focused on corrugated packaging conversion, industrial carton manufacturing, warehousing, quality checks, and reliable dispatch."
        image="/images/warehouse.svg"
        imageLabel="Plant, warehouse, and dispatch readiness"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Facility overview"
            title="Production areas designed around business packaging needs"
            description="Placeholder infrastructure visuals can be replaced with real plant photography as the brand assets become available."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {infrastructureItems.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <article className="overflow-hidden rounded-lg border border-[#e6e0d7] bg-[#fbfaf8]">
                  <VisualPanel
                    src={item.image}
                    alt={item.title}
                    className="rounded-none border-0"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-[#111820]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#58606b]">
                      {item.description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Production capabilities"
            title="From carton planning to warehouse-ready dispatch"
            align="center"
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, index) => (
              <ScrollReveal key={capability} delay={index * 60}>
                <div className="flex min-h-20 items-center gap-3 rounded-lg border border-[#e6e0d7] bg-white p-5">
                  <CheckCircle2 className="size-5 shrink-0 text-[#9a6b30]" />
                  <p className="text-sm font-semibold leading-6 text-[#303842]">
                    {capability}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
