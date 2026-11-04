import type { NextConfig } from "next";
import { previewClientEnv } from "./src/lib/previewClientEnv";
import { POSTHOG_ASSETS_HOST, POSTHOG_HOST } from "./src/lib/tracking/destination";
import { trackingBuildWarning, trackingClientEnv } from "./src/lib/tracking/client-env";
import { withMegaPreview } from "./src/mega-preview/preview_config.mjs";

// A build that ships with tracking off says so instead of silently sending nothing.
const trackingWarning = trackingBuildWarning();
if (trackingWarning) console.warn(trackingWarning);

const nextConfig: NextConfig = {
  env: {
    // Derived from MEGA_PREVIEW_MODE so a stray NEXT_PUBLIC value can never
    // hide the live consent bar.
    ...previewClientEnv(),
    // The tracking gate's deployment values, derived from the VERCEL_* names
    // Vercel always sets at build (src/lib/tracking/client-env.ts).
    ...trackingClientEnv(),
  },
  trailingSlash: false,
  // Required for the PostHog proxy: its API calls can use trailing slashes,
  // which Next would otherwise redirect (dropping the POST body). redirects()
  // restores the site's slash redirect for everything else.
  skipTrailingSlashRedirect: true,
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
      {
        protocol: "https",
        hostname: "zleague-public-prod.s3.us-east-2.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    // Same-origin reverse proxy for PostHog (PostHog's documented Next.js
    // pattern) so analytics requests are not blocked by ad blockers.
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${POSTHOG_ASSETS_HOST}/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${POSTHOG_HOST}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path((?!ingest/).+)/",
        destination: "/:path",
        permanent: true,
      },
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

export default withMegaPreview(nextConfig);
