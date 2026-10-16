import { FileText, Lock, Share2, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #f9f9f6 0%, #ffffff 100%)" }}
    >
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-slate-500">
            How we collect, use, protect, and share your personal and health
            information in compliance with HIPAA and applicable laws.
          </p>

          <div
            className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: "#f5faf6", color: "#22A83E" }}
          >
            <ShieldCheck className="h-4 w-4" />
            HIPAA & HITECH Compliant
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left – Sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#1A1A1A] mb-4">Policy Overview</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <Lock className="h-4 w-4" style={{ color: "#1A1A1A" }} />
              Data Protection & Security
            </li>
            <li className="flex items-center gap-2">
              <Share2 className="h-4 w-4" style={{ color: "#22A83E" }} />
              Permitted Disclosures
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4" style={{ color: "#22A83E" }} />
              Your Rights
            </li>
          </ul>

          <div
            className="mt-6 rounded-xl p-4 text-xs text-slate-500"
            style={{ background: "#f5faf6" }}
          >
            Last updated:{" "}
            <span className="font-medium text-[#1A1A1A]">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </aside>

        {/* Right – Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {[
            {
              title: "1. Information We Collect",
              content:
                "We collect personal and protected health information (PHI) necessary to provide pharmacy services, including prescription processing, clinical care, billing, insurance coordination, and regulatory compliance. This may include your name, date of birth, contact details, prescription details, and insurance information.",
            },
            {
              title: "2. How We Use Your Information",
              list: [
                "Process and dispense prescriptions",
                "Provide clinical and pharmaceutical care",
                "Coordinate with prescribers and insurers",
                "Meet legal, regulatory, and audit requirements",
              ],
            },
            {
              title: "3. Information Sharing",
              content:
                "Your information may be shared with prescribers, pharmacies, PBMs, insurance plans, Medicare, Medicaid, auditors, and regulatory authorities as permitted by law. All third parties are required to maintain confidentiality and security of your data.",
            },
            {
              title: "4. Data Protection & Safeguards",
              content:
                "We implement administrative, physical, and technical safeguards to protect your data from unauthorized access, loss, misuse, or disclosure. Access to PHI is restricted to authorized personnel only.",
            },
            {
              title: "5. Your Privacy Rights",
              list: [
                "Request access to your records",
                "Request corrections to inaccurate information",
                "Request restrictions on disclosures",
                "Receive an accounting of disclosures",
              ],
            },
          ].map((section, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2
                className="text-xl font-semibold text-[#1A1A1A] mb-3 pb-2 border-b"
                style={{ borderColor: "#22A83E30" }}
              >
                {section.title}
              </h2>

              {section.content && (
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              )}

              {section.list && (
                <ul className="space-y-2 text-slate-600">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#22A83E" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div
            className="rounded-2xl border p-8 shadow-sm"
            style={{ background: "#f5faf6", borderColor: "#22A83E30" }}
          >
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-3">
              Questions or Concerns?
            </h2>
            <p className="text-slate-600">
              If you have questions about this Privacy Policy or believe your
              privacy rights have been violated, please contact our Privacy
              Officer or your local pharmacy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
