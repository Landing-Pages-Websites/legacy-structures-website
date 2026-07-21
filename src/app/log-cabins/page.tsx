import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ProductSection from "@/components/ProductSection";
import { createPageMetadata } from "@/lib/metadata";
import ProductSchema from "@/components/ProductSchema";

export const metadata: Metadata = createPageMetadata({
  title: "Log Cabins for Sale | Hudson Falls, NY",
  description:
    "Browse log cabins at Legacy Structures in Hudson Falls, NY. Butt-and-pass log corners with hand-hewn options for offices, retreats & hunting camps. Free delivery within 30 miles.",
  path: "/log-cabins",
});

const CABIN_IMAGE_BASE = "/images/optimized-assets/log-cabins";

const heroImage = `${CABIN_IMAGE_BASE}/bear-lake.webp`;

const series = [
  {
    title: "Redwood Series",
    desc: "An entry-level log cabin with the authentic look and durability of the full series. The Redwood is perfect for a backyard office, cozy retreat, or seasonal studio. Built with the same butt-and-pass corner construction found throughout the line.",
    image: `${CABIN_IMAGE_BASE}/redwood.webp`,
    sizeGroups: [
      { label: "12′ WIDE", sizes: ["12x16", "12x20", "12x24"] },
      { label: "14′ WIDE", sizes: ["14x24", "14x28", "14x32"] },
    ],
  },
  {
    title: "Bear Lake Series",
    desc: "One of the most popular cabin lines, the Bear Lake brings classic log-cabin character to any property. Ideal as a 3-season cabin, home office, or guest quarters. Butt-and-pass log corners and LP siding options available.",
    image: `${CABIN_IMAGE_BASE}/bear-lake.webp`,
    sizeGroups: [
      { label: "12′ WIDE", sizes: ["12x20", "12x24", "12x28"] },
      { label: "14′ WIDE", sizes: ["14x24", "14x28", "14x32", "14x36"] },
    ],
  },
  {
    title: "Timber Trail Series",
    desc: "Designed for those who want more space without compromising the rustic look. The Timber Trail is built for hunting camps and campground cabins — roomy enough for a real getaway, rugged enough for serious outdoor use.",
    image: `${CABIN_IMAGE_BASE}/timber-trail.webp`,
    sizeGroups: [
      { label: "14′ WIDE", sizes: ["14x32", "14x36", "14x40", "14x48"] },
    ],
  },
  {
    title: "Appalachian Series",
    desc: "The Appalachian Series offers a full hand-hewn cabin experience — thick, textured logs and a deep mountain aesthetic. Perfect for a campground centerpiece or an upscale hunting lodge. Available in multiple widths and lengths.",
    image: `${CABIN_IMAGE_BASE}/appalachian.webp`,
    sizeGroups: [
      { label: "12′ WIDE", sizes: ["12x24", "12x28", "12x32"] },
      { label: "14′ WIDE", sizes: ["14x28", "14x32", "14x36", "14x40"] },
    ],
  },
  {
    title: "Doublewide Cabin",
    desc: "When you need a real cabin footprint, the Doublewide delivers. Delivered in two halves and joined on-site, this cabin can accommodate full-time living, a large hunting retreat, or a premium campground rental cabin.",
    image: `${CABIN_IMAGE_BASE}/doublewide.webp`,
    sizeGroups: [
      { label: "24′ WIDE", sizes: ["24x24", "24x28", "24x32", "24x36", "24x40"] },
    ],
  },
];

const highlights = [
  { label: "Corner Style", value: "Butt-and-pass log corners — authentic hand-crafted look" },
  { label: "Hand-Hewn Option", value: "Full hand-hewn cabin available for campground or hunting camp" },
  { label: "Use Cases", value: "Home office, studio, 3-season cabin, hunting camp, campground cabin" },
  { label: "Delivery", value: "Pre-built and delivered to your site — no construction crew needed" },
  { label: "Customization", value: "Multiple siding, door, window, and roof color options" },
];

