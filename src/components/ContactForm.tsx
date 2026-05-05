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

const inputClasses = "w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent transition";
const selectClasses = "w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent transition appearance-none";

export default function ContactForm() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", state: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ color: "#5a6c7e", fontSize: 14, paddingBottom: 8 }}>
        Please fill out the below form and we will get back to you as quickly as possible. Please allow up to 2 business days for our reply.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label className="sr-only" htmlFor="contact-first-name">First Name</label>
        <input id="contact-first-name" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className={inputClasses} />
        <label className="sr-only" htmlFor="contact-last-name">Last Name</label>
        <input id="contact-last-name" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className={inputClasses} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label className="sr-only" htmlFor="contact-email">Email</label>
        <input id="contact-email" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={inputClasses} />
        <label className="sr-only" htmlFor="contact-phone">Phone Number</label>
        <input id="contact-phone" type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputClasses} />
      </div>
      <label className="sr-only" htmlFor="contact-state">State or Province</label>
      <select id="contact-state" name="state" value={formData.state} onChange={handleChange} required className={selectClasses} aria-label="State or Province">
        <option value="">State/Province</option>
        {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <label className="sr-only" htmlFor="contact-message">Your Message</label>
      <textarea id="contact-message" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required className={inputClasses} style={{ height: 120, resize: "none" }} />
      <button type="submit" style={{ background: "#c0392b", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 6, border: "none", textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer", alignSelf: "flex-start" }}>
        Submit
      </button>
    </form>
  );
}
