import { cars } from "../data/cars";
import { useBookings } from "../context/BookingContext";
import { Car, CalendarCheck, DollarSign, Users } from "lucide-react";

export default function AdminDashboard() {
  const { bookings } = useBookings();
  const active = bookings.filter((b) => b.status === "Confirmed");
  const revenue = active.reduce((sum, b) => sum + b.totalPrice, 0);
  const available = cars.filter((c) => c.available).length;

  const cards = [
    { icon: Car, label: "Fleet size", value: cars.length },
    { icon: CalendarCheck, label: "Active bookings", value: active.length },
    { icon: DollarSign, label: "Revenue (local)", value: `$${revenue}` },
    { icon: Users, label: "Cars available", value: available },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <span className="text-xs font-mono uppercase tracking-widest text-accent">Admin</span>
      <h1 className="mt-2 font-display text-3xl font-bold">Fleet dashboard</h1>
      <p className="mt-2 text-steel">Read-only overview built from the bookings stored in this browser.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft p-5">
            <c.icon size={18} className="text-accent" />
            <p className="mt-3 font-display text-2xl font-bold">{c.value}</p>
            <p className="text-xs text-steel">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line dark:border-ink-2 text-xs uppercase tracking-wide text-steel">
              <th className="px-5 py-3">Booking ID</th>
              <th className="px-5 py-3">Car</th>
              <th className="px-5 py-3">Renter</th>
              <th className="px-5 py-3">Dates</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-steel">No bookings recorded yet.</td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-b border-line dark:border-ink-2 last:border-0">
                  <td className="px-5 py-3 font-mono text-xs">{b.id}</td>
                  <td className="px-5 py-3">{b.carName}</td>
                  <td className="px-5 py-3">{b.name}</td>
                  <td className="px-5 py-3 text-xs text-steel">{b.pickupDate} → {b.returnDate}</td>
                  <td className="px-5 py-3 font-mono">${b.totalPrice}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      b.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"
                    }`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
