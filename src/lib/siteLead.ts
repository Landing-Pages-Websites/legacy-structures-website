import { runLeadAttempt, type AttemptOutcome } from "@/lib/lead-attempt";
import { megaTagEvent } from "@/lib/megaTag";
import { pushDataLayer, trackEvent } from "@/lib/track";
import { markFormSubmitFailed, markFormSubmitted, markFormSubmitting } from "@/lib/tracking/form-submit";

export interface SiteLeadSubmission {
  /** The form element, read before any await: React clears currentTarget after the handler yields. */
  form: HTMLFormElement;
  /** The form's `data-mega-form` key. */
  formKey: string;
  /** The site's own API route, which emails the lead and forwards it to Keystone. */
  route: string;
  payload: Record<string, unknown>;
  onConfirmed: () => void;
  onFailed: () => void;
}

/** Conversion signals for a lead the server confirmed; every write is consent-gated. No lead fields go on them. */
function trackLeadConversion(formKey: string): void {
  pushDataLayer({ event: "form_submission" });
  megaTagEvent("form_submit", { form: "lead" });
  trackEvent("lead_form_submit", { form_key: formKey });
}

/** The lead routes answer {success:true}; the MEGA preview sink answers {ok:true}. */
function confirmedBy(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const answer = body as { success?: unknown; ok?: unknown };
  return answer.success === true || answer.ok === true;
}

/** Posts the lead; throws on a network error, a non-2xx or a non-JSON body. */
async function postLead(route: string, payload: Record<string, unknown>): Promise<{ ok: boolean }> {
  const response = await fetch(route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Lead delivery failed (${response.status})`);
  return { ok: confirmedBy(await response.json()) };
}

/**
 * One lead submit through the shared runner. The form is marked in flight
 * before the request, finished only when the route confirms, and failed on
 * every other path. Lead and conversion events fire only after confirmation.
 * These forms have no captcha, so an empty token is the proof-free path.
 */
export function submitSiteLead(lead: SiteLeadSubmission): Promise<AttemptOutcome> {
  const { form, formKey, route, payload, onConfirmed, onFailed } = lead;
  markFormSubmitting(form);
  return runLeadAttempt({
    mintToken: async () => "",
    missingToken: () => "",
    send: () => postLead(route, payload),
    settle: (outcome) => {
      if (outcome.kind === "confirmed") {
        markFormSubmitted(form);
        onConfirmed();
        return;
      }
      trackEvent("form_error", { form_key: formKey, kind: outcome.reason });
      markFormSubmitFailed(form);
      onFailed();
    },
    afterConfirmed: () => trackLeadConversion(formKey),
  });
}
