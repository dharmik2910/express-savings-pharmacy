import { Section, SectionHeader, btn } from "@/components/section";
import { PHARMACY } from "@/lib/pharmacy";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Leaf,
  MessageCircleQuestion,
  Phone,
  ShieldCheck,
  Stethoscope,
  Truck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Express Savings Pharmacy is an independent, local pharmacy in Sicklerville, NJ — licensed pharmacists, free delivery, and personal care for every patient.",
};

/* ============================================
   DATA
============================================ */

const heroPoints = ["Licensed pharmacists", "Free local delivery", "Horizon NJ Health accepted"];

// Keep in sync with the home page stats
const stats = [
  { value: "Licensed", label: "Pharmacists on staff" },
  { value: "Free", label: "Local delivery" },
  { value: "Same day", label: "Refill processing" },
  { value: "Horizon", label: "NJ Health accepted" },
];

const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UserCheck,
    title: "Personalized care",
    text: "Medication reviews and therapy management tailored to you — not a one-size-fits-all script.",
  },
  {
    icon: Truck,
    title: "Free, confidential delivery",
    text: "Prescriptions brought to your door across Sicklerville, discreetly and at no extra cost.",
  },
  {
    icon: HeartHandshake,
    title: "A pharmacist who knows you",
    text: "We remember your name and your history, and we're always a phone call away.",
  },
];

const offers: { icon: LucideIcon; title: string; text: string; image: string | StaticImageData }[] = [
  {
    icon: Leaf,
    title: "Vitamins & Supplements",
    text: "Daily nutrition matched to your health goals and your doctor's advice.",
    image: "/r.png",
  },
  {
    icon: ClipboardList,
    title: "Generic Drug Plans",
    text: "Affordable alternatives that never compromise on quality or safety.",
    image: "/service1.jpg",
  },
  {
    icon: Stethoscope,
    title: "Vaccines & Immunizations",
    text: "Flu, shingles, travel and routine vaccines from certified pharmacists.",
    image: "/vaccination.jpg",
  },
];

/* ============================================
   SECTIONS
============================================ */

function AboutHero() {
  return (
    // Fills the screen below the fixed header on desktop (same as the home hero)
    <section className="relative flex items-center overflow-hidden bg-ink pt-8 text-white lg:min-h-[calc(100svh-5rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,168,62,0.2),transparent_55%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-10 [@media(max-height:860px)]:lg:py-8">
        <div className="text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">About us</p>
          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl [@media(max-height:860px)]:lg:text-5xl">
            Healthcare built on <span className="text-brand">trust</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/70 lg:mx-0 [@media(max-height:860px)]:lg:mt-4 [@media(max-height:860px)]:lg:text-base">
            Express Savings is your independent neighborhood pharmacy in Sicklerville, NJ. We pair
            clinical expertise with the kind of personal service big chains can&apos;t match.
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/75 lg:justify-start">
            {heroPoints.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start [@media(max-height:860px)]:lg:mt-6">
            <Link href="/#contact" className={btn.primary}>
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={PHARMACY.phoneHref} className={btn.outlineLight}>
              <Phone className="h-4 w-4" />
              {PHARMACY.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl lg:aspect-auto lg:h-[min(36rem,calc(100svh-15rem))]">
            <Image
              src="/4.gif"
              alt="A pharmacist at Express Savings Pharmacy"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-[65%_center]"
            />
          </div>
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-ink shadow-xl sm:left-auto sm:right-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold leading-tight">Licensed &amp; local</p>
              <p className="text-xs text-slate-500">Serving Sicklerville, NJ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsRow() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col-reverse items-center py-10 text-center",
              // hairline dividers: between columns, and between rows on the 2×2 layout
              i % 2 === 1 && "border-l border-slate-200",
              i >= 2 && "border-t border-slate-200 lg:border-t-0",
              i === 2 && "lg:border-l",
            )}
          >
            <dt className="mt-1 text-sm text-slate-500">{s.label}</dt>
            <dd className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function StorySection() {
  return (
    <Section tone="muted" className="lg:py-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photo height follows the screen on desktop so the whole section fits in view */}
        <div className="relative mx-auto aspect-4/3 w-full max-w-lg overflow-hidden rounded-3xl lg:aspect-auto lg:h-[min(36rem,calc(100svh-12rem))] lg:max-w-none">
          <Image
            src="/1.jpg"
            alt="Inside Express Savings Pharmacy"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionHeader
            eyebrow="Why patients choose us"
            title={
              <>
                More than a pharmacy — <span className="text-brand">your health partner</span>
              </>
            }
            description="Every prescription is reviewed by a licensed pharmacist who takes the time to get it right."
            className="mb-8 md:mb-8"
          />

          <ul className="space-y-6">
            {values.map((v) => (
              <li key={v.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <v.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-1 text-slate-600">{v.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function OffersSection() {
  return (
    <Section>
      <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="What we offer"
          title={
            <>
              Our core <span className="text-brand">services</span>
            </>
          }
          className="mb-0 md:mb-0"
        />
        <Link
          href="/ALLservice"
          className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
        >
          View all services
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <div
            key={o.title}
            className="group relative flex h-80 flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-white sm:h-96"
          >
            <Image
              src={o.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/0" />

            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <o.icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div className="relative">
              <h3 className="text-2xl font-bold tracking-tight">{o.title}</h3>
              <p className="mt-2 leading-relaxed text-white/75">{o.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CtaBand() {
  return (
    <Section className="py-16 md:py-20">
      <div className="relative overflow-hidden rounded-4xl bg-brand px-6 py-12 text-white sm:px-12 md:py-14">
        {/* Texture: soft glow + faded dot grid on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.22),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[20px_20px] mask-[linear-gradient(to_left,black,transparent_60%)]"
        />

        <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <MessageCircleQuestion className="h-8 w-8" strokeWidth={1.75} />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Have a question? Talk to a pharmacist.
              </h2>
              <p className="mt-2 text-white/85">
                Free consultations · Monday–Friday, 10 AM – 6 PM
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <a href={PHARMACY.phoneHref} className={cn(btn.dark, "bg-white text-ink hover:bg-white/90")}>
              <Phone className="h-4 w-4 text-brand" />
              Call {PHARMACY.phoneDisplay}
            </a>
            <Link href="/prescription" className={btn.outlineLight}>
              Transfer a prescription
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================
   PAGE
============================================ */

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StatsRow />
      <StorySection />
      <OffersSection />
      <CtaBand />
    </>
  );
}
