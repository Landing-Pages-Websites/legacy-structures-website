import type { Metadata } from "next";
import { Inter, Poppins, Bricolage_Grotesque, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND, BUSINESS_HOURS, SOCIAL_LINKS } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const bricolage = Bricolage_Grotesque({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://legacystructuresusa.com"),
  title: {
    default: "Storage Sheds for Sale Hudson Falls, NY | Legacy Structures",
    template: "%s | Legacy Structures",
  },
  description:
    "High-quality storage sheds for sale in Hudson Falls, NY. Customizable options and expert installation. Rent to own options available.",
  alternates: { canonical: "/" },
  keywords: [
    "storage sheds",
    "Hudson Falls NY",
    "lofted barns",
    "portable cabins",
    "portable garages",
    "chicken coops",
    "greenhouses",
    "rent to own sheds",
    "backyard barns",
  ],
  authors: [{ name: "Legacy Structures" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://legacystructuresusa.com",
    siteName: "Legacy Structures",
    title: "Storage Sheds for Sale Hudson Falls, NY | Legacy Structures",
    description:
      "High-quality storage sheds for sale in Hudson Falls, NY. Customizable options and expert installation. Rent to own options available.",
    images: [
      {
        url: "https://barndealer.com/assets/img/social-share-barn-icon-250c.png",
        width: 250,
        height: 250,
        alt: "Legacy Structures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Storage Sheds for Sale Hudson Falls, NY | Legacy Structures",
    description:
      "High-quality storage sheds for sale in Hudson Falls, NY. Customizable options and expert installation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BRAND.name,
  url: BRAND.siteUrl,
  telephone: BRAND.phone,
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.addressStreet,
    addressLocality: BRAND.addressCity,
    addressRegion: BRAND.addressState,
    postalCode: BRAND.addressZip,
    addressCountry: "US",
  },
  openingHoursSpecification: BUSINESS_HOURS.map(([day, hours]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day,
    description: hours,
  })),
  sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${bricolage.variable} ${oswald.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
