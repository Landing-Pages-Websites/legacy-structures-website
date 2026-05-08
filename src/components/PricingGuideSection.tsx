"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { siteAssets } from "@/lib/site-assets";

const STATES_PROVINCES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
  "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon",
];

const inputClasses = "w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent transition";
const selectClasses = "w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent transition appearance-none";

export default function PricingGuideSection() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", state: "", comments: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/pricing-guide", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="pricing-guide" style={{ background: "#e9e6e1", padding: "44px 24px 52px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ color: "#bd171f", fontSize: "clamp(28px, 2.5vw, 43px)", fontWeight: 700, fontFamily: "var(--font-oswald), Impact, sans-serif", paddingBottom: 18, textTransform: "uppercase" }}>
          Looking for Pricing? Download Our FREE Pricing Guide!
        </h2>
        <p style={{ fontSize: 18, color: "#1f1f1f", maxWidth: 1100, margin: "0 auto", paddingBottom: 28, fontFamily: "Georgia, 'Times New Roman', serif", lineHeight: 1.55 }}>
          Ready to explore your options for the perfect portable building? Start with our <strong>FREE Pricing Guide!</strong> This detailed download provides you with all the pricing information you need to make an informed decision, including various models, sizes, and customization options. Don&apos;t miss out on this essential resource.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 40 }}>
        <Image
          src={siteAssets.pricingGuide.devices.src}
          alt="Pricing Guide"
          width={siteAssets.pricingGuide.devices.width}
          height={siteAssets.pricingGuide.devices.height}
          loading="lazy"
          style={{ maxWidth: 360, width: "100%", height: "auto" }}
        />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 700, fontSize: 28, color: "#bd171f", paddingBottom: 12, fontFamily: "var(--font-oswald), Impact, sans-serif", textTransform: "uppercase" }}>Free Pricing Guide!</p>
          <a href="#pricing-form" style={{ display: "inline-block", background: "#ffc400", color: "#050505", fontWeight: 700, fontSize: 17, padding: "13px 34px", borderRadius: 4, textDecoration: "none", textTransform: "uppercase" }}>
            Download Here!
          </a>
        </div>
      </div>

      {/* Form */}
      <div id="pricing-form" style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #e8e4df", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h3 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#006580", marginBottom: 20, fontFamily: "var(--font-oswald), Impact, sans-serif", textTransform: "uppercase" }}>Request Your Pricing Guide</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label className="sr-only" htmlFor="pricing-guide-first-name">First Name</label>
            <input id="pricing-guide-first-name" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className={inputClasses} />
            <label className="sr-only" htmlFor="pricing-guide-last-name">Last Name</label>
            <input id="pricing-guide-last-name" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className={inputClasses} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label className="sr-only" htmlFor="pricing-guide-email">Email</label>
            <input id="pricing-guide-email" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={inputClasses} />
            <label className="sr-only" htmlFor="pricing-guide-phone">Phone</label>
            <input id="pricing-guide-phone" type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={inputClasses} />
          </div>
          <label className="sr-only" htmlFor="pricing-guide-state">State or Province</label>
          <select id="pricing-guide-state" name="state" value={formData.state} onChange={handleChange} required className={selectClasses} aria-label="State or Province">
            <option value="">State / Province</option>
            {STATES_PROVINCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <label className="sr-only" htmlFor="pricing-guide-comments">Comments</label>
          <textarea id="pricing-guide-comments" name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} className={inputClasses} style={{ height: 80, resize: "none" }} />
          <button type="submit" disabled={status === "loading" || status === "success"} style={{ background: "#c0392b", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 6, border: "none", textTransform: "uppercase", letterSpacing: 0.5, cursor: status === "loading" || status === "success" ? "not-allowed" : "pointer", width: "100%", opacity: status === "loading" ? 0.7 : 1 }}>
            {status === "loading" ? "Sending..." : "Download Our Pricing"}
          </button>
          {status === "success" && <p style={{ color: "#2e7d32", fontWeight: 600, textAlign: "center", marginTop: 8 }}>Thank you! Check your email for the pricing guide.</p>}
          {status === "error" && <p style={{ color: "#c0392b", fontWeight: 600, textAlign: "center", marginTop: 8 }}>Something went wrong. Please try again or call us directly.</p>}
        </form>
      </div>
    </section>
  );
}
