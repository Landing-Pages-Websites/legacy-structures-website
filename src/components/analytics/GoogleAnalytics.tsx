// GA4 loader (go-live provisioning §4.2b). Renders nothing unless
// NEXT_PUBLIC_GA4_ID is set, so it is a safe no-op until the id is injected.

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  if (!gaId) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
}
