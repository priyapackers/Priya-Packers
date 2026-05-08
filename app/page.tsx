import {
  ArrowRight,
  CheckCircle2,
  Download,
  Globe2,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { FAQ } from "@/components/FAQ";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { VisualPanel } from "@/components/VisualPanel";
import {
  capabilities,
  highlights,
  industries,
  products,
  testimonials,
  whyChooseUs,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#fbfaf8]">
        <div className="absolute inset-x-0 top-0 h-14 border-b border-[#e7e1d8] bg-white" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <ScrollReveal className="self-center" initialVisible>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
              Indian corrugated box manufacturer
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-[#111820] sm:text-6xl lg:text-7xl">
              Sustainable Corrugated Packaging Solutions
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#58606b]">
              Export-ready corrugated boxes, custom cartons, printed packaging,
              and eco-friendly paper-based packaging for industrial buyers,
              manufacturers, and global supply chains.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">
                Request Quote
                <ArrowRight className="size-4" />
              </Button>
              <Button href="/contact" variant="secondary">
                Contact Us
                <Mail className="size-4" />
              </Button>
            </div>
            <div className="mt-8 grid gap-4 border-l-2 border-[#c8aa73] pl-5 sm:grid-cols-3">
              {["Custom carton design", "Bulk production", "Export documentation ready"].map(
                (item) => (
                  <p
                    key={item}
                    className="text-sm font-semibold leading-6 text-[#303842]"
                  >
                    {item}
                  </p>
                ),
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} initialVisible>
            <VisualPanel
              src="/images/hero-packaging.svg"
              alt="Corrugated packaging manufacturing illustration"
              label="Manufacturing-focused packaging for export clients"
              priority
              className="min-h-[460px]"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <FeatureGrid items={highlights} initialVisible />
        </div>
      </section>

      <section className="bg-[#fbfaf8] py-20 sm:py-24" id="products">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Product categories"
            title="Corrugated and paper packaging for demanding supply chains"
            description="From everyday shipper cartons to custom printed packaging, Priya Packers supports procurement teams with practical, scalable, and professional packaging solutions."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <ScrollReveal key={product.title} delay={index * 70}>
                  <Link
                    href={product.href}
                    className="group block h-full rounded-lg border border-[#e6e0d7] bg-white p-6 shadow-[0_18px_60px_rgba(17,24,32,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#c8aa73]"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="inline-flex size-12 items-center justify-center rounded-md bg-[#0b2341] text-white">
                        <Icon className="size-5" />
                      </span>
                      <ArrowRight className="size-5 text-[#9a6b30] transition group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#111820]">
                      {product.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#58606b]">
                      {product.description}
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Why choose us"
              title="A dependable packaging partner for local and international clients"
              description="Priya Packers combines practical manufacturing knowledge with responsive service, helping buyers reduce packaging risk and keep shipments moving."
            />
            <div className="mt-8">
              <Button href="/about-us" variant="secondary">
                About Priya Packers
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
          <FeatureGrid items={whyChooseUs} columns="four" />
        </div>
      </section>

      <section className="bg-[#111820] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#c8aa73]">
              Manufacturing capabilities
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for carton strength, consistency, and repeat production
            </h2>
            <p className="mt-5 text-base leading-8 text-[#c9ced6]">
              The facility is planned around practical conversion, order
              consistency, and dispatch readiness for business buyers.
            </p>
            <div className="mt-8">
              <Button href="/infrastructure" variant="secondary">
                View Infrastructure
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </ScrollReveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability, index) => (
              <ScrollReveal key={capability} delay={index * 60}>
                <div className="flex min-h-20 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <CheckCircle2 className="size-5 shrink-0 text-[#c8aa73]" />
                  <p className="text-sm font-semibold leading-6 text-[#eef1f5]">
                    {capability}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industries served"
            title="Packaging for manufacturing, trade, and modern commerce"
            description="Flexible box formats and paper packaging options for a wide range of industrial and consumer product sectors."
            align="center"
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <ScrollReveal key={industry} delay={index * 45}>
                <div className="rounded-md border border-[#e6e0d7] bg-[#fbfaf8] px-5 py-4 text-sm font-semibold text-[#303842]">
                  {industry}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf8] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <VisualPanel
              src="/images/export-crates.svg"
              alt="Export packaging cartons ready for shipment"
              label="Ready for export packaging conversations"
            />
          </ScrollReveal>
          <ScrollReveal delay={120} className="self-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
              Export readiness
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111820] sm:text-4xl">
              Packaging aligned to overseas buyer expectations
            </h2>
            <p className="mt-5 text-base leading-8 text-[#58606b]">
              Priya Packers supports global clients with custom export cartons,
              sustainable paper packaging, bulk manufacturing capability, and
              logistics-ready carton planning.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/export-solutions">
                Explore Export Solutions
                <Globe2 className="size-4" />
              </Button>
              <Button href="/brochure-priya-packers.pdf" variant="secondary">
                Download Brochure
                <Download className="size-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="Trusted by packaging buyers who value consistency"
            description="Sample testimonials for export houses, industrial buyers, and brand teams evaluating corrugated packaging partners."
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.author} delay={index * 80}>
                <figure className="h-full rounded-lg border border-[#e6e0d7] bg-[#fbfaf8] p-7">
                  <blockquote className="text-base leading-8 text-[#303842]">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <figcaption className="mt-7 border-t border-[#e6e0d7] pt-5">
                    <p className="font-semibold text-[#111820]">
                      {testimonial.author}
                    </p>
                    <p className="mt-1 text-sm text-[#58606b]">
                      {testimonial.company}
                    </p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
