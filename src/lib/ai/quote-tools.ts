import websiteMatrix from '@/lib/data/websiteMatrix.json';
import automationMatrix from '@/lib/data/automationMatrix.json';

export type ServiceType = 'website' | 'automation';
export type FeatureMatrix = typeof websiteMatrix | typeof automationMatrix;

export interface QuoteItem {
  featureId: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface Quote {
  serviceType: ServiceType;
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
      description: 'Starts a new quote for a client project. Must be called first in any new session. Automatically adds the mandatory foundation package.',
      parameters: {
        type: 'object',
        properties: {
          serviceType: {
            type: 'string',
            enum: ['website', 'automation'],
            description: 'The type of service: "website" for custom web development, "automation" for workflow automation'
          }
        },
        required: ['serviceType']
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
            enum: ['website', 'automation'],
            description: 'Which service matrix to search'
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
export function getMatrix(serviceType: ServiceType): FeatureMatrix {
  return serviceType === 'website' ? websiteMatrix : automationMatrix;
}

// Helper function to search features by keywords
export function searchFeatures(query: string, serviceType: ServiceType): QuoteItem[] {
  const matrix = getMatrix(serviceType);
  const searchTerms = query.toLowerCase().split(' ');
  const results: QuoteItem[] = [];

  Object.entries(matrix).forEach(([id, feature]) => {
    const keywords = feature.keywords || [];
    const matchScore = keywords.filter(keyword =>
      searchTerms.some(term => keyword.toLowerCase().includes(term) || term.includes(keyword.toLowerCase()))
    ).length;

    if (matchScore > 0) {
      results.push({
        featureId: id,
        name: feature.name,
        price: feature.price,
        description: feature.description,
        category: feature.category
      });
    }
  });

  // Sort by match relevance
  return results.sort((a, b) => {
    const aKeywords = (matrix as any)[a.featureId].keywords || [];
    const bKeywords = (matrix as any)[b.featureId].keywords || [];

    const aScore = aKeywords.filter((k: string) =>
      searchTerms.some(term => k.toLowerCase().includes(term))
    ).length;

    const bScore = bKeywords.filter((k: string) =>
      searchTerms.some(term => k.toLowerCase().includes(term))
    ).length;

    return bScore - aScore;
  });
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
