import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import FadeIn from "@/components/FadeIn";
import { siteAssets } from "@/lib/site-assets";
import { BRAND } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Backyard Sheds in Queensbury, NY",
  description:
    "Find custom backyard sheds for Queensbury, NY with Legacy Structures. Choose a style, size, and finish, then ask about local delivery and installation.",
  path: "/service-areas/queensbury-ny",
  canonicalHost: "https://legacystructuresusa.com",
});

const faqItems = [
  {
    question: "Can Legacy Structures deliver a custom backyard shed to Queensbury?",
    answer:
      "Legacy Structures offers free delivery within 30 miles of its Hudson Falls location. Contact us to confirm delivery availability and placement details for your building and property.",
  },
  {
    question: "What can I customize on a backyard shed?",
    answer:
      "Options can include the building style and size, siding or finish, doors, windows, and loft storage. Contact us to discuss the features that fit your plans.",
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

export default function QueensburyShedsPage() {
  return (
    <div style={{ background: "#f7f5f2" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title="Custom Backyard Sheds in Queensbury, NY"
        subtitle="Choose a shed that fits your property, then let our Hudson Falls team help with delivery to Queensbury."
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
              alt="Custom backyard storage shed by Legacy Structures"
              width={siteAssets.categoryPage.storageSheds.width}
              height={siteAssets.categoryPage.storageSheds.height}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 67vw"
            />
            <a
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
          <h2 className="page-content-heading">Find a Shed That Fits Your Queensbury Property</h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            If you are searching for custom backyard sheds in Queensbury, NY, Legacy Structures can help you compare styles, sizes, and features for the way you plan to use your building. Our family-owned business is located in nearby Hudson Falls, and we serve homeowners and property owners throughout the surrounding area.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Start with the storage you need today, then consider the details that make the building work better for you: a loft for seasonal items, windows for natural light, a different door layout, or a finish that complements your property. We can talk through the options and help you choose a practical building without guessing at what your site needs.
          </p>
        </FadeIn>

        <FadeIn>
          <h2 className="page-content-heading">Custom Backyard Shed Styles</h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Choose a building style based on your storage goals, available space, and the look you want in your yard.
          </p>
          <ul className="list-disc pl-6 text-[#5a6c7e] leading-relaxed mb-4 space-y-2">
            <li><strong>Storage sheds:</strong> A flexible choice for lawn equipment, tools, seasonal items, and household storage.</li>
            <li><strong>Backyard barns:</strong> A taller profile with useful loft storage for homeowners who need more room.</li>
            <li><strong>Portable garages:</strong> More covered space for vehicles, equipment, hobbies, or a workshop.</li>
          </ul>
          <p className="text-[#5a6c7e] leading-relaxed mb-8">
            Explore <a href="/storage-sheds" className="text-[#c0392b] underline">Storage Sheds</a>, <a href="/backyard-barns" className="text-[#c0392b] underline">Backyard Barns</a>, and <a href="/portable-garages" className="text-[#c0392b] underline">Portable Garages</a> to compare available models and learn more about each style.
          </p>
        </FadeIn>

        <FadeIn>
          <h2 className="page-content-heading">Delivery and Setup in Queensbury</h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Legacy Structures offers free delivery within 30 miles of our Hudson Falls location. Queensbury customers can contact us to confirm delivery availability, placement details, and any site-access considerations for the building they choose.
          </p>
          <p className="text-[#5a6c7e] leading-relaxed mb-8">
            Before delivery, plan a clear route to the building location and a firm, prepared area. Buildings sit on a prepared pad or other suitable support such as pressure-treated skids, sleepers, gravel, blocks, or a deck; they are not frozen or embedded into the ground. We will discuss the details with you before your building is delivered.
          </p>
        </FadeIn>

        <FadeIn>
          <h2 className="page-content-heading">How to Get Started</h2>
          <ol className="list-decimal pl-6 text-[#5a6c7e] leading-relaxed mb-4 space-y-2">
            <li>Browse <a href="/inventory" className="text-[#c0392b] underline">current inventory</a> for buildings that may be ready for delivery.</li>
            <li>Use the <a href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1" target="_blank" rel="noopener noreferrer" className="text-[#c0392b] underline">3D shed builder</a> to explore a custom look and possible features.</li>
            <li>Call or text <a href={`tel:${BRAND.phoneTel}`} className="text-[#c0392b] underline">{BRAND.phone}</a> to talk through your size, style, site, delivery, and payment questions.</li>
          </ol>
          <p className="text-[#5a6c7e] leading-relaxed mb-8">
            Legacy Structures also offers <a href="/rent-to-own" className="text-[#c0392b] underline">rent-to-own options</a> with no credit check. Terms and payment amounts depend on the building you choose, so contact us for current details.
          </p>
        </FadeIn>

        <FadeIn>
          <h2 className="page-content-heading">Questions About a Shed in Queensbury?</h2>
          <p className="text-[#5a6c7e] leading-relaxed mb-4">
            Tell us what you want to store, how much space you have, and where you plan to place the building. We can help you compare options and take the next step.
          </p>
          <p className="mb-8">
            <a href={`tel:${BRAND.phoneTel}`} className="text-[#c0392b] underline font-bold">Call or text {BRAND.phone}</a>
          </p>
          <p className="mb-10">
            <a href="/contact-us" style={{ color: "#fff" }} className="inline-block rounded-md bg-[#c0392b] px-6 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-[#a93226]">Contact Legacy Structures</a>
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
