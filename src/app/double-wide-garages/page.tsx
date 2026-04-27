import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import ProductSection from "@/components/ProductSection";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Double Wide Garages | Legacy Structures",
  description:
    "Double Wide Garages by Legacy Structures — delivered in two halves and joined on-site for serious vehicle, workshop, and equipment storage.",
};

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

export default function DoubleWideGaragesPage() {
  return (
    <div>
      <PageHero
        title="Double Wide Garages"
        subtitle="Serious space for vehicles, tools, and projects — delivered in two halves."
        backgroundImage="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/BYO-DoubleWideGarages.png"
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left - Hero Image + 3D Designer CTA */}
          <div className="lg:w-[67%]">
            <img
              src={`${BASE_URL}/BYO-DoubleWideGarages.png`}
              alt="Double Wide Garages by Legacy Structures"
              className="w-full h-auto"
            />
            <a href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=51" target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={`${BASE_URL}/3d-designer-models-cta.png`}
                alt="3D Designer - Design Your Own Building"
                className="w-full h-auto"
              />
            </a>
          </div>
          {/* Right - Quote Form */}
          <div className="lg:w-[33%]">
            <QuoteForm title="Request Your" titleSpan="FREE Double Wide Garage Quote!" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        <FadeIn>
          <h1 className="text-center font-bold text-[#00567a] mb-4" style={{ fontFamily: "var(--font-oswald), 'Oswald', sans-serif", fontSize: '40px' }}>
            Double Wide Garages for Sale in Hudson Falls, NY
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Need serious space for vehicles, tools, or your next project? The Double Wide Garage at Legacy Structures delivers the room you need&mdash;without the hassle of on-site construction. These buildings are delivered in two fully-built halves and then joined and leveled on-site (up to 2 feet) as part of the standard delivery process.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Each garage comes equipped with (1) 9-lite entry door, (4) 2&apos; x 3&apos; windows, and (2) roll-up garage doors for easy access. Built tough with &frac34;&quot; treated flooring and 12&quot; on-center floor joists, the Double Wide Garage is ready to handle your vehicles, equipment, or workshop setup. Optional upgrades include painted siding, panel garage doors, or other custom door styles to fit your needs.
          </p>
          <p className="mb-8">
            <a href="/rent-to-own" className="text-[#00567a] font-bold underline">
              Download Our FREE Shed Buying Guide - Click Here
            </a>
          </p>
        </FadeIn>

        {/* Double Wide Garages */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR DOUBLE WIDE GARAGES"
            description={"The Double Wide Garage is one of our most spacious and rugged building options. With a wide, open interior and two overhead roll-up doors, it's perfect for storing multiple vehicles, housing a home workshop, or keeping large equipment out of the weather. Each building includes a 9-lite walk-in door, four windows for light and ventilation, and heavy-duty construction that includes 12\" on-center floor joists and \u00BE\" treated flooring. These units are delivered in two halves and joined together on-site by our professional team. You can customize your building with optional painted siding, panel garage doors, or other door configurations."}
            image={`${BASE_URL}/BYO-DoubleWideGarages-Body.png`}
            imageAlt="Double Wide Garage"
            sizeGroups={[
              { label: "24' WIDE", sizes: ["24x24", "24x28", "24x30", "24x32", "24x36", "24x40"] },
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
