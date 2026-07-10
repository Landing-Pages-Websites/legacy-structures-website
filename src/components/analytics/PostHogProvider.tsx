"use client";

// PostHog provider (go-live provisioning §4.2b). Initializes the posthog-js
// SDK via the npm package (NOT the inline array.js snippet — that snippet's
// capture->queue->flush pipeline failed to start in this build and silently
// dropped events). Renders children untouched when NEXT_PUBLIC_POSTHOG_KEY is
// unset, so it is a safe no-op until the key is injected.

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    if (typeof window === "undefined") return;
    // Guard against double-init on client navigations / fast refresh.
    if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      disable_session_recording: true,
      autocapture: true,
    });
  }, []);

  if (!POSTHOG_KEY) return <>{children}</>;

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
