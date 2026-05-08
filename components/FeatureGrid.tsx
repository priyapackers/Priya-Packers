import type { FeatureItem } from "@/lib/site-data";
import { ScrollReveal } from "./ScrollReveal";

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: "three" | "four";
  initialVisible?: boolean;
}

export function FeatureGrid({
  items,
  columns = "three",
  initialVisible = false,
}: FeatureGridProps) {
  const gridClass =
    columns === "four"
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <ScrollReveal
            key={item.title}
            delay={index * 70}
            initialVisible={initialVisible}
          >
            <article className="h-full rounded-lg border border-[#e6e0d7] bg-white p-6 shadow-[0_18px_60px_rgba(17,24,32,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#c8aa73]">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-md bg-[#f2eadf] text-[#9a6b30]">
                <Icon className="size-5" />
              </div>
              <h3 className="text-xl font-semibold text-[#111820]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#58606b]">
                {item.description}
              </p>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
