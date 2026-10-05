import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sample photography (src/lib/sample-data.ts). The exact query strings make
    // Unsplash serve a pre-sized JPEG for Next to resize, instead of the
    // multi-megabyte original, and block any other variants.
    remotePatterns: [1600, 2400].map((width) => ({
      protocol: "https" as const,
      hostname: "images.unsplash.com",
      pathname: "/photo-*",
      search: `?fm=jpg&q=80&w=${width}`,
    })),
  },
};

export default nextConfig;
