"use client";

import DecryptedText from "@/components/ui/DecryptedText";
import { Clock, Heart, Pill, Shield, Truck, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// GSAP-based scroll animation — client only
const AnimatedContent = dynamic(() => import("@/components/ui/AnimatedContent"), { ssr: false });
// Glare effect — client only
const GlareHover = dynamic(() => import("@/components/ui/GlareHover"), { ssr: false });

const services = [
  {
    icon: Truck,
    title: "Free Delivery",
    tagline: "Right to your door.",
    description:
      "We deliver prescriptions across Sicklerville and surrounding areas at absolutely no charge. Discreet packaging, reliable timing, and real-time updates on request.",
    accent: "#22A83E",
    stat: { value: "Free", label: "Always" },
  },
  {
    icon: Clock,
    title: "Extended Hours",
    tagline: "Open when you need us.",
    description:
      "Monday through Friday, our pharmacy is open with hours built around your schedule. No rushing, no waiting — just care when it matters.",
    accent: "#E8B84B",
    stat: { value: "5 Days", label: "A Week" },
  },
  {
    icon: Pill,
    title: "Prescriptions",
    tagline: "New, refill, or transfer.",
    description:
      "Whether it's a new script, a routine refill, or switching from another pharmacy — we handle every step. Submit online, by phone, or walk in.",
    accent: "#22A83E",
    stat: { value: "Same Day", label: "Processing" },
  },
  {
    icon: Heart,
    title: "Health Care",
    tagline: "Beyond the prescription.",
    description:
      "We offer personalized consultations, chronic disease management support, and medication therapy reviews — because your health is bigger than a pill bottle.",
    accent: "#E8B84B",
    stat: { value: "1-on-1", label: "Consultations" },
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    tagline: "HIPAA at every step.",
    description:
      "Your personal health data is encrypted and handled with the highest compliance standards. We never share, sell, or compromise your information.",
    accent: "#22A83E",
    stat: { value: "100%", label: "HIPAA Compliant" },
  },
  {
    icon: Zap,
    title: "Fast Service",
    tagline: "Because health can't wait.",
    description:
      "From submission to ready-for-pickup, we move fast. Same-day service is available for most medications — just let us know your urgency.",
    accent: "#E8B84B",
    stat: { value: "<2 hrs", label: "Average Fill Time" },
  },
];

export default function WhatWeProvideSection() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = current.icon;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── SECTION HEADER ── */}
        <AnimatedContent distance={50} direction="vertical" delay={0}>
          <div className="mb-16">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#22A83E" }}
            >
              — What We Provide
            </span>
            <h2
              className="font-black text-[#1A1A1A] leading-none"
              style={{ fontSize: "clamp(38px, 5.5vw, 76px)", letterSpacing: "-0.03em" }}
            >
              Exceptional Care,
              <br />
              <span style={{ color: "#22A83E" }}>Every Single Time</span>
            </h2>
          </div>
        </AnimatedContent>

        {/* ── TAB LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-slate-100">

          {/* LEFT — tab list */}
          <AnimatedContent
            distance={40}
            direction="horizontal"
            reverse={false}
            delay={0.1}
            className="lg:col-span-4 border-r border-slate-100"
          >
            {services.map((s, i) => {
              const TabIcon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="w-full text-left flex items-center gap-5 py-5 pr-8 transition-all duration-300 border-b border-slate-100 group"
                  style={{
                    borderLeft: isActive ? `3px solid ${s.accent}` : "3px solid transparent",
                    paddingLeft: isActive ? "1.25rem" : "1.5rem",
                    background: isActive ? `${s.accent}06` : "transparent",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? `${s.accent}18` : "rgba(0,0,0,0.04)",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <TabIcon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: isActive ? s.accent : "#94a3b8" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-bold text-base leading-tight truncate transition-colors duration-300"
                      style={{ color: isActive ? "#1A1A1A" : "#94a3b8" }}
                    >
                      {s.title}
                    </p>
                    <p
                      className="text-xs mt-0.5 truncate transition-colors duration-300"
                      style={{ color: isActive ? s.accent : "#cbd5e1" }}
                    >
                      {s.tagline}
                    </p>
                  </div>
                  {isActive && (
                    <div
                      className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: current.accent }}
                    />
                  )}
                </button>
              );
            })}
          </AnimatedContent>

          {/* RIGHT — content area */}
          <AnimatedContent
            distance={40}
            direction="horizontal"
            reverse={true}
            delay={0.15}
            className="lg:col-span-8 pl-0 lg:pl-16 pt-10 lg:pt-8 pb-8"
          >
            {/* Ghost number */}
            <div
              className="text-[clamp(80px,14vw,180px)] font-black leading-none select-none mb-2 transition-colors duration-500"
              style={{
                color: `${current.accent}10`,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              {String(active + 1).padStart(2, "0")}
            </div>

            {/* Icon + title */}
            <div className="flex items-center gap-5 mb-6 -mt-6 relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                style={{ background: `${current.accent}15` }}
              >
                <Icon className="w-8 h-8 transition-colors duration-500" style={{ color: current.accent }} />
              </div>
              <div>
                {/* DecryptedText on the title — triggers on view, re-runs on tab change via key */}
                <h3
                  className="font-black text-[#1A1A1A] leading-tight"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.025em" }}
                >
                  <DecryptedText
                    key={`title-${active}`}
                    text={current.title}
                    animateOn="view"
                    sequential={true}
                    speed={35}
                    revealDirection="start"
                    className="text-[#1A1A1A]"
                    encryptedClassName="text-slate-300"
                  />
                </h3>
                <p
                  className="font-semibold mt-0.5 transition-colors duration-500"
                  style={{ color: current.accent }}
                >
                  {current.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl mb-10">
              {current.description}
            </p>

            {/* Stat strip with GlareHover */}
            <GlareHover
              width="auto"
              height="auto"
              borderRadius="1rem"
              glareColor={current.accent}
              glareOpacity={0.2}
              glareAngle={-40}
              glareSize={280}
              transitionDuration={600}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 1.5rem",
                background: `${current.accent}10`,
                cursor: "default",
              }}
            >
              <span
                className="text-4xl font-black leading-none transition-colors duration-500"
                style={{ color: current.accent, letterSpacing: "-0.03em" }}
              >
                {current.stat.value}
              </span>
              <div
                className="w-px h-10 mx-1 transition-colors duration-500"
                style={{ background: `${current.accent}30` }}
              />
              <span
                className="text-sm font-semibold uppercase tracking-widest leading-tight transition-colors duration-500"
                style={{ color: `${current.accent}80` }}
              >
                {current.stat.label}
              </span>
            </GlareHover>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-10">
              {services.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? "2rem" : "0.5rem",
                    height: "0.5rem",
                    background: i === active ? current.accent : "#e2e8f0",
                  }}
                />
              ))}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
