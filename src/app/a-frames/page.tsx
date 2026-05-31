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

export const metadata: Metadata = {
  title: "Summit Peaks A-Frames | Pre-Built A-Frame Cabins | Legacy Structures",
  description:
    "Build your dream getaway with Legacy Structures' Summit Peaks A-Frames. Pre-built shells or fully finished turnkey units with electrical, plumbing, and climate control. Delivered to NY, VT, NH, CT and surrounding areas.",
};

const EMPIRE_BASE =
  "https://www.empireshedsales.com/wp-content/uploads";

const heroImage = `${EMPIRE_BASE}/2023/09/Summit-Peaks-hero-1.jpg`;

const packages = [
  {
    title: "Reverse Dormer Package",
    desc: "A dramatic reverse-dormer roofline that opens up interior headroom and adds curb appeal. Available in multiple sizes.",
    image: `${EMPIRE_BASE}/2023/09/ReverseDormer-Package.jpg`,
  },
  {
    title: "12′ × 12′ A-Frame",
    desc: "The compact classic — perfect starter A-frame for a weekend retreat, backyard studio, or reading escape.",
    image: `${EMPIRE_BASE}/2023/09/12x12-AFrame.jpg`,
  },
  {
    title: "12′ × 12′ A-Frame with 2′ Knee Wall",
    desc: "A 2-foot knee wall extension on this 12×12 adds usable wall storage and headroom near the floor.",
    image: `${EMPIRE_BASE}/2023/09/12x12-KneeWall.jpg`,
  },
  {
    title: "12′ × 16′ Reverse Dormer A-Frame",
    desc: "More space and the reverse-dormer silhouette in a 12×16 footprint — an ideal cabin-size getaway.",
    image: `${EMPIRE_BASE}/2023/09/12x16-ReverseDormer.jpg`,
  },
  {
    title: "12′ × 16′ A-Frame with Porch Package",
    desc: "A full front porch on this 12×16 creates an outdoor living room — sip your morning coffee in the trees.",
    image: `${EMPIRE_BASE}/2023/09/12x16-Porch.jpg`,
  },
  {
    title: "12′ × 20′ A-Frame with Porch Package and Side Dormer",
    desc: "The most feature-rich package — 12×20 footprint, wraparound porch, and a side dormer for extra natural light.",
    image: `${EMPIRE_BASE}/2023/09/12x20-SideDormer.jpg`,
  },
];

const specs = [
  { label: "Popular Sizes", value: "12×20 and 12×24" },
  { label: "Custom Sizes", value: "Up to 14×40" },
  { label: "Siding", value: "Premium white pine — 6″ tongue & groove or 10″ board & batten" },
  { label: "Interior", value: "Tongue & groove pine interior finishes" },
  { label: "Insulation", value: "Full insulation packages available" },
  { label: "Electrical", value: "Turnkey electrical package available" },
  { label: "Dormers", value: "Side Dormer and Reverse Dormer add-ons" },
  { label: "Delivery", value: "Unfinished shell or fully finished turnkey unit" },
];

export default function AFramesPage() {
  return (
    <div>
      <PageHero
        title="Summit Peaks A-Frames"
        subtitle="Build Your Dream Getaway."
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
              alt="Summit Peaks A-Frame cabin by Legacy Structures"
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
            <QuoteForm title="Request Your" titleSpan="FREE A-Frame Quote!" />
          </div>
        </div>
      </div>

      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        {/* Intro */}
        <FadeIn>
          <h2 className="page-content-heading">
            Pre-Built A-Frames — Not Kits. Real Buildings, Ready to Deliver.
          </h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Summit Peaks A-Frames are <strong>pre-built structures</strong>, not DIY kits. Every unit
            is crafted with care by skilled builders and delivered directly to your property. Choose
            an unfinished shell to customize yourself, or order a fully finished turnkey unit — complete
            with electrical, plumbing, and climate control — ready to move in.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Popular sizes run 12×20 and 12×24, and we can build custom sizes up to 14×40.
            White pine siding, tongue &amp; groove interiors, full insulation packages, and dormer
            add-ons make these the most versatile A-frames available in the region.
          </p>
          <p className="mb-8">
            <Link href="/contact-us" className="text-[#c0392b] font-bold underline">
              Contact us to discuss your A-Frame project →
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
                Summit Peaks A-Frame Catalog
              </h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 8, marginBottom: 0 }}>
                Full pricing, sizes, packages, and finish options — all in one PDF.
              </p>
            </div>
            <a
              href="https://www.empireshedsales.com/download/?id=5247"
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

        {/* Spec Callouts */}
        <FadeIn>
          <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
            <h2 className="page-content-heading">A-Frame Specifications</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {specs.map((s) => (
                <div
                  key={s.label}
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
                    {s.label}
                  </span>
                  <span style={{ color: "#1a3a5c", fontSize: 15, fontWeight: 600 }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Package Configurations */}
        <FadeIn>
          <h2 className="page-content-heading">Package Configurations</h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-8">
            Every A-Frame package is available as an unfinished shell or a fully finished turnkey unit.
            Select from the six signature configurations below — or request a custom size up to 14×40.
          </p>
        </FadeIn>

        {packages.map((pkg) => (
          <FadeIn key={pkg.title}>
            <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
              <ProductSection
                title={pkg.title}
                description={pkg.desc}
                image={pkg.image}
                imageAlt={pkg.title}
                sizeGroups={[]}
              />
            </div>
          </FadeIn>
        ))}

        {/* Turnkey Options */}
        <FadeIn>
          <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
            <h2 className="page-content-heading">Shell or Turnkey — Your Choice</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
              className="af-delivery-grid"
            >
              <div
                style={{
                  background: "#f7f5f2",
                  borderRadius: 10,
                  padding: 28,
                  borderTop: "4px solid #1a3a5c",
                }}
              >
                <h3 style={{ color: "#1a3a5c", fontSize: 20, fontWeight: 700, marginBottom: 12, fontFamily: "var(--font-oswald), Impact, sans-serif", textTransform: "uppercase" }}>
                  Unfinished Shell
                </h3>
                <ul style={{ color: "#5a6c7e", fontSize: 15, lineHeight: 1.7, paddingLeft: 20, margin: 0 }}>
                  <li>Structure, roof, windows &amp; doors</li>
                  <li>Premium white pine exterior</li>
                  <li>Ready for your interior finishing</li>
                  <li>Lower up-front cost</li>
                  <li>Perfect for DIY enthusiasts</li>
                </ul>
              </div>
              <div
                style={{
                  background: "#1a3a5c",
                  borderRadius: 10,
                  padding: 28,
                  borderTop: "4px solid #ffc400",
                }}
              >
                <h3 style={{ color: "#ffc400", fontSize: 20, fontWeight: 700, marginBottom: 12, fontFamily: "var(--font-oswald), Impact, sans-serif", textTransform: "uppercase" }}>
                  Fully Finished Turnkey
                </h3>
                <ul style={{ color: "rgba(255,255,255,0.88)", fontSize: 15, lineHeight: 1.7, paddingLeft: 20, margin: 0 }}>
                  <li>Everything in the shell, plus…</li>
                  <li>Full interior insulation package</li>
                  <li>Tongue &amp; groove pine interior walls</li>
                  <li>Turnkey electrical package</li>
                  <li>Plumbing rough-in available</li>
                  <li>Climate control options</li>
                  <li>Move-in ready on delivery day</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <DisclaimerText />
        <DesignerCTA />
        <PricingGuideSection />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .af-delivery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
