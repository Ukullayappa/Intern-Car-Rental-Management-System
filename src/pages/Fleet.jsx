import { useMemo, useState } from "react";
import { cars } from "../data/cars";
import CarCard from "../components/CarCard";
import SearchFilter from "../components/SearchFilter";
import { SearchX } from "lucide-react";

export default function Fleet() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const results = useMemo(() => {
    let list = cars.filter((c) => {
      const matchesQuery = `${c.make} ${c.name}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || c.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [query, category, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-accent">Fleet</span>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">Find your car</h1>
        <p className="mt-2 max-w-lg text-steel">
          {cars.filter((c) => c.available).length} cars available right now across every category.
        </p>
      </div>

      <SearchFilter
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {results.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center text-steel">
          <SearchX size={32} />
          <p className="font-display text-lg font-semibold text-ink dark:text-cream">No cars match that search</p>
          <p className="text-sm">Try a different keyword or clear the category filter.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
