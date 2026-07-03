import { Link } from "react-router-dom";
import { Fuel, Users, Gauge } from "lucide-react";
import StarRating from "./StarRating";

export default function CarCard({ car }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft transition-shadow hover:shadow-xl hover:shadow-ink/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-mono text-cream backdrop-blur">
          {car.category}
        </span>
        {!car.available && (
          <span className="absolute right-3 top-3 rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white">
            Booked out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight">{car.make} {car.name}</h3>
            <p className="text-xs text-steel">{car.transmission}</p>
          </div>
          <StarRating value={car.rating} />
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-steel">
          <span className="flex items-center gap-1"><Fuel size={14} /> {car.fuel}</span>
          <span className="flex items-center gap-1"><Users size={14} /> {car.seats} seats</span>
          <span className="flex items-center gap-1"><Gauge size={14} /> {car.transmission}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line dark:border-ink-2 pt-4">
          <div>
            <span className="font-mono text-xl font-semibold">${car.pricePerDay}</span>
            <span className="text-xs text-steel"> /day</span>
          </div>
          <Link
            to={`/cars/${car.id}`}
            className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-accent dark:bg-cream dark:text-ink dark:hover:bg-accent dark:hover:text-white"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
