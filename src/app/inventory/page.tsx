"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { buildings } from "@/data/buildings";

const parsePrice = (s: string | undefined): number => {
  if (!s) return 0;
  const m = s.replace(/[,\s$+taxa-zA-Z]/g, "");
  return parseFloat(m) || 0;
};

// Inventory items built from shared buildings data (excludes demo-only records without real inv numbers)
const SHARED_INVENTORY: InventoryItem[] = buildings
  .filter((b) => !b.inventoryNumber.includes("DEMO"))
  .map((b) => ({
    model: b.modelType,
    slug: b.slug,
    width: b.width,
    length: b.length,
    size: b.size,
    wallsColor: b.wallColor,
    trimColor: b.trimColor,
    roofColor: b.roofColor.includes("-") ? b.roofColor : `${b.roofColor.replace(" Metal", "")} - Metal`,
    inventoryNumber: b.inventoryNumber,
    cashPrice: parsePrice(b.cashPrice),
    salePrice: b.salePrice ? parsePrice(b.salePrice) : null,
    rto36: parsePrice(b.rto36),
    rto48: parsePrice(b.rto48),
    buildingType: b.modelType,
    sidingColor: b.wallColor,
    condition: "New",
    image: b.image,
    designTemplate: String(b.designerTemplate),
  }));

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface InventoryItem {
  model: string;
  slug: string;
  width: number;
  length: number;
  size: string;
  wallsColor: string;
  trimColor: string;
  roofColor: string;
  inventoryNumber: string;
  cashPrice: number;
  salePrice: number | null;
  rto36: number;
  rto48: number;
  buildingType: string;
  sidingColor: string;
  condition: string;
  image: string;
  designTemplate: string;
}

const inventoryItems: InventoryItem[] = SHARED_INVENTORY;

/* ------------------------------------------------------------------ */
/*  Filter options                                                     */
/* ------------------------------------------------------------------ */

