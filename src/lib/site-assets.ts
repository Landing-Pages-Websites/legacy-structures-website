export interface SiteImageAsset {
  src: string;
  width: number;
  height: number;
}

export const siteAssets = {
  logo: {
    src: "/logo.png",
    width: 320,
    height: 302,
  },
  heroSlides: [
    {
      src: "/images/optimized-assets/territory3-slider.webp",
      width: 1600,
      height: 500,
    },
    {
      src: "/images/optimized-assets/byo-hero-slider-2.webp",
      width: 1600,
      height: 499,
    },
    {
      src: "/images/optimized-assets/byo-hero-slider-3.webp",
      width: 1920,
      height: 601,
    },
  ],
  categoryCards: {
    backyardBarns: {
      src: "/images/optimized-assets/lofted-barn-1.webp",
      width: 754,
      height: 394,
    },
    storageSheds: {
      src: "/images/optimized-assets/shed-slider-1.webp",
      width: 754,
      height: 394,
    },
    portableCabins: {
      src: "/images/optimized-assets/utility-side-slider-1.webp",
      width: 754,
      height: 394,
    },
    portableGarages: {
      src: "/images/optimized-assets/garage-slider-1.webp",
      width: 754,
      height: 394,
    },
    doubleWideGarages: {
      src: "/images/optimized-assets/double-wide-garages.webp",
      width: 815,
      height: 529,
    },
    chickenCoops: {
      src: "/images/optimized-assets/chicken-coops.webp",
      width: 815,
      height: 529,
    },
    greenhouses: {
      src: "/images/optimized-assets/greenhouses.webp",
      width: 815,
      height: 529,
    },
    sideGables: {
      src: "/images/optimized-assets/side-gables.webp",
      width: 815,
      height: 529,
    },
  },
  splitCta: {
    shedBuilder: {
      src: "/images/optimized-assets/3d-shed-builder-screen.webp",
      width: 454,
      height: 288,
    },
    inventory: {
      src: "/images/optimized-assets/view-inventory-sheds.webp",
      width: 706,
      height: 222,
    },
  },
  pricingGuide: {
    devices: {
      src: "/images/optimized-assets/homepage-devices.webp",
      width: 400,
      height: 190,
    },
    cta: {
      src: "/images/optimized-assets/pricing-guide-cta.webp",
      width: 222,
      height: 193,
    },
  },
  materials: {
    barnInterior: {
      src: "/images/optimized-assets/barn-interior.webp",
      width: 726,
      height: 605,
    },
  },
  footer: {
    dealerLogo: {
      src: "/images/optimized-assets/backyardoutfitters-logo.webp",
      width: 286,
      height: 191,
    },
    facebook: {
      src: "/images/optimized-assets/icon-fb.webp",
      width: 50,
      height: 50,
    },
    instagram: {
      src: "/images/optimized-assets/icon-ig.webp",
      width: 50,
      height: 50,
    },
    email: {
      src: "/images/optimized-assets/icon-email.webp",
      width: 50,
      height: 50,
    },
  },
  categoryPage: {
    designerCta: {
      src: "/images/optimized-assets/3d-designer-models-cta.webp",
      width: 828,
      height: 107,
    },
    backyardBarns: {
      src: "/images/optimized-assets/lofted-barn-1.webp",
      width: 754,
      height: 394,
    },
    storageSheds: {
      src: "/images/optimized-assets/shed-slider-1.webp",
      width: 754,
      height: 394,
    },
    portableCabins: {
      src: "/images/optimized-assets/utility-side-slider-1.webp",
      width: 754,
      height: 394,
    },
    portableGarages: {
      src: "/images/optimized-assets/garage-slider-1.webp",
      width: 754,
      height: 394,
    },
    doubleWideGarages: {
      src: "/images/optimized-assets/double-wide-garages.webp",
      width: 815,
      height: 529,
    },
    chickenCoops: {
      src: "/images/optimized-assets/chicken-coops.webp",
      width: 815,
      height: 529,
    },
    greenhouses: {
      src: "/images/optimized-assets/greenhouses.webp",
      width: 815,
      height: 529,
    },
    sideGables: {
      src: "/images/optimized-assets/side-gables.webp",
      width: 815,
      height: 529,
    },
  },
  rentToOwn: {
    hero: {
      src: "/images/optimized-assets/rent-to-own-hdr.webp",
      width: 721,
      height: 458,
    },
  },
} as const;
