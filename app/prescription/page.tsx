"use client";

import { btn, inputClass, labelClass } from "@/components/section";
import { API_BASE } from "@/lib/pharmacy";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle, Clock, Plus, ShieldCheck, X } from "lucide-react";
import type React from "react";
import { useState } from "react";

export default function TransferPrescription() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthday: "",
    previousPharmacyName: "",
    previousPharmacyPhone: "",
    transferAllMedications: false,
    prescriptions: [{ name: "", rxNumber: "" }],
    notes: "",
    termsAgreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [modalAgreed, setModalAgreed] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleMedicationChange = (
    index: number,
    field: "name" | "rxNumber",
    value: string,
  ) => {
    const updated = [...formData.prescriptions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, prescriptions: updated }));
  };

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      prescriptions: [...prev.prescriptions, { name: "", rxNumber: "" }],
    }));
  };

  const removeMedication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prescriptions: prev.prescriptions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName.trim()) return setError("First name is required");
    if (!formData.lastName.trim()) return setError("Last name is required");
    if (!formData.phone.trim()) return setError("Phone is required");
    if (!formData.birthday.trim()) return setError("Date of birth is required");
    if (!formData.previousPharmacyName.trim())
      return setError("Previous pharmacy name is required");
    if (!formData.previousPharmacyPhone.trim())
      return setError("Previous pharmacy address is required");
    if (!formData.termsAgreed) return setError("Please accept Terms of Service");

    if (!formData.transferAllMedications) {
      const hasValid = formData.prescriptions.some(
        (m) => m.name.trim() && m.rxNumber.trim(),
      );
      if (!hasValid)
        return setError("Each prescription must have name and Rx number");
    }

    const payload = {
      patient: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.replace(/[^\d]/g, ""),
        dob: formData.birthday,
      },
      previousPharmacy: {
        name: formData.previousPharmacyName.trim(),
        address: formData.previousPharmacyPhone.trim(),
      },
      prescriptions: formData.transferAllMedications
        ? [{ name: "ALL", rxnumber: "ALL" }]
        : formData.prescriptions
            .filter((m) => m.name.trim() && m.rxNumber.trim())
            .map((m) => ({ name: m.name.trim(), rxnumber: m.rxNumber.trim() })),
      notes: formData.notes.trim(),
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE}/transfer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Request failed");
      setSubmitted(true);
      setFormData({
        firstName: "", lastName: "", phone: "", birthday: "",
        previousPharmacyName: "", previousPharmacyPhone: "",
        transferAllMedications: false,
        prescriptions: [{ name: "", rxNumber: "" }],
        notes: "", termsAgreed: false,
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to submit transfer request");
    } finally {
      setLoading(false);
    }
  };

  const filledDob = !!formData.birthday;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f9f6] to-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">
            Switch pharmacies
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Transfer a Prescription
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
            Fill out this secure form and we&apos;ll contact your current pharmacy to move your
            prescriptions — free.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
            {[
              { icon: ShieldCheck, t: "HIPAA secure" },
              { icon: Clock, t: "Takes 2 minutes" },
              { icon: CheckCircle, t: "100% free" },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:p-10">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                <CheckCircle className="h-8 w-8 text-brand" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-ink">Request Sent!</h2>
              <p className="text-slate-500">
                We received your transfer request. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="divide-y divide-slate-100">

              {/* 1. Patient Details */}
              <FormStep n={1} title="Patient details" desc="So we can verify you with your old pharmacy.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First name <Req /></label>
                    <input id="firstName" type="text" name="firstName" placeholder="Enter first name"
                      value={formData.firstName} onChange={handleInputChange}
                      className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>Last name <Req /></label>
                    <input id="lastName" type="text" name="lastName" placeholder="Enter last name"
                      value={formData.lastName} onChange={handleInputChange}
                      className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone <Req /></label>
                    <div className="flex overflow-hidden rounded-xl border border-slate-200 transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
                      <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600">
                        +1
                      </span>
                      <input id="phone" type="tel" name="phone" placeholder="Enter phone number"
                        value={formData.phone} onChange={handleInputChange}
                        className="w-full min-w-0 px-4 py-3 text-[15px] text-ink outline-none placeholder:text-slate-400" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="birthday" className={labelClass}>Date of birth <Req /></label>
                    <input id="birthday" type="date" name="birthday" value={formData.birthday} required
                      onChange={handleInputChange}
                      className={cn(
                        inputClass,
                        "min-h-[50px] appearance-none text-left [&::-webkit-date-and-time-value]:text-left",
                        !filledDob && "text-slate-400",
                      )} />
                  </div>
                </div>
              </FormStep>

              {/* 2. Previous Pharmacy */}
              <FormStep n={2} title="Previous pharmacy" desc="Where are your prescriptions filled today?">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="previousPharmacyName" className={labelClass}>Pharmacy name <Req /></label>
                    <input id="previousPharmacyName" type="text" name="previousPharmacyName" placeholder="Enter pharmacy name"
                      value={formData.previousPharmacyName} onChange={handleInputChange}
                      className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="previousPharmacyPhone" className={labelClass}>Pharmacy address <Req /></label>
                    <input id="previousPharmacyPhone" type="text" name="previousPharmacyPhone" placeholder="Enter pharmacy address"
                      value={formData.previousPharmacyPhone} onChange={handleInputChange}
                      className={inputClass} required />
                  </div>
                </div>
              </FormStep>

              {/* 3. Prescriptions */}
              <FormStep n={3} title="Prescriptions" desc="List each medication with its Rx number, or transfer everything.">
                <label
                  htmlFor="transferAllMedications"
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] p-4 transition",
                    formData.transferAllMedications
                      ? "border-brand bg-brand/5"
                      : "border-slate-200 hover:border-brand",
                  )}
                >
                  <input type="checkbox" id="transferAllMedications"
                    checked={formData.transferAllMedications}
                    onChange={(e) => handleCheckboxChange("transferAllMedications", e.target.checked)}
                    className="h-5 w-5 cursor-pointer accent-brand" />
                  <span className="font-medium text-slate-700">Transfer all of my prescriptions</span>
                </label>

                {!formData.transferAllMedications && (
                  <div className="mt-5 space-y-3">
                    {formData.prescriptions.map((med, index) => (
                      <div key={index} className="flex items-end gap-3">
                        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            {index === 0 && <label className={labelClass}>Medication name</label>}
                            <input type="text" placeholder="Enter medication name" value={med.name}
                              aria-label="Medication name"
                              onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                              className={inputClass} />
                          </div>
                          <div>
                            {index === 0 && <label className={labelClass}>Rx number</label>}
                            <input type="text" placeholder="Enter Rx number" value={med.rxNumber}

                              aria-label="Rx number"
                              onChange={(e) => handleMedicationChange(index, "rxNumber", e.target.value)}
                              className={inputClass} />
                          </div>
                        </div>
                        {formData.prescriptions.length > 1 && (
                          <button type="button" onClick={() => removeMedication(index)}
                            aria-label="Remove medication"
                            className="mb-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500">
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addMedication}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10">
                      <Plus className="h-4 w-4" />
                      Add another medication
                    </button>
                  </div>
                )}
              </FormStep>

              {/* 4. Notes */}
              <FormStep n={4} title="Notes" desc="Optional — insurance details, preferences, anything else.">
                <textarea name="notes" value={formData.notes} onChange={handleInputChange}
                  aria-label="Notes for pharmacy"
                  placeholder="Enter any additional notes..." rows={4}
                  className={cn(inputClass, "resize-none")} />
              </FormStep>

              {/* Terms + Submit */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="flex w-full items-start gap-3 rounded-xl bg-[#f9f9f6] p-5 text-left text-sm leading-relaxed text-slate-700"
                >
                  <input type="checkbox" checked={formData.termsAgreed} readOnly tabIndex={-1}
                    className="pointer-events-none mt-0.5 h-5 w-5 shrink-0 accent-brand" />
                  <span>
                    I agree to the{" "}
                    <span className="font-semibold text-brand underline underline-offset-2">
                      Terms &amp; Conditions and Privacy Policy
                    </span>{" "}
                    <Req />
                  </span>
                </button>

                {error && (
                  <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={!formData.termsAgreed || loading}
                  className={cn(btn.dark, "mt-6 w-full py-4 text-base enabled:hover:bg-brand")}>
                  {loading ? "Submitting..." : "Submit Transfer Request"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ===== TERMS MODAL ===== */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Terms of Service & Privacy Policy
              </h2>
              <button onClick={() => { setShowTermsModal(false); setModalAgreed(false); }}
                className="text-slate-400 hover:text-slate-700 text-2xl leading-none transition-colors">
                ×
              </button>
            </div>

            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto text-sm text-slate-600 space-y-4 leading-relaxed">
              <p>By submitting a prescription transfer request, you confirm that you are the patient or an authorized representative and that all information provided is accurate and complete. Prescription transfers are subject to federal law, New Jersey Board of Pharmacy regulations, DEA requirements, prescriber authorization rules, and controlled substance regulations. Not all prescriptions are eligible for transfer.</p>
              <p>You authorize this pharmacy to contact your previous pharmacy and prescriber, request and receive prescription information, and store your data as required by law. All transfers are subject to pharmacist review and professional judgment. We may decline any transfer that is unsafe, invalid, incomplete, or non-compliant.</p>
              <p>Insurance coverage, copays, deductibles, and non-covered charges are determined by your plan. You are financially responsible for all charges not covered by insurance. Claims may be reversed or reprocessed if required by audits or eligibility reviews.</p>
              <p>Transfer processing time depends on the responsiveness of the previous pharmacy, prescriber availability, insurance processing, and regulatory requirements. Same-day completion is not guaranteed.</p>
              <p>If delivery services are used, delivery is a convenience service and not a guarantee. We are not responsible for loss, theft, or damage after confirmed delivery. Identification and signature may be required.</p>
              <p>By providing your contact information, you consent to receive calls, texts, voicemails, and emails regarding your prescriptions, refills, clinical questions, insurance issues, and payments. Message and data rates may apply.</p>
              <p>We collect, use, and protect your personal and health information in compliance with HIPAA, the HITECH Act, New Jersey privacy laws, CMS, DEA, and Board of Pharmacy requirements.</p>
              <p>These Terms are governed by the laws of the State of New Jersey. By proceeding, you acknowledge that you have read, understood, and agree to these Terms & Conditions and the Privacy Policy.</p>
            </div>

            <div className="px-6 py-4 border-t">
              <div className="flex items-start gap-3 mb-4">
                <input type="checkbox" id="modalAgreed" checked={modalAgreed}
                  onChange={(e) => setModalAgreed(e.target.checked)}
                  className="w-5 h-5 mt-1 cursor-pointer"
                  style={{ accentColor: "#22A83E" }} />
                <label htmlFor="modalAgreed" className="text-slate-700 cursor-pointer">
                  I have read and agree to all Terms & Conditions and Privacy Policy
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button"
                  onClick={() => { setShowTermsModal(false); setModalAgreed(false); }}
                  className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="button" disabled={!modalAgreed}
                  onClick={() => { setFormData((prev) => ({ ...prev, termsAgreed: true })); setShowTermsModal(false); }}
                  className="px-6 py-2 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "#1A1A1A" }}
                  onMouseEnter={(e) => modalAgreed && (e.currentTarget.style.background = "#22A83E")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}>
                  Confirm & Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Req() {
  return <span className="text-red-500">*</span>;
}

function FormStep({
  n,
  title,
  desc,
  children,
}: {
  n: number;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-8 first:pt-0">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
          {n}
        </span>
        <div>
          <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{desc}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
