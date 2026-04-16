"use client";

import { useState, FormEvent } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Pricing guide form submitted:", formData);
  };

  return (
    <section style={{ background: "#f7f5f2", padding: "48px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ color: "#c0392b", fontSize: 24, fontWeight: 700, fontFamily: "var(--font-poppins), Poppins, sans-serif", paddingBottom: 10 }}>
          Download Our FREE Pricing Guide
        </h2>
        <p style={{ fontSize: 15, color: "#5a6c7e", maxWidth: 650, margin: "0 auto", paddingBottom: 28 }}>
          Get detailed pricing on all models, sizes, and customization options to help you make an informed decision.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 40 }}>
        <img src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/homepage-devices.png" alt="Pricing Guide" style={{ maxWidth: 360, width: "100%" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 700, fontSize: 18, color: "#1a3a5c", paddingBottom: 8, fontFamily: "var(--font-poppins)" }}>Free Pricing Guide!</p>
          <a href="#pricing-form" style={{ display: "inline-block", background: "#d4a017", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px 36px", borderRadius: 6, textDecoration: "none", textTransform: "uppercase" }}>
            Download Here
          </a>
        </div>
      </div>

      {/* Form */}
      <div id="pricing-form" style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #e8e4df", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h3 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: "#1a3a5c", marginBottom: 20, fontFamily: "var(--font-poppins)" }}>Request Your Pricing Guide</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className={inputClasses} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className={inputClasses} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={inputClasses} />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={inputClasses} />
          </div>
          <select name="state" value={formData.state} onChange={handleChange} required className={selectClasses}>
            <option value="">State / Province</option>
            {STATES_PROVINCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} className={inputClasses} style={{ height: 80, resize: "none" }} />
          <button type="submit" style={{ background: "#c0392b", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 6, border: "none", textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer", width: "100%" }}>
            Download Our Pricing
          </button>
        </form>
      </div>
    </section>
  );
}
