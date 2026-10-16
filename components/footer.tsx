"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalType, setLegalType] = useState<
    "privacy" | "terms" | "hipaa" | "contact"
  >("privacy");

  const openLegalModal = (type: "privacy" | "terms" | "hipaa" | "contact") => {
    setLegalType(type);
    setShowLegalModal(true);
  };

  return (
    <>
      <footer className="bg-[#1A1A1A] text-white !animate-none !transform-none !rotate-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top accent line */}
          {/* <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #E8B84B, #22A83E, #E8B84B)" }} /> */}

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12 py-16">
            <div className="sm:col-span-3 lg:col-span-1">
              <div className="mb-4 flex h-14 w-full max-w-60 items-center">
                <Image
                  src="/express-savings-logo-light.png"
                  alt="Express Savings Pharmacy"
                  width={240}
                  height={40}
                  priority
                  className="h-auto max-h-10 w-full object-contain object-left"
                />
              </div>

              <p className="text-white/70 mb-4 max-w-sm">
                Your trusted pharmacy partner for secure, reliable prescription
                services.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4" style={{ color: "#E8B84B" }}>Quick Links</h4>
              <div role="list" className="space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about-us" },
                  { label: "Services", href: "/ALLservice" },
                  { label: "Contact Us", href: "/#contact" },
                ].map((item) => (
                  <div role="listitem" key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/70 hover:text-[#E8B84B] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4" style={{ color: "#E8B84B" }}>Services</h4>
              <div role="list" className="space-y-2">
                {[
                  { label: "RX Submission", href: "/prescription" },
                  { label: "Fast Delivery", href: "/ALLservice" },
                  { label: "Customer Support", href: "/#contact" },
                  { label: "Insurance", href: "/savings" },
                ].map((item) => (
                  <div role="listitem" key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/70 hover:text-[#E8B84B] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4" style={{ color: "#E8B84B" }}>Legal</h4>
              <div role="list" className="space-y-2">
                <div role="listitem">
                  <Link href="/privacy-policy" className="text-white/70 hover:text-[#E8B84B] transition-colors">
                    Privacy Policy
                  </Link>
                </div>
                <div role="listitem">
                  <Link href="/terms-of-service" className="text-white/70 hover:text-[#E8B84B] transition-colors">
                    Terms of Service
                  </Link>
                </div>
                <div role="listitem">
                  <button
                    onClick={() => openLegalModal("hipaa")}
                    className="text-left text-white/70 hover:text-[#E8B84B] transition-colors"
                  >
                    HIPAA Compliance
                  </button>
                </div>
                <div role="listitem">
                  <button
                    onClick={() => openLegalModal("contact")}
                    className="text-left text-white/70 hover:text-[#E8B84B] transition-colors"
                  >
                    Contact Info
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          <div className="py-8 flex flex-col sm:flex-row justify-between items-center text-white/60 text-sm">
            <p>© {currentYear} Express Savings Pharmacy. All rights reserved.</p>

            <p className="flex items-center gap-1 mt-4 sm:mt-0">
              Made with{" "}
              <a
                href="https://drugdroprx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:scale-110 transition-transform"
                aria-label="Visit DrugDropRx website"
              >
                <Heart size={16} style={{ color: "#22A83E" }} />
              </a>{" "}
              for your health
            </p>
          </div>
        </div>
      </footer>

      {/* ===== LEGAL MODAL ===== */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b" style={{ borderLeftWidth: 4, borderLeftColor: "#22A83E" }}>
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                {legalType === "privacy" && "Privacy Policy"}
                {legalType === "terms" && "Terms of Service"}
                {legalType === "hipaa" && "HIPAA Compliance"}
                {legalType === "contact" && "Contact Information"}
              </h2>
              <button
                onClick={() => setShowLegalModal(false)}
                className="text-slate-400 hover:text-[#1A1A1A] text-2xl leading-none transition-colors"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto text-sm text-slate-700 space-y-4 leading-relaxed">
              {legalType === "privacy" && (
                <>
                  <p>
                    We collect, use, and protect your personal and health
                    information in strict compliance with HIPAA, the HITECH Act,
                    and New Jersey privacy laws. Your information is used only
                    for prescription processing, clinical care, billing, and
                    regulatory compliance. We do not sell your personal or
                    health information.
                  </p>
                  <p>
                    Your information may be shared with prescribers, pharmacies,
                    insurance plans, PBMs, Medicare, Medicaid, auditors, and
                    regulatory authorities as permitted by law. All third
                    parties are required to maintain confidentiality and
                    security of your information.
                  </p>
                  <p>
                    We maintain administrative, physical, and technical
                    safeguards to protect your data against unauthorized access,
                    loss, or misuse.
                  </p>
                </>
              )}

              {legalType === "terms" && (
                <>
                  <p>
                    By using our pharmacy services or submitting a prescription
                    request, you confirm that you are the patient or an
                    authorized representative and that all information provided
                    is accurate and complete.
                  </p>
                  <p>
                    Prescription services are subject to federal law, New Jersey
                    Board of Pharmacy regulations, DEA requirements, prescriber
                    authorization rules, and controlled substance regulations.
                  </p>
                  <p>
                    All services are subject to pharmacist review and
                    professional judgment. We reserve the right to decline any
                    request that is unsafe, invalid, incomplete, or
                    non-compliant.
                  </p>
                  <p>
                    These Terms are governed by the laws of the State of New
                    Jersey.
                  </p>
                </>
              )}

              {legalType === "hipaa" && (
                <>
                  <p>
                    We are fully compliant with the Health Insurance Portability
                    and Accountability Act (HIPAA) and maintain strict
                    safeguards to protect your protected health information
                    (PHI).
                  </p>
                  <p>
                    You have the right to access your records, request
                    corrections, request restrictions on disclosures, and
                    receive an accounting of disclosures. Requests must be made
                    in writing.
                  </p>
                  <p>
                    If you believe your privacy rights have been violated, you
                    may file a complaint with our Privacy Officer or with the
                    U.S. Department of Health & Human Services. We will not
                    retaliate for any complaint.
                  </p>
                </>
              )}

              {legalType === "contact" && (
                <>
                  <p className="font-semibold text-[#1A1A1A]">
                    Express Savings Pharmacy
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:+18565661100"
                      className="underline"
                      style={{ color: "#22A83E" }}
                    >
                      (856) 566-1100
                    </a>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:expresspharmacy416@gmail.com"
                      className="underline"
                      style={{ color: "#22A83E" }}
                    >
                      expresspharmacy416@gmail.com
                    </a>
                  </p>
                </>
              )}
            </div>

            <div className="px-6 py-4 border-t text-right">
              <button
                onClick={() => setShowLegalModal(false)}
                className="px-6 py-2 rounded-lg text-white font-semibold transition-colors"
                style={{ background: "#1A1A1A" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#22A83E")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
