import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Fuel, Users, Gauge, ShieldCheck } from "lucide-react";
import { cars } from "../data/cars";
import StarRating from "../components/StarRating";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!car) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Car not found</h1>
        <p className="mt-2 text-steel">This car may have been removed from the fleet.</p>
        <Link to="/fleet" className="mt-6 inline-block text-accent hover:underline">Back to fleet</Link>
      </div>
    );
  }

  const images = [car.image, ...car.gallery];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-steel hover:text-accent"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line dark:border-ink-2">
            <img src={images[activeImg]} alt={`${car.make} ${car.name}`} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImg(i)}
                className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${
                  activeImg === i ? "border-accent" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-mono text-accent">{car.category}</span>
              <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{car.make} {car.name}</h1>
            </div>
            <StarRating value={car.rating} />
          </div>

          <p className="mt-5 leading-relaxed text-steel">{car.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <Spec icon={Fuel} label="Fuel" value={car.fuel} />
            <Spec icon={Users} label="Seats" value={car.seats} />
            <Spec icon={Gauge} label="Transmission" value={car.transmission} />
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-steel">
            <ShieldCheck size={16} className="text-accent" /> Includes standard insurance and 24/7 roadside support.
          </div>

          <div className="mt-10 flex items-center justify-between rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft p-6">
            <div>
              <span className="font-mono text-3xl font-bold">${car.pricePerDay}</span>
              <span className="text-sm text-steel"> / day</span>
            </div>
            {car.available ? (
              <Link
                to={`/booking/${car.id}`}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
              >
                Book this car
              </Link>
            ) : (
              <span className="rounded-full bg-line dark:bg-ink-2 px-6 py-3 text-sm font-semibold text-steel">
                Currently unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-line dark:border-ink-2 p-4 text-center">
      <Icon size={18} className="mx-auto text-accent" />
      <p className="mt-2 text-sm font-semibold">{value}</p>
      <p className="text-xs text-steel">{label}</p>
    </div>
  );
}
