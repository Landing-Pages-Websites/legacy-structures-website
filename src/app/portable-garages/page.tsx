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
import { createPageMetadata } from "@/lib/metadata";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = createPageMetadata({
  title: "Portable Garage Building Prices | Legacy Structures",
  description:
    "Compare portable garage building prices in Hudson Falls, NY by size, utility or lofted style, and delivery needs. Explore options and request a local quote",
  path: "/portable-garages",
  canonicalHost: "https://www.legacystructuresusa.com",
});

const BASE_URL =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

const GARAGE_SIZES = [
  { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
  { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x28", "12x32", "12x36", "12x40"] },
  { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
  { label: "16' WIDE", sizes: ["16x24", "16x28", "16x32", "16x36", "16x40"] },
];

const productSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://legacystructuresusa.com/#product-utility-garage",
      "name": "Legacy Structures Utility Garage",
      "description": "Portable utility garage with 8ft sidewalls, house-style door, 2x3 window, available in sizes 10x10 through 16x40 with T1-11 or LP SmartPanel siding.",
      "brand": { "@id": "https://legacystructuresusa.com/#organization" },
      "offers": {
        "@type": "AggregateOffer",
        "offerCount": 26,
        "availability": "https://schema.org/InStock",
        "url": "https://www.legacystructuresusa.com/portable-garages"
      }
    },
    {
      "@type": "Product",
      "@id": "https://legacystructuresusa.com/#product-lofted-garage",
      "name": "Legacy Structures Lofted Garage",
      "description": "Portable garage with overhead loft storage, house-style door, 2x3 window, available in sizes 10x10 through 16x40.",
      "brand": { "@id": "https://legacystructuresusa.com/#organization" },
      "offers": {
        "@type": "AggregateOffer",
        "offerCount": 26,
        "availability": "https://schema.org/InStock",
        "url": "https://www.legacystructuresusa.com/portable-garages"
      }
    }
  ]
};

