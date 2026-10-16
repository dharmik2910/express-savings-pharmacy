"use client";

import { btn, inputClass } from "@/components/section";
import { usePharmacyStatus } from "@/components/use-pharmacy-status";
import { API_BASE, PHARMACY, type PharmacyStatus } from "@/lib/pharmacy";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle, Clock, Loader2, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

const stats = [
  { value: "Free", label: "Local delivery", short: "Delivery" },
  { value: "Same day", label: "Refill processing", short: "Refills" },
  { value: "Horizon", label: "NJ Health accepted", short: "Horizon NJ" },
];

export default function HeroSection() {
  const [rxNumber, setRxNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const status = usePharmacyStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    const rxList = rxNumber
      .split(/[\s,]+/)
      .map((rx) => rx.trim())
      .filter(Boolean);

    if (rxList.length === 0) {
      setError("Please enter at least one RX number");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/rx`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rxNumbers: rxList }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Server error. Please try again.");
      setSubmitted(true);
      setRxNumber("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err?.message || "Failed to submit RX numbers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Hero fills the screen below the fixed header (5rem nav + 2rem alert bar overlap).
  // Spacing and type tighten on short screens so everything stays above the fold.
  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden bg-ink text-white pt-8 lg:min-h-[calc(100svh-5rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,168,62,0.2),transparent_55%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-12 [@media(max-height:860px)]:lg:py-8">
        {/* ── LEFT: headline (centered when stacked, left-aligned side-by-side) ── */}
        <div className="text-center lg:text-left">
          <StatusBadge status={status} />

          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl [@media(max-height:860px)]:lg:mt-5 [@media(max-height:860px)]:lg:text-5xl">
            Prescription refills, <span className="text-brand">handled with care</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/70 lg:mx-0 [@media(max-height:860px)]:lg:mt-4 [@media(max-height:860px)]:lg:text-base">
            Your neighborhood pharmacy in Sicklerville, NJ. Our licensed pharmacists process
            every refill securely, accurately, and on time.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start [@media(max-height:860px)]:lg:mt-6">
            <Link href="/prescription" className={btn.primary}>
              Transfer a prescription
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={PHARMACY.phoneHref} className={btn.outlineLight}>
              <Phone className="h-4 w-4" />
              {PHARMACY.phoneDisplay}
            </a>
          </div>

          <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x lg:mx-0 divide-white/10 border-t border-white/10 pt-6 [@media(max-height:860px)]:lg:mt-8 [@media(max-height:860px)]:lg:pt-5">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse px-3 sm:px-4 lg:first:pl-0">
                <dt className="mt-1 whitespace-nowrap text-xs text-white/50">
                  <span className="sm:hidden">{s.short}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </dt>
                <dd className="text-2xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── RIGHT: refill form ── */}
        <div className="order-first mx-auto w-full max-w-xl rounded-2xl bg-white p-6 text-ink shadow-2xl sm:p-8 lg:order-none lg:max-w-none">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand">
            <ShieldCheck className="h-4 w-4" />
            Secure refill request
          </p>
          <h2 className="mt-3 text-2xl font-bold">Request a refill</h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter one or more RX numbers, separated by commas.
          </p>

          {submitted ? (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand/25 bg-brand/10 p-4">
              <CheckCircle className="h-6 w-6 shrink-0 text-brand" />
              <div>
                <p className="font-semibold">Refill request received</p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Our pharmacy team will process it shortly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <label htmlFor="rx-numbers" className="sr-only">
                RX numbers
              </label>
              <input
                id="rx-numbers"
                type="text"
                inputMode="numeric"
                value={rxNumber}
                onChange={(e) => {
                  setRxNumber(e.target.value);
                  setError("");
                }}
                placeholder="e.g. 483920, 592011"
                className={inputClass}
              />

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={loading} className={cn(btn.primary, "w-full")}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Request refill
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-slate-100 pt-5 text-xs text-slate-500 sm:justify-start">
            {["HIPAA compliant", "Licensed pharmacists", "Horizon NJ Health accepted"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: PharmacyStatus | null }) {
  // Reserve the space before the client knows the time, so nothing jumps
  if (!status) return <div className="h-8" />;

  const open = status.isOpen;
  return (
    <div
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-semibold",
        open ? "border-brand/30 bg-brand/10 text-brand" : "border-gold/30 bg-gold/10 text-gold",
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            open ? "bg-brand" : "bg-gold",
          )}
        />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", open ? "bg-brand" : "bg-gold")} />
      </span>
      <Clock className="h-3.5 w-3.5" />
      {open ? "Open now" : "Closed"}
      <span className="font-medium opacity-75">· {status.label}</span>
    </div>
  );
}
