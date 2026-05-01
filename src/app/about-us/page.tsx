import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PricingGuideSection from "@/components/PricingGuideSection";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Legacy Structures is a family-owned business in Hudson Falls, NY, crafting high-quality sheds and outdoor storage solutions built to last. We have succeeded by providing our customers with dependable storage solutions and a quality buying experience.",
  openGraph: {
    title: "About Us | Legacy Structures",
    description:
      "Family-owned shed builder in Hudson Falls, NY — quality craftsmanship, dependable storage solutions, and friendly personalized service.",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <div>
      <PageHero
        title="About Legacy Structures"
        subtitle="A family-owned business in Hudson Falls, NY — built on craftsmanship, trust, and community."
        variant="navy"
      />

      {/* About copy */}
      <FadeIn>
        <section style={{ background: "#fff", padding: "0 24px 64px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: 18, lineHeight: 1.85, color: "#5a6c7e" }}>
              Legacy Structures is a family-owned business located at 3570 US 4,
              Hudson Falls, NY 12839, proudly serving Hudson Falls and the greater
              Washington County area. We specialize in crafting high-quality sheds
              and outdoor storage solutions built to last, offering everything from
              classic designs to custom options tailored to your needs. As a local,
              family-run company, we&apos;re dedicated to providing top-notch
              craftsmanship and friendly, personalized service that makes every
              project feel like home. Visit us in Hudson Falls to discover why Legacy
              Structures is your trusted choice for durable, stylish sheds!
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Trust badges row */}
      <FadeIn>
        <section style={{ background: "#f7f5f2", padding: "40px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, textAlign: "center" }} className="about-trust-grid">
            {[
              { icon: "🏗️", label: "Family Owned", sub: "Serving Hudson Falls, NY" },
              { icon: "🛡️", label: "5-Year Warranty", sub: "On all our buildings" },
              { icon: "🚚", label: "Free Delivery", sub: "Within 30 miles" },
            ].map((item) => (
              <div key={item.label} style={{ background: "#fff", borderRadius: 12, padding: "28px 20px", border: "1px solid #e8e4df", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1a3a5c", fontFamily: "var(--font-poppins)", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: "#8899aa" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Rent-to-Own CTA */}
      <div style={{ background: "#e9bb52", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          <Link
            href="/rent-to-own"
            style={{ color: "#000", fontWeight: 700, fontSize: 22, textDecoration: "none", textTransform: "uppercase", letterSpacing: 1.5, textAlign: "center", fontFamily: "var(--font-poppins)", padding: "10px 40px", borderRadius: 999, transition: "background 0.2s" }}
          >
            Ask about our<br />
            <span style={{ color: "#b11f29" }}>rent-to-own</span> options
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://legacystructuresusa.com/wp-content/themes/barndealer/_/inc/images/dollar-signs-cta.svg"
            alt="Dollar signs"
            width={280}
            height={140}
          />
        </div>
      </div>

      {/* Pricing Guide Section */}
      <PricingGuideSection />

      <style>{`
        @media (max-width: 600px) {
          .about-trust-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
