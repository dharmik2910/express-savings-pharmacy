"use client";

import { usePharmacyStatus } from "@/components/use-pharmacy-status";
import { HOURS_ROWS } from "@/lib/pharmacy";
import { cn } from "@/lib/utils";

/** Opening hours with a live open/closed line and today's row highlighted. */
export default function VisitHours() {
  const status = usePharmacyStatus();

  return (
    <div>
      <div className="flex h-6 items-center gap-2.5 text-sm">
        {status && (
          <>
            <span className="relative flex h-2.5 w-2.5">
              {status.isOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              )}
              <span
                className={cn(
                  "relative inline-flex h-2.5 w-2.5 rounded-full",
                  status.isOpen ? "bg-brand" : "bg-gold",
                )}
              />
            </span>
            <span className="font-semibold text-ink">{status.isOpen ? "Open now" : "Closed now"}</span>
            <span className="text-slate-500">· {status.label}</span>
          </>
        )}
      </div>

      <dl className="mt-4 space-y-1.5">
        {HOURS_ROWS.map((row) => {
          const isToday = status ? row.days.includes(status.day) : false;
          return (
            <div
              key={row.day}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 transition-colors",
                isToday ? "bg-white shadow-sm" : "",
              )}
            >
              <dt className="text-slate-600">{row.day}</dt>
              <dd className={row.open ? "font-semibold text-ink" : "font-semibold text-slate-400"}>
                {row.hours}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
