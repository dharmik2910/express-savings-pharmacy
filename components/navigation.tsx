"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/ALLservice" },
  { label: "Savings & Copay Help", href: "/savings" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* ================= TOP ALERT BAR ================= */}
      {showAlert && (
        <div className="fixed top-0 w-full z-41 bg-[#22A83E] text-white pointer-events-none">
          <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-center relative">
            <p className="pointer-events-auto inline-block whitespace-nowrap text-[13px] md:text-base font-semibold animate-slide-left">
              Horizon NJ Health members welcome •{" "}
              <a
                href="tel:+18565661100"
                className="underline font-bold hover:text-[#E8B84B] transition-colors"
              >
                Call (856) 566-1100
              </a>
            </p>

            {/* Close button — desktop only */}
            <button
              onClick={() => setShowAlert(false)}
              className="pointer-events-auto hidden md:flex absolute right-4 hover:bg-black/10 rounded-md p-1 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* ================= NAV BAR ================= */}
      <nav
        className={`fixed w-full
          ${showAlert ? "top-8" : "top-0"}
          bg-[#1A1A1A]
          backdrop-blur-md
          text-white
          shadow-lg
          h-20
          z-40
          transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div
              className="flex items-center h-20 overflow-hidden cursor-pointer shrink-0"
              aria-label="Go to homepage"
              onClick={() => {
                if (pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  router.push("/");
                }
              }}
            >
              <Image
                src="/express-savings-logo-light.png"
                alt="Express Savings Pharmacy"
                width={320}
                height={49}
                priority
                className="h-[52px] w-[220px] sm:w-[280px] lg:w-[240px] xl:w-[320px] object-contain object-left"
              />
            </div>

            {/* Desktop Nav — tablets use the hamburger menu */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-[15px] xl:text-base font-medium text-white/90 hover:text-[#E8B84B] transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* CTA */}
              <a
                href="tel:+18565661100"
                aria-label="Call for a free consultation"
                className="flex shrink-0 items-center gap-3 bg-[#22A83E] text-white px-3 xl:px-5 py-2.5 rounded-lg shadow hover:bg-[#1a8f32] transition-colors"
              >
                <span className="p-1">
                  <Phone size={18} />
                </span>
                <div className="hidden xl:block leading-tight">
                  <p className="text-sm font-semibold">Free Consultation</p>
                  <p className="text-xs opacity-90">(856) 566-1100</p>
                </div>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* ================= MOBILE MENU ================= */}
          {isOpen && (
            <div className="lg:hidden relative overflow-hidden rounded-b-2xl animate-slideInUp">
              <div className="relative z-10 px-2 pb-6 pt-4 bg-[#1A1A1A] border-t border-white/10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-3 px-3 font-semibold text-white/90 hover:text-[#E8B84B] rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <a
                  href="tel:+18565661100"
                  className="mt-4 flex bg-[#22A83E] items-center justify-center gap-2 text-white px-3 py-3 rounded-xl shadow hover:bg-[#1a8f32] transition-colors"
                >
                  <Phone size={18} />
                  <p className="text-sm font-semibold">
                    Free Consultation — (856) 566-1100
                  </p>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
