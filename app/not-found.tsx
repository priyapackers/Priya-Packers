import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-[#fbfaf8] px-5 py-20 text-center">
      <div className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b30]">
          Page not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#111820]">
          This packaging page is not available.
        </h1>
        <p className="mt-5 text-base leading-8 text-[#58606b]">
          Return to the homepage or contact Priya Packers for corrugated box and
          export packaging inquiries.
        </p>
        <div className="mt-8">
          <Button href="/">Back to Home</Button>
        </div>
      </div>
    </section>
  );
}
