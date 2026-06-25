import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
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
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/building-inventory",
        destination: "/inventory",
        permanent: true,
      },
      {
        source: "/sheds",
        destination: "/storage-sheds",
        permanent: true,
      },
      {
        source: "/storage-buildings",
        destination: "/storage-sheds",
        permanent: true,
      },
      {
        source: "/rent-to-own-sheds",
        destination: "/rent-to-own",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
