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
  title: "Storage Sheds for Sale in Hudson Falls, NY",
  description:
    "Shop utility sheds, metal sheds, single-slope sheds, and dormer sheds at Legacy Structures in Hudson Falls, NY. Quality construction, multiple sizes, rent-to-own available.",
};

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

export default function StorageShedsPage() {
  return (
    <div>
      <PageHero
        title="Storage Sheds"
        subtitle="High-quality storage sheds built to last. Customizable siding, roofing, and sizes."
        backgroundImage={siteAssets.categoryPage.storageSheds.src}
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left - Hero Image + 3D Designer CTA */}
          <div className="lg:w-[67%]">
            <Image
              src={siteAssets.categoryPage.storageSheds.src}
              alt="Storage Sheds by Legacy Structures"
              width={siteAssets.categoryPage.storageSheds.width}
              height={siteAssets.categoryPage.storageSheds.height}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 67vw"
            />
            <a href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1" target="_blank" rel="noopener noreferrer" className="block">
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
            <QuoteForm title="Request Your" titleSpan="FREE Shed Quote!" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        <FadeIn>
          <h2 className="page-content-heading">
            We have a large variety of storage sheds&hellip;
          </h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Our storage sheds are a great option for adding much-needed storage space around your home. Rather than spending money at a local mini-storage facility, why not purchase one of our storage sheds or use our helpful Rent-To-Own option with easy monthly payments? To learn more about our Rent-To-Own sheds <a href="/rent-to-own" className="text-[#c0392b] underline">click here</a>.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Our storage sheds are built using the best quality materials and exacting standards resulting in a quality building that will last for years to come. We offer three basic versions of our storage sheds: Utility Sheds, Metal Utility Sheds, and our Utility Dormer sheds. Each shed has its own unique value:
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Our basic Utility Shed comes with the option to have either T1-11 pressure-treated siding or LP Smart&#8482; Panel siding. You can choose either option at no additional charge. The Metal Shed uses the same construction process but with 29 gauge metal siding instead of wood. The Utility Dormer Shed is also made with T1-11 pressure-treated siding or LP Smart&#8482; Panel siding but it includes a dormer which brings in a significant amount of natural light to the structure.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Our Utility Shed can be built with 8ft sidewalls, while the Utility Dormer Shed comes with 7ft sidewalls. Our Metal Sheds are built on 6ft sidewalls. Whatever storage needs you have, one of our storage sheds is sure to fit the bill. If you are looking for a storage shed in or around Hudson Falls, NY then give us a call at <a href="tel:518-544-2889" className="text-[#c0392b] underline">518-544-2889</a>.
          </p>
          <p className="mb-8">
            <a href="#pricing-form" className="text-[#c0392b] font-bold underline">
              Download Our FREE Shed Buying Guide - Click Here
            </a>
          </p>
        </FadeIn>

        {/* Utility Sheds */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR UTILITY SHEDS"
            description="Our Utility Sheds are a great partner to our Lofted Barns. These two building styles are the two most popular storage buildings that we offer. The utility shed's distinct difference over the Lofted Barn is the ability to upgrade the side walls up to 8'. This makes this building ideal for a home office, man cave or she shed. 8ft wide versions come with a single barn door while the 10ft wide versions come with double barn doors. The Utility Shed comes in the following sizes:"
            image={`${BASE_URL}/utility-shed.png`}
            imageAlt="Utility Shed"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32", "12x36", "12x40"] },
              { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
              { label: "16' WIDE", sizes: ["16x24", "16x28", "16x32", "16x36", "16x40"] },
            ]}
          />
        </div>
        </FadeIn>

        {/* Metal Sheds */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR METAL SHEDS"
            description="Our Metals Sheds are a great partner to our Metal Lofted Barns. These two building styles are the two most popular storage buildings that we offer. This model offers a great storage solution while not breaking the bank. 36in on-center studs and trusses are standard. Standard sidewall color is Light Stone and standard roof color is Burnished Slate. Other colors are available (at an additional charge.) 8ft wide versions come with a single barn door while the 10ft wide versions come with double barn doors. The Metal Shed comes in the following sizes:"
            image={`${BASE_URL}/metal-sheds.png`}
            imageAlt="Metal Shed"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x10", "10x12", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x28", "12x32"] },
            ]}
          />
        </div>
        </FadeIn>

        {/* Single Slope Sheds */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR SINGLE SLOPE SHEDS"
            description="The Single Slope Shed boasts a lean-to-roof design that allows it to blend seamlessly into your outdoor surroundings. By positioning the shed with its back against a tree line or property boundary, it can become an organic part of your landscape. The front of the shed is elevated and can feature horizontal windows that allow plenty of natural light to flood the interior. Single Slope Sheds are ENGINEER CERTIFIED for your peace of mind. The Single Slope Shed comes in the following sizes:"
            image={`${BASE_URL}/single-slope.png`}
            imageAlt="Single Slope Shed"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x28", "12x32", "12x36", "12x40"] },
              { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
            ]}
          />
        </div>
        </FadeIn>

        {/* Utility Dormer Sheds */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR UTILITY DORMER SHEDS"
            description="Our Utility Dormer is one of the newest additions to the Backyard Outfitter family of buildings. It is built on our Utility Shed style building and allows tons of extra natural light in. If you are looking for your next craft room or a place for all of your gardening supplies, the Utility Dormer might just be the perfect solution for you. Comes standard with 7/12 pitch roof. Three 10in x 29 horizontal windows. Treated buildings have 81in inside walls. Painted/Urethane buildings have 82.5in interior walls. 8ft wide versions come with a single barn door while the 10ft wide versions come with double barn doors. The Utility Dormer Shed comes in the following sizes:"
            image={`${BASE_URL}/utility-dormer.png`}
            imageAlt="Utility Dormer Shed"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x28", "12x32", "12x36", "12x40"] },
            ]}
          />
        </div>
        </FadeIn>

        {/* Gable Dormer Sheds */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR GABLE DORMER SHEDS"
            description="Our Gable Dormer is one of the newest additions to the Backyard Outfitter family of buildings. It is built on our Utility Shed style building and offers a touch of class on your building. If you are looking for your next craft room or spot to place all of your gardening supplies, the Gable Dormer might just be the perfect solution for you."
            image={`${BASE_URL}/gable-dormer-product-sizes.png`}
            imageAlt="Gable Dormer Shed"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x12", "10x14", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32", "12x36", "12x40"] },
              { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
              { label: "16' WIDE", sizes: ["16x24", "16x28", "16x32", "16x36", "16x40"] },
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
