export function WeightBar({ original, remaining }: { original: number; remaining: number }) {
  const percent = original > 0 ? Math.max(0, Math.min(100, Math.round((remaining / original) * 100))) : 0;
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs font-semibold text-[#58606b]"><span>Remaining</span><span>{percent}%</span></div>
      <div className="h-3 overflow-hidden rounded-full bg-[#e6e0d7]"><div className="h-full rounded-full bg-[#1f6f4d]" style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
