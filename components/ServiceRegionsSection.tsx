import { Section, SectionHeader, btn } from "@/components/section";
import VisitHours from "@/components/visit-hours";
import { PHARMACY } from "@/lib/pharmacy";
import { cn } from "@/lib/utils";
import { CheckCircle2, MapPin, Navigation, Phone } from "lucide-react";

const perks = ["Walk-ins welcome", "Free local delivery", "Horizon NJ Health accepted"];

export default function MapsSection() {
  return (
    <Section
      id="coverage"
      className="bg-[#eef7f0] bg-[radial-gradient(ellipse_at_top_left,rgba(34,168,62,0.14),transparent_55%)]"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ── INFO ── */}
        <div>
          <SectionHeader
            eyebrow="Visit us"
            title={
              <>
                Find us in <span className="text-brand">Sicklerville, NJ</span>
              </>
            }
            className="mb-6 md:mb-6"
          />

          <p className="flex items-start gap-3 text-lg text-slate-700">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" />
            {PHARMACY.street}, {PHARMACY.cityStateZip}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-md">
            <VisitHours />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={PHARMACY.directionsUrl} target="_blank" rel="noopener noreferrer" className={btn.primary}>
              <Navigation className="h-4 w-4" />
              Get directions
            </a>
            <a href={PHARMACY.phoneHref} className={cn(btn.outline, "bg-white")}>
              <Phone className="h-4 w-4" />
              {PHARMACY.phoneDisplay}
            </a>
          </div>
        </div>

        {/* ── MAP CARD ── */}
        <div className="rounded-4xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-black/5">
          <div className="h-80 overflow-hidden rounded-3xl sm:h-96 lg:h-110">
            <iframe
              title="Map of Express Savings Pharmacy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.742306716075!2d-74.97393972352844!3d39.71915697156007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6d2a6f1d0f323%3A0x9311f776a771e584!2sExpress%20Savings%20Pharmacy!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
