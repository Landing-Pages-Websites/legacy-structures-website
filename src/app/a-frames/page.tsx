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
import styles from "./AFramesPage.module.css";
import ProductSchema from "@/components/ProductSchema";

export const metadata: Metadata = createPageMetadata({
  title: "A-Frame Cabins for Sale | Hudson Falls, NY",
  description:
    "Shop pre-built a-frame cabins at Legacy Structures in Hudson Falls, NY. Shell or turnkey units, custom sizes up to 14\u00d740, and free delivery within 30 miles. Get your free pricing guide today.",
  path: "/a-frames",
});

const A_FRAME_IMAGE_BASE = "/images/optimized-assets/a-frames";

const heroImage = `${A_FRAME_IMAGE_BASE}/hero.webp`;

const packages = [
  {
    title: "Reverse Dormer Package",
    desc: "A dramatic reverse-dormer roofline that opens up interior headroom and adds curb appeal. Available in multiple sizes.",
    image: `${A_FRAME_IMAGE_BASE}/reverse-dormer.webp`,
  },
  {
    title: "12′ × 12′ A-Frame",
    desc: "The compact classic — perfect starter A-frame for a weekend retreat, backyard studio, or reading escape.",
    image: `${A_FRAME_IMAGE_BASE}/12x12.webp`,
  },
  {
    title: "12′ × 12′ A-Frame with 2′ Knee Wall",
    desc: "A 2-foot knee wall extension on this 12×12 adds usable wall storage and headroom near the floor.",
    image: `${A_FRAME_IMAGE_BASE}/12x12-knee-wall.webp`,
  },
  {
    title: "12′ × 16′ Reverse Dormer A-Frame",
    desc: "More space and the reverse-dormer silhouette in a 12×16 footprint — an ideal cabin-size getaway.",
    image: `${A_FRAME_IMAGE_BASE}/12x16-reverse-dormer.webp`,
  },
  {
    title: "12′ × 16′ A-Frame with Porch Package",
    desc: "A full front porch on this 12×16 creates an outdoor living room — sip your morning coffee in the trees.",
    image: `${A_FRAME_IMAGE_BASE}/12x16-porch.webp`,
  },
  {
    title: "12′ × 20′ A-Frame with Porch Package and Side Dormer",
    desc: "The most feature-rich package — 12×20 footprint, wraparound porch, and a side dormer for extra natural light.",
    image: `${A_FRAME_IMAGE_BASE}/12x20-side-dormer.webp`,
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
              aria-label="Open the 3D Designer to design your own A-Frame building"
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
          <div className={styles.catalog}>
            <div>
              <p className={styles.catalogEyebrow}>
                Free Download
              </p>
              <h3 className={styles.catalogTitle}>
                Summit Peaks A-Frame Catalog
              </h3>
              <p className={styles.catalogDescription}>
                Full pricing, sizes, packages, and finish options — all in one PDF.
              </p>
            </div>
            <a
              href="https://www.empireshedsales.com/download/?id=5247"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.catalogButton}
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
            <div className={styles.specGrid}>
              {specs.map((s) => (
                <div key={s.label} className={styles.specCard}>
                  <span className={styles.specLabel}>
                    {s.label}
                  </span>
                  <span className={styles.specValue}>
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
            <div className={styles.optionGrid}>
              <div className={`${styles.optionCard} ${styles.optionShell}`}>
                <h3 className={styles.optionTitle}>
                  Unfinished Shell
                </h3>
                <ul className={styles.optionList}>
                  <li>Structure, roof, windows &amp; doors</li>
                  <li>Premium white pine exterior</li>
                  <li>Ready for your interior finishing</li>
                  <li>Lower up-front cost</li>
                  <li>Perfect for DIY enthusiasts</li>
                </ul>
              </div>
              <div className={`${styles.optionCard} ${styles.optionTurnkey}`}>
                <h3 className={styles.optionTitle}>
                  Fully Finished Turnkey
                </h3>
                <ul className={styles.optionList}>
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
      <ProductSchema
        name="Summit Peaks A-Frame Cabins"
        description="Pre-built A-frame cabins available as unfinished shell or fully finished turnkey unit. Custom sizes up to 14x40 with premium white pine siding."
        image="https://www.legacystructuresusa.com/images/optimized-assets/a-frames/hero.webp"
        url="https://www.legacystructuresusa.com/a-frames"
        price="$10,000+"
      />
    </div>
  );
}
