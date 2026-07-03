import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";
import { cars } from "../data/cars";
import CarCard from "../components/CarCard";

const stats = [
  { label: "Cars in fleet", value: "180+" },
  { label: "Cities covered", value: "12" },
  { label: "Avg. pickup time", value: "9 min" },
  { label: "Renter rating", value: "4.8/5" },
];

const steps = [
  { n: "01", title: "Pick your car", copy: "Filter by category, price, or fuel type and compare specs side by side." },
  { n: "02", title: "Book online", copy: "Choose your dates, enter your details, and confirm — no phone calls needed." },
  { n: "03", title: "Drive away", copy: "Show your confirmation at pickup and you're on the road in minutes." },
];

export default function Home() {
  const featured = cars.filter((c) => c.available).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cream/15 px-3 py-1 text-xs font-mono text-amber">
              Now booking in 12 cities
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Rent the right car,
              <br />
              not just <span className="text-accent">any</span> car.
            </h1>
            <p className="mt-6 max-w-md text-cream/70">
              From compact hatchbacks to electric sedans, browse a fleet built
              for real trips — and lock in your rate in under two minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/fleet"
                className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
              >
                Browse the fleet <ArrowRight size={16} />
              </Link>
              <Link to="/fleet" className="text-sm font-medium text-cream/70 hover:text-cream">
                See today's prices
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-cream/10 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-amber">{s.value}</p>
                  <p className="mt-1 text-xs text-cream/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-3xl" />
            <img
              src="https://loremflickr.com/900/700/car,dealership?lock=100"
              alt="Featured rental car"
              className="relative z-10 aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="road-line absolute -bottom-2 left-8 right-8 z-20 rounded-full opacity-80" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-line dark:border-ink-2 bg-white dark:bg-ink-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Fully insured", copy: "Every rental includes standard coverage." },
            { icon: Clock, title: "9-minute pickup", copy: "Skip the counter — your car is ready when you are." },
            { icon: MapPin, title: "12 city locations", copy: "Pick up in one city, drop off in another." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <f.icon size={18} />
              </span>
              <div>
                <p className="font-display font-semibold">{f.title}</p>
                <p className="text-sm text-steel">{f.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured cars */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">Featured</span>
            <h2 className="mt-2 font-display text-3xl font-bold">Ready to book today</h2>
          </div>
          <Link to="/fleet" className="hidden items-center gap-1 text-sm font-semibold text-accent hover:underline md:flex">
            View full fleet <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white dark:bg-ink-soft border-y border-line dark:border-ink-2">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">Process</span>
          <h2 className="mt-2 font-display text-3xl font-bold">Three steps to the road</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <p className="font-display text-5xl font-bold text-line dark:text-ink-2">{s.n}</p>
                <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-steel">{s.copy}</p>
                {i < steps.length - 1 && (
                  <div className="road-line mt-6 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Your next trip starts with a booking.</h2>
        <p className="mx-auto mt-4 max-w-md text-steel">
          Compare the full fleet, check live availability, and reserve your car for as little as $34/day.
        </p>
        <Link
          to="/fleet"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-cream hover:bg-accent transition-colors dark:bg-cream dark:text-ink"
        >
          Browse the fleet <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
