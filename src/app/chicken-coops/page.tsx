import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import ProductSection from "@/components/ProductSection";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Chicken Coops",
  description:
    "Looking for a safe, practical, and affordable way to raise chickens? Our Chicken Coops at Legacy Structures are designed to make backyard chicken keeping easy and enjoyable.",
};

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

export default function ChickenCoopsPage() {
  return (
    <div>
      <PageHero
        title="Chicken Coops"
        subtitle="Safe, practical, and affordable backyard chicken coops."
        backgroundImage="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/BYO-ChickenCoops.png"
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left - Hero Image + 3D Designer CTA */}
          <div className="lg:w-[67%]">
            <img
              src={`${BASE_URL}/BYO-ChickenCoops.png`}
              alt="Chicken Coops by Legacy Structures"
              className="w-full h-auto"
            />
            <a href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=52" target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={`${BASE_URL}/3d-designer-models-cta.png`}
                alt="3D Designer - Design Your Own Building"
                className="w-full h-auto"
              />
            </a>
          </div>
          {/* Right - Quote Form */}
          <div className="lg:w-[33%]">
            <QuoteForm title="Request Your" titleSpan="FREE Chicken Coop Quote!" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        <FadeIn>
          <h2 className="page-content-heading">
            Chicken Coops for Sale in Hudson Falls, NY
          </h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Looking for a safe, practical, and affordable way to raise chickens? Our Chicken Coops at Legacy Structures are designed to make backyard chicken keeping easy and enjoyable. Whether you&apos;re starting with a few hens or expanding your flock, these coops offer everything you need to keep your birds happy and protected.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Each Chicken Coop includes a 3ft barn door on the end for easy access, two 24&quot; x 27&quot; single-pane windows for fresh air and ventilation, a roosting ladder, and raised nesting boxes with an exterior hatch so you can easily collect eggs. There&apos;s even a small chicken door to give your flock access to roam the yard or a fenced-in area. Coops are available in either 6ft or 8ft widths with several length options depending on your needs.
          </p>
          <p className="mb-8">
            <a href="#pricing-form" className="text-[#c0392b] font-bold underline">
              Download Our FREE Shed Buying Guide - Click Here
            </a>
          </p>
        </FadeIn>

        {/* Chicken Coops */}
        <FadeIn>
        <div className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
          <ProductSection
            title="More About Our Chicken Coops..."
            description="Our Chicken Coops offer a practical, low-maintenance solution for anyone looking to raise chickens in a safe and secure backyard setup. These buildings are designed to protect your flock from predators while offering great airflow and easy access for cleaning and egg gathering. Each coop features a gable-style roof, a 3ft wooden barn door on the end, two 24&quot; x 27&quot; single-pane windows, a roosting ladder, and six nesting boxes with exterior hatch access for convenient egg collection. A small chicken door gives your flock access to roam in a fenced yard or run. These coops are available in both T1-11 siding and LP Smart Panel&#8482; siding and come in the following sizes:"
            image={`${BASE_URL}/BYO-ChickenCoops-Body.png`}
            imageAlt="Chicken Coop"
            sizeGroups={[
              { label: "6' WIDE", sizes: ["6x8", "6x10", "6x12"] },
              { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12"] },
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
