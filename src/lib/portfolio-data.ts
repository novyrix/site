export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: {
    desktop: string;
    mobile: string;
  };
  techStack: string[];
  features: {
    title: string;
    description: string;
  }[];
  liveUrl: string;
  githubUrl?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  codeSnippet?: {
    language: string;
    code: string;
    filename: string;
  };
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "afribit-africa",
    title: "Afribit Africa",
    description: "Empowering African communities through Bitcoin education and circular economies.",
    longDescription: "Afribit is a grassroots organization building a Bitcoin circular economy in Kibera, one of Africa's largest informal settlements. The platform facilitates financial inclusion, environmental stewardship, and community resilience through education, waste management, micro-loans, and merchant onboarding. It features a custom donation system, merchant mapping, and community storytelling.",
    thumbnail: "/projects/afribit-thumb.png", // Placeholder
    images: {
      desktop: "/projects/afribit-desktop.png", // Placeholder
      mobile: "/projects/afribit-mobile.png", // Placeholder
    },
    techStack: ["Next.js", "React", "Tailwind CSS", "BTCPay Server", "Lightning Network"],
    features: [
      {
        title: "Bitcoin Circular Economy",
        description: "Integrated payment systems allowing merchants and residents to transact in Bitcoin without intermediaries."
      },
      {
        title: "Donation Platform",
        description: "Custom crowdfunding implementation using BTCPay Server for transparent, direct-to-community donations."
      },
      {
        title: "Merchant Mapping",
        description: "Interactive map showing locations of Bitcoin-accepting merchants in Kibera."
      },
      {
        title: "Community Hub",
        description: "Resources and educational content for the 'Ride to Freedom' boda-boda program and women's upcycling collective."
      }
    ],
    liveUrl: "https://www.afribit.africa/",
    stats: [
      { label: "Transactions", value: "2,000+" },
      { label: "Merchants", value: "150+" },
      { label: "Trained", value: "120+" }
    ],
    codeSnippet: {
      language: "typescript",
      filename: "donation-processor.ts",
      code: `async function processDonation(amount: number, currency: string) {
  const rate = await getBitcoinRate(currency);
  const sats = (amount / rate) * 100_000_000;

  return await btcPayServer.createInvoice({
    price: sats,
    currency: "BTC",
    itemDesc: "Community Donation"
  });
}`
    }
  },
  {
    id: "2",
    slug: "severius-adventures",
    title: "Severius Adventures & Travel",
    description: "Luxury safari booking platform specializing in East African experiences.",
    longDescription: "A premium travel booking platform designed for Severius Adventures & Travel. The site showcases luxury safari packages across Kenya, Uganda, and Tanzania. It features a robust tour filtering system, detailed itinerary displays, and a seamless booking inquiry process. The design emphasizes the beauty of African landscapes with high-quality imagery and an elegant user interface.",
    thumbnail: "/projects/severius-thumb.png", // Placeholder
    images: {
      desktop: "/projects/severius-desktop.png", // Placeholder
      mobile: "/projects/severius-mobile.png", // Placeholder
    },
    techStack: ["Next.js", "React", "Framer Motion", "Tailwind CSS", "Node.js"],
    features: [
      {
        title: "Tour Booking System",
        description: "Comprehensive catalog of safari packages with filtering by destination, duration, and price."
      },
      {
        title: "Dynamic Itineraries",
        description: "Detailed day-by-day itinerary breakdowns with rich media integration."
      },
      {
        title: "Responsive Design",
        description: "Fully optimized experience across all devices, ensuring travelers can book on the go."
      },
      {
        title: "Direct Inquiry Integration",
        description: "WhatsApp and email integration for immediate customer support and personalized booking."
      }
    ],
    liveUrl: "https://www.severiusadventuresandtravel.com/",
    stats: [
      { label: "Destinations", value: "5+ Countries" },
      { label: "Tours", value: "20+" },
      { label: "Experience", value: "Premium" }
    ],
    codeSnippet: {
      language: "typescript",
      filename: "tour-filter.ts",
      code: `export const filterTours = (tours: Tour[], filters: FilterState) => {
  return tours.filter(tour => {
    const matchesDest = !filters.destination || tour.country === filters.destination;
    const matchesPrice = tour.price >= filters.minPrice && tour.price <= filters.maxPrice;
    const matchesDuration = tour.days >= filters.minDays;

    return matchesDest && matchesPrice && matchesDuration;
  });
}`
    }
  }
];
