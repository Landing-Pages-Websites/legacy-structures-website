"use client";

import { useState, FormEvent } from "react";

const NE_STATES = [
  "New York",
  "Vermont",
  "New Hampshire",
  "Connecticut",
  "Massachusetts",
  "Maine",
  "Rhode Island",
  "New Jersey",
  "Pennsylvania",
];

const MODELS = [
  "Backyard Barns",
  "Storage Sheds",
  "Portable Cabins",
  "Portable Garages",
  "Double Wide Garages",
  "A-Frames",
  "Log Cabins",
  "Chicken Coops",
  "Greenhouses",
  "Side Gables",
  "Other / Not Sure",
];

const SIZES = [
  "8 × 8",
  "8 × 10",
  "8 × 12",
  "8 × 16",
  "10 × 10",
  "10 × 12",
  "10 × 14",
  "10 × 16",
  "10 × 20",
  "12 × 12",
  "12 × 16",
  "12 × 20",
  "12 × 24",
  "12 × 28",
  "12 × 32",
  "14 × 24",
  "14 × 28",
  "14 × 32",
  "14 × 40",
  "16 × 24",
  "16 × 32",
  "24 × 24",
  "24 × 32",
  "Not Sure / Custom",
];

const inputClasses =
  "w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent transition";
const selectClasses =
  "w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent transition appearance-none";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    model: "",
    size: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ padding: "32px 0", textAlign: "center" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ margin: "0 auto 16px" }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p style={{ color: "#2e7d32", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message sent!</p>
        <p style={{ color: "#5a6c7e", fontSize: 15 }}>
          We&apos;ll get back to you within 2 business days. You can also call or text us at{" "}
          <a href="tel:5185442889" style={{ color: "#c0392b", fontWeight: 600 }}>518-544-2889</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ color: "#5a6c7e", fontSize: 14, paddingBottom: 8 }}>
        Fill out the form below and we&apos;ll get back to you within 2 business days.
        Need a faster reply? Call or text us at{" "}
        <a href="tel:5185442889" style={{ color: "#c0392b", fontWeight: 600 }}>518-544-2889</a>.
      </p>

      {/* Name row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label className="sr-only" htmlFor="contact-first-name">First Name</label>
          <input
            id="contact-first-name"
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="contact-last-name">Last Name</label>
          <input
            id="contact-last-name"
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>

      {/* Email + Phone row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label className="sr-only" htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="contact-phone">Phone Number</label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      {/* State */}
      <div style={{ position: "relative" }}>
        <label className="sr-only" htmlFor="contact-state">State</label>
        <select
          id="contact-state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className={selectClasses}
          aria-label="State"
        >
          <option value="">State *</option>
          {NE_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888" }} aria-hidden="true">▾</span>
      </div>

      {/* Model + Size row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <label className="sr-only" htmlFor="contact-model">Building Type</label>
          <select
            id="contact-model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className={selectClasses}
            aria-label="Building Type / Model"
          >
            <option value="">Building Type (optional)</option>
            {MODELS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888" }} aria-hidden="true">▾</span>
        </div>
        <div style={{ position: "relative" }}>
          <label className="sr-only" htmlFor="contact-size">Size</label>
          <select
            id="contact-size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className={selectClasses}
            aria-label="Building Size"
          >
            <option value="">Size (optional)</option>
            {SIZES.map((sz) => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888" }} aria-hidden="true">▾</span>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="sr-only" htmlFor="contact-message">Your Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your Message *"
          value={formData.message}
          onChange={handleChange}
          required
          className={inputClasses}
          style={{ height: 120, resize: "none" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "#c0392b",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          padding: "14px 32px",
          borderRadius: 6,
          border: "none",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          alignSelf: "flex-start",
          opacity: status === "loading" ? 0.7 : 1,
          transition: "opacity 0.2s ease, background 0.2s ease",
        }}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p style={{ color: "#c0392b", fontWeight: 600 }}>
          Something went wrong. Please try again or call us at 518-544-2889.
        </p>
      )}
    </form>
  );
}
