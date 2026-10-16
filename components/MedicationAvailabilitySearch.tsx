"use client";

import { btn, inputClass, labelClass } from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { API_BASE, PHARMACY } from "@/lib/pharmacy";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, HeartPulse, Phone, Pill, Search, Stethoscope, Syringe } from "lucide-react";
import Papa from "papaparse";
import React, { useEffect, useRef, useState } from "react";

const POPULAR = ["Metformin", "Lisinopril", "Atorvastatin", "Amlodipine", "Levothyroxine", "Ozempic"];

/* Bold the part of `text` that matches `q` */
function Highlight({ text, q }: { text: string; q: string }) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0 || !q) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="font-bold text-brand">{text.slice(i, i + q.length)}</span>
      {text.slice(i + q.length)}
    </>
  );
}

/* ─── component ─────────────────────────────────────────── */
export default function MedicationAvailabilitySearch() {
  const [query, setQuery] = useState("");
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [medicationList, setMedicationList] = useState<string[]>([]);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // search keyboard navigation
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  /* load CSV */
  useEffect(() => {
    Papa.parse("/drugs.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Array<{
          DrugName?: string;
          Form?: string;
          Strength?: string;
        }>;
        setMedicationList(
          rows
            .map((d) =>
              [d.DrugName, d.Form, d.Strength].filter(Boolean).join(" ").replace(/\s+/g, " ").trim(),
            )
            .filter(Boolean),
        );
      },
    });
  }, []);

  const trimmed = query.trim();
  const filtered =
    trimmed.length > 1
      ? medicationList.filter((m) => m.toLowerCase().includes(trimmed.toLowerCase())).slice(0, 8)
      : [];
  const showDropdown = trimmed.length > 1 && !selectedMedication && medicationList.length > 0;

  const selectMedication = (med: string) => {
    setSelectedMedication(med);
    setQuery(med);
    setError("");
    setModalOpen(true);
  };

  const pickPopular = (name: string) => {
    setQuery(name);
    setSelectedMedication(null);
    setActiveIndex(0);
    inputRef.current?.focus();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pick = filtered[activeIndex] ?? filtered[0];
    if (pick) selectMedication(pick);
    else inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      medicationName: String(formData.get("medicationName") || selectedMedication || query),
      firstName: String(formData.get("firstName")),
      lastName: String(formData.get("lastName")),
      dob: String(formData.get("dob")),
      phone: String(formData.get("phone")),
      email: String(formData.get("email") || ""),
      consent: true,
    };
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/medication-availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setModalOpen(false);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full-width dark band */}
      <section id="medications" className="scroll-mt-28">
        <div className="relative bg-ink px-5 py-16 text-center text-white sm:px-8 md:py-24">
          {/* Background: green glow + faded dot grid + floating icons */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_top,rgba(34,168,62,0.28),transparent_60%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden rounded-[inherit] text-white/[0.07] lg:block">
            <Pill className="absolute left-[8%] top-[18%] h-20 w-20 -rotate-12" strokeWidth={1.25} />
            <Syringe className="absolute bottom-[16%] left-[12%] h-16 w-16 rotate-12" strokeWidth={1.25} />
            <HeartPulse className="absolute right-[9%] top-[20%] h-16 w-16 rotate-6" strokeWidth={1.25} />
            <Stethoscope className="absolute bottom-[14%] right-[11%] h-20 w-20 -rotate-12" strokeWidth={1.25} />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">
              Medication availability
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Find your <span className="text-brand">medication</span>
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Search before you visit — we&apos;ll confirm it&apos;s ready for you.
            </p>

            {submitted && selectedMedication ? (
              /* ── Result ── */
              <div className="mt-10">
                <p className="inline-flex items-center gap-2 font-semibold text-brand">
                  <CheckCircle2 className="h-5 w-5" />
                  Request received
                </p>
                <p className="mt-3 text-xl font-bold">{selectedMedication}</p>
                <p className="mx-auto mt-2 max-w-md text-white/60">
                  Our team will call you shortly to confirm. For same-day needs, call us directly.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a href={PHARMACY.phoneHref} className={btn.primary}>
                    <Phone className="h-4 w-4" />
                    Call {PHARMACY.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedMedication(null);
                      setQuery("");
                    }}
                    className={btn.outlineLight}
                  >
                    Search another
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* ── Search ── */}
                <form onSubmit={handleSearchSubmit} className="relative mt-10 text-left">
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedMedication(null);
                      setActiveIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search medications…"
                    autoComplete="off"
                    aria-label="Search medication"
                    className={cn(
                      inputClass,
                      "h-16 rounded-2xl border-0 pl-14 pr-32 text-lg shadow-2xl shadow-black/40 sm:pr-40",
                    )}
                  />
                  <button
                    type="submit"
                    className={cn(btn.primary, "absolute right-2 top-2 h-12 px-4 sm:px-6")}
                  >
                    <span className="hidden sm:inline">Check</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {showDropdown && (
                    <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl bg-white text-ink shadow-2xl">
                      {filtered.length > 0 ? (
                        <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
                          {filtered.map((med, idx) => (
                            <li key={`${med}-${idx}`}>
                              <button
                                type="button"
                                onClick={() => selectMedication(med)}
                                onMouseEnter={() => setActiveIndex(idx)}
                                className={cn(
                                  "flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors",
                                  idx === activeIndex && "bg-surface",
                                )}
                              >
                                <Pill className="h-4 w-4 shrink-0 text-brand" />
                                <span className="flex-1 font-medium">
                                  <Highlight text={med} q={trimmed} />
                                </span>
                                {idx === activeIndex && (
                                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-5 py-5 text-sm text-slate-600">
                          No match for <span className="font-semibold text-ink">“{trimmed}”</span>.
                          We can often order it —{" "}
                          <a href={PHARMACY.phoneHref} className="font-semibold text-brand hover:underline">
                            call {PHARMACY.phoneDisplay}
                          </a>
                          .
                        </div>
                      )}
                    </div>
                  )}
                </form>

                {/* ── Popular searches ── */}
                <div className="-mx-5 mt-5 flex items-center gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
                  <span className="mr-1 shrink-0 text-sm text-white/40">Popular:</span>
                  {POPULAR.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => pickPopular(name)}
                      className="shrink-0 rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/75 transition-colors hover:border-brand hover:bg-brand/15 hover:text-white"
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {/* ── Steps + call ── */}
                <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:mt-12 sm:gap-4 text-sm text-white/60 sm:flex-row">
                  <ol className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
                    {["Search", "Select", "We call you"].map((step, i) => (
                      <li key={step} className="flex items-center gap-3">
                        {i > 0 && <span className="h-px w-4 bg-white/20 sm:w-5" />}
                        <span className="flex items-center gap-2 whitespace-nowrap leading-none">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-[11px] font-bold leading-none text-brand tabular-nums">
                            {i + 1}
                          </span>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <a
                    href={PHARMACY.phoneHref}
                    className="inline-flex items-center gap-2 font-semibold text-white hover:text-brand"
                  >
                    <Phone className="h-4 w-4 text-brand" />
                    {PHARMACY.phoneDisplay}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VERIFY DIALOG (shadcn Dialog)
      ══════════════════════════════════════════ */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-8">
          <DialogHeader>
            <div className="mb-1 h-1 w-10 rounded-full bg-brand" />
            <DialogTitle className="text-2xl font-bold text-ink">
              Verify your information
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              We'll contact you about{" "}
              <span className="font-semibold text-brand">{selectedMedication}</span>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            <input type="hidden" name="medicationName" value={selectedMedication || query} />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="med-first" className={labelClass}>First name</label>
                <Input id="med-first" name="firstName" required className="h-11 rounded-xl" />
              </div>
              <div>
                <label htmlFor="med-last" className={labelClass}>Last name</label>
                <Input id="med-last" name="lastName" required className="h-11 rounded-xl" />
              </div>
            </div>

            <div>
              <label htmlFor="med-dob" className={labelClass}>Date of birth</label>
              <Input id="med-dob" type="date" name="dob" required className="h-11 rounded-xl" />
            </div>

            <div>
              <label htmlFor="med-phone" className={labelClass}>Phone number</label>
              <Input id="med-phone" type="tel" name="phone" required className="h-11 rounded-xl" />
            </div>

            <div>
              <label htmlFor="med-email" className={labelClass}>
                Email{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <Input id="med-email" type="email" name="email" className="h-11 rounded-xl" />
            </div>

            <div className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <input
                id="med-consent"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
              />
              <p className="leading-relaxed">
                <label htmlFor="med-consent" className="cursor-pointer">
                  I authorize Express Savings to contact me.
                </label>{" "}
                <button
                  type="button"
                  onClick={() => setTermsOpen(true)}
                  className="font-medium text-brand underline underline-offset-2"
                >
                  Terms &amp; Conditions
                </button>
              </p>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-brand text-white hover:bg-brand/90 text-base font-semibold"
            >
              {loading ? "Submitting…" : "Check availability"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════
          TERMS DIALOG
      ══════════════════════════════════════════ */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <div className="mb-1 h-1 w-10 rounded-full bg-brand" />
            <DialogTitle className="text-xl font-bold text-ink">
              Terms &amp; Conditions
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[55vh] space-y-3 overflow-y-auto text-sm leading-relaxed text-slate-600 pr-1">
            <p>
              By submitting this form, you confirm that all information provided is accurate,
              complete, and truthful to the best of your knowledge.
            </p>
            <p>
              You authorize Express Savings to contact you via phone, text message, or email
              regarding your prescription inquiry, medication availability, insurance verification,
              or savings options.
            </p>
            <p>
              Information submitted through this form is used solely for pharmacy communication and
              will not be sold or shared with third parties except as required for prescription
              processing or insurance verification.
            </p>
            <p>
              By continuing, you acknowledge that electronic submission constitutes your consent in
              accordance with applicable federal and state regulations, including HIPAA privacy
              guidelines.
            </p>
          </div>
          <div className="pt-2 text-right">
            <Button
              type="button"
              onClick={() => setTermsOpen(false)}
              className="rounded-xl bg-brand text-white hover:bg-brand/90"
            >
              I understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
