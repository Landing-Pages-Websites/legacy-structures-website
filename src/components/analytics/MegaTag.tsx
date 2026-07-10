// MEGA optimizer snippet (go-live provisioning §4.2). This is the ad-conversion
// signal (MegaTag -> events-api -> ad platforms / Conversions tab). It is NOT
// the lead path — website leads reach Keystone via the server-side POST in
// src/lib/megaLead.ts. The config globals MUST be inline and execute BEFORE the
// optimizer script loads.

const MEGA_SITE_KEY = "sk_mqgo888r_ouktcpk8tvn";

export default function MegaTag() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.MEGA_TAG_CONFIG = { siteKey: "${MEGA_SITE_KEY}" };
            window.API_ENDPOINT = "https://optimizer.gomega.ai";
            window.TRACKING_API_ENDPOINT = "https://events-api.gomega.ai";
          `,
        }}
      />
      <script src="https://cdn.gomega.ai/scripts/optimizer.min.js" async />
    </>
  );
}
