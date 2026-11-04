This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tracking

Analytics go to the shared MEGA Websites PostHog project through the `/ingest` same-origin proxy, under tracking contract v1. The code under `src/lib/tracking/`, the consent store and the analytics components are copied byte-identical from `site-starter`; site values live in `src/site.config.ts` and `next.config.ts`.

- **Site id:** tracking reads `NEXT_PUBLIC_MEGA_SITE_ID` (the managed site id, set in Vercel). `src/lib/megaLead.ts` keeps its own Keystone `site_id` constant for leads; the two are different ids on purpose.
- **Where it runs:** only on a production deploy, or with `NEXT_PUBLIC_MEGA_TRACKING_PREVIEW=1` locally. `NEXT_PUBLIC_MEGA_TRACKING_DISABLED=1` always wins.
- **Consent:** `us-default`. Analytics run until the visitor declines. An explicit Accept also grants Google ad consent, and every decline turns both off. A "Reject Non-Essential" stored by the earlier bar is carried in as a Decline (`src/lib/consent-legacy.ts`).
- **Lead forms:** every form that sends a lead goes through `submitSiteLead` (`src/lib/siteLead.ts`), so lead events fire only when the route confirms. Give each new form a `data-mega-form` key and its submit button a `data-mega-cta`.
- **Labels:** every `<section>` in `<main>` needs a literal `data-mega-section`.
