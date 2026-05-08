import Image from "next/image";

interface VisualPanelProps {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  className?: string;
}

export function VisualPanel({
  src,
  alt,
  label,
  priority = false,
  className = "",
}: VisualPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[#ded6ca] bg-[#f7f1e8] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={960}
        height={680}
        priority={priority}
        className="h-full min-h-[320px] w-full object-cover"
      />
      {label ? (
        <div className="absolute bottom-4 left-4 rounded-md bg-white/92 px-4 py-3 text-sm font-semibold text-[#0b2341] shadow-lg backdrop-blur">
          {label}
        </div>
      ) : null}
    </div>
  );
}
