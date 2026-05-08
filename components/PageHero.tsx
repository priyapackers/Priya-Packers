import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";
import { VisualPanel } from "./VisualPanel";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageLabel?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image = "/images/hero-packaging.svg",
  imageLabel,
}: PageHeroProps) {
  return (
    <section className="border-b border-[#e7e1d8] bg-[#fbfaf8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <ScrollReveal className="self-center" initialVisible>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-[#111820] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#58606b]">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Request Quote</Button>
            <Button href="/export-solutions" variant="secondary">
              Export Solutions
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120} initialVisible>
          <VisualPanel src={image} alt={title} label={imageLabel} priority />
        </ScrollReveal>
      </div>
    </section>
  );
}
