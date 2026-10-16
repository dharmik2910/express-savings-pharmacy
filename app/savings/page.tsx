"use client";

import { CheckCircle, DollarSign, ShieldCheck, Upload } from "lucide-react";
import { API_BASE } from "@/lib/pharmacy";
import React, { useState } from "react";

export default function SavingsCopayHelp() {
  const [showTerms, setShowTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dobFilled, setDobFilled] = useState(false);

  /* =============================== */
  /* SUBMIT TO BACKEND */
  /* =============================== */

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   const form = e.currentTarget
  //   const formData = new FormData(form)

  //   const payload = {
  //     firstName: formData.get('firstName'),
  //     lastName: formData.get('lastName'),
  //     dob: formData.get('dob'),
  //     phone: formData.get('phone'),

  //     medicationName: formData.get('medicationName'),
  //     strength: formData.get('strength'),

  //     insuranceStatus: formData.get('insuranceStatus'),
  //     expensiveElsewhere: formData.get('expensiveElsewhere'),

  //     currentPharmacy: formData.get('currentPharmacy'),
  //     approximatePrice: formData.get('approximatePrice'),
  //     consent : formData.get('yes'),
  //     insuranceCard: formData.get('insuranceCard'),

  //     source: 'Express Savings Pharmacy – Savings & Copay Help',
  //   }

  //   try {
  //     setLoading(true)

  //     await fetch(
  //       'https://rxflow-backend.onrender.com/api/mail/savings-request',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     )

  //     setSubmitted(true)
  //   } catch (error) {
  //     alert('Unable to submit request. Please try again.')
  //     console.error(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInsuranceFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "source",
      "Express Savings Pharmacy – Savings & Copay Help"
    );

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/savings-request`,
        {
          method: "POST",
          body: formData, // ✅ multipart/form-data
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Submission failed");
      }

      setSubmitted(true);
    } catch (error: any) {
      console.error(error);
      alert(error?.message && error.message !== "Submission failed"
        ? error.message
        : "Unable to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border-[1.5px] border-slate-300 bg-white " +
    "text-slate-900 placeholder-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-[#22A83E]/30 focus:border-[#22A83E] transition";

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f9f9f6] via-[#ffffff] to-white px-4 py-14 md:py-20">
      <div className="max-w-3xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h2 className=" text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Savings & Copay Help
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            We help review manufacturer savings cards, discount pricing, and
            prior authorization support when eligible.
          </p>
        </div>

        {/* ================= SUCCESS ================= */}
        {submitted ? (
          <div className="bg-white border-2 rounded-3xl p-10 shadow-xl text-center space-y-6" style={{ borderColor: "#22A83E40" }}>
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-[#22A83E]" />
            </div>

            <h3 className=" text-3xl font-bold text-[#1A1A1A]">
              Request Received
            </h3>

            <p className="text-slate-700 text-lg">
              Thank you. A member of our pharmacy team will review savings
              options and contact you.
            </p>

            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Eligibility varies by medication and insurance type.
            </p>
          </div>
        ) : (
          /* ================= FORM ================= */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl border-2 p-8 md:p-12 space-y-8" style={{ borderColor: "#22A83E20" }}
          >
            {/* ===== PATIENT INFO ===== */}
            <div>
              <h3 className=" text-2xl font-bold text-[#1A1A1A] mb-4">
                Patient Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="firstName"
                  required
                  placeholder="First Name *"
                  className={inputStyle}
                />

                <input
                  name="lastName"
                  required
                  placeholder="Last Name *"
                  className={inputStyle}
                />

                <div className="relative">
                  <input
                    type="date"
                    name="dob"
                    required
                    onChange={(e) => setDobFilled(!!e.target.value)}
                    className={`peer w-full min-h-[51px] appearance-none px-4 py-3 rounded-xl border-[1.5px] border-slate-300 bg-white text-left [&::-webkit-date-and-time-value]:text-left focus:outline-none focus:ring-2 focus:ring-[#22A83E]/30 focus:border-[#22A83E] transition ${
                      dobFilled ? "text-slate-900" : "text-transparent focus:text-slate-400"
                    }`}
                  />

                  {/* Fake placeholder, shown while empty and not focused */}
                  <span
                    className={`
      absolute left-4 top-1/2 -translate-y-1/2
      text-slate-400
      pointer-events-none
      peer-focus:hidden
      ${dobFilled ? "hidden" : ""}
    `}
                  >
                    Date of Birth *
                  </span>
                </div>

                <input
                  name="phone"
                  required
                  placeholder="Phone Number *"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* ===== MEDICATION INFO ===== */}
            <div>
              <h3 className=" text-2xl font-bold text-[#1A1A1A] mb-4">
                Medication Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="medicationName"
                  required
                  placeholder="Medication name (ex: Ozempic)"
                  className={inputStyle}
                />

                <input
                  name="strength"
                  required
                  placeholder="Strength (ex: 0.5 mg)"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* ===== INSURANCE STATUS ===== */}
            <div>
              <h3 className=" text-2xl font-bold text-[#1A1A1A] mb-4">
                Insurance Status
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Have insurance", "No insurance", "Not sure"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-3 border-2 border-slate-200 rounded-xl px-4 py-4 cursor-pointer hover:border-[#22A83E] transition"
                  >
                    <input
                      type="radio"
                      name="insuranceStatus"
                      value={opt}
                      required
                    />
                    <span className="font-medium text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ===== COST QUESTION ===== */}
            <div>
              <h3 className=" text-2xl font-bold text-[#1A1A1A] mb-4">
                Cost Experience
              </h3>

              <label className="block mb-3 text-slate-700 font-medium">
                Was this medication expensive at another pharmacy?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Yes", "No", "Not sure"].map((opt) => (
                  <label
                    key={opt}
                    className="
    flex items-center justify-center gap-2
    border-2 border-slate-200 rounded-xl
    px-4 py-4 cursor-pointer
    hover:border-green-400 transition
    whitespace-nowrap text-center
  "
                  >
                    <input
                      type="radio"
                      name="expensiveElsewhere"
                      value={opt}
                      required
                    />
                    <span className="font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ===== OPTIONAL INFO ===== */}
            <div>
              <h3 className=" text-2xl font-bold text-[#1A1A1A] mb-4">
                Optional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="currentPharmacy"
                  placeholder="Current pharmacy name (optional)"
                  className={inputStyle}
                />

                <input
                  name="approximatePrice"
                  placeholder="Approx. price paid or quoted (optional)"
                  className={inputStyle}
                />
              </div>

              <label className="mt-5 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:bg-[#f9f9f6] hover:border-[#22A83E] transition relative">

                {!insuranceFile ? (
                  <>
                    <Upload className="w-6 h-6 text-[#22A83E]" />
                    <span className="text-[#22A83E] font-medium">
                      Upload insurance card (optional)
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    <span className="truncate max-w-[220px]">
                      {insuranceFile.name}
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  name="insuranceCard"
                  accept="image/*,.pdf"
                  hidden
                  onChange={handleFileChange}
                />
              </label>

              {insuranceFile && (
                <button
                  type="button"
                  onClick={() => setInsuranceFile(null)}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Remove file
                </button>
              )}
            </div>

            {/* ===== CONSENT ===== */}
            <label className="flex gap-3 text-sm text-slate-700 bg-[#f9f9f6] p-5 rounded-xl cursor-pointer leading-relaxed">
              <input
                type="checkbox"
                name="consent"
                value="true"
                required
                className="mt-1 accent-[#22A83E]"
              />

              <span>
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-[#22A83E] font-semibold underline hover:text-[#1a8f32]"
                >
                  Terms & Conditions
                </button>{" "}
                and authorize Express Savings Pharmacy to contact me and process my
                request in accordance with HIPAA and applicable pharmacy laws.
              </span>
            </label>

            {showTerms && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="bg-white max-w-3xl w-full h-[85vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
                  {/* HEADER */}
                  <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-bold text-[#1A1A1A]">
                      Express Savings – Website Terms & Conditions
                    </h2>

                    <button
                      onClick={() => setShowTerms(false)}
                      className="text-slate-500 hover:text-slate-800 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  {/* BODY */}
                  <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-700 space-y-4 leading-relaxed">
                    <p className="text-slate-500">Last updated: Feb 23, 2026</p>

                    <p>
                      By accessing or using this website (expresssavingspharmacy.com),
                      you agree to the following Terms and Conditions. If you do
                      not agree, please do not use this website or submit any
                      forms.
                    </p>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      1. General Website Use
                    </h3>
                    <p>
                      This website is operated by:
                      <br />
                      <strong>Express Savings </strong>
                      <br />
                      416 Sicklerville Rd
                      <br />
                      Sicklerville, NJ 08081,
                      <br />
                      United States
                      <br />
                      Phone: (856) 566-1100
                      <br />
                      Email: expresspharmacy416@gmail.com
                    </p>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      2. No Medical Advice Disclaimer
                    </h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Does not constitute medical advice</li>
                      <li>Does not establish a doctor–patient relationship</li>
                      <li>
                        Does not replace consultation with a licensed provider
                      </li>
                    </ul>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      3. Prescription Transfers
                    </h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Transfers are subject to state and federal law</li>
                      <li>Controlled substances may not be transferable</li>
                      <li>Submission does not guarantee completion</li>
                    </ul>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      4. Medication Availability
                    </h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Inventory shown is not real-time</li>
                      <li>Availability may change without notice</li>
                      <li>No reservation is created by submission</li>
                    </ul>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      5. Pricing Disclaimer
                    </h3>
                    <p>
                      Pricing and copay estimates are not guaranteed and depend
                      on insurance adjudication and pharmacy verification.
                    </p>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      6. HIPAA Compliance
                    </h3>
                    <p>
                      Information submitted is protected in accordance with
                      HIPAA regulations and used only for treatment, payment,
                      and healthcare operations.
                    </p>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      7. Electronic Communication Consent
                    </h3>
                    <p>
                      You consent to receive communications via phone, SMS,
                      email, or voicemail regarding pharmacy services.
                    </p>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      8. Limitation of Liability
                    </h3>
                    <p>
                      Express Savings Pharmacy is not liable for delays, shortages,
                      insurance denials, or third-party system failures.
                    </p>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      9. Age Requirement
                    </h3>
                    <p>
                      You confirm that you are at least 18 years old or an
                      authorized representative.
                    </p>

                    <h3 className="font-semibold text-[#1A1A1A]">
                      10. Changes to Terms
                    </h3>
                    <p>
                      These Terms may be updated at any time. Continued use
                      constitutes acceptance.
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="border-t px-6 py-4 flex justify-end gap-3">
                    <button
                      onClick={() => setShowTerms(false)}
                      className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===== SUBMIT ===== */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1A1A] hover:bg-[#22A83E] text-white py-5 rounded-2xl font-bold text-lg shadow-lg transition"
            >
              {loading ? "Submitting..." : "Request Savings Review"}
            </button>

            {/* ===== DISCLAIMER ===== */}
            <div className="pt-6 border-t text-sm text-slate-500 leading-relaxed space-y-2">
              <p>
                Savings are not guaranteed and vary by medication and insurance
                type.
              </p>
              <p>
                Manufacturer programs may not be available for patients with
                government-funded insurance (including Medicare or Medicaid).
              </p>
              <p>Final pricing is confirmed by the pharmacy.</p>
            </div>
          </form>
        )}

        {/* ===== TRUST STRIP ===== */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 border border-[#f5faf6] shadow-sm">
            <DollarSign className="mx-auto text-[#22A83E] mb-2" />
            <p className="font-semibold text-[#1A1A1A]">Copay Card Review</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#f5faf6] shadow-sm">
            <ShieldCheck className="mx-auto text-[#22A83E] mb-2" />
            <p className="font-semibold text-[#1A1A1A]">Insurance Guidance</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#f5faf6] shadow-sm">
            <CheckCircle className="mx-auto text-[#22A83E] mb-2" />
            <p className="font-semibold text-[#1A1A1A]">Prior Auth Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