const WIDTH_OPTIONS = [8, 10, 12, 14];
const LENGTH_OPTIONS = [8, 12, 14, 16, 20, 24, 32, 40];
const BUILDING_TYPE_OPTIONS = [
  "Animal Shelter",
  "Chicken Coop",
  "Gable Dormer",
  "Lofted Barn",
  "Lofted Garage",
  "Lofted Playhouse Cabin",
  "Mini Barn",
  "Single Slope",
  "Utility Dormer",
  "Utility Garage",
  "Utility Playhouse Cabin",
  "Utility Shed",
];
const SIDING_COLOR_OPTIONS = [
  "Barn White",
  "Beige",
  "Black",
  "Buckskin",
  "Clay",
  "Evergreen",
  "Gap Gray",
  "Gibraltar",
  "Navajo",
  "Red",
  "Rosemary Green",
  "Urethane Cedar",
  "Urethane Chestnut",
  "Urethane Driftwood",
  "Urethane Mahogany",
];
const CONDITION_OPTIONS = ["New", "Used"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

/* ------------------------------------------------------------------ */
/*  Red CTA Bar Component                                              */
/* ------------------------------------------------------------------ */

function PricingGuideCTA() {
  return (
    <div
      style={{
        background: "#b12029",
        padding: "20px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          maxWidth: "1150px",
          width: "100%",
          justifyContent: "center",
          padding: "0 20px",
          flexWrap: "wrap",
        }}
      >
        <img
          src="https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/pricing-guide-cta-img.png"
          alt="Pricing Guide"
          style={{ height: "80px", width: "auto" }}
        />
        <span
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Get Your Free Pricing Guide
        </span>
        <Link
          href="/contact-us"
          style={{
            color: "#ffc800",
            fontSize: "22px",
            fontWeight: "bold",
            textDecoration: "none",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Click Here!
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Price Box Component                                                */
/* ------------------------------------------------------------------ */

function PriceBox({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "2px solid #af0019",
        display: "flex",
        flexDirection: "column",
        width: "auto",
        flex: 1,
        minWidth: 0,
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          backgroundColor: "#af0019",
          color: "white",
          padding: "15px 10px",
          textAlign: "center",
          fontSize: "13px",
          lineHeight: "1.3",
        }}
      >
        {label}
      </div>
      <div
        style={{
          padding: "15px 10px",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inventory Item Component                                           */
/* ------------------------------------------------------------------ */

function InventoryItemRow({ item }: { item: InventoryItem }) {
  const hasSale = item.salePrice !== null;

  return (
    <div
      className="inventory-item-row"
    >
      {/* img-wrapper */}
      <div className="inventory-image-col">
        <Link href={`/building/${item.slug}`}>
          <div
            style={{
              backgroundImage: `url('${item.image}')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "contain",
              height: "250px",
            }}
          />
        </Link>
      </div>

      {/* info-wrapper */}
      <div className="inventory-info-col">
        {/* text-pricing-group */}
        <div
          className="inventory-text-pricing"
        >
          {/* text-info */}
          <div className="inventory-text-info">
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontFamily: "Roboto, sans-serif",
                fontSize: "15px",
              }}
            >
              <li style={{ marginBottom: "10px", fontWeight: "bold" }}>
                <span
                  style={{
                    color: "#194b7d",
                    fontWeight: "bold",
                    minWidth: "75px",
                    display: "inline-block",
                  }}
                >
                  Model:
                </span>{" "}
                <Link
                  href={`/building/${item.slug}`}
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  {item.model}
                </Link>
              </li>
              <li style={{ marginBottom: "10px", fontWeight: "bold" }}>
                <span
                  style={{
                    color: "#194b7d",
                    fontWeight: "bold",
                    minWidth: "75px",
                    display: "inline-block",
                  }}
                >
                  Size:
                </span>{" "}
                {item.size}
              </li>
              <li style={{ marginBottom: "10px", fontWeight: "bold" }}>
                <span
                  style={{
                    color: "#194b7d",
                    fontWeight: "bold",
                    minWidth: "75px",
                    display: "inline-block",
                  }}
                >
                  Walls:
                </span>{" "}
                {item.wallsColor}
              </li>
              <li style={{ marginBottom: "10px", fontWeight: "bold" }}>
                <span
                  style={{
                    color: "#194b7d",
                    fontWeight: "bold",
                    minWidth: "75px",
                    display: "inline-block",
                  }}
                >
                  Trim:
                </span>{" "}
                {item.trimColor}
              </li>
              <li style={{ marginBottom: "10px", fontWeight: "bold" }}>
                <span
                  style={{
                    color: "#194b7d",
                    fontWeight: "bold",
                    minWidth: "75px",
                    display: "inline-block",
                  }}
                >
                  Roof:
                </span>{" "}
                {item.roofColor}
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  color: "#af0019",
                }}
              >
                <span
                  style={{
                    color: "#194b7d",
                    fontWeight: "bold",
                    minWidth: "75px",
                    display: "inline-block",
                  }}
                >
                  Inv #:
                </span>{" "}
                {item.inventoryNumber}
              </li>
            </ul>
          </div>

          {/* price-info */}
          <div className="inventory-price-info">
            {/* pricing-section - HORIZONTAL ROW */}
            <div
              className="inventory-pricing-section"
            >
              {/* Cash Price box */}
              {hasSale ? (
                <>
                  <PriceBox label={<>Cash<br />Price</>}>
                    <s>{formatCurrency(item.cashPrice)}</s>
                  </PriceBox>
                  <PriceBox label={<>Sale<br />Price</>}>
                    <strong style={{ color: "#e32323" }}>
                      {formatCurrency(item.salePrice!)} +tax
                    </strong>
                  </PriceBox>
                </>
              ) : (
                <PriceBox label={<>Cash<br />Price</>}>
                  <span>{formatCurrency(item.cashPrice)} +tax</span>
                </PriceBox>
              )}

              {/* 36 Mo RTO */}
              <PriceBox label={<>36 Mo.<br />RTO</>}>
                {formatCurrency(item.rto36)} +tax
              </PriceBox>

              {/* 48 Mo RTO */}
              <PriceBox label={<>48 Mo.<br />RTO</>}>
                {formatCurrency(item.rto48)} +tax
              </PriceBox>
            </div>

            {/* link-button */}
            <div
              className="inventory-link-buttons"
            >
              <a
                href={`https://orders.barnportal.com/myquote?dealerid=&dir=1&template=${item.designTemplate}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#1a3a5c",
                  color: "#ffc800",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "13px",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                Design Your Own!
              </a>
              <Link
                href={`/building/${item.slug}`}
                style={{
                  background: "#1a3a5c",
                  color: "#ffc800",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "13px",
                  fontFamily: "Roboto, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Want This Building?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function InventoryPage() {
  const [filterWidth, setFilterWidth] = useState<number | null>(null);
  const [filterLength, setFilterLength] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("");
  const [filterColor, setFilterColor] = useState<string>("");
  const [filterCondition, setFilterCondition] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("ASC");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const filtered = useMemo(() => {
    let result = [...inventoryItems];

    if (filterWidth) result = result.filter((i) => i.width === filterWidth);
    if (filterLength) result = result.filter((i) => i.length === filterLength);
    if (filterType) result = result.filter((i) => i.buildingType === filterType);
    if (filterColor) result = result.filter((i) => i.sidingColor === filterColor);
    if (filterCondition)
      result = result.filter((i) => i.condition === filterCondition);

    result.sort((a, b) => {
      const priceA = a.salePrice ?? a.cashPrice;
      const priceB = b.salePrice ?? b.cashPrice;
      return sortBy === "DESC" ? priceB - priceA : priceA - priceB;
    });

    return result;
  }, [filterWidth, filterLength, filterType, filterColor, filterCondition, sortBy]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [filterWidth, filterLength, filterType, filterColor, filterCondition, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  function clearFilters() {
    setFilterWidth(null);
    setFilterLength(null);
    setFilterType("");
    setFilterColor("");
    setFilterCondition("");
    setSortBy("ASC");
  }

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      {/* wrapper blue-top */}
      <div style={{ borderTop: "5px solid #1a3a5c" }}>
        <style>{`
          .inventory-item-row {
            display: flex;
            justify-content: space-between;
            padding: 60px 20px;
            border-top: 2px solid #af0019;
            max-width: 1150px;
            margin: auto;
          }
          .inventory-image-col {
            width: 30%;
          }
          .inventory-info-col {
            width: 70%;
          }
          .inventory-text-pricing {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-left: 20px;
            min-height: 225px;
          }
          .inventory-text-info {
            width: 50%;
          }
          .inventory-price-info {
            width: 44%;
          }
          .inventory-pricing-section,
          .inventory-link-buttons {
            display: flex;
            flex-direction: row;
            gap: 2%;
          }
          .inventory-link-buttons {
            justify-content: center;
            margin-top: 5px;
          }
          @media (max-width: 980px) {
            .inventory-item-row {
              flex-direction: column;
              gap: 24px;
              padding: 44px 20px;
            }
            .inventory-image-col,
            .inventory-info-col,
            .inventory-text-info,
            .inventory-price-info {
              width: 100%;
            }
            .inventory-text-pricing {
              flex-direction: column;
              gap: 22px;
              padding-left: 0;
              min-height: 0;
            }
          }
          @media (max-width: 560px) {
            .inventory-pricing-section {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 8px;
            }
            .inventory-link-buttons {
              flex-direction: column;
              gap: 8px;
            }
          }
        `}</style>
        {/* Page Heading */}
        <h1
          style={{
            textAlign: "center",
            color: "#1a3a5c",
            fontFamily: "var(--font-bricolage)",
            fontSize: "40px",
            fontWeight: 600,
            margin: "30px auto 20px",
            padding: "0 20px",
            lineHeight: 1.1,
          }}
        >
          Current Storage Buildings for Sale in Hudson Falls
        </h1>

        {/* Filter Toggle */}
        <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 20px" }}>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px 15px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "10px",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <span>Filters</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
            >
              <circle cx="4" cy="6" r="2" />
              <rect x="8" y="5" width="12" height="2" rx="1" />
              <circle cx="4" cy="12" r="2" />
              <rect x="8" y="11" width="12" height="2" rx="1" />
              <circle cx="4" cy="18" r="2" />
              <rect x="8" y="17" width="12" height="2" rx="1" />
            </svg>
          </button>

          {/* Filter Panel */}
          {filtersOpen && (
            <div
              style={{
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "20px",
                marginBottom: "20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                alignItems: "flex-end",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {/* Width */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <strong style={{ fontSize: "14px" }}>Width</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {WIDTH_OPTIONS.map((w) => (
                    <label
                      key={w}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filterWidth === w}
                        onChange={() => setFilterWidth(filterWidth === w ? null : w)}
                      />
                      {w}
                    </label>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <strong style={{ fontSize: "14px" }}>Length</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {LENGTH_OPTIONS.map((l) => (
                    <label
                      key={l}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filterLength === l}
                        onChange={() =>
                          setFilterLength(filterLength === l ? null : l)
                        }
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </div>

              {/* Building Type */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <strong style={{ fontSize: "14px" }}>Building Type</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {BUILDING_TYPE_OPTIONS.map((t) => (
                    <label
                      key={t}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filterType === t}
                        onChange={() => setFilterType(filterType === t ? "" : t)}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Siding Color */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <strong style={{ fontSize: "14px" }}>Siding Color</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {SIDING_COLOR_OPTIONS.map((c) => (
                    <label
                      key={c}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filterColor === c}
                        onChange={() =>
                          setFilterColor(filterColor === c ? "" : c)
                        }
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <strong style={{ fontSize: "14px" }}>Condition</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {CONDITION_OPTIONS.map((c) => (
                    <label
                      key={c}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filterCondition === c}
                        onChange={() =>
                          setFilterCondition(filterCondition === c ? "" : c)
                        }
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By Price */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label htmlFor="inventory-sort" style={{ fontSize: "14px", fontWeight: "bold" }}>Sort By Price</label>
                <select
                  id="inventory-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "5px 15px",
                    fontSize: "14px",
                  }}
                  aria-label="Sort inventory by price"
                >
                  <option value="ASC">Low to High</option>
                  <option value="DESC">High to Low</option>
                </select>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button
                  onClick={() => setFiltersOpen(false)}
                  style={{
                    background: "#1a3a5c",
                    color: "#fff",
                    fontWeight: "bold",
                    padding: "8px 20px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  style={{
                    color: "#1a3a5c",
                    fontSize: "14px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    background: "transparent",
                    border: "none",
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Inventory Items */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              maxWidth: "1150px",
              margin: "auto",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                color: "#888",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              No buildings match your current filters.
            </p>
            <button
              onClick={clearFilters}
              style={{
                color: "#1a3a5c",
                textDecoration: "underline",
                marginTop: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {pagedItems.map((item, index) => (
              <div key={item.inventoryNumber}>
                <InventoryItemRow item={item} />
                {/* Red CTA bar after every 5 items */}
                {(index + 1) % 5 === 0 && index < pagedItems.length - 1 && (
                  <PricingGuideCTA />
                )}
              </div>
            ))}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              padding: "40px 20px",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "15px",
            }}
          >
            {currentPage > 1 && (
              <button
                onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  padding: "8px 14px",
                  color: "#1a3a5c",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                &lt; Previous
              </button>
            )}
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const active = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{
                    padding: "8px 14px",
                    background: active ? "#1a3a5c" : "transparent",
                    color: active ? "#fff" : "#1a3a5c",
                    borderRadius: "4px",
                    fontWeight: active ? 700 : 500,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {page}
                </button>
              );
            })}
            {currentPage < totalPages && (
              <button
                onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  padding: "8px 14px",
                  color: "#1a3a5c",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Next &gt;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
