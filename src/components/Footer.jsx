import { NavLink } from "react-router-dom";
import { Car, Globe, Send, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line dark:border-ink-2 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream/10">
                <Car size={16} className="text-amber" />
              </span>
              Drive<span className="text-accent">Now</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/60">
              Self-serve car rentals for city trips, business travel, and everything
              in between. Reserve online, pick up in minutes.
            </p>
            <div className="mt-5 flex gap-3">
              {[Globe, Send, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 hover:border-amber hover:text-amber transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-cream/50">Navigate</h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li><NavLink to="/" className="hover:text-amber">Home</NavLink></li>
              <li><NavLink to="/fleet" className="hover:text-amber">Browse fleet</NavLink></li>
              <li><NavLink to="/my-bookings" className="hover:text-amber">My bookings</NavLink></li>
              <li><NavLink to="/login" className="hover:text-amber">Sign in</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-cream/50">Categories</h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>Sedans</li>
              <li>SUVs</li>
              <li>Electric</li>
              <li>Luxury</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-cream/50">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>support@drivenow.example</li>
              <li>+1 (555) 010-2938</li>
              <li>221B Motor Street, Metro City</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/40 md:flex-row">
          <p>© {new Date().getFullYear()} DriveNow. Built for the Sqrock IT Solutions internship program.</p>
          <p>Demo project — not a real booking service.</p>
        </div>
      </div>
    </footer>
  );
}
