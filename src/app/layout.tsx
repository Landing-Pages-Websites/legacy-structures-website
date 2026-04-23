import type { Metadata } from "next";
import { Inter, Poppins, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://legacystructuresusa.com"),
  title: {
    default: "Storage Sheds for Sale Hudson Falls, NY | Legacy Structures",
    template: "%s | Legacy Structures",
  },
  description:
    "High-quality storage sheds for sale in Hudson Falls, NY. Customizable options and expert installation. Rent to own options available.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${bricolage.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
