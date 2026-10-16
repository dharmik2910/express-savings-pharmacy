"use client";

import {
  Activity,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  Droplets,
  Heart,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Thermometer,
  Truck,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  const specialties = [
    { name: "Autoimmune Conditions", icon: ShieldCheck },
    { name: "Hormone Therapy",       icon: Droplets },
    { name: "Chronic Pain",          icon: Thermometer },
    { name: "Mental Health / ADHD",  icon: Brain },
    { name: "Metabolic Disorders",   icon: Activity },
    { name: "Specialty Injectables", icon: Stethoscope },
  ];

  return (
    <main className="bg-white text-slate-800 overflow-hidden">

      {/* ══════════════════════════════════════════
          HERO — left-aligned copy, image right
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0a140b 0%, #111c12 60%, #0c1a0d 100%)" }}
      >
        {/* Top gradient rule */}
        <div className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, #22A83E, #E8B84B, #22A83E)" }} />

        {/* Ambient blobs */}
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
          style={{ background: "#E8B84B" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ background: "#22A83E" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-40 w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <div className="flex items-center gap-3 mb-7">
              <div className="h-px w-8" style={{ background: "#22A83E" }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#22A83E" }}>
                Full-Service Pharmacy
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6">
              Modern Care,
              <br />
              <span style={{ color: "#E8B84B" }}>Designed</span>
              <br />
              Around You
            </h1>

            <p className="text-white/55 text-base leading-relaxed max-w-md mb-10">
              From everyday prescriptions to specialty therapies, our clinical
              team delivers care that&apos;s personal, compliant, and convenient.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3">
              {["Licensed Pharmacists", "Free Delivery", "Horizon NJ Health", "HIPAA Compliant"].map((t) => (
                <span key={t}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold border"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.04)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Image card */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full rounded-[2rem] border-t-2 border-r-2 pointer-events-none z-0"
              style={{ borderColor: "#E8B84B" }} />
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]">
              <Image src="/1.jpg" alt="Pharmacy Services" fill className="object-cover" priority />
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(10,20,11,0.7), transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAPABILITIES — single white bar overlapping the hero edge
      ══════════════════════════════════════════ */}
      <section className="relative z-20 -mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-100 shadow-[0_30px_60px_-20px_rgba(10,20,11,0.35)]">
            {[
              { icon: Truck,      title: "Free Local Delivery",    desc: "Secure delivery to your home or office", accent: "#22A83E" },
              { icon: ShieldCheck,title: "Insurance & Prior Auth", desc: "We handle approvals and paperwork",      accent: "#E8B84B" },
              { icon: Calendar,   title: "MedSync Program",        desc: "One delivery date for all refills",      accent: "#22A83E" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i}
                  className="group relative flex items-start gap-5 p-8 transition-colors hover:bg-[#f6faf6]">
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: item.accent }} />

                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: `${item.accent}1f` }}>
                    <Icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400">0{i + 1}</span>
                    <h3 className="text-lg font-black text-[#0f1a10] mt-1 mb-1.5">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURE BLOCK — text left, image right
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-1 rounded-full" style={{ background: "#22A83E" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#22A83E" }}>
                Clinical Excellence
              </span>
            </div>

            <h2 className="text-5xl font-black text-[#0f1a10] leading-tight mb-6">
              Full-Service Pharmacy{" "}
              <span style={{ color: "#22A83E" }}>Solutions</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              We manage prescriptions, insurance coordination, specialty
              therapies, vaccinations, and chronic care — all in one place.
            </p>

            <div className="space-y-4">
              {[
                "Prescription Fulfillment",
                "Vaccinations",
                "Chronic Care Support",
              ].map((text) => (
                <div key={text}
                  className="flex items-center gap-4 p-4 rounded-xl border"
                  style={{ borderColor: "#f0f0f0", background: "#fafafa" }}>
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#22A83E" }} />
                  <span className="text-slate-700 font-medium text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            {/* Gold corner frame */}
            <div className="absolute -bottom-3 -left-3 w-full h-full rounded-3xl border-b-2 border-l-2 pointer-events-none z-10"
              style={{ borderColor: "#E8B84B" }} />
            <Image src="/service1.jpg" alt="Pharmacy Care" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SPECIALTY MEDICATIONS
      ══════════════════════════════════════════ */}
      <section className="py-28" style={{ background: "linear-gradient(160deg, #f4f9f4 0%, #fafff8 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

          {/* Dark brand panel */}
          <div className="text-white rounded-3xl p-12 shadow-2xl sticky top-28"
            style={{ background: "linear-gradient(135deg, #0a140b 0%, #111c12 100%)" }}>
            <div className="h-[3px] w-full rounded-full mb-8"
              style={{ background: "linear-gradient(90deg, #22A83E, #E8B84B)" }} />

            <Zap className="w-8 h-8 mb-6" style={{ color: "#E8B84B" }} />
            <h2 className="text-4xl font-black mb-5 leading-tight">
              Specialty <br />Medications
            </h2>
            <p className="text-white/55 mb-8 leading-relaxed">
              We manage complex therapies and insurance approvals so you can
              focus on healing.
            </p>

            <div className="space-y-3">
              {[
                { icon: ClipboardList, label: "Prior Authorization",  accent: "#E8B84B" },
                { icon: Heart,         label: "Clinical Oversight",   accent: "#22A83E" },
              ].map(({ icon: Icon, label, accent }, i) => (
                <div key={i}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
                  <span className="text-sm font-semibold text-white/80">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {specialties.map((item, i) => {
              const Icon = item.icon;
              const accent = i % 2 === 0 ? "#22A83E" : "#E8B84B";
              return (
                <div key={i}
                  className="bg-white border p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all group hover:-translate-y-0.5"
                  style={{ borderColor: `${accent}25` }}>
                  {/* Top bar */}
                  <div className="h-[2px] w-8 rounded-full mb-4" style={{ background: accent }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${accent}15` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h4 className="font-bold text-[#0f1a10] text-sm leading-snug">{item.name}</h4>
                  <div className="flex items-center gap-1 mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: accent }}>
                    Expert Care Available <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MTM — horizontal stat strip + text
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-1 rounded-full" style={{ background: "#22A83E" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#22A83E" }}>
                MTM
              </span>
            </div>
            <h2 className="text-5xl font-black text-[#0f1a10] leading-tight mb-6">
              Medication Therapy{" "}
              <span style={{ color: "#22A83E" }}>Management</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Comprehensive medication reviews to prevent interactions and
              optimize therapy outcomes for every patient.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3.5 text-white rounded-xl text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #22A83E, #1da836)" }}>
              <HeartPulse className="w-4 h-4" /> Personalized Care Coordination
            </div>
          </div>

          {/* Right: horizontal stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Free",    sub: "BP & Glucose",  icon: Activity,   accent: "#22A83E" },
              { label: "Walk-in", sub: "Flu & COVID",   icon: Syringe,    accent: "#E8B84B" },
              { label: "Expert",  sub: "Consults",      icon: Stethoscope,accent: "#22A83E" },
              { label: "SMS",     sub: "Refill Alerts", icon: Clock,      accent: "#E8B84B" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i}
                  className="relative flex items-center gap-4 p-5 rounded-2xl border overflow-hidden"
                  style={{ borderColor: `${stat.accent}25`, background: `${stat.accent}06` }}>
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                    style={{ background: stat.accent }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${stat.accent}18` }}>
                    <Icon className="w-5 h-5" style={{ color: stat.accent }} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#0f1a10]">{stat.label}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">{stat.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