const portableGarageFaqs = [
  {
    question: "What affects portable garage building prices?",
    answer:
      "Garage building prices depend on the size and style you choose, how you plan to use the space, and the options needed for your property. The final quote can change with building size, siding, roof style, doors, windows, loft or interior options, delivery distance, site access, setup, local requirements, and applicable taxes. Prices shown on this site do not include delivery, site preparation, or applicable taxes unless specifically stated.",
  },
  {
    question: "What sizes are available for portable garages?",
    answer:
      "Our garages start out as small as 8ft x 10ft and come as big as 16ft x 40ft, depending on location. We offer two basic styles of garages: a Utility Garage and a Lofted Garage. Each building has its own unique advantages.",
  },
  {
    question: "What doors and features come with portable garages?",
    answer:
      "Utility Garages include 8ft sidewalls, a solid house-style door, and a 2' x 3' window. Lofted Garages include an overhead loft instead of 8ft sidewalls, plus a solid house-style door and a 2' x 3' window. Double-Wide Garages include two roll-up doors, a 9-lite walk-in door, four windows, 12-inch on-center floor joists, and 3/4-inch treated flooring.",
  },
  {
    question: "How are portable garages delivered and installed?",
    answer:
      "After construction, your portable garage is delivered to your location and set up where you would like it to sit. Delivery availability and pricing vary by location, and placement restrictions may apply depending on your property, access, building size, local building codes, and zoning requirements. Before ordering, contact Legacy Structures to discuss your location and the delivery and installation details for your garage.",
  },
  {
    question: "How do I get current portable garage pricing or request a quote?",
    answer:
      "For current cash or rent-to-own figures, download the FREE Pricing Guide or call Legacy Structures at 518-544-2889. A local quote helps you compare the right building instead of comparing a base price that may not fit your vehicle, equipment, or property. You can also use the free garage quote form on this page.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "url": "https://www.legacystructuresusa.com/portable-garages",
  "mainEntity": portableGarageFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

export default function PortableGaragesPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
            <a data-mega-cta="3d-designer" href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1" target="_blank" rel="noopener noreferrer" className="block">
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
          <div id="garage-quote-form" className="lg:w-[33%]">
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
            Our garages start out as small as 8ft x 10ft and come as big as 16ft x 40ft (depending on location). We offer two basic styles of garages: a Utility Garage and a Lofted Garage. Each building has its own unique advantages.
          </p>
          <h3 className="text-[#1a3a5c] text-2xl font-bold mb-3">
            Portable Garage Delivery and Installation
          </h3>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            After construction, your portable garage is delivered to your location and set up where you would like it to sit. Delivery availability and pricing vary by location, and placement restrictions may apply depending on your property, access, building size, local building codes, and zoning requirements.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Before ordering, contact Legacy Structures to discuss your location and the delivery and installation details for your garage. If you move later, contact your dealer for the delivery company&apos;s contact information to discuss relocating the structure.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            We have seen many different uses when customers purchase our portable garages&hellip;including car storage, home office, homeschool room, crafting room, and so much more! If you live in or around Hudson Falls, NY and need storage, come by and visit us or give us a call at <a href={`tel:${BRAND.phoneTel}`} className="text-[#c0392b] underline">{BRAND.phone}</a>.
          </p>
          <p className="mb-8">
            <a href="#pricing-form" className="text-[#c0392b] font-bold underline">
              Download Our FREE Pricing Guide
            </a>
          </p>
        </FadeIn>

        {/* Garage Pricing Comparison */}
        <FadeIn>
          <section className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10">
            <h2 className="page-content-heading">Garage Building Prices: Compare Your Options</h2>
            <p className="text-[#5a6c7e] leading-relaxed mb-4">
              Garage building prices depend on the size and style you choose, how you plan to use the space, and the options needed for your property. Compare the three garage paths below, then use the free quote form above to get current pricing for your size, location, and delivery needs.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-[#5a6c7e]">
                <caption className="sr-only">Compare portable garage styles by use, size, and value drivers.</caption>
                <thead>
                  <tr className="bg-[#1a3a5c] text-white">
                    <th scope="col" className="border border-[#d9e1e8] p-3">Garage style</th>
                    <th scope="col" className="border border-[#d9e1e8] p-3">Best for</th>
                    <th scope="col" className="border border-[#d9e1e8] p-3">Typical available sizes</th>
                    <th scope="col" className="border border-[#d9e1e8] p-3">What affects value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="border border-[#d9e1e8] p-3 text-[#1a3a5c]">Utility Garage</th>
                    <td className="border border-[#d9e1e8] p-3">Zero-turn mowers, motorcycles, smaller vehicles, or floor-level storage.</td>
                    <td className="border border-[#d9e1e8] p-3">10&apos;–16&apos; wide; 10x10 through 16x40.</td>
                    <td className="border border-[#d9e1e8] p-3">8-foot sidewalls, a house-style door, and a 2&apos; x 3&apos; window.</td>
                  </tr>
                  <tr className="bg-[#f8fafb]">
                    <th scope="row" className="border border-[#d9e1e8] p-3 text-[#1a3a5c]">Lofted Garage</th>
                    <td className="border border-[#d9e1e8] p-3">Vehicle or equipment storage plus seasonal items stored overhead.</td>
                    <td className="border border-[#d9e1e8] p-3">10&apos;–16&apos; wide; 10x10 through 16x40.</td>
                    <td className="border border-[#d9e1e8] p-3">An overhead loft instead of 8-foot sidewalls, plus a house-style door and a 2&apos; x 3&apos; window.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-[#d9e1e8] p-3 text-[#1a3a5c]">
                      <a href="https://www.legacystructuresusa.com/double-wide-garages" className="text-[#c0392b] underline">Double-Wide Garage</a>
                    </th>
                    <td className="border border-[#d9e1e8] p-3">Two vehicles, a larger workshop, or large equipment.</td>
                    <td className="border border-[#d9e1e8] p-3">24x24 through 24x40.</td>
                    <td className="border border-[#d9e1e8] p-3">Two halves joined on-site, two roll-up doors, a 9-lite walk-in door, four windows, 12-inch on-center floor joists, and 3/4-inch treated flooring.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#5a6c7e] leading-relaxed mt-4 mb-4">
              The final quote can change with building size, siding, roof style, doors, windows, loft or interior options, delivery distance, site access, setup, local requirements, and applicable taxes. Prices shown on this site do not include delivery, site preparation, or applicable taxes unless specifically stated. Delivery availability and pricing vary by location.
            </p>
            <p className="text-[#5a6c7e] leading-relaxed mb-4">
              For current cash or rent-to-own figures, download the FREE Pricing Guide or call Legacy Structures at 518-544-2889. A local quote helps you compare the right building instead of comparing a base price that may not fit your vehicle, equipment, or property.
            </p>
            <p>
              <a href="#garage-quote-form" className="text-[#c0392b] font-bold underline">Request your free garage quote</a>
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="border-b-[3px] border-[#1a3a5c] pb-10 mb-10" aria-labelledby="portable-garages-faq-heading">
            <h2 id="portable-garages-faq-heading" className="page-content-heading">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {portableGarageFaqs.map((faq) => (
                <details key={faq.question} className="border border-gray-200 p-4">
                  <summary className="cursor-pointer font-bold text-[#1a3a5c]">{faq.question}</summary>
                  <p className="mt-3 text-[#5a6c7e] leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
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
