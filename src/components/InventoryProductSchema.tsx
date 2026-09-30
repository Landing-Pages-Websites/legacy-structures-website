interface InventoryProductSchemaProps {
  name: string;
  sku: string;
  description: string;
  image: string;
  url: string;
  cashPrice: string;
  salePrice?: string;
  rto36?: string;
  rto48?: string;
}

const SITE_URL = "https://legacystructuresusa.com";

const normalizeAssetUrl = (value: string): string =>
  value.startsWith("/") ? `${SITE_URL}${value}` : value;

const parseVisiblePrice = (value: string): string | null => {
  const numeric = value.replace(/[^0-9.]/g, "");
  return /^\d+(?:\.\d{1,2})?$/.test(numeric) ? numeric : null;
};

export default function InventoryProductSchema({
  name,
  sku,
  description,
  image,
  url,
  cashPrice,
  salePrice,
  rto36,
  rto48,
}: InventoryProductSchemaProps) {
  const price = parseVisiblePrice(salePrice ?? cashPrice);
  const additionalProperty = [
    rto36 && {
      "@type": "PropertyValue",
      name: "36-month rent-to-own payment",
      value: rto36,
    },
    rto48 && {
      "@type": "PropertyValue",
      name: "48-month rent-to-own payment",
      value: rto48,
    },
  ].filter(Boolean);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: normalizeAssetUrl(image),
    description,
    sku,
    brand: {
      "@type": "Brand",
      name: "Legacy Structures",
    },
    url,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price,
            url,
          },
        }
      : {}),
    ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
