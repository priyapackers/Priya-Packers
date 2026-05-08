import { faqs } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";

export function FAQ() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Common packaging questions"
          description="Quick answers for procurement, operations, and export teams evaluating Priya Packers."
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={faq.question} delay={index * 60}>
              <details className="group rounded-lg border border-[#e6e0d7] bg-[#fbfaf8] p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-[#111820]">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-xl text-[#9a6b30] transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-[#58606b]">
                  {faq.answer}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
