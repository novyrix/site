/**
 * Novyrix Pricing Constants
 * Based on the pricing model in docs/Pricing_model.md
 * All prices in Kenyan Shillings (KES)
 */

// Website Development Pricing
export const WEBSITE_PRICING = {
  // Base Price
  BASE_PRICE: 30000, // 1-3 page starter site
  BASE_COST: 30000, // Alias for consistency

  // Feature Blocks
  BLOG_CMS: 15000, // Blog or CMS functionality
  BLOG_INTEGRATION: 15000, // Alias for consistency
  ADVANCED_GALLERY: 15000, // Portfolio/gallery features
  GALLERY_PORTFOLIO: 15000, // Alias for consistency
  BOOKING_SYSTEM: 30000, // Booking and scheduling
  ECOMMERCE: 60000, // Full e-commerce with cart, payments
  API_INTEGRATION: 35000, // External API integration
  CUSTOM_API: 35000, // Alias for consistency

  // Hosting (Annual)
  HOSTING_BASIC_YEARLY: 3900, // Basic hosting per year
  HOSTING_ADVANCED_YEARLY: 5800, // Advanced hosting per year

  // Hosting structured
  HOSTING: {
    BASIC: {
      monthly: 325, // ~3900/12
      annual: 3900,
    },
    PREMIUM: {
      monthly: 483, // ~5800/12
      annual: 5800,
    },
  },

  // Maintenance & Support (Monthly)
  CARE_PLAN_MONTHLY: 5000, // Monthly maintenance
  CARE_PLAN_YEARLY: 50000, // Annual maintenance (discounted)
  ECOMMERCE_PLAN_MONTHLY: 12000, // E-commerce maintenance
  ECOMMERCE_PLAN_YEARLY: 120000, // Annual e-commerce plan

  // Care Plans structured
  CARE_PLANS: {
    BASIC: {
      monthly: 5000,
      annual: 50000,
    },
    PREMIUM: {
      monthly: 12000,
      annual: 120000,
    },
  },
} as const;

// Software Development Pricing
export const SOFTWARE_PRICING = {
  // Tier Ranges
  TIER_1_MIN: 400000, // Simple internal tool
  TIER_1_MAX: 900000,

  TIER_2_MIN: 900000, // Mid-level SaaS/app
  TIER_2_MAX: 2500000,

  TIER_3_MIN: 2500000, // Complex/enterprise
  TIER_3_MAX: null, // Open-ended

  // Services
  DISCOVERY_PHASE: 75000, // Project discovery
  TECHNICAL_AUDIT: 100000, // Software audit
} as const;

// Project Types for Software Development
export const PROJECT_TYPES = {
  BUSINESS_SOFTWARE: "business_software",
  SAAS: "saas",
  MOBILE_APP: "mobile_app",
  AUDIT: "audit",
} as const;

// Project Stages
export const PROJECT_STAGES = {
  IDEA: "idea",
  DESIGNS: "designs",
  SPECS: "specs",
} as const;

// Complexity Levels
export const COMPLEXITY_LEVELS = {
  SIMPLE: "simple",
  MEDIUM: "medium",
  COMPLEX: "complex",
} as const;

// Website Goals (Guided Path)
export const WEBSITE_GOALS = {
  INFORM: {
    label: "Inform Customers",
    description: "A beautiful, professional site to show who we are, what we do, and how to contact us.",
    addOns: [], // Base price only
  },
  SHOWCASE: {
    label: "Showcase My Work",
    description: "A high-end portfolio or gallery for my photography, art, or construction projects.",
    addOns: ["ADVANCED_GALLERY"],
  },
  PUBLISH: {
    label: "Publish Content",
    description: "A blog, news, or article site where I can regularly post new content.",
    addOns: ["BLOG_CMS"],
  },
  BOOK: {
    label: "Book Appointments",
    description: "Allow clients to book my time or services (e.g., salon, consultant, clinic).",
    addOns: ["BOOKING_SYSTEM"],
  },
  SELL: {
    label: "Sell Products Online",
    description: "A full online store where customers can browse, add to cart, and pay.",
    addOns: ["ECOMMERCE"],
  },
  CUSTOM: {
    label: "Something Totally Custom",
    description: "This sounds like a custom software project.",
    addOns: null, // Redirect to software calculator
  },
} as const;

