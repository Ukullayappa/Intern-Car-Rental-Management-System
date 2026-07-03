import { Link } from "react-router-dom";
import { CalendarX2, PackageOpen } from "lucide-react";
import { useBookings } from "../context/BookingContext";

export default function MyBookings() {
  const { bookings, cancelBooking } = useBookings();

  if (bookings.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <PackageOpen size={40} className="mx-auto text-steel" />
        <h1 className="mt-4 font-display text-2xl font-bold">No bookings yet</h1>
        <p className="mt-2 text-steel">Reserve a car from the fleet and it will show up here.</p>
        <Link to="/fleet" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white">
          Browse the fleet
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <span className="text-xs font-mono uppercase tracking-widest text-accent">Account</span>
      <h1 className="mt-2 font-display text-3xl font-bold">My bookings</h1>

      <div className="mt-8 space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="flex flex-col gap-4 rounded-2xl border border-line dark:border-ink-2 bg-white dark:bg-ink-soft p-5 sm:flex-row sm:items-center">
            <img src={b.carImage} alt="" className="h-20 w-28 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold">{b.carName}</h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    b.status === "Confirmed"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-steel">{b.pickupDate} → {b.returnDate} · {b.days} day(s)</p>
              <p className="mt-1 font-mono text-sm">${b.totalPrice} total · {b.id}</p>
            </div>
            {b.status === "Confirmed" && (
              <button
                onClick={() => cancelBooking(b.id)}
                className="flex items-center gap-1.5 self-start rounded-full border border-line dark:border-ink-2 px-4 py-2 text-xs font-semibold text-steel hover:border-red-400 hover:text-red-500"
              >
                <CalendarX2 size={14} /> Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
