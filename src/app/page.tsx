import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import FeaturedCarousel from "@/components/FeaturedCarousel";

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
  { label: "E", text: "All siding comes with a Manufacturer\u2019s warranty" },
  { label: "F", text: '2x4 studs set 16" OC on painted buildings & 24" OC on treated buildings' },
  { label: "G", text: "Double studs under siding seams" },
  { label: "H", text: '5/8" treated floor decking' },
];

export default function Home() {
  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Two-Column CTA */}
      <section style={{ background: "#c0392b", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1150, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[
            {
              title: "Try Our 3D Shed Builder",
              desc: "Design your dream shed with our interactive 3D builder. Choose your style, size, and finish.",
              img: "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/3d-shed-builder-screen.png",
              btn: "Design Your Shed",
              href: "https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1",
              external: true,
            },
            {
              title: "View Our Inventory",
              desc: "Browse our current selection of in-stock buildings ready for delivery.",
              img: "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/view-inventory-sheds.png",
              btn: "View Our Inventory",
              href: "/inventory",
              external: false,
            },
          ].map((card) => (
            <div key={card.title} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 32, textAlign: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
              <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 700, paddingBottom: 8, fontFamily: "var(--font-poppins)" }}>{card.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, paddingBottom: 20 }}>{card.desc}</p>
              <div style={{ marginBottom: 20 }}>
                <img src={card.img} alt={card.title} style={{ maxWidth: "100%", borderRadius: 8 }} />
              </div>
              {card.external ? (
                <a href={card.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#d4a017", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px 32px", borderRadius: 6, textDecoration: "none", textTransform: "uppercase", letterSpacing: 0.5, transition: "all 0.2s" }}>
                  {card.btn}
                </a>
              ) : (
                <Link href={card.href} style={{ display: "inline-block", background: "#d4a017", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px 32px", borderRadius: 6, textDecoration: "none", textTransform: "uppercase", letterSpacing: 0.5, transition: "all 0.2s" }}>
                  {card.btn}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Sheds */}
      <section style={{ background: "#f7f5f2", padding: "48px 0 56px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, color: "#1a3a5c", paddingBottom: 24, fontFamily: "var(--font-poppins)" }}>Featured Sheds For Sale in Hudson Falls, NY</h2>
        <div style={{ maxWidth: 1150, margin: "0 auto", padding: "0 24px" }}>
          <FeaturedCarousel sheds={featuredSheds} />
        </div>
      </section>

      {/* CTA Bar */}
      <section style={{ background: "#1a3a5c", padding: "20px 24px", textAlign: "center" }}>
        <Link href="/inventory" style={{ color: "#fff", fontFamily: "var(--font-poppins)", fontSize: 18, fontWeight: 600, textTransform: "uppercase", textDecoration: "none", letterSpacing: 2 }}>
          High Quality Materials &amp; Superior Craftsmanship
        </Link>
      </section>

      {/* Pricing Guide */}
      <section style={{ background: "#f7f5f2", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#c0392b", fontSize: 26, fontFamily: "var(--font-poppins)", paddingBottom: 12 }}>
            Download Our FREE Pricing Guide
          </h2>
          <p style={{ fontSize: 15, color: "#5a6c7e", maxWidth: 700, margin: "0 auto", paddingBottom: 32 }}>
            Get all the pricing information you need — models, sizes, and customization options — to make an informed decision.
          </p>
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/homepage-devices.png" alt="Pricing Guide" style={{ maxWidth: 400, width: "100%" }} />
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 700, fontSize: 20, color: "#1a3a5c", paddingBottom: 12, fontFamily: "var(--font-poppins)" }}>Free Pricing Guide!</p>
            <a href="#pricing-form" style={{ display: "inline-block", background: "#d4a017", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 40px", borderRadius: 6, textDecoration: "none", textTransform: "uppercase" }}>
              Download Here
            </a>
          </div>
        </div>
      </section>

      {/* Warranty CTA */}
      <section style={{ background: "#c0392b", padding: "16px 24px", textAlign: "center" }}>
        <a href="https://backyardoutfittersusa.com/warranty-and-guarantee/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontFamily: "var(--font-poppins)", fontSize: 16, fontWeight: 600, textDecoration: "none", textTransform: "uppercase", letterSpacing: 1.5 }}>
          Learn More About Our 5 Year Warranty — <span style={{ color: "#d4a017" }}>Click Here</span>
        </a>
      </section>

      {/* Materials Section */}
      <section style={{ padding: "48px 24px", background: "#fff" }}>
        <h1 style={{ color: "#1a3a5c", fontSize: 28, fontFamily: "var(--font-poppins)", fontWeight: 700, paddingBottom: 32 }}>
          Built With Superior Materials and Construction
        </h1>
        <div style={{ display: "flex", maxWidth: 1050, margin: "0 auto", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {materials.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16, background: "#f7f5f2", borderRadius: 8, padding: "14px 18px" }}>
                <div style={{ background: "#c0392b", borderRadius: "50%", width: 28, height: 28, minWidth: 28, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.label}
                </div>
                <span style={{ fontSize: 15, color: "#2c3e50", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/barn-interior-img.png" alt="Barn interior" style={{ width: "100%", borderRadius: 8 }} />
          </div>
        </div>
      </section>
    </div>
  );
}
