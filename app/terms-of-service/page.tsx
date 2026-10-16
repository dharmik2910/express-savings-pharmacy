import { AlertTriangle, FileText, Gavel, ShieldCheck } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #f9f9f6 0%, #ffffff 100%)" }}
    >
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
            Terms of Service
          </h1>
          <p className="mt-4 max-w-2xl text-slate-500">
            Terms and conditions governing the use of our pharmacy services,
            platforms, and prescription processing systems.
          </p>

          <div
            className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: "#f5faf6", color: "#1A1A1A" }}
          >
            <Gavel className="h-4 w-4" style={{ color: "#E8B84B" }} />
            Governed by New Jersey Law
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left – Sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#1A1A1A] mb-4">Key Terms Overview</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4" style={{ color: "#1A1A1A" }} />
              User Responsibilities
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" style={{ color: "#22A83E" }} />
              Regulatory Compliance
            </li>
            <li className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" style={{ color: "#E8B84B" }} />
              Service Limitations
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

        {/* Right – Main Terms */}
        <div className="lg:col-span-2 space-y-6">
          {[
            {
              title: "1. Eligibility & User Responsibility",
              body: "By using our pharmacy services or submitting any prescription request, you confirm that you are the patient or an authorized representative. You are responsible for ensuring that all information provided is accurate, current, and complete.",
            },
            {
              title: "2. Regulatory & Legal Compliance",
              body: "Prescription services are governed by applicable federal and state laws, including New Jersey Board of Pharmacy regulations, DEA requirements, prescriber authorization rules, and controlled substance regulations. All prescriptions are subject to pharmacist verification and professional judgment.",
            },
            {
              title: "3. Service Limitations",
              body: "We reserve the right to decline, delay, or cancel any request or service that is unsafe, incomplete, invalid, suspected of fraud, or non-compliant with applicable regulations or professional standards.",
            },
            {
              title: "4. No Medical Advice Disclaimer",
              body: "Information provided through our website or digital platforms does not constitute medical advice. Always consult a licensed healthcare provider regarding diagnosis, treatment, or medication-related decisions.",
            },
            {
              title: "5. Governing Law",
              body: "These Terms of Service are governed by and construed in accordance with the laws of the State of New Jersey, without regard to conflict-of-law principles.",
            },
          ].map((section, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2
                className="text-xl font-semibold text-[#1A1A1A] mb-3 pb-2 border-b"
                style={{ borderColor: "#E8B84B40" }}
              >
                {section.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">{section.body}</p>
            </div>
          ))}

          <div
            className="rounded-2xl border p-8 shadow-sm"
            style={{ background: "#fffdf0", borderColor: "#E8B84B40" }}
          >
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-3">
              Questions About These Terms?
            </h2>
            <p className="text-slate-600">
              For questions regarding these Terms of Service, please contact
              your local pharmacy or our compliance team.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
