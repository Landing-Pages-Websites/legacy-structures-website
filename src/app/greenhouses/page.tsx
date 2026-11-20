import type { Metadata } from "next";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import ProductSection from "@/components/ProductSection";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ProductSchema from "@/components/ProductSchema";
import { siteAssets } from "@/lib/site-assets";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Greenhouses for Sale in Hudson Falls, NY",
  description:
    "Shop greenhouses in Hudson Falls, NY: 8x12 and 8x16 sizes, fully assembled delivery, on-site leveling, and a longer Upstate NY growing season. Get a quote.",
  path: "/greenhouses",
  canonicalHost: "https://www.legacystructuresusa.com",
});

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

export default function GreenhousesPage() {
  return (
    <div>
      <PageHero
        title="Greenhouses"
        subtitle="Grow year-round in a climate-controlled, hassle-free greenhouse."
        backgroundImage={siteAssets.categoryPage.greenhouses.src}
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left - Hero Image + 3D Designer CTA */}
          <div className="lg:w-[67%]">
            <Image
              src={siteAssets.categoryPage.greenhouses.src}
              alt="Greenhouses by Legacy Structures"
              width={siteAssets.categoryPage.greenhouses.width}
              height={siteAssets.categoryPage.greenhouses.height}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 67vw"
            />
            <a data-mega-cta="3d-designer" href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=53" target="_blank" rel="noopener noreferrer" className="block">
              <Image
                src={siteAssets.categoryPage.designerCta.src}
                alt="3D Designer - Design Your Own Building"
                width={siteAssets.categoryPage.designerCta.width}
                height={siteAssets.categoryPage.designerCta.height}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 67vw"
              />
            </a>
          </div>
          {/* Right - Quote Form */}
          <div className="lg:w-[33%]">
            <QuoteForm title="Request Your" titleSpan="FREE Greenhouse Quote!" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        <FadeIn>
          <h2 className="page-content-heading">
            Greenhouses for Sale in Hudson Falls, NY
          </h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Looking to grow your own herbs, vegetables, or flowers year-round? Our Greenhouses at Legacy Structures offer an ideal space to cultivate your garden in a protected, climate-controlled environment, without needing to assemble a thing. Each unit is delivered fully assembled and leveled on-site up to 2 feet, making it a hassle-free way to start planting right away.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            These Greenhouses feature a clear polycarbonate roof and upper walls to allow in plenty of natural light, LP Smart Siding around the base for durability, and a vent door with an automatic opener that adjusts with the temperature. Inside, you&apos;ll find an 18&quot; deep potting shelf around the back and sides, a solid stain finish on both interior and exterior surfaces, and a pressure-treated floor designed like a raised deck&mdash;perfect for drainage.
          </p>
          <p className="mb-8">
            <a href="#pricing-form" className="text-[#c0392b] font-bold underline">
              Download Our FREE Pricing Guide
            </a>
          </p>
        </FadeIn>

        <FadeIn>
          <section className="mb-10">
            <h2 className="page-content-heading">
              Greenhouse Installation Planning in Hudson Falls, NY
            </h2>
            <p className="text-[#5a6c7e] leading-relaxed mb-6">
              If you are searching for greenhouse installers near me, start by planning the site and delivery details before you request a quote. Legacy Structures delivers each greenhouse fully assembled and levels it on-site up to 2 feet. A clear delivery route, a suitable growing location, and a plan for drainage can help your greenhouse arrive ready for use.
            </p>

            <h3 className="text-[#1a3a5c] text-2xl font-bold mb-3">
              Prepare the site before delivery
            </h3>
            <p className="text-[#5a6c7e] leading-relaxed mb-6">
              Choose a firm, accessible area with enough room for the greenhouse, delivery equipment, and the door to open fully. Consider sunlight, drainage, and the route from the road to the placement area. Check local building codes and zoning rules before ordering, because permit requirements depend on your property and the structure.
            </p>

            <h3 className="text-[#1a3a5c] text-2xl font-bold mb-3">
              Assembled delivery and on-site leveling
            </h3>
            <p className="text-[#5a6c7e] leading-relaxed mb-6">
              Greenhouses are delivered fully assembled, so you do not have to build the structure from a kit. We level the greenhouse on-site up to 2 feet. When you request a quote, share your location, the slope of the site, and any access details that could affect delivery, site preparation, or placement. Delivery, site preparation, and applicable taxes are not included in displayed prices, and availability and delivery pricing vary by location.
            </p>

            <h3 className="text-[#1a3a5c] text-2xl font-bold mb-3">
              Automatic ventilation for changing temperatures
            </h3>
            <p className="text-[#5a6c7e] leading-relaxed mb-6">
              Each greenhouse includes a vented louvre door with an automatic opener that adjusts as temperatures rise. The clear polycarbonate roof and upper walls bring in natural light, while the raised-deck-style pressure-treated floor helps with drainage. These features support a lower-maintenance growing space, but plant care and climate needs still vary by season.
            </p>

            <h3 className="text-[#1a3a5c] text-2xl font-bold mb-3">
              Request a local greenhouse quote
            </h3>
            <p className="text-[#5a6c7e] leading-relaxed mb-4">
              Tell us whether you are considering an 8x12 or 8x16 greenhouse, where it will go, and what you plan to grow. We can review your location and delivery questions with you before you order.
            </p>
            <p className="mb-2">
              <strong>
                <a href="tel:5185442889" className="text-[#c0392b] underline">
                  Call or text 518-544-2889
                </a>{" "}
                to discuss your greenhouse location and delivery questions.
              </strong>
            </p>
          </section>
        </FadeIn>

        {/* Greenhouses */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR GREENHOUSES"
            description="Our Greenhouses offer a simple, low-maintenance way to grow your favorite plants, herbs, or vegetables year-round--right in your backyard. Designed to provide a warm, light-filled environment, these buildings make it easy to extend your growing season while protecting your plants from the elements. Each greenhouse includes a barn-style door with a built-in window, a vented louvre door that opens automatically as temperatures rise, and a wrap-around potting shelf inside for easy planting and organization. The clear polycarbonate panels allow in plenty of sunlight, while the LP Smart Siding base adds durability and a finished look. Greenhouses are stained inside and out in your choice of color and come in the following sizes:"
            image={`${BASE_URL}/BYO-Greenhouses-Body.jpg`}
            imageAlt="Inside of Greenhouse"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x12", "8x16"] },
            ]}
          />
        </div>
        </FadeIn>

        <DisclaimerText />
        <DesignerCTA />
        <PricingGuideSection />
      </div>
      <ProductSchema
        name="Greenhouses"
        description="Year-round growing in climate-controlled greenhouses with clear polycarbonate roof, auto vent opener, and LP Smart Siding. Sizes: 8x12 and 8x16."
        image="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/BYO-Greenhouses-Body.jpg"
        url="https://www.legacystructuresusa.com/greenhouses"
        price="$3,500+"
      />
    </div>
  );
}
