import capsulesImg from "@/app/ALLservice/service2.jpg";
import pharmacistImg from "@/app/ALLservice/service3.jpg";
import pharmacistsImg from "@/app/about-us/about1.jpg";
import { SectionHeader } from "@/components/section";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ClipboardList,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type Variant = "dark" | "brand" | "gold" | "light";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  variant: Variant;
  image: string | StaticImageData;
};

// Every card has a photo; the tinted fade gives each its own look
const services: Service[] = [
  { icon: Pill, title: "Rx Refills", description: "Online, by phone, or in person — often same day.", variant: "dark", image: "/service1.jpg" },
  { icon: Truck, title: "Free Delivery", description: "To your door anywhere in our Sicklerville area.", variant: "brand", image: "/1.jpg" },
  { icon: Stethoscope, title: "Immunizations", description: "Flu, COVID, shingles and more. Walk-ins welcome.", variant: "light", image: "/C9R8PCC-2x-e1617767425910-qig6myet7rl98jxvek8uleit5vcznzkdk9tqigo988.jpg" },
  { icon: ClipboardList, title: "Generic Savings", description: "Affordable alternatives without cutting quality.", variant: "gold", image: capsulesImg },
  { icon: HeartPulse, title: "Chronic Care", description: "1-on-1 support for diabetes, blood pressure and more.", variant: "dark", image: pharmacistImg },
  { icon: ShieldCheck, title: "Insurance Help", description: "Most plans accepted, including Horizon NJ Health.", variant: "brand", image: pharmacistsImg },
];

const variantClasses: Record<Variant, { overlay: string; icon: string; title: string; text: string }> = {
  dark: {
    overlay: "from-ink via-ink/65 to-ink/0",
    icon: "bg-white/15 text-white",
    title: "text-white",
    text: "text-white/75",
  },
  brand: {
    overlay: "from-brand via-brand/75 to-brand/0",
    icon: "bg-white/20 text-white",
    title: "text-white",
    text: "text-white/85",
  },
  gold: {
    overlay: "from-gold via-gold/85 to-gold/0",
    icon: "bg-white/50 text-ink",
    title: "text-ink",
    text: "text-ink/75",
  },
  light: {
    overlay: "from-white via-white/90 to-white/0",
    icon: "bg-white/70 text-brand",
    title: "text-ink",
    text: "text-slate-600",
  },
};

function ServiceCard({ service }: { service: Service }) {
  const v = variantClasses[service.variant];
  const Icon = service.icon;

  return (
    <div className="group relative flex h-80 w-64 flex-col justify-between overflow-hidden rounded-3xl bg-ink p-6 transition-transform duration-300 hover:-translate-y-1.5 sm:h-88 sm:w-72 sm:p-7">
      <Image
        src={service.image}
        alt=""
        fill
        sizes="288px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className={cn("absolute inset-0 bg-linear-to-t", v.overlay)} />

      <span className={cn("relative flex h-12 w-12 items-center justify-center rounded-2xl backdrop-blur", v.icon)}>
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>

      <div className="relative">
        <h3 className={cn("text-2xl font-bold tracking-tight", v.title)}>{service.title}</h3>
        <p className={cn("mt-2 leading-relaxed", v.text)}>{service.description}</p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 overflow-hidden bg-white py-20 text-ink md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <SectionHeader
          eyebrow="Our services"
          title={
            <>
              Everything you need, <span className="text-brand">under one roof</span>
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

      {/* Endless marquee — pauses on hover; with reduced motion it becomes a swipeable row */}
      <div className="group/marquee relative mt-12 md:mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-white to-transparent sm:w-24" />

        <div className="motion-reduce:overflow-x-auto">
          <div className="flex w-max animate-marquee py-2 group-hover/marquee:paused motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex">
                {services.map((s) => (
                  <li key={s.title} className="pr-5">
                    <ServiceCard service={s} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
