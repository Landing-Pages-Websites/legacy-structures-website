interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  priceCurrency?: string;
  price: string;
  availability?: string;
  brandName?: string;
}

export default function ProductSchema({
  name,
  description,
  image,
  url,
  priceCurrency = "USD",
  price,
  availability = "https://schema.org/InStock",
  brandName = "Legacy Structures",
}: ProductSchemaProps) {
  // Sanitize price to clean numeric value for schema.org
  const sanitizePrice = (val: string): string =>
    val.replace(/[$,\s+]/g, "");

  const lowPrice = sanitizePrice(price.split("-")[0]?.trim() || price);
  const highPrice = price.includes("-")
    ? sanitizePrice(price.split("-")[1]?.trim())
    : undefined;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency,
      lowPrice,
      availability,
      url,
    },
  };

  if (highPrice) {
    (jsonLd.offers as Record<string, unknown>).highPrice = highPrice;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
