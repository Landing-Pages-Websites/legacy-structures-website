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
  const policyCards = [
    {
      title: "Form requests",
      text: "We collect only what you send through quote, contact, guide, coupon, or rent-to-own forms.",
    },
    {
      title: "Cookie choice",
      text: "Essential cookies keep the site working. Optional analytics can be accepted or rejected.",
    },
    {
      title: "No selling data",
      text: "We use submitted details to respond to customers. We do not sell personal information.",
    },
  ];

  const sections = [
    {
      title: "Information You Send Us",
      text: "When you submit a quote, contact, pricing guide, coupon, or rent-to-own form, we may collect your name, email address, phone number, message, and building preferences so we can respond to your request.",
    },
    {
      title: "Cookies and Analytics",
      text: "The site may use essential cookies for basic functionality and limited analytics cookies to understand site usage. You can accept or reject non-essential cookies using the cookie banner.",
    },
    {
      title: "How Information Is Used",
      text: "We use submitted information to answer questions, prepare quotes, send requested guides, and improve the website experience. We do not sell personal information.",
    },
  ];

  return (
    <div className="privacy-page">
      <PageHero
        title="Privacy Policy"
        subtitle="How Legacy Structures handles website information and cookies."
        variant="navy"
      />

      <section className="privacy-wrap">
        <div className="privacy-intro">
          <div>
            <span className="privacy-eyebrow">Website privacy</span>
            <h2>Simple, practical privacy for customer requests.</h2>
          </div>
          <p>
            Legacy Structures respects your privacy. This page explains what we
            collect through the website, why we collect it, and how to contact
            us with questions.
          </p>
        </div>

        <div className="privacy-cards" aria-label="Privacy policy summary">
          {policyCards.map((card) => (
            <article key={card.title} className="privacy-card">
              <strong>{card.title}</strong>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <div className="privacy-content">
          <div className="privacy-main">
            {sections.map((section) => (
              <section key={section.title} className="privacy-section">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}

            <section className="privacy-section">
              <h2>Contact</h2>
              <p>
                Questions about this policy can be sent to{" "}
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or by
                calling <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a>.
                You can also visit us at {BRAND.address}.
              </p>
            </section>
          </div>

          <aside className="privacy-aside" aria-label="Legacy Structures contact">
            <strong>{BRAND.name}</strong>
            <span>{BRAND.addressStreet}</span>
            <span>
              {BRAND.addressCity}, {BRAND.addressState} {BRAND.addressZip}
            </span>
            <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a>
            <Link href="/contact-us">Contact Us</Link>
          </aside>
        </div>
      </section>

      <style>{`
        .privacy-page {
          background: linear-gradient(180deg, #f7f5f2 0%, #ffffff 34%);
        }

        .privacy-wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 46px 20px 76px;
        }

        .privacy-intro {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: 34px;
          align-items: end;
          margin-bottom: 24px;
        }

        .privacy-eyebrow {
          display: inline-flex;
          color: #c0392b;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .privacy-intro h2 {
          color: #1a3a5c;
          font-family: var(--font-poppins), sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.06;
          margin: 0;
          max-width: 560px;
        }

        .privacy-intro p {
          color: #5a6c7e;
          font-size: 17px;
          line-height: 1.75;
          margin: 0;
          padding: 0;
        }

        .privacy-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        .privacy-card {
          background: #ffffff;
          border: 1px solid #e2ddd7;
          border-radius: 8px;
          padding: 18px;
          box-shadow: 0 10px 28px rgba(26, 58, 92, 0.06);
        }

        .privacy-card strong {
          display: block;
          color: #1a3a5c;
          font-family: var(--font-poppins), sans-serif;
          font-size: 15px;
          margin-bottom: 6px;
        }

        .privacy-card p,
        .privacy-section p {
          color: #5a6c7e;
          line-height: 1.7;
          margin: 0;
          padding: 0;
        }

        .privacy-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 24px;
          align-items: start;
        }

        .privacy-main {
          background: #ffffff;
          border: 1px solid #e2ddd7;
          border-radius: 8px;
          padding: 30px;
        }

        .privacy-section + .privacy-section {
          border-top: 1px solid #ebe7e1;
          margin-top: 24px;
          padding-top: 24px;
        }

        .privacy-section h2 {
          color: #1a3a5c;
          font-family: var(--font-poppins), sans-serif;
          font-size: 21px;
          margin: 0 0 8px;
        }

        .privacy-aside {
          position: sticky;
          top: 20px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: #1a3a5c;
          color: #ffffff;
          border-radius: 8px;
          padding: 22px;
          box-shadow: 0 14px 32px rgba(26, 58, 92, 0.14);
        }

        .privacy-aside strong {
          font-family: var(--font-poppins), sans-serif;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .privacy-aside span {
          color: rgba(255, 255, 255, 0.82);
          font-size: 14px;
        }

        .privacy-aside a {
          color: #ffc400;
          font-weight: 800;
          margin-top: 8px;
          text-decoration: none;
        }

        .privacy-main a {
          color: #006580;
          font-weight: 700;
          text-decoration: underline;
        }

        @media (max-width: 820px) {
          .privacy-intro,
          .privacy-content {
            grid-template-columns: 1fr;
          }

          .privacy-cards {
            grid-template-columns: 1fr;
          }

          .privacy-main {
            padding: 22px;
          }

          .privacy-aside {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
