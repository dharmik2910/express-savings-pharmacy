/* ============================================
   PHARMACY INFO — single source of truth
   Keep in sync with the JSON-LD in app/layout.tsx.
============================================ */

export const PHARMACY = {
  name: "Express Savings Pharmacy",
  phoneDisplay: "(856) 566-1100",
  phoneHref: "tel:+18565661100",
  email: "expresspharmacy416@gmail.com",
  street: "416 Sicklerville Rd",
  cityStateZip: "Sicklerville, NJ 08081",
  mapsUrl: "https://maps.app.goo.gl/X1ssWjdaKpNDFBPa8",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Express+Savings+Pharmacy,+416+Sicklerville+Rd,+Sicklerville,+NJ+08081",
};

// Set NEXT_PUBLIC_API_BASE in .env.development.local to test against a local backend
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://express-savings-backend.onrender.com/api/mail";

// Opening hours in America/New_York. Days: 0 = Sun … 6 = Sat.
const OPEN_DAYS = [1, 2, 3, 4, 5]; // Mon–Fri
const OPEN_MIN = 10 * 60; // 10:00 AM
const CLOSE_MIN = 18 * 60; // 6:00 PM

export const HOURS_ROWS = [
  { day: "Monday – Friday", hours: "10:00 AM – 6:00 PM", open: true, days: [1, 2, 3, 4, 5] },
  { day: "Saturday – Sunday", hours: "Closed", open: false, days: [6, 0] },
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** `day` is today in Eastern Time (0 = Sun … 6 = Sat). */
export type PharmacyStatus = { isOpen: boolean; label: string; day: number };

export function getPharmacyStatus(now = new Date()): PharmacyStatus {
  const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = et.getDay();
  const mins = et.getHours() * 60 + et.getMinutes();
  const openToday = OPEN_DAYS.includes(day);

  if (openToday && mins >= OPEN_MIN && mins < CLOSE_MIN) {
    const remaining = CLOSE_MIN - mins;
    return {
      day,
      isOpen: true,
      label: remaining <= 60 ? `Closes in ${remaining} min` : "Open until 6:00 PM",
    };
  }

  if (openToday && mins < OPEN_MIN) {
    return { day, isOpen: false, label: "Opens today at 10:00 AM" };
  }

  // Find the next open day
  for (let offset = 1; offset <= 7; offset++) {
    const next = (day + offset) % 7;
    if (OPEN_DAYS.includes(next)) {
      const when = offset === 1 ? "tomorrow" : DAY_NAMES[next];
      return { day, isOpen: false, label: `Opens ${when} at 10:00 AM` };
    }
  }
  return { day, isOpen: false, label: "Closed" };
}
