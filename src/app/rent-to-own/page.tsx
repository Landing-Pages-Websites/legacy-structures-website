"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { siteAssets } from "@/lib/site-assets";

const highlights = [
  "No Credit Check!",
  "Instant Approval!",
  "No longer will you throw away money on a self-storage unit that you will never own.",
  "Access your belongings 24 hours a day 7 days a week right in your back yard.",
  "Early pay off option is available. No penalties. Paying off early saves you money.",
  "Rent to Own is a month-to-month contract. You can terminate at anytime without penalty.",
  "You can purchase the shed with no cash in hand. We accept credit cards for the down payment and monthly payments.",
];

export default function RentToOwnPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("RTO form submitted:", formData);
  };

  return (
    <div>
      {/* Top Section: H1 + Hero Image + RTO Form */}
      <div className="wrapper max-w-[1100px] mx-auto px-[20px] py-[20px]">
        <div className="flex flex-col md:flex-row gap-[20px]">
          {/* Left Column */}
          <div className="w-full md:w-1/2">
            <h1 className="!text-left !pb-[15px]">Rent To Own Sheds For Any Budget!</h1>
            <Image
              src={siteAssets.rentToOwn.hero.src}
              alt="Rent to Own Storage Sheds"
              width={siteAssets.rentToOwn.hero.width}
              height={siteAssets.rentToOwn.hero.height}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Column: Brochure Form */}
          <div className="w-full md:w-1/2">
            <div className="bg-[#e9bb52] rounded-md p-[20px]">
              <div className="text-center">
                <h2 className="!text-black !text-[30px] !pb-[10px]">
                  Get a Brochure with <span className="text-[#b11f29]">Rent-To-Own Pricing</span>
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-[10px]">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-[10px] border border-[#ccc] rounded text-black"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-[10px] border border-[#ccc] rounded text-black"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-[10px] border border-[#ccc] rounded text-black"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-[10px] border border-[#ccc] rounded text-black"
                />
                <textarea
                  name="comment"
                  placeholder="Comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-[10px] border border-[#ccc] rounded text-black"
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-[#af1919] text-white font-bold uppercase py-[12px] px-[40px] rounded-md text-[18px] cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    Download
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Blue CTA: 3 Reasons Header */}
      <div className="bg-[#00567a] py-[20px]">
        <div className="max-w-[1100px] mx-auto px-[20px] text-center">
          <h2 className="!text-white !text-[40px] !pb-0">
            3 Reasons To Get One Of Our Rent-To-Own Sheds
          </h2>
        </div>
      </div>

      {/* 3 Reasons */}
      <div className="max-w-[1100px] mx-auto px-[20px] py-[30px]">
        <div className="text-[19px] leading-[30px]">
          <p>
            <span className="text-[#b11f29] font-bold">1. NO CREDIT CHECK:</span> By not running a credit report, your credit score stays intact.
          </p>
          <p>
            <span className="text-[#b11f29] font-bold">2. NO STRINGS:</span> The flexibility to turn in the building at any time for any reason.
          </p>
          <p>
            <span className="text-[#b11f29] font-bold">3. INSTANT APPROVAL:</span> Everyone is approved.
          </p>
        </div>
      </div>

      {/* CTA Bar: Check Out Inventory */}
      <div className="bg-[#00567a] py-[20px]">
        <div className="max-w-[1100px] mx-auto px-[20px] text-center">
          <Link
            href="/inventory"
            className="text-white font-bold text-[24px] no-underline hover:underline font-heading tracking-[1.5px]"
          >
            CHECK OUT OUR CURRENT INVENTORY &ndash; <span>CLICK HERE</span>
          </Link>
        </div>
      </div>

      {/* Body Text Sections */}
      <div className="max-w-[1100px] mx-auto px-[20px] py-[40px] text-[19px] leading-[30px]">
        <p>
          Looking for an affordable way to have storage in your backyard or at your business? Look no further than our Rent-to-Own program! With low upfront costs and affordable monthly payments, this program is perfect for customers who either don&apos;t want to pay cash or can&apos;t afford to pay cash for a backyard barn.
        </p>

        <h2 className="!text-black">Simple and Affordable Pricing</h2>
        <p>
          Our program is simple: just choose the storage building you want and pay us the first month&apos;s rent and a small security deposit, and we deliver it to you. There&apos;s no credit check required, and the rental agreement is on a month-to-month basis, meaning you have the flexibility to turn in the building at any time for any reason (after the initial period of 1-4 months). Plus, if you make all consecutive monthly payments in accordance with your rental agreement, you&apos;ll own the building! And you can pay it off at any time with no prepayment penalty.
        </p>

        <h2 className="!text-black">No Credit Check Required</h2>
        <p>
          Even if you have the money needed to buy one of our barns outright, our Rent-to-Own program is still a great option. In addition to very easy pricing, one major advantage of our program is that renting a shed does not affect your credit rating at all. With NO Credit Checks, all you have to do is pay a small security deposit plus the first month&apos;s rent, and we&apos;ll deliver a building to your location (free delivery within 30 miles of a dealer). From then on, you make all consecutive monthly payments in accordance with your rental agreement and the building is yours! You won&apos;t find a cheaper or more attainable Rent-To-Own plan anywhere.
        </p>

        <h2 className="!text-black">Customizable Options Available</h2>
        <p>
          We believe that everyone should have access to affordable and convenient storage options, which is why we offer multiple building styles and finishes to choose from. If you want a custom barn built, you are in luck!!! We have a{" "}
          <a
            href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            3D Shed Builder
          </a>{" "}
          that allows you to see different finishes, different roofs, and different trim packages. You can customize it before you buy it!! When it comes to purchasing a portable building, Backyard Outfitters buildings are the best choice.
        </p>

        <h2 className="!text-black">Multiple Building Styles and Finishes to Choose From</h2>
        <p>
          With several backyard buildings available and multiple finishes on each model, the possibilities are endless. If you&apos;re in the market for a backyard barn, backyard shed, or backyard cabin, then we can help you find the perfect storage solution and a great price!
        </p>

        {/* Highlights */}
        <h3 className="!text-[#b11f29] text-center font-bold text-[30px] !pb-[15px] pt-[20px]">
          Highlights of Our Rent-To-Own Program
        </h3>
        <ul className="list-none p-0 m-0">
          {highlights.map((item, index) => (
            <li key={index} className="relative pl-[30px] pb-[10px] text-[19px] leading-[30px]">
              <span className="absolute left-0 top-0 text-[#b11f29] font-bold text-[20px]">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="pt-[20px]">
          If you are in the market for a backyard barn, backyard shed, or backyard cabin, then we are the best builder for you! Our rent-to-own sheds are world-class! Call us today!
        </p>
      </div>
    </div>
  );
}
