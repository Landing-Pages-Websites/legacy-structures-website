"use client";

import { useState, FormEvent } from "react";

const US_STATES = [
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
];

const BUILDING_TYPES = [
  "Animal Shelter", "Deluxe Lofted Cabin", "Garage", "Gazebo",
  "Horse Barn", "Lofted Barn", "Lofted Cabin", "Metal Building",
  "Mini Barn", "Portable Garage", "Storage Shed", "Utility Shed", "Other",
];

const BUILDING_SIZES = [
  "8x8", "8x10", "8x12", "8x14", "8x16",
  "10x10", "10x12", "10x14", "10x16", "10x20",
  "12x12", "12x14", "12x16", "12x20", "12x24",
  "12x28", "12x32", "12x36", "12x40",
  "14x14", "14x16", "14x20", "14x24", "14x28",
  "14x32", "14x36", "14x40", "Other",
];

const SIDING_OPTIONS = ["Treated T1-11", "Painted LP Smart Panel", "Urethane Wilderness Stained"];
const ROOF_OPTIONS = ["Metal Roof", "Shingle Roof"];

interface QuoteFormProps {
  title?: string;
  titleSpan?: string;
}

const inputClasses = "w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent transition";
const selectClasses = "w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent transition appearance-none";

export default function QuoteForm({
  title = "Request a",
  titleSpan = "FREE Quote!",
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    buildingType: "", buildingSize: "", sidingOption: "",
    roofOption: "", zipCode: "", state: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e8e4df", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <h2 style={{ color: "#1a3a5c", textAlign: "center", fontSize: 22, fontWeight: 700, fontFamily: "var(--font-poppins), Poppins, sans-serif", marginBottom: 4 }}>
        {title}
      </h2>
      <p style={{ color: "#c0392b", textAlign: "center", fontSize: 20, fontWeight: 700, fontFamily: "var(--font-poppins), Poppins, sans-serif", marginBottom: 20 }}>
        {titleSpan}
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label className="sr-only" htmlFor="quote-first-name">First Name</label>
          <input id="quote-first-name" type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} required className={inputClasses} />
          <label className="sr-only" htmlFor="quote-last-name">Last Name</label>
          <input id="quote-last-name" type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} required className={inputClasses} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label className="sr-only" htmlFor="quote-email">Email</label>
          <input id="quote-email" type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className={inputClasses} />
          <label className="sr-only" htmlFor="quote-phone">Phone</label>
          <input id="quote-phone" type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} required className={inputClasses} />
        </div>

        <label className="sr-only" htmlFor="quote-building-type">Building Type</label>
        <select id="quote-building-type" name="buildingType" value={formData.buildingType} onChange={handleChange} className={selectClasses} aria-label="Building Type">
          <option value="">Building Type</option>
          {BUILDING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <label className="sr-only" htmlFor="quote-building-size">Building Size</label>
        <select id="quote-building-size" name="buildingSize" value={formData.buildingSize} onChange={handleChange} className={selectClasses} aria-label="Building Size">
          <option value="">Building Size</option>
          {BUILDING_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label className="sr-only" htmlFor="quote-siding-option">Siding Option</label>
        <select id="quote-siding-option" name="sidingOption" value={formData.sidingOption} onChange={handleChange} className={selectClasses} aria-label="Siding Option">
          <option value="">Siding Option</option>
          {SIDING_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label className="sr-only" htmlFor="quote-roof-option">Roof Option</label>
        <select id="quote-roof-option" name="roofOption" value={formData.roofOption} onChange={handleChange} className={selectClasses} aria-label="Roof Option">
          <option value="">Roof Option</option>
          {ROOF_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <label className="sr-only" htmlFor="quote-zip-code">Zip Code</label>
        <input id="quote-zip-code" type="text" name="zipCode" placeholder="Zip Code *" value={formData.zipCode} onChange={handleChange} required className={inputClasses} />
        <label className="sr-only" htmlFor="quote-state">State</label>
        <select id="quote-state" name="state" value={formData.state} onChange={handleChange} required className={selectClasses} aria-label="State">
          <option value="">State *</option>
          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label className="sr-only" htmlFor="quote-message">Message</label>
        <textarea id="quote-message" name="message" placeholder="Message" value={formData.message} onChange={handleChange} className={inputClasses} style={{ height: 80, resize: "none" }} />

        <button type="submit" disabled={status === "loading" || status === "success"} style={{ background: "#c0392b", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 6, border: "none", textTransform: "uppercase", letterSpacing: 0.5, cursor: status === "loading" || status === "success" ? "not-allowed" : "pointer", width: "100%", transition: "background 0.2s", opacity: status === "loading" ? 0.7 : 1 }}>
          {status === "loading" ? "Sending..." : "Get My Free Quote"}
        </button>
        {status === "success" && <p style={{ color: "#2e7d32", fontWeight: 600, textAlign: "center" }}>Thank you! We&apos;ll be in touch with your quote soon.</p>}
        {status === "error" && <p style={{ color: "#c0392b", fontWeight: 600, textAlign: "center" }}>Something went wrong. Please try again or call us directly.</p>}
      </form>
    </div>
  );
}
