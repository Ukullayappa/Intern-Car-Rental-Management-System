# DriveNow — Car Rental Management System

A responsive car rental booking platform built for **Sqrock IT Solutions — Web Development Internship, Project Phase 1, Task 1**.

## Live features

- **Homepage** — hero section, trust bar, featured cars, "how it works" steps, closing CTA.
- **Fleet page** — search by make/model, category filters, sort by price/rating.
- **Car details page** — image gallery, specs, description, booking CTA.
- **Booking form** — name/email/phone/date validation, computes total price, saves to a confirmation screen.
- **My bookings** — booking history pulled from `localStorage`, with cancel support.
- **Sign in / Sign up (bonus)** — mock auth stored in `localStorage`, pre-fills the booking form when logged in.
- **Admin dashboard (bonus)** — read-only fleet + booking stats table.
- **Dark mode (bonus)** — toggle in the navbar, persisted across visits.
- Fully responsive: mobile, tablet, desktop.

## Tech stack

- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- lucide-react icons
- Browser `localStorage` as a mock backend (no server required)

## Project structure

```
src/
├── components/       # Navbar, Footer, CarCard, SearchFilter, StarRating
├── pages/            # Home, Fleet, CarDetails, Booking, MyBookings, Login, Signup, AdminDashboard, NotFound
├── context/          # ThemeContext (dark mode), BookingContext (bookings + mock auth)
├── data/             # cars.js — static fleet data
├── utils/            # validators.js — form validation helpers
├── App.jsx
├── main.jsx
└── index.css         # Tailwind + design tokens
```

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Notes

- Car photography is sourced from **LoremFlickr** (loremflickr.com), which returns real, keyword-matched, Creative Commons-licensed photos from Flickr (e.g. actual cars for a "tesla" or "suv" query, not random unrelated images). Swap the URLs in `src/data/cars.js` for your own branded photos before shipping — and note LoremFlickr images still carry individual CC license/attribution terms from their original photographers, so check those if you plan to publish this publicly.
- Fonts: **Space Grotesk** (display) + **Inter** (body) + **JetBrains Mono** (data/prices) via Google Fonts.
- This is a frontend-only demo: bookings and accounts live in the browser's `localStorage`, so data resets if it's cleared.

---
Built as part of the Sqrock IT Solutions internship program.
