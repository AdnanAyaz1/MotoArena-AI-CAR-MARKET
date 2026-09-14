import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/saved-cars", "/reservations", "/test-drive"],
      },
    ],
    sitemap: "https://ai-moto-arena.vercel.app/sitemap.xml",
  };
}