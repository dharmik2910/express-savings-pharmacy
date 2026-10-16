"use client";

import { Section, SectionHeader, btn, inputClass } from "@/components/section";
import { usePharmacyStatus } from "@/components/use-pharmacy-status";
import { API_BASE, PHARMACY } from "@/lib/pharmacy";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, HelpCircle, Lock, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

const contactRows = [
  { icon: Phone, title: "Call us", value: PHARMACY.phoneDisplay, href: PHARMACY.phoneHref },
  { icon: Mail, title: "Email us", value: PHARMACY.email, href: `mailto:${PHARMACY.email}` },
  { icon: MapPin, title: "Visit us", value: `${PHARMACY.street}, Sicklerville`, href: PHARMACY.mapsUrl },
];

const EMPTY = { firstName: "", lastName: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const status = usePharmacyStatus();
  const [formData, setFormData] = useState(EMPTY);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (Object.values(formData).some((v) => !v.trim())) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Failed to send message.");

      setSubmitted(true);
      setFormData(EMPTY);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── LEFT: heading + contact details ── */}
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Contact"
            title={
              <>
                Questions? <span className="text-brand">Let&apos;s talk.</span>
              </>
            }
            description="Prescriptions, refills, delivery, or insurance — our pharmacists are happy to help."
            className="mb-8 md:mb-8"
          />

          {/* Live status */}
          <div className="mb-8 flex h-6 items-center gap-2.5 text-sm">
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
                <span className="font-semibold text-ink">{status.isOpen ? "Open now" : "Closed"}</span>
                <span className="text-slate-500">· {status.label}</span>
              </>
            )}
          </div>

          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {contactRows.map((row) => (
              <li key={row.title}>
                <a
                  href={row.href}
                  {...(row.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <row.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-500">{row.title}</p>
                    <p className="truncate font-semibold text-ink">{row.value}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </a>
              </li>
            ))}
          </ul>

          <Link
            href="/faqs"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
          >
            <HelpCircle className="h-4 w-4" />
            Browse FAQs
          </Link>
        </div>

        {/* ── RIGHT: form ── */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-surface p-6 sm:p-10">
            {submitted ? (
              <div className="flex min-h-105 flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                  <CheckCircle2 className="h-8 w-8 text-brand" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-ink">Message sent</h3>
                <p className="mt-1 max-w-sm text-slate-600">
                  Thanks for reaching out. Our pharmacy team usually replies within 2 hours.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className={cn(btn.outline, "mt-6 bg-white")}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-2xl font-bold text-ink">Send us a message</h3>
                <p className="mt-1 text-slate-500">We usually reply within 2 hours.</p>


                <div className="mt-7 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-first" className="sr-only">First Name</label>
                      <input id="c-first" name="firstName" autoComplete="given-name" placeholder="First Name" value={formData.firstName} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="c-last" className="sr-only">Last Name</label>
                      <input id="c-last" name="lastName" autoComplete="family-name" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-email" className="sr-only">Email Address</label>
                    <input id="c-email" type="email" name="email" autoComplete="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="c-phone" className="sr-only">Phone Number</label>
                    <input id="c-phone" type="tel" name="phone" autoComplete="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="c-message" className="sr-only">How can we help you?</label>
                    <textarea
                      id="c-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="How can we help you?"
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>
                </div>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                <div className="mt-7 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Lock className="h-3.5 w-3.5" />
                    Private &amp; HIPAA-compliant. We never share your info.
                  </p>
                  <button type="submit" disabled={loading} className={cn(btn.primary, "w-full sm:w-auto")}>
                    {loading ? "Sending…" : "Send message"}
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