// Automation Qualification
export const AUTOMATION_THRESHOLDS = {
  HOURS_PER_WEEK: {
    LOW: "1-5",
    MEDIUM: "5-15",
    HIGH: "15+",
  },
  TOOL_CATEGORIES: {
    PAPER: "paper",
    SPREADSHEETS: "spreadsheets",
    DIGITAL_TOOLS: "digital_tools",
    ADVANCED: "advanced",
  },
} as const;

// Business Areas for Automation
export const BUSINESS_AREAS = {
  SALES: "sales",
  OPERATIONS: "operations",
  MARKETING: "marketing",
  HR: "hr",
} as const;

/**
 * Calculate website development total
 */
export function calculateWebsiteTotal(selections: {
  hasBlog?: boolean;
  hasGallery?: boolean;
  hasBooking?: boolean;
  hasEcommerce?: boolean;
  hasApi?: boolean;
  hostingType?: "basic" | "advanced" | "own";
  carePlan?: boolean;
  ecommercePlan?: boolean;
}) {
  let oneTime = WEBSITE_PRICING.BASE_PRICE;
  let monthly = 0;
  let yearly = 0;

  // Add feature blocks
  if (selections.hasBlog) oneTime += WEBSITE_PRICING.BLOG_CMS;
  if (selections.hasGallery) oneTime += WEBSITE_PRICING.ADVANCED_GALLERY;
  if (selections.hasBooking) oneTime += WEBSITE_PRICING.BOOKING_SYSTEM;
  if (selections.hasEcommerce) oneTime += WEBSITE_PRICING.ECOMMERCE;
  if (selections.hasApi) oneTime += WEBSITE_PRICING.API_INTEGRATION;

  // Add hosting
  if (selections.hostingType === "basic") {
    yearly += WEBSITE_PRICING.HOSTING_BASIC_YEARLY;
  } else if (selections.hostingType === "advanced") {
    yearly += WEBSITE_PRICING.HOSTING_ADVANCED_YEARLY;
  }

  // Add care plan
  if (selections.ecommercePlan) {
    monthly += WEBSITE_PRICING.ECOMMERCE_PLAN_MONTHLY;
  } else if (selections.carePlan) {
    monthly += WEBSITE_PRICING.CARE_PLAN_MONTHLY;
  }

  return {
    oneTime,
    monthly,
    yearly,
    total: oneTime + yearly + monthly * 12,
  };
}

/**
 * Determine software development tier based on complexity score
 */
export function getSoftwareTier(complexityScore: number) {
  if (complexityScore <= 3) {
    return {
      tier: COMPLEXITY_LEVELS.SIMPLE,
      range: {
        min: SOFTWARE_PRICING.TIER_1_MIN,
        max: SOFTWARE_PRICING.TIER_1_MAX,
      },
    };
  } else if (complexityScore <= 6) {
    return {
      tier: COMPLEXITY_LEVELS.MEDIUM,
      range: {
        min: SOFTWARE_PRICING.TIER_2_MIN,
        max: SOFTWARE_PRICING.TIER_2_MAX,
      },
    };
  } else {
    return {
      tier: COMPLEXITY_LEVELS.COMPLEX,
      range: {
        min: SOFTWARE_PRICING.TIER_3_MIN,
        max: null,
      },
    };
  }
}

/**
 * Qualify automation lead
 */
export function qualifyAutomationLead(data: {
  hoursPerWeek: string;
  toolCategory: string;
}) {
  const isHighPriority =
    (data.hoursPerWeek === AUTOMATION_THRESHOLDS.HOURS_PER_WEEK.MEDIUM ||
      data.hoursPerWeek === AUTOMATION_THRESHOLDS.HOURS_PER_WEEK.HIGH) &&
    (data.toolCategory === AUTOMATION_THRESHOLDS.TOOL_CATEGORIES.SPREADSHEETS ||
      data.toolCategory === AUTOMATION_THRESHOLDS.TOOL_CATEGORIES.DIGITAL_TOOLS ||
      data.toolCategory === AUTOMATION_THRESHOLDS.TOOL_CATEGORIES.ADVANCED);

  return {
    priority: isHighPriority ? "high" : "foundation_needed",
    recommendation: isHighPriority
      ? "Free 30-Minute Automation Audit"
      : "Free Consultation to Build Foundation",
  };
}

/**
 * Format currency to Kenyan Shillings
 */
export function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
