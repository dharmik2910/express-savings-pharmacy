import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://expresssavingspharmacy.com";

const ROUTES = [
  "",
  "/about-us",
  "/ALLservice",
  "/prescription",
  "/savings",
  "/faqs",
  "/privacy-policy",
  "/terms-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
