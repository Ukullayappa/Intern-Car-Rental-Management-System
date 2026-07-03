import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "../data/cars";

export default function SearchFilter({
  query,
  setQuery,
  category,
  setCategory,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by model or make..."
          className="w-full rounded-full border border-line dark:border-ink-2 bg-transparent py-2.5 pl-9 pr-4 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        <SlidersHorizontal size={16} className="shrink-0 text-steel" />
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              category === c
                ? "border-accent bg-accent text-white"
                : "border-line dark:border-ink-2 text-steel hover:border-accent hover:text-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded-full border border-line dark:border-ink-2 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
      >
        <option value="default">Sort: Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest rated</option>
      </select>
    </div>
  );
}
