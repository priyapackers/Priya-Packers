export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-[#fbfaf8] px-5">
      <div className="w-full max-w-sm rounded-lg border border-[#e6e0d7] bg-white p-6 shadow-[0_18px_60px_rgba(17,24,32,0.06)]">
        <div className="h-3 w-28 rounded-full bg-[#c8aa73]" />
        <div className="mt-6 h-5 w-4/5 rounded-full bg-[#e6e0d7]" />
        <div className="mt-3 h-5 w-3/5 rounded-full bg-[#e6e0d7]" />
        <div className="mt-8 h-12 rounded-md bg-[#0b2341]" />
      </div>
    </div>
  );
}
