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
  const jsonLd = {
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
      lowPrice: price.split("-")[0]?.trim() || price,
      highPrice: price.includes("-") ? price.split("-")[1]?.trim() : undefined,
      availability,
      url,
    },
  };

  // Remove undefined highPrice
  if (!jsonLd.offers.highPrice) {
    delete jsonLd.offers.highPrice;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
