import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import ProductSection from "@/components/ProductSection";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Side Gables | Legacy Structures",
  description:
    "Side Gable Buildings by Legacy Structures — a smart alternative to traditional side-entry utility sheds with the roof gable running along the length of the building.",
};

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

export default function SideGablesPage() {
  return (
    <div>
      <PageHero
        title="Side Gable Buildings"
        subtitle="A smart alternative to traditional side-entry utility sheds."
        backgroundImage="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/BYO-SideGables.png"
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left - Hero Image + 3D Designer CTA */}
          <div className="lg:w-[67%]">
            <img
              src={`${BASE_URL}/BYO-SideGables.png`}
              alt="Side Gable Buildings by Legacy Structures"
              className="w-full h-auto"
            />
            <a href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=54" target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={`${BASE_URL}/3d-designer-models-cta.png`}
                alt="3D Designer - Design Your Own Building"
                className="w-full h-auto"
              />
            </a>
          </div>
          {/* Right - Quote Form */}
          <div className="lg:w-[33%]">
            <QuoteForm title="Request Your" titleSpan="FREE Side Gable Quote!" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        <FadeIn>
          <h1 className="text-center font-bold text-[#00567a] mb-4" style={{ fontFamily: "var(--font-oswald), 'Oswald', sans-serif", fontSize: '40px' }}>
            Side Gable Buildings for Sale in Hudson Falls, NY
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Side Gable Buildings at Legacy Structures are a smart alternative to traditional side-entry utility sheds. Designed with the roof gable running along the length of the building, these sheds are ideal when placing the long side of the structure toward your yard, driveway, or property line&mdash;especially when you want the roofline to match the visual flow of your space. Not only are they functional, but the center height provides extra headroom and storage flexibility.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Available in multiple widths and lengths, Side Gables can be customized with your choice of siding, roof style, and paint or stain color. Each one includes either a single or double barn door depending on the size, and comes built to last using quality materials. Whether you&apos;re storing lawn equipment, tools, or just need more space, these sheds are a stylish and durable solution.
          </p>
          <p className="mb-8">
            <a href="/rent-to-own" className="text-[#00567a] font-bold underline">
              Download Our FREE Shed Buying Guide - Click Here
            </a>
          </p>
        </FadeIn>

        {/* Side Gable Buildings */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR SIDE GABLE BUILDINGS"
            description={"Side Gable Buildings are a great choice for customers who prefer to face the long side of their building toward the yard or driveway while keeping a clean roofline and center height. These sheds offer excellent storage capacity, improved interior headroom, and a look that blends seamlessly into many backyard setups. Each Side Gable comes with either single or double barn doors (depending on width), and can be ordered with T1-11 or LP Smart Panel\u2122 siding, metal or shingle roofing, and treated or tongue-and-groove flooring. With customizable finishes and functional space, they're a perfect fit for just about any use case."}
            image={`${BASE_URL}/BYO-SideGables-Body.png`}
            imageAlt="Side Gable Building"
            sizeGroups={[
              { label: "8' WIDE", sizes: ["8x12", "8x16"] },
              { label: "10' WIDE", sizes: ["10x12", "10x16", "10x20"] },
              { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24"] },
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
