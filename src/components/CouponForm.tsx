"use client";

import { useState } from "react";

const states = [
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

export default function CouponForm() {
  const [selectedState, setSelectedState] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/coupon", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ selectedState }) });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <label htmlFor="coupon-state" className="sr-only">
        Select State or Province
      </label>
      <select
        id="coupon-state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Select State or Province"
      >
        <option value="">Select State / Province</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={status === "loading" || status === "success" || !selectedState}
        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Get Your Coupon!!"}
      </button>
      {status === "success" && <p className="text-green-700 font-semibold text-center w-full">Request received! We&apos;ll send your coupon shortly.</p>}
      {status === "error" && <p className="text-red-600 font-semibold text-center w-full">Something went wrong. Please try again.</p>}
    </form>
  );
}
