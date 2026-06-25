import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { BRAND } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Legacy Structures in Hudson Falls, NY. Learn how contact form information, cookies, and basic analytics may be used.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "#ffffff" }}>
      <PageHero
        title="Privacy Policy"
        subtitle="How Legacy Structures handles website information and cookies."
        variant="navy"
      />

      <section style={{ padding: "48px 20px 72px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", color: "#24384a" }}>
          <p style={{ color: "#5a6c7e", lineHeight: 1.7 }}>
            Legacy Structures respects your privacy. This page explains the
            basic information we collect through this website and how it is used.
          </p>

          <h2>Information You Send Us</h2>
          <p>
            When you submit a quote, contact, pricing guide, coupon, or
            rent-to-own form, we may collect your name, email address, phone
            number, message, and building preferences so we can respond to your
            request.
          </p>

          <h2>Cookies and Analytics</h2>
          <p>
            The site may use essential cookies for basic functionality and
            limited analytics cookies to understand site usage. You can accept or
            reject non-essential cookies using the cookie banner.
          </p>

          <h2>How Information Is Used</h2>
          <p>
            We use submitted information to answer questions, prepare quotes,
            send requested guides, and improve the website experience. We do not
            sell personal information.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or by calling{" "}
            <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a>. You can also
            visit us at {BRAND.address}.
          </p>

          <p>
            <Link href="/contact-us">Contact Legacy Structures</Link>
          </p>
        </div>
      </section>

      <style>{`
        h2 {
          color: #1a3a5c;
          font-family: var(--font-poppins), sans-serif;
          font-size: 22px;
          margin: 30px 0 10px;
        }

        p {
          font-size: 16px;
          line-height: 1.75;
          margin: 0 0 16px;
        }

        a {
          color: #006580;
          font-weight: 700;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
