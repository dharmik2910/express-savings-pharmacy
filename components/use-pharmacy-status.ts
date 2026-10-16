"use client";

import { getPharmacyStatus, type PharmacyStatus } from "@/lib/pharmacy";
import { useEffect, useState } from "react";

/**
 * Live open/closed status, refreshed every minute.
 * Returns null until mounted on the client (avoids hydration mismatch).
 */
export function usePharmacyStatus(): PharmacyStatus | null {
  const [status, setStatus] = useState<PharmacyStatus | null>(null);
  useEffect(() => {
    const update = () => setStatus(getPharmacyStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}
