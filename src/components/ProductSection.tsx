import Image from "next/image";

interface SizeGroup {
  label: string;
  sizes: string[];
}

interface ProductSectionProps {
  title: string;
  description: string;
  imageSrc?: string;
  image?: string;
  imageAlt: string;
  sizes?: Record<string, string[]>;
  sizeGroups?: SizeGroup[];
}

export default function ProductSection({
  title,
  description,
  imageSrc,
  image,
  imageAlt,
  sizes,
  sizeGroups,
}: ProductSectionProps) {
  const resolvedSizeEntries: [string, string[]][] = sizes
    ? Object.entries(sizes)
    : sizeGroups
      ? sizeGroups.map((g) => [g.label, g.sizes])
      : [];

  const resolvedImage = imageSrc || image || "";

  return (
    <>
      <style>{`
        .product-img-wrap {
          overflow: hidden;
          border-radius: 6px;
        }
        .product-img-el {
          transition: transform 0.5s ease !important;
          display: block;
          width: 100%;
          height: auto;
        }
        .product-img-wrap:hover .product-img-el {
          transform: scale(1.06);
        }
        .product-size-label {
          font-size: 11px;
          font-weight: 700;
          color: #bd171f;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .product-size-item {
          font-size: 14px;
          color: #5a6c7e;
          line-height: 1.8;
        }
      `}</style>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image with hover zoom */}
        <div className="w-full md:w-[28%] shrink-0 product-img-wrap">
          <Image
            src={resolvedImage}
            alt={imageAlt}
            width={400}
            height={300}
            unoptimized={resolvedImage.startsWith("http")}
            className="product-img-el"
            style={{ maxHeight: 280, objectFit: "contain" }}
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="product-section-title">{title}</h3>
          <p className="text-[15px] text-[#5a6c7e] leading-relaxed mb-4">{description}</p>

          {resolvedSizeEntries.length > 0 && (
            <>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#1a3a5c",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginTop: 16,
                  marginBottom: 10,
                  paddingBottom: 0,
                }}
              >
                Available Sizes
              </p>
              <div className="flex flex-wrap gap-6">
                {resolvedSizeEntries.map(([label, sizeList]) => (
                  <div key={label} className="min-w-[90px]">
                    <div className="product-size-label">{label}</div>
                    <ul className="list-none p-0 m-0">
                      {sizeList.map((size) => (
                        <li key={size} className="product-size-item">{size}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
