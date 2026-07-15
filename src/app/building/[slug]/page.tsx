import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { buildings, isGenericProductImage, resolveBuildingImage } from "@/data/buildings";
import { getModelDescription } from "@/data/model-descriptions";
import DisclaimerText from "@/components/DisclaimerText";
import DesignerCTA from "@/components/DesignerCTA";
import PricingGuideSection from "@/components/PricingGuideSection";
import { createAnonClient } from "@/utils/supabase/server";
import { createPageMetadata } from "@/lib/metadata";

// Static params for items already in buildings.ts (pre-rendered at build time).
// dynamicParams = true (default) means admin-created slugs render on first request.
export async function generateStaticParams() {
  return buildings.map((b) => ({ slug: b.slug }));
}

// Normalized shape used by the page — same field names as buildings.ts for zero template changes.
interface BuildingData {
  slug: string;
  modelType: string;
  inventoryNumber: string;
  size: string;
  width: number;
  length: number;
  wallColor: string;
  trimColor: string;
  roofColor: string;
  cashPrice: string;
  salePrice?: string;
  rto36: string;
  rto48: string;
  image: string;
  designerTemplate: number;
  notes: string;
  buildingMaterial: string;
}

// Try buildings.ts first; fall back to Supabase for admin-created items.
// Supabase values always win for editable fields (pricing, colors, image).
async function getBuildingData(slug: string): Promise<BuildingData | null> {
  const supabase = createAnonClient();
  let db: Record<string, unknown> | null = null;
  try {
    const { data } = await supabase
      .from("inventory_items")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    db = data ?? null;
  } catch { /* ignore */ }

  const s = buildings.find((b) => b.slug === slug);

  if (s) {
    return {
      slug: s.slug,
      modelType: s.modelType,
      inventoryNumber: s.inventoryNumber,
      size: s.size,
      width: s.width,
      length: s.length,
      wallColor: String(db?.wall_color ?? s.wallColor),
      trimColor: String(db?.trim_color ?? s.trimColor),
      roofColor: String(db?.roof_color ?? s.roofColor),
      cashPrice: String(db?.cash_price ?? s.cashPrice),
      salePrice: db
        ? (db.is_on_sale && db.sale_price ? String(db.sale_price) : undefined)
        : s.salePrice,
      rto36: String(db?.rto_36 ?? s.rto36),
      rto48: String(db?.rto_48 ?? s.rto48),
      image: resolveBuildingImage(
        db?.image_url ? String(db.image_url) : "",
        s.image
      ),
      designerTemplate: Number(db?.designer_template ?? s.designerTemplate),
      notes: String(db?.notes ?? ""),
      buildingMaterial: String(db?.building_material ?? ""),
    };
  }

  if (db) {
    return {
      slug: String(db.slug),
      modelType: String(db.model_type),
      inventoryNumber: String(db.inventory_number ?? ""),
      size: String(db.size),
      width: Number(db.width ?? 0),
      length: Number(db.length ?? 0),
      wallColor: String(db.wall_color ?? ""),
      trimColor: String(db.trim_color ?? ""),
      roofColor: String(db.roof_color ?? ""),
      cashPrice: String(db.cash_price),
      salePrice: db.is_on_sale && db.sale_price ? String(db.sale_price) : undefined,
      rto36: String(db.rto_36 ?? ""),
      rto48: String(db.rto_48 ?? ""),
      image: String(db.image_url ?? "") || "/logo.png",
      designerTemplate: Number(db.designer_template ?? 25),
      notes: String(db.notes ?? ""),
      buildingMaterial: String(db.building_material ?? ""),
    };
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const building = buildings.find((b) => b.slug === slug);
  if (building) {
    return createPageMetadata({
      title: `${building.modelType} ${building.size}`,
      description: `${building.modelType} available in ${building.size}. Inventory # ${building.inventoryNumber}.`,
      path: `/building/${slug}`,
    });
  }
  const data = await getBuildingData(slug);
  if (!data) return { title: "Building Not Found" };
  return createPageMetadata({
    title: `${data.modelType} ${data.size}`,
    description: `${data.modelType} available in ${data.size}. Inventory # ${data.inventoryNumber}.`,
    path: `/building/${slug}`,
  });
}

const DESIGNER_BASE =
  "https://orders.barnportal.com/myquote?dealerid=&dir=1&template=";

const NAVY = "#1a3a5c";
const GOLD = "#d4a017";
const RED = "#c0392b";
const CARD_BORDER = "#e8e4df";
const CARD_BG = "#f7f5f2";

const STANDARD_COLORS: { name: string; hex: string }[] = [
  { name: "Barn White", hex: "#f2ece0" },
  { name: "Beige", hex: "#c9b897" },
  { name: "Buckskin", hex: "#a07c52" },
  { name: "Clay", hex: "#b99e78" },
  { name: "Gap Gray", hex: "#8c8c8a" },
  { name: "Gibraltar", hex: "#5a5a5a" },
  { name: "Navajo", hex: "#d1c7a9" },
  { name: "Red", hex: "#8b2a1f" },
  { name: "Evergreen", hex: "#1f3a2e" },
  { name: "Rosemary Green", hex: "#5a6b4b" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Urethane Cedar", hex: "#8c6239" },
  { name: "Urethane Chestnut", hex: "#654023" },
  { name: "Urethane Driftwood", hex: "#a39787" },
  { name: "Urethane Mahogany", hex: "#4a221a" },
];

const STANDARD_ROOF_COLORS: { name: string; hex: string }[] = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Charcoal", hex: "#3a3a3a" },
  { name: "Hunter Green", hex: "#1f3a2e" },
  { name: "Brown", hex: "#4a2f1a" },
  { name: "Galvalume", hex: "#c9c9c7" },
  { name: "Burnished Slate", hex: "#4a3829" },
];

export default async function BuildingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const building = await getBuildingData(slug);
  if (!building) notFound();

  const { notes } = building;

  // Fetch editable model description from Supabase (admin "Model Descriptions" tab).
  // Falls back to the static model-descriptions.ts data if nothing saved yet.
  const staticDesc = getModelDescription(building.modelType);
  let description = staticDesc;
  try {
    const supabase = createAnonClient();
    const { data: dbDesc } = await supabase
      .from("model_descriptions")
      .select("heading, body, bullets, sizes_image_url")
      .eq("model_type", building.modelType)
      .maybeSingle();
    if (dbDesc) {
      description = {
        heading: dbDesc.heading || staticDesc.heading,
        body: dbDesc.body || staticDesc.body,
        bullets: dbDesc.bullets
          ? dbDesc.bullets.split("\n").map((s: string) => s.trim()).filter(Boolean)
          : staticDesc.bullets,
        sizesImage:
          dbDesc.sizes_image_url && !isGenericProductImage(dbDesc.sizes_image_url)
            ? dbDesc.sizes_image_url
            : staticDesc.sizesImage,
        sizeGroups: staticDesc.sizeGroups,
      };
    }
  } catch { /* keep static fallback */ }
  const hasSale = Boolean(building.salePrice);
  const designerUrl = `${DESIGNER_BASE}${building.designerTemplate}`;

  const detailRows: { label: string; value: string }[] = [
    { label: "Model", value: building.modelType },
    { label: "Size", value: building.size },
    { label: "Wall", value: building.wallColor },
    { label: "Trim", value: building.trimColor },
    { label: "Roof", value: building.roofColor },
    ...(building.buildingMaterial
      ? [{ label: "Material", value: building.buildingMaterial }]
      : []),
    { label: "Inv #", value: building.inventoryNumber },
  ];

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Title bar */}
      <div
        style={{
          backgroundColor: NAVY,
          padding: "32px 16px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 700,
            fontSize: "36px",
            margin: 0,
            letterSpacing: "0.5px",
          }}
        >
          {building.modelType}
        </h1>
      </div>

      {/* Main content - image + details card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "1150px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: Large product image */}
          <div
            style={{
              flex: "1 1 500px",
              minWidth: "300px",
              backgroundColor: CARD_BG,
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              height: "500px",
            }}
          >
            <Image
              src={building.image || "/logo.png"}
              alt={`${building.modelType} ${building.size}`}
              fill
              unoptimized={building.image.startsWith("http")}
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* RIGHT: Details card */}
          <aside
            style={{
              flex: "1 1 340px",
              minWidth: "300px",
              maxWidth: "420px",
              backgroundColor: "#ffffff",
              border: `1px solid ${CARD_BORDER}`,
              padding: "24px",
              borderRadius: "12px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: NAVY,
                margin: "0 0 16px 0",
                lineHeight: 1.3,
              }}
            >
              Need a Different Size? Request a Custom Quote
            </h2>

            {/* Price block */}
            <div
              style={{
                borderBottom: `1px solid ${CARD_BORDER}`,
                paddingBottom: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#555", fontSize: "14px" }}>
                  Cash Price
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: hasSale ? "#999" : NAVY,
                    textDecoration: hasSale ? "line-through" : "none",
                  }}
                >
                  {building.cashPrice}
                </span>
              </div>

              {hasSale && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      color: RED,
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    Sale Price
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: RED,
                    }}
                  >
                    {building.salePrice}
                  </span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <span style={{ color: "#555", fontSize: "14px" }}>
                  36 Mo. RTO
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {building.rto36}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#555", fontSize: "14px" }}>
                  48 Mo. RTO
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {building.rto48}
                </span>
              </div>
            </div>

            {/* Detail rows */}
            <div style={{ marginBottom: "20px" }}>
              {detailRows.map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    fontSize: "14px",
                    borderBottom: `1px dotted ${CARD_BORDER}`,
                  }}
                >
                  <span style={{ color: "#666", fontWeight: 500 }}>
                    {row.label}
                  </span>
                  <span style={{ color: "#222", fontWeight: 600 }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Notes / Description (set from admin panel) */}
            {notes && (
              <div
                style={{
                  background: "#f0f9ff",
                  border: "1px solid #bae6fd",
                  borderRadius: 8,
                  padding: "12px 14px",
                  marginBottom: "20px",
                  fontSize: "14px",
                  color: "#1a3a5c",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {notes}
              </div>
            )}

            {/* CTA buttons */}
            <a
              href={designerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                backgroundColor: GOLD,
                color: "#ffffff",
                textAlign: "center",
                padding: "14px",
                borderRadius: "8px",
                fontWeight: 700,
                textDecoration: "none",
                marginBottom: "10px",
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: "15px",
              }}
            >
              Try Our 3D Shed Builder
            </a>
            <a
              href={`/contact-us?model=${encodeURIComponent(building.modelType)}&size=${encodeURIComponent(building.size)}&inv=${encodeURIComponent(building.inventoryNumber)}`}
              style={{
                display: "block",
                backgroundColor: NAVY,
                color: "#ffffff",
                textAlign: "center",
                padding: "14px",
                borderRadius: "8px",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: "15px",
              }}
            >
              Want This Building?
            </a>
          </aside>
        </div>

        {/* Model basics description */}
        <section
          style={{
            marginTop: "48px",
            borderBottom: `3px solid ${NAVY}`,
            paddingBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "28px",
              alignItems: "flex-start",
            }}
          >
            {description.sizesImage && (
              <div
                style={{
                  flex: "0 0 300px",
                  maxWidth: "30%",
                  minWidth: "240px",
                }}
              >
                <Image
                  src={description.sizesImage}
                  alt={`${building.modelType} illustration`}
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <div style={{ flex: "1 1 400px", minWidth: "280px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  color: NAVY,
                  fontSize: "40px",
                  fontWeight: 700,
                  margin: "0 0 12px 0",
                  lineHeight: 1.1,
                  letterSpacing: "1px",
                }}
              >
                {description.heading}
              </h2>
              <p
                style={{
                  lineHeight: 1.6,
                  color: "#333",
                  margin: "0 0 16px 0",
                }}
              >
                {description.body}
              </p>
              <ul
                style={{
                  paddingLeft: "20px",
                  margin: "0 0 16px 0",
                  color: "#333",
                }}
              >
                {description.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    style={{ lineHeight: 1.7, marginBottom: "4px" }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {description.sizeGroups && description.sizeGroups.length > 0 && (
                <>
                  <h3
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                      color: NAVY,
                      fontSize: "22px",
                      fontWeight: 700,
                      margin: "20px 0 10px 0",
                    }}
                  >
                    AVAILABLE SIZES
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}
                  >
                    {description.sizeGroups.map((group) => (
                      <div key={group.label} style={{ minWidth: "110px" }}>
                        <h4
                          style={{
                            color: NAVY,
                            fontWeight: 700,
                            fontSize: "15px",
                            margin: "0 0 6px 0",
                            fontFamily: "var(--font-poppins), sans-serif",
                          }}
                        >
                          {group.label}
                        </h4>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            color: "#333",
                          }}
                        >
                          {group.sizes.map((size) => (
                            <li key={size} style={{ lineHeight: "28px" }}>
                              {size}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Standard Colors */}
        <section
          style={{
            marginTop: "32px",
            borderBottom: `3px solid ${NAVY}`,
            paddingBottom: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              color: NAVY,
              fontSize: "30px",
              fontWeight: 700,
              margin: "0 0 16px 0",
              letterSpacing: "1px",
            }}
          >
            STANDARD COLORS
          </h2>
          <p
            style={{
              color: "#333",
              marginBottom: "20px",
              lineHeight: 1.6,
            }}
          >
            Mix and match siding, trim, and roof colors to create the look you
            want. Below are our standard siding and roof color offerings.
          </p>
          <h3
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              color: NAVY,
              fontSize: "18px",
              fontWeight: 700,
              margin: "0 0 12px 0",
            }}
          >
            SIDING
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {STANDARD_COLORS.map((c) => (
              <div
                key={c.name}
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                <div
                  style={{
                    backgroundColor: c.hex,
                    width: "100%",
                    height: "60px",
                    borderRadius: "6px",
                    border: `1px solid ${CARD_BORDER}`,
                    marginBottom: "6px",
                  }}
                  aria-hidden
                />
                <span style={{ color: "#333" }}>{c.name}</span>
              </div>
            ))}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              color: NAVY,
              fontSize: "18px",
              fontWeight: 700,
              margin: "0 0 12px 0",
            }}
          >
            METAL ROOF
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "12px",
            }}
          >
            {STANDARD_ROOF_COLORS.map((c) => (
              <div
                key={c.name}
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                <div
                  style={{
                    backgroundColor: c.hex,
                    width: "100%",
                    height: "60px",
                    borderRadius: "6px",
                    border: `1px solid ${CARD_BORDER}`,
                    marginBottom: "6px",
                  }}
                  aria-hidden
                />
                <span style={{ color: "#333" }}>{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        <DisclaimerText />
        <DesignerCTA />
        <PricingGuideSection />
      </div>
    </div>
  );
}
