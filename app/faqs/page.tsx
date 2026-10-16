"use client";

import {
    Beaker,
    ChevronDown,
    DollarSign,
    Phone,
    Pill,
    ShieldCheck,
    Truck,
} from "lucide-react";
import { useState } from "react";

const faqSections = [
  {
    category: "Getting Started",
    icon: Pill,
    faqs: [
      {
        q: "How do I fill my prescriptions at Express Savings Pharmacy?",
        a: `You can fill your prescriptions in several ways:\n• Ask your doctor to send prescriptions directly to Express Savings Pharmacy\n• Request a transfer from your current pharmacy\n• Contact our pharmacy and we will coordinate the transfer for you`,
      },
      {
        q: "Is there a fee to sign up or use Express Savings Pharmacy?",
        a: "No. There is no fee to sign up or use our pharmacy services. We welcome patients with or without insurance, and delivery is available at no additional charge for eligible prescriptions.",
      },
    ],
  },
  {
    category: "Medication Availability",
    icon: ShieldCheck,
    faqs: [
      {
        q: "Do you always have medications in stock?",
        a: "Medication availability can change daily due to manufacturer shortages and distributor limits. Please contact the pharmacy for real-time availability confirmation.",
      },
      {
        q: "Do you carry hard-to-find or backordered medications?",
        a: "Yes. We specialize in sourcing difficult-to-find medications and will review available alternatives whenever possible.",
      },
    ],
  },
  {
    category: "ADHD & Controlled Medications",
    icon: ShieldCheck,
    faqs: [
      {
        q: "Do you fill ADHD medications?",
        a: "Yes. Prescriptions are reviewed and dispensed in full compliance with federal and state regulations.",
      },
      {
        q: "Why do you need my information before checking availability?",
        a: "Patient information is required for safety, regulatory compliance, and accurate coordination of care.",
      },
    ],
  },
  {
    category: "Pricing, Insurance & Savings",
    icon: DollarSign,
    faqs: [
      {
        q: "Can you help lower the cost of brand medications?",
        a: "In many cases, yes. We review manufacturer savings cards, discount programs, and cash pricing options when eligible.",
      },
      {
        q: "Do you accept patients without insurance?",
        a: "Yes. We welcome patients with or without insurance and offer competitive cash pricing.",
      },
      {
        q: "Can you provide medication pricing online?",
        a: "Pricing varies by dosage, insurance, and eligibility. Please contact the pharmacy for accurate pricing information.",
      },
    ],
  },
  {
    category: "Delivery & Convenience",
    icon: Truck,
    faqs: [
      {
        q: "Do you offer prescription delivery?",
        a: "Yes. Delivery is available for eligible prescriptions. Timing may vary based on medication type and location.",
      },
    ],
  },
  {
    category: "Specialty & Auto Accident Prescriptions",
    icon: Beaker,
    faqs: [
      {
        q: "What specialty medications do you offer?",
        a: `We support a wide range of specialty services including:\n• Women's Health & Hormone Therapy\n• Dermatology\n• HIV & Infectious Disease\n• Gastroenterology\n• Endocrinology\n• Rheumatology\n• Neurology\n• Autoimmune & Inflammatory Conditions`,
      },
      {
        q: "Do you handle auto accident (MVA / PIP) prescriptions?",
        a: "Yes. We assist with injury-related prescriptions including coordination with providers and billing when applicable.",
      },
    ],
  },
  {
    category: "Contact & Support",
    icon: Phone,
    faqs: [
      {
        q: "How can I contact Express Savings Pharmacy?",
        a: `You may contact us using the details below:\n\nExpress Savings Pharmacy\n416 Sicklerville Rd\nSicklerville, NJ 08081, United States\n\n📞 Phone: +1 856-566-1100`,
      },
    ],
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(180deg, #f9f9f6 0%, #ffffff 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight">
            Frequently Asked{" "}
            <span style={{ color: "#22A83E" }}>Questions</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
            Everything you need to know about our pharmacy services, policies,
            and patient care.
          </p>
        </div>

        <div className="space-y-10">
          {faqSections.map((section, idx) => {
            const Icon = section.icon;

            return (
              <div key={idx}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: "#f5faf6" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#22A83E" }} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A]">
                    {section.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {section.faqs.map((faq, i) => {
                    const key = `${idx}-${i}`;
                    const isOpen = open === key;

                    return (
                      <div
                        key={key}
                        className="border rounded-2xl bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                        style={{ borderColor: isOpen ? "#22A83E" : "#e2e8f0" }}
                      >
                        <button
                          onClick={() => setOpen(isOpen ? null : key)}
                          className="w-full flex justify-between items-center px-6 py-5 text-left transition-colors hover:bg-slate-50"
                        >
                          <span className="font-medium text-[#1A1A1A]">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className="w-5 h-5 flex-shrink-0 ml-4 transition-transform"
                            style={{
                              color: isOpen ? "#22A83E" : "#94a3b8",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        </button>

                        {isOpen && (
                          <div
                            className="px-6 pb-6 text-slate-600 leading-relaxed whitespace-pre-line border-t"
                            style={{ borderColor: "#22A83E30" }}
                          >
                            <div className="pt-4">{faq.a}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div
          className="mt-16 rounded-2xl p-8 text-center border"
          style={{ background: "#f5faf6", borderColor: "#22A83E40" }}
        >
          <p className="text-[#1A1A1A] font-semibold text-lg mb-2">
            Still have questions?
          </p>
          <p className="text-slate-500 mb-4">Our pharmacy team is ready to help.</p>
          <a
            href="tel:+18565661100"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-colors"
            style={{ background: "#1A1A1A" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#22A83E")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
          >
            <Phone className="w-5 h-5" />
            Call (856) 566-1100
          </a>
        </div>
      </div>
    </section>
  );
}
