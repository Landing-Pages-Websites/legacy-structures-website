/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import HeroWithOverlay from "@/components/HeroWithOverlay";

const featuredSheds = [
  { name: "Lofted Barn Playhouse", price: 7818.5, image: "https://legacystructuresusa.com/wp-content/uploads/2025/07/IMG_0101-1753234196232-scaled.jpeg", href: "/building/lofted-barn-playhouse" },
  { name: "Utility Shed", price: 5576.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_9707-1741118469914-scaled.jpeg", href: "/building/utility-shed-10" },
  { name: "Lofted Barn", price: 6133.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_9767-1741118736711-scaled.jpeg", href: "/building/lofted-barn-7" },
  { name: "Utility Shed", price: 4585.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_9653-1741118822925-scaled.jpeg", href: "/building/utility-shed-8" },
  { name: "Garage", price: 11002.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_9649-1741118897376-scaled.jpeg", href: "/building/garage" },
  { name: "Utility Dormer", price: 6277.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_8890-1741119409701-scaled.jpeg", href: "/building/utility-dormer" },
  { name: "Single Slope", price: 4403.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_8877-1741119643511-scaled.jpeg", href: "/building/single-slope" },
  { name: "Lofted Barn", price: 5095.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_8862-1741119998306-scaled.jpeg", href: "/building/lofted-barn-3" },
  { name: "Utility Shed", price: 5652.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_8856-1741114718259-scaled.jpeg", href: "/building/utility-shed-4" },
  { name: "Double Wide Garage", price: 18567.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_8847-1741114633956-scaled.jpeg", href: "/building/double-wide-garage" },
  { name: "Utility Gable Dormer", price: 7231.0, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_8819-1741047721560-scaled.jpeg", href: "/building/utility-gable-dormer" },
  { name: "Lofted Barn Playhouse", price: 9409.65, image: "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_8800-1741046752851-scaled.jpeg", href: "/building/lofted-barn-playhouse-2" },
];

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

export default function Home() {
  return (
    <div className="legacy-home">
      <HeroWithOverlay />

      <section className="split-cta">
        <div className="split-panel">
          <h2>Try Our 3D Shed Builder</h2>
          <p>Do you have a specific plan in mind for your dream shed?? Try our 3D shed designer to create the perfect shed for your needs!</p>
          <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/3d-shed-builder-screen.png" alt="3D shed builder preview" />
          <a className="yellow-btn" href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1" target="_blank" rel="noopener noreferrer">Design Your Shed</a>
        </div>
        <div className="split-panel">
          <h2>View Our Inventory</h2>
          <p>While we regularly sell buildings off our lot, we are also always getting more sheds on our lot. Check out our current inventory!</p>
          <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/view-inventory-sheds.png" alt="Inventory sheds" />
          <Link className="yellow-btn" href="/inventory">View Our Inventory</Link>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Sheds For Sale in Hudson Falls, NY</h2>
        <div className="featured-inner">
          <FeaturedCarousel sheds={featuredSheds} />
        </div>
      </section>

      <section className="red-band">
        High Quality Materials and Superior Craftsmanship
      </section>

      <section className="pricing-guide" id="pricing-form">
        <h2>Looking for Pricing? Download Our FREE Pricing Guide!</h2>
        <p>
          Ready to explore your options for the perfect portable building? Start with our FREE Pricing Guide! This detailed download provides you with all the pricing information you need to make an informed decision, including various models, sizes, and customization options. Don&apos;t miss out on this essential resource — click below to Download Your FREE Copy and take the first step towards choosing your ideal portable building today!
        </p>
        <div className="pricing-row">
          <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/homepage-devices.png" alt="Free pricing guide shown on laptop and phone" />
          <div>
            <h3>Free Pricing Guide!</h3>
            <a className="download-btn" href="#pricing-form">Download Here!</a>
          </div>
        </div>
      </section>

      <section className="warranty-band">
        <a href="https://backyardoutfittersusa.com/warranty-and-guarantee/" target="_blank" rel="noopener noreferrer">
          Learn More About Our 5 Year Warranty! <span>Click Here</span>
        </a>
      </section>

      <section className="materials-section">
        <h2>Built With Superior Materials and Construction!</h2>
        <div className="materials-grid">
          <ul>
            {materials.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                {item.text}
              </li>
            ))}
          </ul>
          <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/barn-interior-img.png" alt="Barn construction material diagram" />
        </div>
      </section>

      <style>{`
        .legacy-home {
          --legacy-red: #bd171f;
          --legacy-blue: #006580;
          --legacy-yellow: #ffc400;
          --legacy-cream: #e9e6e1;
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
        .split-cta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--legacy-red);
          color: #fff;
        }
        .split-panel {
          min-height: 410px;
          padding: 32px 34px 30px;
          text-align: center;
          border-right: 4px solid #fff;
        }
        .split-panel:last-child {
          border-right: 0;
        }
        .split-panel h2 {
          color: #fff;
          font-size: clamp(30px, 2.45vw, 42px);
          padding: 0 0 20px;
        }
        .split-panel p {
          max-width: 690px;
          min-height: 76px;
          margin: 0 auto 18px;
          padding: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.55;
        }
        .split-panel img {
          display: block;
          width: min(520px, 74%);
          height: 225px;
          object-fit: contain;
          margin: 0 auto 22px;
        }
        .split-panel:nth-child(2) img {
          width: min(620px, 82%);
        }
        .yellow-btn,
        .download-btn {
          display: inline-block;
          background: var(--legacy-yellow);
          color: #050505 !important;
          border-radius: 0;
          text-decoration: none;
          text-transform: uppercase;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 18px;
          line-height: 1;
        }
        .yellow-btn {
          padding: 12px 24px;
        }
        .featured-section {
          background: var(--legacy-cream);
          padding: 46px 0 52px;
          text-align: center;
        }
        .featured-section h2 {
          color: var(--legacy-blue);
          font-size: clamp(28px, 2.7vw, 46px);
          padding: 0 24px 34px;
        }
        .featured-inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .red-band {
          background: var(--legacy-red);
          color: #fff;
          text-transform: uppercase;
          text-align: center;
          font-size: clamp(28px, 2.75vw, 46px);
          padding: 24px 20px 28px;
        }
        .pricing-guide {
          background: var(--legacy-cream);
          text-align: center;
          padding: 42px 24px 46px;
        }
        .pricing-guide h2 {
          color: var(--legacy-red);
          font-size: clamp(28px, 2.5vw, 43px);
          padding: 0 0 24px;
        }
        .pricing-guide p {
          max-width: 1540px;
          margin: 0 auto;
          padding: 0 0 26px;
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
        .pricing-row img {
          width: 100%;
          height: auto;
        }
        .pricing-row h3 {
          color: var(--legacy-red);
          font-size: clamp(30px, 2.6vw, 44px);
          padding: 0 0 22px;
        }
        .download-btn {
          min-width: 310px;
          padding: 16px 34px;
          border-radius: 5px;
          font-size: 25px;
        }
        .warranty-band {
          background: var(--legacy-red);
          text-align: center;
          padding: 24px 20px 28px;
        }
        .warranty-band a {
          color: #fff !important;
          text-decoration: none;
          text-transform: uppercase;
          font-size: clamp(26px, 2.45vw, 42px);
        }
        .warranty-band span {
          color: var(--legacy-yellow);
        }
        .materials-section {
          background: #fff;
          padding: 52px 24px 66px;
        }
        .materials-section h2 {
          color: var(--legacy-blue);
          text-align: center;
          font-size: clamp(30px, 2.6vw, 46px);
          padding: 0 0 46px;
        }
        .materials-grid {
          max-width: 1500px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          align-items: center;
          gap: 58px;
        }
        .materials-grid ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .materials-grid li {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 26px;
          align-items: start;
          color: #151515;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          line-height: 1.15;
          margin-bottom: 21px;
        }
        .materials-grid li span {
          display: inline-flex;
          width: 27px;
          height: 27px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #d10f0f;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 700;
        }
        .materials-grid img {
          width: 100%;
          height: auto;
          display: block;
        }
        @media (max-width: 900px) {
          .split-cta,
          .pricing-row,
          .materials-grid {
            grid-template-columns: 1fr;
          }
          .split-panel {
            border-right: 0;
            border-bottom: 4px solid #fff;
            min-height: 0;
          }
          .split-panel:last-child {
            border-bottom: 0;
          }
          .split-panel p,
          .pricing-guide p {
            font-size: 19px;
          }
          .split-panel img {
            height: 240px;
          }
          .download-btn {
            min-width: 0;
            width: 100%;
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}
