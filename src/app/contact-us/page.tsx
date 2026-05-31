import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Legacy Structures – Hudson Falls, NY",
  description:
    "Visit Legacy Structures in Hudson Falls, NY — our lot is open 24/7. Call or text Stephen at 518-544-2889 or fill out our contact form to request a quote.",
};

const businessHours = [
  { day: "Monday", hours: "By Appointment" },
  { day: "Tuesday", hours: "9:00 am – 5:00 pm" },
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

      {/* ── Lot-Hours Disclaimer ── */}
      <div
        style={{
          background: "#1a3a5c",
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffc400"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, marginTop: 2 }}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div style={{ color: "#fff", fontSize: 15, lineHeight: 1.6 }}>
            <strong style={{ display: "block", color: "#ffc400", marginBottom: 4, fontSize: 16 }}>
              Good news — our lot is open 24 hours a day, 7 days a week, 365 days a year.
            </strong>
            You are welcome to walk through and browse our sheds and buildings any time, day or night —
            no appointment needed.{" "}
            <strong>Stephen is physically on-site Tuesday 9:00 am – 5:00 pm</strong> for in-person
            help. Outside of Tuesday, he&apos;s available by phone or text. Don&apos;t hesitate to
            call or text if you have questions!
          </div>
        </div>
      </div>

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
                  {BRAND.name}
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
                  {BRAND.addressStreet}
                  <br />
                  {BRAND.addressCity}, {BRAND.addressState} {BRAND.addressZip}
                </address>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#5a6c7e", letterSpacing: 0.5, marginBottom: 6 }}>
                  Call or Text
                </div>
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  style={{ color: "#c0392b", fontSize: 16, fontWeight: 600, textDecoration: "none" }}
                >
                  {BRAND.phone}
                </a>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#5a6c7e", letterSpacing: 0.5, marginBottom: 6 }}>
                  Email
                </div>
                <a
                  href={`mailto:${BRAND.email}`}
                  style={{ color: "#c0392b", fontSize: 16, fontWeight: 600, textDecoration: "none" }}
                >
                  {BRAND.email}
                </a>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#5a6c7e", letterSpacing: 0.5, marginBottom: 8 }}>
                  Stephen&apos;s On-Site Hours
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
                <p style={{ fontSize: 13, color: "#5a6c7e", marginTop: 10, lineHeight: 1.5 }}>
                  The lot itself is open <strong>24/7, 365 days a year</strong> — walk through any time.
                </p>
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
                title={`Map to ${BRAND.name}, ${BRAND.address}`}
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
                Send Us a Message
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
