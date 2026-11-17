import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import FadeIn from "@/components/FadeIn";
import { siteAssets } from "@/lib/site-assets";
import { BRAND } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Adirondack Sheds | Legacy Structures",
  description:
    "Looking for Adirondack sheds? Compare storage shed styles, sizes, finishes, delivery questions, and rent-to-own options with Legacy Structures.",
  path: "/service-areas/adirondack-ny",
  canonicalHost: "https://legacystructuresusa.com",
});

const faqItems = [
  {
    question: "Can Legacy Structures help me choose a shed for an Adirondack property?",
    answer:
      "Yes. Share what you plan to store, the space available, your preferred style, and any access details. Legacy Structures can help you compare practical building options and discuss the questions that affect delivery to your property.",
  },
  {
    question: "What can I customize on a storage shed?",
    answer:
      "Options can include the building style and size, siding or finish, doors, windows, and loft storage. Contact us to discuss the features that fit your plans and the building you are considering.",
  },
  {
    question: "Can Legacy Structures deliver a shed to Adirondack?",
    answer:
      "Delivery availability depends on the exact address, building, route, and site conditions. Contact Legacy Structures before choosing a building so the team can confirm the current delivery options and placement details for your property.",
  },
  {
    question: "Does Legacy Structures offer rent-to-own sheds?",
    answer:
      "Yes. Legacy Structures offers rent-to-own options with no credit check. Terms and payment amounts vary by building, so contact us for current details.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function AdirondackShedsPage() {
  return (
    <div style={{ background: "#f7f5f2" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title="Adirondack Sheds and Storage Buildings"
        subtitle="Compare storage shed styles, sizes, and features for your Adirondack property, then contact Legacy Structures to discuss delivery and setup."
        backgroundImage={siteAssets.categoryPage.storageSheds.src}
        variant="navy"
      />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:block">
          <div className="order-2 lg:order-none lg:float-right lg:w-[33%]">
            <QuoteForm title="Request Your" titleSpan="FREE Shed Quote!" />
          </div>
          <div className="order-1 lg:order-none lg:w-[67%]">
            <Image
              src={siteAssets.categoryPage.storageSheds.src}
              alt="Custom storage shed by Legacy Structures"
              width={siteAssets.categoryPage.storageSheds.width}
              height={siteAssets.categoryPage.storageSheds.height}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 67vw"
            />
            <a
              data-mega-cta="3d-designer"
              href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
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
          <main className="order-3 bg-white px-4 py-10">
            <FadeIn>
              <h2 className="page-content-heading">Find a Shed That Fits Your Adirondack Property</h2>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                If you are looking for Adirondack sheds, Legacy Structures can help you compare practical storage-building options for your property. Our family-owned business is located in Hudson Falls, New York, and we work with customers who want a building that fits their storage needs, available space, and plans for the property.
              </p>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                A storage shed can give lawn equipment, tools, seasonal items, and household gear a dedicated place outside your home. Start by thinking about what you need to store now and what you may add later. The right size should leave room to move around the building, open doors, and reach the items you use most often.
              </p>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                For an Adirondack property, it also helps to look at the route to the proposed building location before you choose a size. Measure gates, turns, slopes, overhead branches, and other access points. Share those details when you contact us so we can discuss the building and delivery questions that apply to your site.
              </p>
            </FadeIn>

            <FadeIn>
              <h2 className="page-content-heading">Custom Backyard Shed Styles</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                <Image
                  src={siteAssets.categoryPage.backyardBarns.src}
                  alt="Backyard barn with loft storage by Legacy Structures"
                  width={siteAssets.categoryPage.backyardBarns.width}
                  height={siteAssets.categoryPage.backyardBarns.height}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <Image
                  src={siteAssets.categoryPage.portableGarages.src}
                  alt="Portable garage building by Legacy Structures"
                  width={siteAssets.categoryPage.portableGarages.width}
                  height={siteAssets.categoryPage.portableGarages.height}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                Choose a building style based on the space you have, the way you plan to use it, and the look you want in your yard.
              </p>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                <strong>Storage sheds:</strong> A flexible option for lawn equipment, tools, bicycles, seasonal decorations, and general household storage. Explore <a href="/storage-sheds" className="text-[#c0392b] underline">storage sheds</a> to compare the available category.
              </p>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                <strong>Backyard barns:</strong> A taller profile can provide useful loft storage when you need more room without using all of your yard for floor space. See <a href="/backyard-barns" className="text-[#c0392b] underline">backyard barns</a> for another way to organize storage.
              </p>
              <p className="text-[#5a6c7e] leading-relaxed mb-8">
                <strong>Portable garages:</strong> A covered building can provide space for a vehicle, equipment, hobbies, or a workshop. Review <a href="/portable-garages" className="text-[#c0392b] underline">portable garages</a> when your needs extend beyond a basic storage shed.
              </p>
            </FadeIn>

            <FadeIn>
              <h2 className="page-content-heading">Choosing the Right Shed Size</h2>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                Size affects both what you can store and how comfortably you can use the building. Make a short list of the largest items that need to go inside, then account for doors, aisles, shelving, and future storage. A compact shed may work for hand tools and seasonal items, while a larger building may be a better fit for riding equipment, workshop use, or a growing household.
              </p>
              <p className="text-[#5a6c7e] leading-relaxed mb-8">
                Think about height as well as floor space. Loft storage can help keep less frequently used items above the main floor, while windows and door placement can make the building easier to use. If you are unsure, bring your measurements and storage list to the conversation so we can help you compare a practical starting point.
              </p>
            </FadeIn>

            <FadeIn>
              <h2 className="page-content-heading">Delivery and Setup in Adirondack</h2>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                Delivery availability depends on the building, the address, and the conditions at the property. Contact Legacy Structures to confirm whether delivery is available to your Adirondack location and to discuss the placement details for the building you choose.
              </p>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                Before delivery, plan a clear route to the building location and a firm, prepared area. Tell us about narrow gates, tight turns, slopes, soft ground, trees, overhead wires, and other access considerations. Buildings sit on or above the ground on suitable support such as pressure-treated skids, sleepers, a gravel pad, blocks, or a deck. They are not frozen or embedded into the ground.
              </p>
              <p className="text-[#5a6c7e] leading-relaxed mb-8">
                Confirm the site details before the building is scheduled so the delivery conversation is based on your actual property rather than a generic estimate.
              </p>
            </FadeIn>

            <FadeIn>
              <h2 className="page-content-heading">How to Get Started</h2>
              <ol className="list-decimal pl-6 text-[#5a6c7e] leading-relaxed mb-4 space-y-2">
                <li>Browse the <a href="/inventory" className="text-[#c0392b] underline">current inventory</a> for buildings that may be ready for delivery.</li>
                <li>Use the <a href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1" target="_blank" rel="noopener noreferrer" className="text-[#c0392b] underline">3D shed builder</a> to explore a custom look, size, and possible features.</li>
                <li>Call or text <a href={`tel:${BRAND.phoneTel}`} className="text-[#c0392b] underline">{BRAND.phone}</a> to discuss your storage needs, site, delivery questions, and payment options.</li>
              </ol>
              <p className="text-[#5a6c7e] leading-relaxed mb-8">
                Legacy Structures also offers <a href="/rent-to-own" className="text-[#c0392b] underline">rent-to-own options</a> with no credit check. Terms and payment amounts depend on the building you choose, so contact us for current details.
              </p>
              <Image
                src={siteAssets.splitCta.shedBuilder.src}
                alt="3D shed design tool showing storage building options"
                width={siteAssets.splitCta.shedBuilder.width}
                height={siteAssets.splitCta.shedBuilder.height}
                className="w-full h-auto mb-8"
                sizes="(max-width: 1024px) 100vw, 67vw"
              />
            </FadeIn>

            <FadeIn>
              <h2 className="page-content-heading">Questions About Adirondack Sheds?</h2>
              <p className="text-[#5a6c7e] leading-relaxed mb-4">
                Tell us what you want to store, how much space you have, and where you plan to place the building. We can help you compare options and identify the delivery and setup questions to answer before you move forward.
              </p>
              <p className="mb-8">
                <a data-mega-cta="call-now" href={`tel:${BRAND.phoneTel}`} className="text-[#c0392b] underline font-bold">Call or text {BRAND.phone}</a>
              </p>
              <p className="mb-10">
                <a data-mega-cta="contact-us" href="/contact-us" style={{ color: "#fff" }} className="inline-block rounded-md bg-[#c0392b] px-6 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-[#a93226]">Contact Legacy Structures</a>
              </p>
            </FadeIn>

            <FadeIn>
              <h2 className="page-content-heading">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map(({ question, answer }) => (
                  <div key={question}>
                    <h3 className="text-[#1a3a5c] text-lg font-bold mb-2">{question}</h3>
                    <p className="text-[#5a6c7e] leading-relaxed">{answer}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </main>
        </div>
      </div>
    </div>
  );
}
