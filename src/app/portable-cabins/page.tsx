import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import ProductSection from "@/components/ProductSection";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Portable Cabins | Legacy Structures",
  description:
    "Our pre-fab cabins are one of the most popular structures we sell. These buildings have many possible uses, such as a hunting cabin, home office, she-shed, man-cave, or even a tiny home.",
};

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

const STANDARD_CABIN_SIZES = [
  { label: "8' WIDE", sizes: ["8x10", "8x12", "8x16"] },
  { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
  { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32", "12x36", "12x40"] },
  { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
  { label: "16' WIDE", sizes: ["16x24", "16x28", "16x32", "16x36", "16x40"] },
];

const DELUXE_CABIN_SIZES = [
  { label: "12' WIDE", sizes: ["12x24", "12x28", "12x32", "12x36", "12x40"] },
  { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
  { label: "16' WIDE", sizes: ["16x24", "16x28", "16x32", "16x36", "16x40"] },
];

export default function PortableCabinsPage() {
  return (
    <div>
      <PageHero
        title="Portable Cabins"
        subtitle="Home office, hunting cabin, she-shed, or tiny home — our cabins are a blank canvas."
        variant="navy"
      />

      {/* Hero Image + Quote Form Row */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left - Hero Image + 3D Designer CTA */}
          <div className="lg:w-[67%]">
            <img
              src={`${BASE_URL}/utilty-side-slider1.png`}
              alt="Portable Cabins by Legacy Structures"
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
            <QuoteForm title="Request Your" titleSpan="FREE Cabin Quote!" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white max-w-7xl mx-auto px-4 py-10">
        <FadeIn>
          <h1 className="text-center font-bold text-[#00567a] mb-4" style={{ fontFamily: "var(--font-oswald), 'Oswald', sans-serif", fontSize: '40px' }}>
            Dream big in one of our portable cabins&hellip;
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our pre-fab cabins are one of the most popular structures we sell. These buildings have many possible uses, such as a hunting cabin, home office, &ldquo;she-shed,&rdquo; &ldquo;man-cave,&rdquo; or even a tiny home. While we do not sell tiny homes, several of our customers have done the necessary work to properly finish out one of the cabins pursuant to their local building codes.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our cabins start out as small as 8ft x 10ft and come as big as 16ft x 40ft (depending on location.) We offer three basic styles of cabins: Side Porch Cabins, Playhouse Cabins, and Deluxe Cabins. Each building has its own unique advantage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Side Porch Cabin is what some refer to as a &ldquo;his &amp; hers&rdquo; cabin since it has a work area to be used for gardening or other uses as well as a large storage area. The Playhouse Cabin comes with 4ft of porch as well a house-style walk-in door and three 2ft x 3ft windows. Our Deluxe Cabin comes with up to 8ft of porch as well as three bay windows and a house-style walk-in door. All three of our cabins come in either a Utility version or a Lofted version.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The benefit of the Utility version is the ability to have 8ft sidewalls while the benefit of the Lofted version is the built-in overhead lofted storage. If you are in the market for a prefab cabin in or around Hudson Falls, NY give us a call at <a href="tel:518-544-2889" className="text-[#00567a] underline">518-544-2889</a>.
          </p>
          <p className="mb-8">
            <a href="/rent-to-own" className="text-[#00567a] font-bold underline">
              Download Our FREE Shed Buying Guide - Click Here
            </a>
          </p>
        </FadeIn>

        {/* Utility Side Porch Cabins */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR UTILITY SIDE PORCH CABINS"
            description="Our Utility Side Porch Cabins offer the ability to have a dedicated workspace near the porch along with a plentiful storage area. The porch is 4ft x 8ft and includes a 9 Lite Window Door which allows plenty of natural light. With the ability to place the 2' x 3' windows where you like, this building is a blank canvas awaiting your creative touch. This package includes 8ft sidewalls and double doors on the side. The Utility Side Porch Cabin comes in the following sizes:"
            image={`${BASE_URL}/side_porch_hero_1024x410.png`}
            imageAlt="Utility Side Porch Cabin"
            sizeGroups={STANDARD_CABIN_SIZES}
          />
        </div>
        </FadeIn>

        {/* Lofted Side Porch Cabins */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR LOFTED SIDE PORCH BARNS"
            description="Our Lofted Side Porch Cabins offer the ability to have a dedicated workspace near the porch along with a plentiful storage area. The porch is 4ft x 8ft and includes a 9 Lite Window Door which allows plenty of natural light. With the ability to place the 2' x 3' windows where you like, this building is a blank canvas awaiting your creative touch. This package includes double doors on the side. The Lofted Side Porch Cabin comes in the following sizes:"
            image={`${BASE_URL}/lofted-side-porch-cabin.png`}
            imageAlt="Lofted Side Porch Cabin"
            sizeGroups={STANDARD_CABIN_SIZES}
          />
        </div>
        </FadeIn>

        {/* Utility Playhouse Cabins */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR UTILITY PLAYHOUSE CABINS"
            description="If you are looking to create a home office, man-cave, or she-shed...the Utility Playhouse Cabin is a great place to start your journey. With 4ft of porch included, along with a house-style door and (3) windows...this model is a perfect blank canvas just waiting for your creative touches to finish it out. This package includes 8ft sidewalls. The Utility Playhouse Cabin comes in the following sizes:"
            image={`${BASE_URL}/utility-playhouse-cabins.png`}
            imageAlt="Utility Playhouse Cabin"
            sizeGroups={STANDARD_CABIN_SIZES}
          />
        </div>
        </FadeIn>

        {/* Lofted Playhouse Cabins */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR LOFTED PLAYHOUSE CABINS"
            description="If you are looking to create a home office, hunting cabin, or just a place for your kids to play...the Lofted Playhouse Cabin is a great place to start. With 4ft of porch included, along with a house-style door and three 2' x 3' windows...this model is a perfect blank canvas just waiting for your creative touches to finish it out. The Lofted Playhouse Cabin comes in the following sizes:"
            image={`${BASE_URL}/lofted-playhouse-cabins.png`}
            imageAlt="Lofted Playhouse Cabin"
            sizeGroups={STANDARD_CABIN_SIZES}
          />
        </div>
        </FadeIn>

        {/* Deluxe Utility Cabins */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR DELUXE UTILITY CABINS"
            description="Our Deluxe Utility Cabins are a blank canvas. Let your imagination guide you in creating the perfect setting inside this spacious building. With 8ft sidewalls, the Deluxe Utility Cabin is an ideal option for a home office, art gallery, craft room, hunting cabin, or just about anything else you could imagine. This package includes 8ft sidewalls. The Deluxe Utility Cabin comes in the following sizes:"
            image={`${BASE_URL}/deluxe-utility-cabins.png`}
            imageAlt="Deluxe Utility Cabin"
            sizeGroups={DELUXE_CABIN_SIZES}
          />
        </div>
        </FadeIn>

        {/* Deluxe Lofted Cabins */}
        <FadeIn>
        <div className="border-b-[3px] border-[#00465e] pb-10 mb-10">
          <ProductSection
            title="ABOUT OUR DELUXE LOFTED CABINS"
            description="Our Deluxe Lofted Cabins are a great option for many different applications. Many of our customers have turned our Deluxe Lofted Cabins into hunting cabins, music studios, crafting rooms, home offices and so much more. With ample overhead storage, the model is a great place to store holiday decorations, family keepsakes and so much more. The Deluxe Lofted Cabin comes in the following sizes:"
            image={`${BASE_URL}/deluxe-lofted-cabins.png`}
            imageAlt="Deluxe Lofted Cabin"
            sizeGroups={DELUXE_CABIN_SIZES}
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
