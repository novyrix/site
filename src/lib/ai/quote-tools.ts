import websiteMatrix from '@/lib/data/websiteMatrix.json';
import automationMatrix from '@/lib/data/automationMatrix.json';
import starterMatrix from '@/lib/data/starterMatrix.json';

export type ServiceType = 'website' | 'automation' | 'starter';
export type PricingTier = 'starter' | 'enterprise';
export type FeatureMatrix = typeof websiteMatrix | typeof automationMatrix | typeof starterMatrix.pricing_matrix;

export interface QuoteItem {
  featureId: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface Quote {
  serviceType: ServiceType;
  pricingTier: PricingTier;
  items: QuoteItem[];
  total: number;
  mandatory: QuoteItem[];
  optional: QuoteItem[];
}

// Function calling tools for OpenAI
export const tools = [
  {
    type: 'function' as const,
    function: {
      name: 'start_quote',
      description: 'Starts a new quote for a client project. Must be called first in any new session. Automatically adds the mandatory foundation package based on project complexity.',
      parameters: {
        type: 'object',
        properties: {
          serviceType: {
            type: 'string',
            enum: ['website', 'automation'],
            description: 'The type of service: "website" for custom web development, "automation" for workflow automation'
          },
          pricingTier: {
            type: 'string',
            enum: ['starter', 'enterprise'],
            description: 'Pricing tier: "starter" for simple sites (30k-50k base, ideal for portfolios/small businesses), "enterprise" for custom platforms (150k+ base, ideal for applications/complex systems)'
          }
        },
        required: ['serviceType', 'pricingTier']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'find_features',
      description: 'Searches the pricing matrix to find features matching a user goal or requirement. Use this to discover what Feature IDs are available for a given need.',
      parameters: {
        type: 'object',
        properties: {
          userGoal: {
            type: 'string',
            description: 'Natural language description of what the user wants (e.g., "sell products online", "accept M-Pesa", "automate KRA invoices")'
          },
          serviceType: {
            type: 'string',
            enum: ['website', 'automation', 'starter'],
            description: 'Which service matrix to search: "website" for enterprise web features, "automation" for workflow features, "starter" for simple website packages'
          }
        },
        required: ['userGoal', 'serviceType']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'add_feature_to_quote',
      description: 'Adds a specific feature to the current quote by its Feature ID',
      parameters: {
        type: 'object',
        properties: {
          featureId: {
            type: 'string',
            description: 'The exact Feature ID from the matrix (e.g., "ECO-001", "PAY-001", "API-CUS-02")'
          }
        },
        required: ['featureId']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'ask_clarifying_question',
      description: 'Ask the user a specific question to gather more information. Use this when you need details before proceeding.',
      parameters: {
        type: 'object',
        properties: {
          question: {
            type: 'string',
            description: 'The question to ask the user'
          },
          options: {
            type: 'array',
            items: { type: 'string' },
            description: 'Optional: Suggested answer options for the user to choose from'
          }
        },
        required: ['question']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_current_quote',
      description: 'Retrieves the current quote summary with all items and total',
      parameters: {
        type: 'object',
        properties: {}
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'finalize_quote',
      description: 'Finalizes the quote and prepares for handoff to human consultant. Call this when the quote is complete.',
      parameters: {
        type: 'object',
        properties: {
          clientName: {
            type: 'string',
            description: 'The client\'s name'
          },
          clientEmail: {
            type: 'string',
            description: 'The client\'s email address'
          }
        },
        required: ['clientName', 'clientEmail']
      }
    }
  }
];

// Helper function to get the appropriate matrix
export function getMatrix(serviceType: ServiceType): any {
  if (serviceType === 'starter') {
    // Flatten starter matrix structure for compatibility
    const flattened: any = {};
    Object.entries(starterMatrix.pricing_matrix).forEach(([category, features]) => {
      (features as any[]).forEach((feature: any) => {
        flattened[feature.id] = {
          ...feature,
          why_we_charge: feature.why_we_charge || feature.description
        };
      });
    });
    return flattened;
  }
  return serviceType === 'website' ? websiteMatrix : automationMatrix;
}

// Helper function to search features by keywords with fuzzy matching
export function searchFeatures(query: string, serviceType: ServiceType): QuoteItem[] {
  const matrix = getMatrix(serviceType);
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2); // Filter out short words
  const results: Map<string, { item: QuoteItem, score: number }> = new Map();

  Object.entries(matrix).forEach(([id, feature]) => {
    // Type assertion for the feature object
    const typedFeature = feature as QuoteItem & { keywords?: string[] };
    const keywords = typedFeature.keywords || [];
    const searchableText = [
      typedFeature.name.toLowerCase(),
      typedFeature.description.toLowerCase(),
      ...keywords.map(k => k.toLowerCase())
    ].join(' ');

    let score = 0;

    // Exact phrase match (highest score)
    if (searchableText.includes(query.toLowerCase())) {
      score += 100;
    }

    // Individual term matching with fuzzy logic
    searchTerms.forEach(term => {
      // Exact keyword match
      const exactMatch = keywords.some(k => k.toLowerCase() === term);
      if (exactMatch) score += 50;

      // Partial keyword match
      const partialMatch = keywords.some(k =>
        k.toLowerCase().includes(term) || term.includes(k.toLowerCase())
      );
      if (partialMatch && !exactMatch) score += 30;

      // Name/description match
      if (typedFeature.name.toLowerCase().includes(term)) score += 20;
      if (typedFeature.description.toLowerCase().includes(term)) score += 10;

      // Fuzzy match (edit distance for typos)
      keywords.forEach(keyword => {
        if (isSimilar(term, keyword.toLowerCase())) {
          score += 15;
        }
      });
    });

    if (score > 0) {
      results.set(id, {
        item: {
          featureId: id,
          name: typedFeature.name,
          price: typedFeature.price,
          description: typedFeature.description,
          category: typedFeature.category
        },
        score
      });
    }
  });

  // Sort by score (highest first) and return top results
  return Array.from(results.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 8) // Return top 8 matches
    .map(r => r.item);
}

// Simple similarity check for fuzzy matching (Levenshtein-inspired)
function isSimilar(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false; // Too short for fuzzy matching

  // Check if strings are 80% similar (simple character overlap)
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  let matches = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) matches++;
  }

  return (matches / longer.length) >= 0.8;
}

// Get feature by ID
export function getFeatureById(featureId: string, serviceType: ServiceType): QuoteItem | null {
  const matrix = getMatrix(serviceType);
  const feature = (matrix as any)[featureId];

  if (!feature) return null;

  return {
    featureId,
    name: feature.name,
    price: feature.price,
    description: feature.description,
    category: feature.category
  };
}

// Calculate quote total
export function calculateQuoteTotal(items: QuoteItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Format price in KES
export function formatKES(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
