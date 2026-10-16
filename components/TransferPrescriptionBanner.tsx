import { Section, btn } from "@/components/section";
import { cn } from "@/lib/utils";
import { PHARMACY } from "@/lib/pharmacy";
import { ArrowRight, CheckCircle, ClipboardList, PhoneCall, Phone, ShoppingBag } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Tell us your pharmacy",
    text: "Share your name, date of birth, and current pharmacy.",
  },
  {
    icon: PhoneCall,
    title: "We make the call",
    text: "Our team contacts them and moves your prescriptions over.",
  },
  {
    icon: ShoppingBag,
    title: "Pick up or get delivery",
    text: "Your medication is ready — often the same day.",
  },
];

export default function TransferPrescriptionBanner() {
  return (
    <Section tone="brand" className="relative overflow-hidden">
      {/* Decorative rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border-[40px] border-white/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-white/5"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy + CTAs */}
        <div>
          <p className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            Switch pharmacies
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Transfer your prescription in minutes
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Moving to Express Savings is fast and free. Tell us where your prescriptions are
            today — we&apos;ll contact your current pharmacy and handle the rest.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/prescription"
              className={cn(btn.dark, "bg-white text-ink hover:bg-white/90")}
            >
              Transfer now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={PHARMACY.phoneHref} className={btn.outlineLight}>
              <Phone className="h-4 w-4" />
              Call {PHARMACY.phoneDisplay}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/90">
            {["No paperwork", "Same-day ready", "100% free"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* How it works */}
        <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl shadow-black/10 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            How it works
          </p>
          <ol className="mt-6 space-y-6">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative flex gap-4">
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-6 top-12 h-[calc(100%-1.5rem)] w-px -translate-x-1/2 bg-slate-200"
                  />
                )}
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="pt-1">
                  <p className="font-semibold">
                    <span className="mr-2 text-brand">{i + 1}.</span>
                    {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
