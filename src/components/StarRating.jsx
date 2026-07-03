import { Star } from "lucide-react";

export default function StarRating({ value }) {
  return (
    <div className="flex items-center gap-1 text-amber">
      <Star size={14} fill="currentColor" strokeWidth={0} />
      <span className="text-xs font-mono font-medium text-ink dark:text-cream">{value.toFixed(1)}</span>
    </div>
  );
}
