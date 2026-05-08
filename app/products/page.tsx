import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { products } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore corrugated boxes, printed boxes, duplex boxes, e-commerce packaging, industrial packaging, and custom packaging from Priya Packers.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Corrugated and paper packaging categories"
        description="Choose from export cartons, custom corrugated boxes, printed boxes, duplex packaging, e-commerce mailers, and industrial packaging for demanding supply chains."
        image="/images/machinery.svg"
        imageLabel="Custom carton manufacturing"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Packaging portfolio"
            title="Purpose-built packaging for product protection and presentation"
            description="Each product category can be adapted for dimensions, board strength, printing, closures, partitions, and shipment conditions."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => {
              const Icon = product.icon;
              const id = product.href.split("#")[1];
              return (
                <ScrollReveal key={product.title} delay={index * 70}>
                  <article
                    id={id}
                    className="scroll-mt-28 rounded-lg border border-[#e6e0d7] bg-[#fbfaf8] p-7"
                  >
                    <div className="mb-7 inline-flex size-12 items-center justify-center rounded-md bg-[#0b2341] text-white">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[#111820]">
                      {product.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[#58606b]">
                      {product.description}
                    </p>
                    <ul className="mt-6 grid gap-2 text-sm text-[#303842]">
                      <li>Custom dimensions and specifications</li>
                      <li>Bulk order production support</li>
                      <li>Export and warehouse handling suitability</li>
                    </ul>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#111820] py-20 text-white sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#c8aa73]">
              Custom development
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Need a carton built around your product and destination market?
            </h2>
            <p className="mt-5 text-base leading-8 text-[#c9ced6]">
              Share product size, weight, shipment quantity, stacking needs,
              print requirements, and export destination for a practical
              packaging recommendation.
            </p>
          </div>
          <Button href="/contact" variant="secondary">
            Request Product Quote
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
