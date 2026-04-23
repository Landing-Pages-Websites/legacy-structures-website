import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";

const businessHours = [
  { day: "Monday", hours: "By Appointment" },
  { day: "Tuesday", hours: "9:00 to 5:00" },
  { day: "Wednesday", hours: "By Appointment" },
  { day: "Thursday", hours: "By Appointment" },
  { day: "Friday", hours: "By Appointment" },
  { day: "Saturday", hours: "By Appointment" },
  { day: "Sunday", hours: "Closed" },
];

const MAP_SRC =
  "https://maps.google.com/maps?q=3570+US+4,+Hudson+Falls,+NY+12839&t=&z=13&ie=UTF8&iwloc=&output=embed";

export default function ContactUsPage() {
  return (
    <div style={{ background: "#f7f5f2" }}>
      <PageHero
        title="Contact Us"
        subtitle="Visit us in Hudson Falls, NY — we'd love to help you find the perfect building for your needs."
        variant="navy"
      />

      {/* Info + Map */}
      <section style={{ padding: "64px 20px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 40,
            alignItems: "stretch",
          }}
          className="contact-grid"
        >
          <FadeIn>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: 32,
                boxShadow: "0 4px 20px rgba(26, 58, 92, 0.08)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div>
                <h2
                  style={{
                    color: "#1a3a5c",
                    fontSize: 24,
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  Legacy Structures
                </h2>
                <div
                  style={{
                    width: 48,
                    height: 3,
                    background: "#c0392b",
                    borderRadius: 2,
                  }}
                />
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#5a6c7e", letterSpacing: 0.5, marginBottom: 6 }}>
                  Address
                </div>
                <address style={{ fontStyle: "normal", color: "#1a3a5c", fontSize: 16, lineHeight: 1.6 }}>
                  3570 US 4
                  <br />
                  Hudson Falls, NY 12839
                </address>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#5a6c7e", letterSpacing: 0.5, marginBottom: 6 }}>
                  Phone
                </div>
                <a
                  href="tel:518-544-2889"
                  style={{ color: "#c0392b", fontSize: 16, fontWeight: 600, textDecoration: "none" }}
                >
                  518-544-2889
                </a>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#5a6c7e", letterSpacing: 0.5, marginBottom: 6 }}>
                  Email
                </div>
                <a
                  href="mailto:info@legacystructuresusa.com"
                  style={{ color: "#c0392b", fontSize: 16, fontWeight: 600, textDecoration: "none" }}
                >
                  info@legacystructuresusa.com
                </a>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#5a6c7e", letterSpacing: 0.5, marginBottom: 8 }}>
                  Business Hours
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {businessHours.map((row) => (
                    <li
                      key={row.day}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "6px 0",
                        borderBottom: "1px solid #f0ece6",
                        color: "#1a3a5c",
                        fontSize: 15,
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{row.day}</span>
                      <span style={{ color: "#5a6c7e" }}>{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(26, 58, 92, 0.08)",
                height: "100%",
                minHeight: 400,
                background: "#ffffff",
              }}
            >
              <iframe
                src={MAP_SRC}
                title="Map to Legacy Structures, 3570 US 4, Hudson Falls, NY 12839"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: 400 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: "24px 20px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: 40,
                boxShadow: "0 4px 20px rgba(26, 58, 92, 0.08)",
              }}
            >
              <h2
                style={{
                  color: "#1a3a5c",
                  fontSize: 28,
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Email Us
              </h2>
              <div
                style={{
                  width: 48,
                  height: 3,
                  background: "#c0392b",
                  borderRadius: 2,
                  marginBottom: 20,
                }}
              />
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
