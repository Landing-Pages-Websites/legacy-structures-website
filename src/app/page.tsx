import Image from "next/image";
import Link from "next/link";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import HeroWithOverlay from "@/components/HeroWithOverlay";
import PricingGuideSection from "@/components/PricingGuideSection";
import { siteAssets } from "@/lib/site-assets";

/* ── Featured sheds ────────────────────────────────────────────────── */
const featuredSheds = [
  { name: "Lofted Barn Playhouse", price: 7818.50, image: "/images/optimized-assets/featured/lofted-barn-playhouse.webp", href: "/building/lofted-barn-playhouse" },
  { name: "Utility Shed", price: 5576.00, image: "/images/optimized-assets/featured/utility-shed-10.webp", href: "/building/utility-shed-10" },
  { name: "Lofted Barn", price: 6133.00, image: "/images/optimized-assets/featured/lofted-barn-7.webp", href: "/building/lofted-barn-7" },
  { name: "Utility Shed", price: 4585.00, image: "/images/optimized-assets/featured/utility-shed-8.webp", href: "/building/utility-shed-8" },
  { name: "Garage", price: 11002.00, image: "/images/optimized-assets/featured/garage.webp", href: "/building/garage" },
  { name: "Utility Dormer", price: 6277.00, image: "/images/optimized-assets/featured/utility-dormer.webp", href: "/building/utility-dormer" },
  { name: "Single Slope", price: 4403.00, image: "/images/optimized-assets/featured/single-slope.webp", href: "/building/single-slope" },
  { name: "Lofted Barn", price: 5095.00, image: "/images/optimized-assets/featured/lofted-barn-3.webp", href: "/building/lofted-barn-3" },
  { name: "Utility Shed", price: 5652.00, image: "/images/optimized-assets/featured/utility-shed-4.webp", href: "/building/utility-shed-4" },
  { name: "Double Wide Garage", price: 18567.00, image: "/images/optimized-assets/featured/double-wide-garage.webp", href: "/building/double-wide-garage" },
  { name: "Utility Gable Dormer", price: 7231.00, image: "/images/optimized-assets/featured/utility-gable-dormer.webp", href: "/building/utility-gable-dormer" },
  { name: "Lofted Barn Playhouse", price: 9409.65, image: "/images/optimized-assets/featured/lofted-barn-playhouse-2.webp", href: "/building/lofted-barn-playhouse-2" },
];

/* ── Product categories ─────────────────────────────────────────────── */
const categories = [
  { label: "Backyard Barns", desc: "Lofted, mini & metal barn styles", href: "/backyard-barns", img: siteAssets.categoryCards.backyardBarns },
  { label: "Storage Sheds", desc: "Utility, dormer & single-slope sheds", href: "/storage-sheds", img: siteAssets.categoryCards.storageSheds },
  { label: "Portable Cabins", desc: "Hunting cabins, home offices & tiny homes", href: "/portable-cabins", img: siteAssets.categoryCards.portableCabins },
  { label: "Portable Garages", desc: "Single & tandem-car garage options", href: "/portable-garages", img: siteAssets.categoryCards.portableGarages },
  { label: "Double Wide Garages", desc: "Delivered in halves, joined on-site", href: "/double-wide-garages", img: siteAssets.categoryCards.doubleWideGarages },
  { label: "Chicken Coops", desc: "Safe, practical backyard coops", href: "/chicken-coops", img: siteAssets.categoryCards.chickenCoops },
  { label: "Greenhouses", desc: "Grow year-round with full assembly", href: "/greenhouses", img: siteAssets.categoryCards.greenhouses },
  { label: "Side Gables", desc: "Side-entry utility shed alternative", href: "/side-gables", img: siteAssets.categoryCards.sideGables },
];

/* ── Quality materials list ─────────────────────────────────────────── */
const materials = [
  { label: "A", text: "Standard Metal Or Shingle Roof" },
  { label: "B", text: "Exposed nails are ring-shanked and galvanized for rust prevention" },
  { label: "C", text: "Treating buildings have water-sealed, T1-11 siding" },
  { label: "D", text: "Painted buildings LP Smartside Panel siding with 5/50-year limited warranty" },
  { label: "E", text: "All siding comes with a Manufacturer's warranty" },
  { label: "F", text: '2x4 studs set 16" OC on painted buildings & 24" OC on treated buildings' },
  { label: "G", text: "Double studs under siding seams" },
  { label: "H", text: '5/8" treated floor decking' },
];

