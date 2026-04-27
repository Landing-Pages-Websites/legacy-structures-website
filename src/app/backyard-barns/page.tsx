import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import ProductSection from "@/components/ProductSection";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Backyard Barns | Legacy Structures",
  description:
    "Backyard barns, also commonly referred to as storage barns, are one of the most effective ways to add storage space for your valuable belongings.",
};

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

export default function BackyardBarnsPage() {
  return (
    <div>
      <PageHero
        title="Backyard Barns"
        subtitle="Classic barn-style storage with lofted or mini options. Built in Hudson Falls, NY."
        backgroundImage="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/Lofted-Barn-1.png"
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left - Hero Image + 3D Designer CTA */}
          <div className="lg:w-[67%]">
            <img
              src={`${BASE_URL}/Lofted-Barn-1.png`}
              alt="Backyard Barns by Legacy Structures"
              className="w-full h-auto"
            />
            <a href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1" target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={`${BASE_URL}/3d-designer-models-cta.png`}
                alt="3D Designer - Design Your Own Building"
                className="w-full h-auto"
              />
            </a>
          </div>
          {/* Right - Quote Form */}
          <div className="lg:w-[33%]">
            <QuoteForm title="Request Your" titleSpan="FREE Barn Quote!" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        <FadeIn>
          <h1 className="text-center font-bold text-[#00567a] mb-4" style={{ fontFamily: "var(--font-oswald), 'Oswald', sans-serif", fontSize: '40px' }}>
            Barns come in different shapes and sizes&hellip;
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Backyard barns, also commonly referred to as storage barns, are one of the most effective ways to add storage space for your valuable belongings. Backyard barns have been around for thousands of years, literally. Our backyard barns are made with exacting standards and are constructed by local families not far from our lot in Hudson Falls, NY.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            These prefab storage barns come in three basic styles: a backyard mini barn or a backyard lofted barn and our metal lofted barns. The primary difference in the buildings is the height of the sidewalls on the barns. The Lofted Barns have 6&prime; 3&Prime; sidewalls, the Metal Lofted Barns have 6ft sidewalls, and the Mini Barns have a side wall height of 4ft. Each has great value for certain applications and either barn can be customized to your specific needs. Our wooden backyard barns come in three basic finishes: pressure-treated T1-11 siding, painted LP&#8482; Smart Panel, or polyurethane siding. Our metal backyard barns are built with 29 gauge metal siding. If you live in or around Hudson Falls, NY and need storage, come by and visit us or give us a call at <a href="tel:518-544-2889" className="text-[#00567a] underline">518-544-2889</a>.
          </p>
          <p className="mb-8">
            <a href="/rent-to-own" className="text-[#00567a] font-bold underline">
              Download Our FREE Shed Buying Guide - Click Here
            </a>
          </p>
        </FadeIn>

        {/* Mini Barns */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="About Our Mini Barns"
            description="Our Mini Barns offer one of the lowest barriers of entry to a Backyard Outfitter building. These buildings come with an iconic barn-style roof. Unlike the Lofted Barns, the Mini Barn comes with 4ft side walls. The 8ft wide buildings come with a single barn door while the 10ft wide version comes with double doors. This building is available in T1-11 siding or LP Smart Panel&#8482; siding. The Mini Barn comes in the following sizes:"
            image={`${BASE_URL}/BARN-OHB_pimg2.png`}
            imageAlt="Mini Barn"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24"] },
            ]}
          />
        </div>
        </FadeIn>

        {/* Lofted Barns */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="About Our Lofted Barns"
            description="Our lofted barns are the ideal solution for those who want to store their stuff. Unlike our Mini Barns which can have slightly lower side walls, our Lofted Barns come with overhead &quot;lofted&quot; storage built into the structure. These buildings are perfect for storing holiday decorations, gardening supplies, or anything that you'd like to keep up off the floor. Up to 8ft of lofted is included. The 8ft wide model comes with a single door while the 10ft wide model comes with double doors. This model is available in T1-11 siding or LP Smart Panel&#8482; siding. The Lofted Barn comes in the following sizes:"
            image={`${BASE_URL}/lofted-barn-product.png`}
            imageAlt="Lofted Barn"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24"] },
            ]}
          />
        </div>
        </FadeIn>

        {/* Metal Lofted Barns */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="About Our Metal Lofted Barns"
            description="Our Metal Lofted Barns are a great, lower-cost alternative to our traditional Lofted Barn. With our Metal Lofted Barns, modifications are much more limited and are not Engineer Certified. However, for an additional charge, we offer several different siding and roofing colors for you to choose from. Up to 8ft of loft is included. 36in on center studs and trusses come standard. Additional sidewall and roof colors are available. The Metal Lofted Barn comes in the following sizes:"
            image={`${BASE_URL}/Metal-Barns.png`}
            imageAlt="Metal Lofted Barn"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x10", "10x12", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x28"] },
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
