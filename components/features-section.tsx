import pharmacistsImg from "@/app/about-us/about1.webp";
import { Section, SectionHeader } from "@/components/section";
import { HeartHandshake, ShieldCheck, UserCheck } from "lucide-react";
import Image from "next/image";

const pillars = [
  {
    icon: UserCheck,
    title: "Pharmacists who know you",
    description: "Every prescription is reviewed by a real person, never automated.",
  },
  {
    icon: HeartHandshake,
    title: "Care, not just counters",
    description: "We remember your name, your history, and what matters to you.",
  },
  {
    icon: ShieldCheck,
    title: "Private & secure",
    description: "HIPAA-compliant handling of your health information, always.",
  },
];

export default function FeaturesSection() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — text */}
        <div>
          <SectionHeader
            eyebrow="Why choose us"
            title={
              <>
                A pharmacy that <span className="text-brand">puts you first</span>
              </>
            }
            className="mb-10 md:mb-10"
          />

          <ul className="space-y-8">
            {pillars.map((p) => (
              <li key={p.title} className="flex gap-4">
                <p.icon className="mt-0.5 h-6 w-6 shrink-0 text-brand" strokeWidth={1.75} />
                <div>
                  <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-1 text-slate-500">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — photo with floating stat */}
        <div className="relative lg:order-last">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src={pharmacistsImg}
              alt="Pharmacists at Express Savings Pharmacy"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              placeholder="blur"
            />
          </div>
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-ink px-6 py-5 text-white shadow-xl sm:left-auto sm:right-8">
            <p className="text-3xl font-extrabold tracking-tight">Local</p>
            <p className="text-sm text-white/60">pharmacy in Sicklerville, NJ</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
