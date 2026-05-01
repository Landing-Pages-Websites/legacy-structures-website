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
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Image */}
      <div className="w-full md:w-[28%] shrink-0">
        <Image
          src={resolvedImage}
          alt={imageAlt}
          width={400}
          height={300}
          className="w-full h-auto rounded-md"
          style={{ maxHeight: 280, objectFit: "contain" }}
        />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="product-section-title">{title}</h3>
        <p className="text-[15px] text-[#5a6c7e] leading-relaxed mb-4">{description}</p>

        {resolvedSizeEntries.length > 0 && (
          <>
            <p className="text-[12px] font-bold text-[#1a3a5c] uppercase tracking-[1.5px] mt-4 mb-3 pb-0">
              Available Sizes
            </p>
            <div className="flex flex-wrap gap-6">
              {resolvedSizeEntries.map(([label, sizeList]) => (
                <div key={label} className="min-w-[90px]">
                  <div className="text-[11px] font-bold text-[#c0392b] uppercase tracking-[1px] mb-1">{label}</div>
                  <ul className="list-none p-0 m-0">
                    {sizeList.map((size) => (
                      <li key={size} className="text-[14px] text-[#5a6c7e] leading-7">{size}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
