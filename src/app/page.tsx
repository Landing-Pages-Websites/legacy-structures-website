import Link from "next/link";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import FadeIn from "@/components/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
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
  { label: "E", text: "All siding comes with a Manufacturer\u2019s warranty" },
  { label: "F", text: '2x4 studs set 16" OC on painted buildings & 24" OC on treated buildings' },
  { label: "G", text: "Double studs under siding seams" },
  { label: "H", text: '5/8" treated floor decking' },
];

export default function Home() {
  return (
    <div>
      {/* Hero Slider with Overlay */}
      <HeroWithOverlay />

      {/* Two-Column CTA */}
      <FadeIn>
        <section style={{ background: "#c0392b", padding: "48px 24px" }}>
          <StaggerChildren className="two-col-cta-grid">
            <div style={{ maxWidth: 1150, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "stretch" }}>
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
                <StaggerItem key={card.title} className="cta-card-wrap">
                  <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 32, textAlign: "center", border: "1px solid rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", height: "100%" }}>
                    <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 700, paddingBottom: 8, fontFamily: "var(--font-bricolage)", letterSpacing: "-0.02em" }}>{card.title}</h2>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, paddingBottom: 20 }}>{card.desc}</p>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, minHeight: 240 }}>
                      <img src={card.img} alt={card.title} style={{ maxWidth: "100%", maxHeight: 240, objectFit: "contain", borderRadius: 8 }} />
                    </div>
                    <div>
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
                  </div>
                </StaggerItem>
              ))}
            </div>
            <style>{`.cta-card-wrap { height: 100%; }`}</style>
          </StaggerChildren>
        </section>
      </FadeIn>

      {/* Featured Sheds */}
      <FadeIn>
        <section style={{ background: "#f7f5f2", padding: "48px 0 56px" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(24px, 3.2vw, 34px)", color: "#1a3a5c", paddingBottom: 24, fontFamily: "var(--font-bricolage)", fontWeight: 700, letterSpacing: "-0.02em" }}>Featured Sheds For Sale in Hudson Falls, NY</h2>
          <div style={{ maxWidth: 1150, margin: "0 auto", padding: "0 24px" }}>
            <FeaturedCarousel sheds={featuredSheds} />
          </div>
        </section>
      </FadeIn>

      {/* CTA Bar */}
      <section
        style={{
          background:
            "linear-gradient(90deg, #1a3a5c 0%, #24517f 50%, #1a3a5c 100%)",
          backgroundSize: "200% 100%",
          animation: "ctaGradientShift 8s ease-in-out infinite",
          padding: "22px 24px",
          textAlign: "center",
        }}
      >
        <Link href="/inventory" style={{ color: "#fff", fontFamily: "var(--font-bricolage)", fontSize: 20, fontWeight: 700, textTransform: "uppercase", textDecoration: "none", letterSpacing: 2 }}>
          High Quality Materials &amp; Superior Craftsmanship
        </Link>
        <style>{`
          @keyframes ctaGradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .pricing-download-btn {
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .pricing-download-btn:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 12px 28px rgba(212, 160, 23, 0.4);
          }
        `}</style>
      </section>

      {/* Pricing Guide */}
      <FadeIn>
        <section style={{ background: "#f7f5f2", padding: "48px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "#c0392b", fontSize: "clamp(24px, 3vw, 32px)", fontFamily: "var(--font-bricolage)", fontWeight: 700, letterSpacing: "-0.02em", paddingBottom: 12 }}>
              Download Our FREE Pricing Guide
            </h2>
            <p style={{ fontSize: 15, color: "#5a6c7e", maxWidth: 700, margin: "0 auto", paddingBottom: 32 }}>
              Get all the pricing information you need — models, sizes, and customization options — to make an informed decision.
            </p>
          </div>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/homepage-devices.png" alt="Pricing Guide" style={{ maxWidth: 400, width: "100%" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 700, fontSize: 20, color: "#1a3a5c", paddingBottom: 12, fontFamily: "var(--font-bricolage)", letterSpacing: "-0.02em" }}>Free Pricing Guide!</p>
              <a
                href="#pricing-form"
                className="pricing-download-btn"
                style={{ display: "inline-block", background: "#d4a017", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 40px", borderRadius: 6, textDecoration: "none", textTransform: "uppercase" }}
              >
                Download Here
              </a>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Warranty CTA */}
      <section style={{ background: "#c0392b", padding: "16px 24px", textAlign: "center" }}>
        <a href="https://backyardoutfittersusa.com/warranty-and-guarantee/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontFamily: "var(--font-poppins)", fontSize: 16, fontWeight: 600, textDecoration: "none", textTransform: "uppercase", letterSpacing: 1.5 }}>
          Learn More About Our 5 Year Warranty — <span style={{ color: "#d4a017" }}>Click Here</span>
        </a>
      </section>

      {/* Materials Section */}
      <FadeIn>
        <section style={{ padding: "48px 24px", background: "#fff" }}>
          <h1 style={{ color: "#1a3a5c", fontSize: "clamp(32px, 4.5vw, 52px)", fontFamily: "var(--font-bricolage)", fontWeight: 800, letterSpacing: "-0.02em", paddingBottom: 32, lineHeight: 1.1 }}>
            Built With Superior Materials and Construction
          </h1>
          <div style={{ display: "flex", maxWidth: 1050, margin: "0 auto", gap: 48, alignItems: "flex-start" }}>
            <StaggerChildren className="materials-list" stagger={0.06}>
              <div style={{ flex: 1 }}>
                {materials.map((item) => (
                  <StaggerItem key={item.label}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16, background: "#f7f5f2", borderRadius: 8, padding: "14px 18px" }}>
                      <div style={{ background: "#c0392b", borderRadius: "50%", width: 28, height: 28, minWidth: 28, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {item.label}
                      </div>
                      <span style={{ fontSize: 15, color: "#2c3e50", lineHeight: 1.5 }}>{item.text}</span>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerChildren>
            <div style={{ flex: 1 }}>
              <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/barn-interior-img.png" alt="Barn interior" style={{ width: "100%", borderRadius: 8 }} />
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
