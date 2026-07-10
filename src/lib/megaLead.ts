// MEGA Keystone lead pipeline (go-live provisioning §4.2c).
// Website leads must reach the Keystone lead store tagged as website-* leads.
// This runs IN ADDITION to the existing Resend email — a Keystone failure must
// never break the form's existing success behavior (fire-and-log).

const MEGA_SUBMISSION_ENDPOINT = "https://analytics.gomega.ai/submission/submit";

// MEGA identifiers for Legacy Structures (from go-live provisioning §3).
const MEGA_CUSTOMER_ID = "354f9e65-c4c2-43c4-9482-327fadfb8dce";
const MEGA_SITE_ID = "96b3cb5a-15a8-42c6-b163-0a672ac71190";
const MEGA_SOURCE_PROVIDER = "website-6kBvwBIsVC";

export interface MegaLeadFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

/**
 * Forward a successful lead submission to the MEGA Keystone lead store.
 * Non-blocking and non-throwing: logs on failure and returns, so the caller's
 * existing success/redirect path is never affected.
 */
export async function sendMegaLead(formData: MegaLeadFormData): Promise<void> {
  try {
    const res = await fetch(MEGA_SUBMISSION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id: MEGA_CUSTOMER_ID,
        site_id: MEGA_SITE_ID,
        source_provider: MEGA_SOURCE_PROVIDER,
        form_data: formData,
      }),
    });
    if (!res.ok) {
      console.error(`[megaLead] Keystone submission failed: ${res.status}`);
    }
  } catch (err) {
    console.error("[megaLead] Keystone submission error:", err);
  }
}
