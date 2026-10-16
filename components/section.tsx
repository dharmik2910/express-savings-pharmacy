import { cn } from "@/lib/utils";
import type React from "react";

/* ============================================
   Shared building blocks for home page sections.
   Every section uses the same container, spacing,
   heading scale, buttons, and inputs.
============================================ */

type Tone = "white" | "muted" | "dark" | "brand";

const toneClasses: Record<Tone, string> = {
  white: "bg-white text-ink",
  muted: "bg-surface text-ink",
  dark: "bg-ink text-white",
  brand: "bg-brand text-white",
};

export function Section({
  id,
  tone = "white",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-20 md:py-24", toneClasses[tone], className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("mb-12 md:mb-14", centered && "mx-auto max-w-2xl text-center", className)}>
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 max-w-2xl text-lg leading-relaxed opacity-70", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export const btn = {
  primary: cn(btnBase, "bg-brand text-white shadow-sm hover:bg-brand-dark"),
  dark: cn(btnBase, "bg-ink text-white shadow-sm hover:bg-black"),
  outline: cn(btnBase, "border border-slate-300 text-ink hover:bg-slate-50"),
  outlineLight: cn(btnBase, "border border-white/25 text-white hover:bg-white/10"),
};

export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10";

export const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