/* ── Trust signals ──────────────────────────────────────────────────── */
const trustItems = [
  {
    label: "5-Year Warranty",
    sub: "Backed by Backyard Outfitters",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    label: "Free Delivery",
    sub: "Within 30 miles of our lot",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Rent-To-Own",
    sub: "No credit check · instant approval",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    label: "Local Craftsmanship",
    sub: "Built by local families in Hudson Falls, NY",
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="legacy-home">
      {/* ── Hero Slider ────────────────────────────────────────────── */}
      <HeroWithOverlay />

      {/* ── Trust Bar ──────────────────────────────────────────────── */}
      <section className="trust-bar" aria-label="Why choose Legacy Structures">
        <div className="trust-bar-inner">
          {trustItems.map((item) => (
            <div key={item.label} className="trust-item">
              <div className="trust-icon">{item.svg}</div>
              <strong>{item.label}</strong>
              <span>{item.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Split CTA ──────────────────────────────────────────────── */}
      <section className="split-cta" aria-label="Design or browse our buildings">
        <div className="split-panel">
          <h2>Try Our 3D Shed Builder</h2>
          <p>Have a specific plan in mind? Use our interactive 3D designer to customize your perfect shed — choose your size, siding, roof, and colors before you buy.</p>
          <div className="split-img-wrap">
            <Image
              src={siteAssets.splitCta.shedBuilder.src}
              alt="Preview of the Legacy Structures 3D shed builder tool"
              width={siteAssets.splitCta.shedBuilder.width}
              height={siteAssets.splitCta.shedBuilder.height}
              loading="lazy"
            />
          </div>
          <a
            className="yellow-btn"
            href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Design Your Shed
          </a>
        </div>
        <div className="split-panel">
          <h2>View Our Inventory</h2>
          <p>Browse our lot in Hudson Falls, NY. We&apos;re always receiving new sheds, barns, garages, and structures ready for immediate delivery.</p>
          <div className="split-img-wrap">
            <Image
              src={siteAssets.splitCta.inventory.src}
              alt="Current inventory of storage sheds and barns for sale at Legacy Structures"
              width={siteAssets.splitCta.inventory.width}
              height={siteAssets.splitCta.inventory.height}
              loading="lazy"
            />
          </div>
          <Link className="yellow-btn" href="/inventory">
            View Our Inventory
          </Link>
        </div>
      </section>

      {/* ── Featured Sheds ─────────────────────────────────────────── */}
      <section className="featured-section" aria-labelledby="featured-heading">
        <h2 id="featured-heading">
          Featured Storage Sheds &amp; Barns for Sale in Hudson Falls, NY
        </h2>
        <div className="featured-inner">
          <FeaturedCarousel sheds={featuredSheds} />
        </div>
        <div className="featured-cta-row">
          <Link href="/inventory" className="yellow-btn-dark">
            Browse Full Inventory
          </Link>
          <Link href="/contact-us" className="outline-btn">
            Request a Quote
          </Link>
        </div>
      </section>

      {/* ── Category Cards ─────────────────────────────────────────── */}
      <section className="category-section" aria-labelledby="category-heading">
        <div className="category-header">
          <h2 id="category-heading">Explore Our Outdoor Structures</h2>
          <p>From backyard barns and storage sheds to garages, cabins, greenhouses, and chicken coops — we build and deliver across Hudson Falls, NY and surrounding areas.</p>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="category-card" aria-label={cat.label}>
              <div className="category-card-img">
                <Image
                  src={cat.img.src}
                  alt=""
                  fill
                  sizes="(max-width: 600px) 46vw, (max-width: 1100px) 30vw, 22vw"
                  loading="lazy"
                  className="category-card-image"
                />
                <div className="category-card-overlay" aria-hidden="true" />
                <div className="category-card-content">
                  <strong>{cat.label}</strong>
                  <span>{cat.desc}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Quality Band ───────────────────────────────────────────── */}
      <div className="red-band" role="presentation">
        High Quality Materials and Superior Craftsmanship
      </div>

      {/* ── Pricing Guide ──────────────────────────────────────────── */}
      <PricingGuideSection />

      {/* ── Warranty Band ──────────────────────────────────────────── */}
      <div className="warranty-band">
        <a
          href="https://backyardoutfittersusa.com/warranty-and-guarantee/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More About Our 5 Year Warranty! <span>Click Here</span>
        </a>
      </div>

      {/* ── Materials Section ──────────────────────────────────────── */}
      <section className="materials-section" aria-labelledby="materials-heading">
        <h2 id="materials-heading">Built With Superior Materials and Construction!</h2>
        <div className="materials-grid">
          <ul>
            {materials.map((item) => (
              <li key={item.label}>
                <span aria-hidden="true">{item.label}</span>
                {item.text}
              </li>
            ))}
          </ul>
          <div className="materials-img-wrap">
            <Image
              src={siteAssets.materials.barnInterior.src}
              alt="Diagram showing the quality construction materials used in Legacy Structures sheds and barns"
              width={siteAssets.materials.barnInterior.width}
              height={siteAssets.materials.barnInterior.height}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Bar ─────────────────────────────────────────── */}
      <section className="bottom-cta-bar" aria-label="Get in touch">
        <div className="bottom-cta-inner">
          <div className="bottom-cta-text">
            <strong>Ready to get started?</strong>
            <span>Call us or request a free quote — we&apos;re local, family-owned, and ready to help.</span>
          </div>
          <div className="bottom-cta-actions">
            <a href="tel:518-544-2889" className="cta-phone-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.35 6.35l.91-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              518-544-2889
            </a>
            <Link href="/contact-us" className="cta-quote-btn">
              Request a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Brand Vars ─────────────────────────────────────────────── */
        .legacy-home {
          --red:    #bd171f;
          --teal:   #006580;
          --yellow: #ffc400;
          --cream:  #e9e6e1;
          background: #fff;
        }
        .legacy-home h2,
        .legacy-home h3,
        .red-band,
        .warranty-band a {
          font-family: var(--font-oswald), Impact, sans-serif;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.08;
        }

        /* ── Trust Bar ──────────────────────────────────────────────── */
        .trust-bar {
          background: var(--teal);
          border-bottom: 3px solid #00526a;
        }
        .trust-bar-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 22px 32px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #fff;
          padding: 10px 8px;
          border-right: 1px solid rgba(255,255,255,0.15);
        }
        .trust-item:last-child { border-right: none; }
        .trust-icon {
          margin-bottom: 10px;
          color: #ffc400;
        }
        .trust-item strong {
          display: block;
          font-size: 15px;
          font-weight: 700;
          font-family: var(--font-oswald), Impact, sans-serif;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 3px;
          letter-spacing: 0.3px;
        }
        .trust-item span {
          font-size: 12.5px;
          color: rgba(255,255,255,0.8);
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.35;
        }

        /* ── Split CTA ──────────────────────────────────────────────── */
        .split-cta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--red);
          color: #fff;
        }
        .split-panel {
          min-height: 400px;
          padding: 36px 38px 32px;
          text-align: center;
          border-right: 4px solid #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .split-panel:last-child { border-right: 0; }
        .split-panel h2 {
          color: #fff;
          font-size: clamp(28px, 2.3vw, 40px);
          padding: 0 0 18px;
        }
        .split-panel p {
          max-width: 580px;
          margin: 0 auto 20px;
          padding: 0;
          color: rgba(255,255,255,0.92);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.6;
          flex: 1;
        }
        .split-img-wrap {
          overflow: hidden;
          margin: 0 auto 24px;
          width: min(500px, 78%);
        }
        .split-img-wrap img {
          display: block;
          width: 100%;
          height: 210px;
          object-fit: contain;
          transition: transform 0.5s ease;
        }
        .split-panel:hover .split-img-wrap img {
          transform: scale(1.04);
        }
        .yellow-btn,
        .download-btn {
          display: inline-block;
          background: var(--yellow);
          color: #050505 !important;
          border-radius: 3px;
          text-decoration: none;
          text-transform: uppercase;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1;
          padding: 13px 28px;
          transition: background 0.2s ease, transform 0.15s ease;
          letter-spacing: 0.3px;
        }
        .yellow-btn:hover,
        .download-btn:hover {
          background: #e6b000;
          transform: translateY(-2px);
        }

        /* ── Featured Sheds ─────────────────────────────────────────── */
        .featured-section {
          background: var(--cream);
          padding: 52px 0 56px;
          text-align: center;
        }
        .featured-section h2 {
          color: var(--teal);
          font-size: clamp(22px, 2.5vw, 40px);
          padding: 0 24px 36px;
          max-width: 820px;
          margin: 0 auto;
        }
        .featured-inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .featured-cta-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 36px;
          padding: 0 24px;
          flex-wrap: wrap;
        }
        .yellow-btn-dark {
          display: inline-block;
          background: var(--teal);
          color: #fff !important;
          border-radius: 3px;
          text-decoration: none;
          text-transform: uppercase;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 13px 28px;
          transition: background 0.2s ease, transform 0.15s ease;
          letter-spacing: 0.3px;
        }
        .yellow-btn-dark:hover {
          background: #00526a;
          transform: translateY(-2px);
        }
        .outline-btn {
          display: inline-block;
          background: transparent;
          color: var(--teal) !important;
          border: 2px solid var(--teal);
          border-radius: 3px;
          text-decoration: none;
          text-transform: uppercase;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 11px 26px;
          transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
          letter-spacing: 0.3px;
        }
        .outline-btn:hover {
          background: var(--teal);
          color: #fff !important;
          transform: translateY(-2px);
        }

        /* ── Category Cards ─────────────────────────────────────────── */
        .category-section {
          background: #fff;
          padding: 60px 24px 68px;
        }
        .category-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 44px;
        }
        .category-header h2 {
          color: var(--teal);
          font-size: clamp(26px, 2.6vw, 44px);
          padding-bottom: 12px;
        }
        .category-header p {
          color: #5a5a5a;
          font-size: 17px;
          font-family: Georgia, "Times New Roman", serif;
          line-height: 1.65;
          padding-bottom: 0;
        }
        .category-grid {
          max-width: 1380px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .category-card {
          display: block;
          text-decoration: none;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.07);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .category-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 18px 48px rgba(0,0,0,0.16);
        }
        .category-card-img {
          position: relative;
          height: 210px;
          background-color: #f5f3f0;
        }
        .category-card-image {
          object-fit: contain;
          object-position: center;
          transition: transform 0.5s ease;
        }
        .category-card:hover .category-card-image {
          transform: scale(1.08);
        }
        .category-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.04) 30%, rgba(0,50,70,0.68) 100%);
          transition: opacity 0.35s ease;
        }
        .category-card:hover .category-card-overlay {
          opacity: 0.92;
        }
        .category-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 14px 16px;
          z-index: 2;
        }
        .category-card-content strong {
          display: block;
          color: #fff;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 17px;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.15;
          text-shadow: 0 1px 6px rgba(0,0,0,0.4);
        }
        .category-card-content span {
          display: block;
          color: rgba(255,255,255,0.82);
          font-size: 11.5px;
          font-family: Arial, sans-serif;
          margin-top: 3px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }

        /* ── Red / Quality Band ─────────────────────────────────────── */
        .red-band {
          background: var(--red);
          color: #fff;
          text-transform: uppercase;
          text-align: center;
          font-size: clamp(24px, 2.5vw, 42px);
          padding: 24px 20px 28px;
        }

        /* ── Pricing guide & download btn ───────────────────────────── */
        .pricing-guide {
          background: var(--cream);
          text-align: center;
          padding: 44px 24px 48px;
        }
        .pricing-guide h2 {
          color: var(--red);
          font-size: clamp(26px, 2.4vw, 42px);
          padding: 0 0 22px;
        }
        .pricing-guide p {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 0 24px;
          color: #1f1f1f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          line-height: 1.55;
        }
        .pricing-row {
          max-width: 820px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          align-items: center;
          gap: 42px;
        }
        .pricing-row img { width: 100%; height: auto; }
        .pricing-row h3 {
          color: var(--red);
          font-size: clamp(28px, 2.4vw, 42px);
          padding: 0 0 20px;
        }
        .download-btn {
          min-width: 300px;
          padding: 15px 32px;
          border-radius: 5px;
          font-size: 23px;
        }

        /* ── Warranty Band ──────────────────────────────────────────── */
        .warranty-band {
          background: var(--red);
          text-align: center;
          padding: 22px 20px 26px;
        }
        .warranty-band a {
          color: #fff !important;
          text-decoration: none;
          text-transform: uppercase;
          font-size: clamp(22px, 2.3vw, 40px);
        }
        .warranty-band span { color: var(--yellow); }

        /* ── Materials ──────────────────────────────────────────────── */
        .materials-section {
          background: #fff;
          padding: 56px 24px 70px;
        }
        .materials-section h2 {
          color: var(--teal);
          text-align: center;
          font-size: clamp(26px, 2.5vw, 44px);
          padding: 0 0 48px;
        }
        .materials-grid {
          max-width: 1480px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          align-items: center;
          gap: 60px;
        }
        .materials-grid ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .materials-grid li {
          display: grid;
          grid-template-columns: 30px 1fr;
          gap: 22px;
          align-items: start;
          color: #151515;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .materials-grid li span {
          display: inline-flex;
          width: 28px;
          height: 28px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--red);
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .materials-img-wrap {
          overflow: hidden;
          border-radius: 6px;
        }
        .materials-img-wrap img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;
        }
        .materials-img-wrap:hover img {
          transform: scale(1.04);
        }

        /* ── Bottom CTA Bar ─────────────────────────────────────────── */
        .bottom-cta-bar {
          background: #1a2a3a;
          padding: 32px 24px;
        }
        .bottom-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          flex-wrap: wrap;
        }
        .bottom-cta-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .bottom-cta-text strong {
          color: #fff;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: clamp(20px, 2vw, 30px);
          font-weight: 700;
          text-transform: uppercase;
        }
        .bottom-cta-text span {
          color: rgba(255,255,255,0.7);
          font-size: 15px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .bottom-cta-actions {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }
        .cta-phone-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--yellow);
          color: #111 !important;
          text-decoration: none;
          font-family: Georgia, serif;
          font-weight: 700;
          font-size: 20px;
          padding: 11px 24px;
          border-radius: 4px;
          transition: background 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .cta-phone-btn:hover {
          background: #e6b000;
          transform: translateY(-2px);
        }
        .cta-quote-btn {
          display: inline-block;
          background: transparent;
          color: #fff !important;
          border: 2px solid rgba(255,255,255,0.5);
          text-decoration: none;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 700;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 11px 24px;
          border-radius: 4px;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .cta-quote-btn:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }

        /* ── Responsive ─────────────────────────────────────────────── */
        @media (max-width: 1100px) {
          .category-grid { grid-template-columns: repeat(3, 1fr); }
          .trust-bar-inner { grid-template-columns: repeat(2, 1fr); }
          .trust-item { border-right: none; }
        }
        @media (max-width: 900px) {
          .split-cta,
          .pricing-row,
          .materials-grid { grid-template-columns: 1fr; }
          .split-panel {
            border-right: 0;
            border-bottom: 4px solid #fff;
            min-height: 0;
          }
          .split-panel:last-child { border-bottom: 0; }
          .split-panel p { font-size: 17px; }
          .split-img-wrap img { height: 220px; }
          .download-btn { min-width: 0; width: 100%; font-size: 22px; }
          .category-grid { grid-template-columns: repeat(2, 1fr); }
          .bottom-cta-inner { flex-direction: column; text-align: center; align-items: center; }
        }
        @media (max-width: 600px) {
          .trust-bar-inner { grid-template-columns: 1fr 1fr; padding: 16px; gap: 12px; }
          .trust-item { padding: 8px 4px; }
          .trust-item strong { font-size: 13px; }
          .trust-item span { font-size: 11px; }
          .category-grid { gap: 12px; }
          .category-card-img { height: 170px; }
          .featured-cta-row { flex-direction: column; }
          .bottom-cta-actions { flex-direction: column; width: 100%; }
          .cta-phone-btn, .cta-quote-btn { width: 100%; justify-content: center; text-align: center; }
        }
      `}</style>
    </div>
  );
}
