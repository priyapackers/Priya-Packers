import type { Metadata } from "next";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { certifications } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Priya Packers certification placeholders for ISO certification, GST registration, export readiness, and quality assurance.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications"
        title="Compliance and assurance signals for professional buyers"
        description="Placeholder certification cards for ISO, GST registration, export readiness, and quality assurance documentation."
        image="/images/quality-control.svg"
        imageLabel="Quality assurance and documentation"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Trust documentation"
            title="Certification placeholders ready for verified company records"
            description="Replace these placeholders with official certificate numbers, document scans, and registration details when available."
            align="center"
          />
          <div className="mt-12">
            <FeatureGrid items={certifications} columns="four" />
          </div>
        </div>
      </section>
    </>
  );
}
