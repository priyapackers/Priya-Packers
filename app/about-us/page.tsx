import type { Metadata } from "next";
import { ArrowRight, Factory, Globe2, Leaf, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Priya Packers, an Indian manufacturer of corrugated boxes and paper-based packaging solutions for industrial and export clients.",
  alternates: { canonical: "/about-us" },
};

const values = [
  {
    title: "Manufacturing discipline",
    description:
      "Focused production practices for carton quality, order consistency, and dependable business supply.",
    icon: Factory,
  },
  {
    title: "Export mindset",
    description:
      "Packaging guidance shaped around long-distance logistics, shipment presentation, and buyer confidence.",
    icon: Globe2,
  },
  {
    title: "Paper-first responsibility",
    description:
      "A practical commitment to recyclable paper packaging and efficient use of corrugated materials.",
    icon: Leaf,
  },
  {
    title: "Quality ownership",
    description:
      "Checks for size, material, print, finishing, and dispatch readiness before packaging leaves the plant.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Priya Packers"
        title="A reliable Indian packaging manufacturer for modern supply chains"
        description="Priya Packers manufactures corrugated boxes, custom cartons, industrial packaging, printed packaging, and eco-friendly paper packaging for businesses that need dependable quality and professional service."
        image="/images/plant-floor.svg"
        imageLabel="Corrugated packaging manufacturing"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionHeader
            eyebrow="Company overview"
            title="Packaging built for credibility, performance, and export readiness"
            description="The company serves industrial clients, product brands, e-commerce operators, and exporters who need carton packaging that performs well through production, warehousing, transport, and delivery."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={index * 70}>
                  <article className="h-full rounded-lg border border-[#e6e0d7] bg-[#fbfaf8] p-6">
                    <div className="mb-5 inline-flex size-12 items-center justify-center rounded-md bg-[#f2eadf] text-[#9a6b30]">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#111820]">
                      {value.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#58606b]">
                      {value.description}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf8] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <ScrollReveal className="rounded-lg border border-[#e6e0d7] bg-white p-8 shadow-[0_18px_60px_rgba(17,24,32,0.06)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
              Our approach
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111820]">
              Practical packaging advice, engineered carton choices, and clear
              business communication.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#58606b]">
              Priya Packers helps buyers select the right material, flute,
              dimensions, printing approach, and packing layout based on product
              weight, handling conditions, storage requirements, and destination
              market expectations.
            </p>
            <div className="mt-8">
              <Button href="/contact">
                Start a Packaging Inquiry
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
