import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "legacystructuresusa.com",
      },
      {
        protocol: "https",
        hostname: "barndealer.com",
      },
      {
        protocol: "https",
        hostname: "orders.barnportal.com",
      },
      {
        protocol: "https",
        hostname: "www.empireshedsales.com",
      },
      {
        protocol: "https",
        hostname: "yfjpgzqxabrafsllxjvz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
