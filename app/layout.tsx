import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import type React from "react";
import "./globals.css";

import FloatingCallButton from "@/components/FloatingCallButton";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

/* ============================================
   SEO + META CONFIG (EXPRESS SAVINGS – SICKLERVILLE, NJ)
============================================ */

export const metadata: Metadata = {
  metadataBase: new URL("https://expresssavingspharmacy.com"),

  title: {
    default: "Express Savings Pharmacy – Local Pharmacy in Sicklerville, NJ",
    template: "%s | Express Savings Pharmacy",
  },

  description:
    "Looking for a pharmacy near Sicklerville Rd in Sicklerville, NJ? Express Savings Pharmacy offers free prescription delivery, vaccinations, refills, and personalized care.",

  applicationName: "Express Savings Pharmacy",

  alternates: {
    canonical: "https://expresssavingspharmacy.com",
  },

  openGraph: {
    title: "Express Savings Pharmacy | Sicklerville, NJ",
    description:
      "Your neighborhood pharmacy in Sicklerville, NJ. Free delivery, immunizations, and personalized care.",
    url: "https://expresssavingspharmacy.com",
    siteName: "Express Savings Pharmacy",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Express Savings Pharmacy - Sicklerville NJ",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Express Savings Pharmacy | Sicklerville NJ",
    description:
      "Local pharmacy in Sicklerville providing fast service, free delivery & vaccinations.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ============================================
   ROOT LAYOUT
============================================ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navigation />

        {/* ===============================
            STRUCTURED DATA (JSON-LD)
        ================================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Pharmacy",
              name: "Express Savings Pharmacy",
              url: "https://expresssavingspharmacy.com",
              logo: "https://expresssavingspharmacy.com/logo.png",
              image: "https://expresssavingspharmacy.com/og-image.png",
              description:
                "Express Savings Pharmacy in Sicklerville, NJ offering prescription services, vaccinations, free delivery and insurance assistance.",
              telephone: "+1-856-566-1100",
              email: "expresspharmacy416@gmail.com",
              priceRange: "$$",

              address: {
                "@type": "PostalAddress",
                streetAddress: "416 Sicklerville Rd",
                addressLocality: "Sicklerville",
                addressRegion: "NJ",
                postalCode: "08081",
                addressCountry: "US",
              },

              geo: {
                "@type": "GeoCoordinates",
                latitude: "39.7283",
                longitude: "-75.0260",
              },

              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "10:00",
                  closes: "18:00",
                },
              ],

              sameAs: [
                "https://www.facebook.com/expresssavingsrx",
                "https://www.instagram.com/expresssavingsrx",
              ],
            }),
          }}
        />

        <main className="pt-20">{children}</main>

        <Footer />
        <FloatingCallButton />

        <Analytics />
      </body>
    </html>
  );
}
