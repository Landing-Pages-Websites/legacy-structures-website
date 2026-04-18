import type { Metadata } from "next";
import Link from "next/link";
import PricingGuideSection from "@/components/PricingGuideSection";

export const metadata: Metadata = {
  title: "About Us | Legacy Structures",
  description:
    "Legacy Structures is a family-owned business in Hudson Falls, NY, crafting high-quality sheds and outdoor storage solutions built to last. We have succeeded by providing our customers with dependable storage solutions and a quality buying experience.",
  openGraph: {
    title: "About Us | Legacy Structures",
    description:
      "Family-owned shed builder in Hudson Falls, NY — quality craftsmanship, dependable storage solutions, and friendly personalized service.",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <div>
      {/* About Main */}
      <div className="wrapper max-w-[1100px] mx-auto px-[20px] pb-[60px]" style={{ textAlign: "center" }}>
        <h1>About Legacy Structures</h1>
        <p className="text-[19px] leading-[30px]">
          Legacy Structures is a family-owned business located at 3570 US 4,
          Hudson Falls, NY 12839, proudly serving Hudson Falls and the greater
          Washington County area. We specialize in crafting high-quality sheds
          and outdoor storage solutions built to last, offering everything from
          classic designs to custom options tailored to your needs. As a local,
          family-run company, we&apos;re dedicated to providing top-notch
          craftsmanship and friendly, personalized service that makes every
          project feel like home. Visit us in Hudson Falls to discover why Legacy
          Structures is your trusted choice for durable, stylish sheds!
        </p>
      </div>

      {/* Rent-to-Own CTA */}
      <div className="bg-[#e9bb52] py-[20px]">
        <div className="max-w-[1100px] mx-auto px-[20px] flex flex-col md:flex-row items-center justify-center gap-[20px]">
          <Link
            href="/rent-to-own"
            className="text-black font-bold uppercase text-[24px] no-underline py-[10px] px-[40px] rounded-full hover:bg-[#ffd168] transition-colors font-heading tracking-[1.5px] text-center"
          >
            Ask about our<br />
            <span className="text-[#b11f29]">rent-to-own</span> options
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://legacystructuresusa.com/wp-content/themes/barndealer/_/inc/images/dollar-signs-cta.svg"
            alt="Dollar signs"
            width={300}
            height={150}
            className="z-[1]"
          />
        </div>
      </div>

      {/* Pricing Guide Section */}
      <PricingGuideSection />
    </div>
  );
}
