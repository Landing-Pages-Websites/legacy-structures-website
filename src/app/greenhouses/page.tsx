import type { Metadata } from "next";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import ProductSection from "@/components/ProductSection";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { siteAssets } from "@/lib/site-assets";

export const metadata: Metadata = {
  title: "Greenhouses for Sale | Hudson Falls, NY | Legacy Structures",
  description:
    "Grow herbs, vegetables, and flowers year-round in a fully assembled, climate-controlled greenhouse. Delivered and leveled on-site in Hudson Falls, NY. 8x12 and 8x16 sizes available.",
};

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
            <a href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=53" target="_blank" rel="noopener noreferrer" className="block">
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
              Download Our FREE Shed Buying Guide - Click Here
            </a>
          </p>
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
    </div>
  );
}
