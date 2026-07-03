import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun, Car } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useBookings } from "../context/BookingContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { user, logout } = useBookings();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors ${
      isActive
        ? "text-accent"
        : "text-ink/70 dark:text-cream/70 hover:text-ink dark:hover:text-cream"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line dark:border-ink-2 bg-cream/90 dark:bg-ink/90 backdrop-blur">
      <div className="road-line" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink dark:bg-cream text-amber">
            <Car size={18} strokeWidth={2.5} className="text-amber" />
          </span>
          <span>Drive<span className="text-accent">Now</span></span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-steel">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={logout} className="text-sm font-medium text-accent hover:underline">
                Sign out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={linkClass}>Sign in</NavLink>
          )}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line dark:border-ink-2 text-ink dark:text-cream hover:border-accent transition-colors"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <NavLink
            to="/fleet"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            Book a car
          </NavLink>
        </div>

        <button className="md:hidden text-ink dark:text-cream" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line dark:border-ink-2 bg-cream dark:bg-ink px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <button onClick={() => { logout(); setOpen(false); }} className="text-left text-sm font-medium text-accent">
                Sign out ({user.name.split(" ")[0]})
              </button>
            ) : (
              <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Sign in</NavLink>
            )}
            <div className="flex items-center justify-between pt-2">
              <button onClick={toggle} className="flex items-center gap-2 text-sm text-ink dark:text-cream">
                {dark ? <Sun size={16} /> : <Moon size={16} />} Toggle theme
              </button>
              <NavLink to="/fleet" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white" onClick={() => setOpen(false)}>
                Book a car
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
