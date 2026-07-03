import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, CalendarDays } from "lucide-react";
import { cars } from "../data/cars";
import { useBookings } from "../context/BookingContext";
import { isValidEmail, isValidPhone, isFutureOrToday, isAfterDate } from "../utils/validators";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === id);
  const { addBooking, user } = useBookings();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    pickupDate: "",
    returnDate: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);

  if (!car) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Car not found</h1>
        <Link to="/fleet" className="mt-6 inline-block text-accent hover:underline">Back to fleet</Link>
      </div>
    );
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your full name.";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email address.";
    if (!isValidPhone(form.phone)) e.phone = "Enter a valid phone number.";
    if (!isFutureOrToday(form.pickupDate)) e.pickupDate = "Pickup date must be today or later.";
    if (!isAfterDate(form.returnDate, form.pickupDate)) e.returnDate = "Return date must be after pickup.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!validate()) return;

    const days = Math.max(
      1,
      Math.round((new Date(form.returnDate) - new Date(form.pickupDate)) / 86400000)
    );

    const record = addBooking({
      carId: car.id,
      carName: `${car.make} ${car.name}`,
      carImage: car.image,
      pricePerDay: car.pricePerDay,
      totalPrice: days * car.pricePerDay,
      days,
      ...form,
    });

    setConfirmed(record);
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
        <h1 className="mt-5 font-display text-2xl font-bold">Booking confirmed</h1>
        <p className="mt-2 text-steel">
          Confirmation <span className="font-mono text-ink dark:text-cream">{confirmed.id}</span> has
          been saved to your bookings.
        </p>
        <div className="mt-8 rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft p-6 text-left">
          <div className="flex items-center gap-4">
            <img src={confirmed.carImage} alt="" className="h-16 w-24 rounded-lg object-cover" />
            <div>
              <p className="font-display font-semibold">{confirmed.carName}</p>
              <p className="text-sm text-steel">{confirmed.pickupDate} → {confirmed.returnDate}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-line dark:border-ink-2 pt-4 text-sm">
            <span className="text-steel">{confirmed.days} day(s) × ${confirmed.pricePerDay}</span>
            <span className="font-mono font-semibold">${confirmed.totalPrice}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/my-bookings" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white">
            View my bookings
          </Link>
          <Link to="/fleet" className="rounded-full border border-line dark:border-ink-2 px-6 py-3 text-sm font-semibold">
            Book another
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <span className="text-xs font-mono uppercase tracking-widest text-accent">Booking</span>
      <h1 className="mt-2 font-display text-3xl font-bold">Reserve the {car.make} {car.name}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft p-6">
          <Field label="Full name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input"
              placeholder="Jordan Lee"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="input"
                placeholder="+1 555 010 2938"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Pickup date" error={errors.pickupDate}>
              <input
                type="date"
                value={form.pickupDate}
                onChange={(e) => update("pickupDate", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Return date" error={errors.returnDate}>
              <input
                type="date"
                value={form.returnDate}
                onChange={(e) => update("returnDate", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            Confirm booking
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft p-6">
          <img src={car.image} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />
          <h3 className="mt-4 font-display font-semibold">{car.make} {car.name}</h3>
          <div className="mt-3 flex items-center gap-2 text-sm text-steel">
            <CalendarDays size={15} /> Free cancellation up to 24 hours before pickup
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line dark:border-ink-2 pt-4">
            <span className="text-sm text-steel">Daily rate</span>
            <span className="font-mono font-semibold">${car.pricePerDay}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-steel">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
