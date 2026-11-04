import type { ConsentMode } from "@/lib/tracking/consent-gate";

/**
 * Site values the shared tracking module reads (src/lib/consent.ts,
 * src/lib/consent-effects.ts and the consent banner). Kept out of the copied
 * template files so those stay byte-identical to site-starter.
 */
export interface SiteConfig {
  /** Public-facing brand name, shown in the consent bar. */
  businessName: string;
  /**
   * "us-default": analytics run until the visitor declines (MEGA fleet
   * policy). "strict": nothing runs until the visitor accepts.
   */
  consentMode: ConsentMode;
}

export const siteConfig: SiteConfig = {
  businessName: "Legacy Structures",
  consentMode: "us-default",
};