export default function LogCabinsPage() {
  return (
    <div>
      <PageHero
        title="Log Cabins"
        subtitle="Masterfully Designed, Skillfully Built."
        backgroundImage={heroImage}
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left — Hero + Designer CTA */}
          <div className="lg:w-[67%]">
            <Image
              src={heroImage}
              alt="Log Cabin by Legacy Structures"
              width={815}
              height={529}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 67vw"
              priority
            />
            <a
              href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Image
                src="/images/optimized-assets/3d-designer-models-cta.webp"
                alt="3D Designer — Design Your Own Building"
                width={828}
                height={107}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 67vw"
              />
            </a>
          </div>
          {/* Right — Quote Form */}
          <div className="lg:w-[33%]">
            <QuoteForm title="Request Your" titleSpan="FREE Cabin Quote!" />
          </div>
        </div>
      </div>

      <div className="bg-white max-w-7xl mx-auto px-4 py-10">

        {/* Intro */}
        <FadeIn>
          <h2 className="page-content-heading">
            Real Log Cabins — Delivered to Your Property
          </h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Our log cabins aren&apos;t kits or DIY projects — they&apos;re pre-built structures
            crafted by skilled builders and delivered ready to place. Whether you need a private home
            office, a 3-season getaway, a hunting camp, or a campground rental cabin, we have a series
            that fits your vision and your budget.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Every cabin in the lineup features authentic{" "}
            <strong>butt-and-pass log corner construction</strong> for that genuine hand-crafted look.
            Our full hand-hewn option takes it even further — perfect for campgrounds or upscale hunting
            camps that demand a real cabin experience.
          </p>
          <p className="mb-8">
            <Link href="/contact-us" className="text-[#c0392b] font-bold underline">
              Request a quote on your log cabin →
            </Link>
          </p>
        </FadeIn>

        {/* Brochure Download */}
        <FadeIn>
          <div
            style={{
              background: "#1a3a5c",
              borderRadius: 10,
              padding: "28px 32px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              marginBottom: 48,
            }}
          >
            <div>
              <p style={{ color: "#ffc400", fontFamily: "var(--font-oswald), Impact, sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>
                Free Download
              </p>
              <h3 style={{ color: "#fff", fontFamily: "var(--font-oswald), Impact, sans-serif", fontSize: 26, fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
                Portable Buildings &amp; Log Cabins Catalog
              </h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 8, marginBottom: 0 }}>
                Full series pricing, sizes, floor plans, and finish options in one PDF.
              </p>
            </div>
            <a
              href="https://www.empireshedsales.com/download/?id=3346"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#ffc400",
                color: "#111",
                fontFamily: "var(--font-oswald), Impact, sans-serif",
                fontSize: 18,
                fontWeight: 700,
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: 5,
                whiteSpace: "nowrap",
                transition: "background 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Catalog (PDF)
            </a>
          </div>
        </FadeIn>

        {/* Highlights */}
        <FadeIn>
          <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
            <h2 className="page-content-heading">Log Cabin Highlights</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {highlights.map((h) => (
                <div
                  key={h.label}
                  style={{
                    background: "#f7f5f2",
                    borderLeft: "4px solid #1a3a5c",
                    padding: "14px 18px",
                    borderRadius: "0 6px 6px 0",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#bd171f",
                      letterSpacing: "0.08em",
                      marginBottom: 4,
                    }}
                  >
                    {h.label}
                  </span>
                  <span style={{ color: "#1a3a5c", fontSize: 15, fontWeight: 600 }}>
                    {h.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Series Sections */}
        {series.map((s) => (
          <FadeIn key={s.title}>
            <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
              <ProductSection
                title={s.title}
                description={s.desc}
                image={s.image}
                imageAlt={s.title}
                sizeGroups={s.sizeGroups}
              />
            </div>
          </FadeIn>
        ))}

        <DisclaimerText />
        <DesignerCTA />
        <PricingGuideSection />
      </div>
      <ProductSchema
        name="Log Cabins"
        description="Pre-built log cabins with authentic butt-and-pass log corner construction. Multiple series available: Redwood, Bear Lake, Timber Trail, Appalachian, and Doublewide."
        image="https://www.legacystructuresusa.com/images/optimized-assets/log-cabins/bear-lake.webp"
        url="https://www.legacystructuresusa.com/log-cabins"
        price="$7,000+"
      />
    </div>
  );
}
