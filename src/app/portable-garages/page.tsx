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
  title: "Portable Garages for Sale | Hudson Falls, NY | Legacy Structures",
  description:
    "Shop single and tandem portable garages in Hudson Falls, NY. Perfect for vehicles, equipment, and workshop space. Multiple sizes, finishes, and rent-to-own options available.",
};

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

const GARAGE_SIZES = [
  { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
  { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x28", "12x32", "12x36", "12x40"] },
  { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
  { label: "16' WIDE", sizes: ["16x24", "16x28", "16x32", "16x36", "16x40"] },
];

export default function PortableGaragesPage() {
  return (
    <div>
      <PageHero
        title="Portable Garages"
        subtitle="Protect your vehicles and equipment with a custom-built portable garage."
        backgroundImage={siteAssets.categoryPage.portableGarages.src}
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left - Hero Image + 3D Designer CTA */}
          <div className="lg:w-[67%]">
            <Image
              src={siteAssets.categoryPage.portableGarages.src}
              alt="Portable Garages by Legacy Structures"
              width={siteAssets.categoryPage.portableGarages.width}
              height={siteAssets.categoryPage.portableGarages.height}
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
            <QuoteForm title="Request Your" titleSpan="FREE Garage Quote!" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        <FadeIn>
          <h2 className="page-content-heading">
            Protect Your Investment With A Portable Garage&hellip;
          </h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Often times adding a garage onto an existing home or having a free-standing garage built can be cost-prohibitive. By the time you&apos;ve hired an architect and priced out the materials, the dream of owning a garage can seem out of reach. This is where a portable garage from Backyard Outfitters comes in! Whether you need to store an antique car or want to have space to work on your vehicle, one of these portable garages might just be the solution you are looking for. Our buildings are built to exacting standards, in the spirit of Mennonite craftsmanship, and with the highest quality materials. One unique feature of our portable garages is that&hellip;well&hellip;they are portable.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Our garages start out as small as 8ft x 10ft and come as big as 16ft x 40ft (depending on location.) We offer two basic styles of garages: a Utility Garage and a Lofted Garage. Each building has its own unique advantages. After construction, they are delivered to your location and set up where you&apos;d like them to sit. **Some placement restrictions might apply depending on a number of factors. In the event you ever moved to a new home or needed to relocate one of these structures, you can contact your dealer to obtain the delivery company&apos;s contact information. They can assist you in helping get your structure moved.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            We have seen many different uses when customers purchase our portable garages&hellip;including car storage, home office, homeschool room, crafting room, and so much more! If you live in or around Hudson Falls, NY and need storage, come by and visit us or give us a call at <a href="tel:518-544-2889" className="text-[#c0392b] underline">518-544-2889</a>.
          </p>
          <p className="mb-8">
            <a href="#pricing-form" className="text-[#c0392b] font-bold underline">
              Download Our FREE Shed Buying Guide - Click Here
            </a>
          </p>
        </FadeIn>

        {/* Utility Garages */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR PORTABLE UTILITY GARAGES"
            description="Our Utility Garages are ideal for customers who have Zero-Turn mowers, motorcycles, and smaller vehicles they need to park or store for an extended period. The 2' x 3' window adds additional airflow to the structure. The solid house-style door offers another way to access the structure as well. This package includes 8ft sidewalls. The Utility Garage comes in the following sizes:"
            image={`${BASE_URL}/portable-utility-garage.png`}
            imageAlt="Utility Garage"
            sizeGroups={GARAGE_SIZES}
          />
        </div>
        </FadeIn>

        {/* Lofted Garages */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR PORTABLE LOFTED GARAGES"
            description="Our Lofted Garages are a great alternative to our Utility Garages. In lieu of 8ft sidewalls, the Lofted Garage comes with overhead loft offering plenty of storage space. The 2' x 3' window adds additional airflow to the structure. The solid house-style door offers another way to access the structure as well. The Lofted Garage comes in the following sizes:"
            image={`${BASE_URL}/portable-lofted-garage.png`}
            imageAlt="Lofted Garage"
            sizeGroups={GARAGE_SIZES}
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
