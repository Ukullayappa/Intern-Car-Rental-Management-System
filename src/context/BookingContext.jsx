import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext(null);
const STORAGE_KEY = "drivenow_bookings";
const AUTH_KEY = "drivenow_auth";

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_KEY);
  }, [user]);

  function addBooking(booking) {
    const record = {
      ...booking,
      id: `BK-${Date.now().toString(36).toUpperCase()}`,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [record, ...prev]);
    return record;
  }

  function cancelBooking(id) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );
  }

  function login(name, email) {
    setUser({ name, email });
  }

  function logout() {
    setUser(null);
  }

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, user, login, logout }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used within BookingProvider");
  return ctx;
}
