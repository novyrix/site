import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODEL, CONSULTANT_SYSTEM_PROMPT } from '@/lib/ai/openai';
import { 
  tools, 
  searchFeatures, 
  getFeatureById, 
  calculateQuoteTotal, 
  formatKES,
  type Quote,
  type QuoteItem,
  type ServiceType 
} from '@/lib/ai/quote-tools';

// In-memory session storage (in production, use Redis or database)
const sessions = new Map<string, {
  quote: Quote | null;
  messages: Array<{ role: string; content: string }>;
}>();

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    // Get or create session
    let session = sessions.get(sessionId);
    if (!session) {
      session = {
        quote: null,
        messages: []
      };
      sessions.set(sessionId, session);
    }

    // Add user message to history
    session.messages.push({
      role: 'user',
      content: message
    });

    // Call OpenAI with function calling
    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        { role: 'system', content: CONSULTANT_SYSTEM_PROMPT },
        ...session.messages.map(m => ({ 
          role: m.role as 'user' | 'assistant' | 'system',
          content: m.content 
        }))
      ],
      tools,
      tool_choice: 'auto',
      temperature: 0.7,
      max_tokens: 1000
    });

    const assistantMessage = response.choices[0].message;
    let toolResults: any[] = [];

    // Process function calls
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      for (const toolCall of assistantMessage.tool_calls) {
        // Type guard to check if it's a function tool call
        if (toolCall.type !== 'function') continue;
        
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);

        let result: any;

        switch (functionName) {
          case 'start_quote':
            result = handleStartQuote(session, args.serviceType);
            break;

          case 'find_features':
            result = handleFindFeatures(args.userGoal, args.serviceType);
            break;

          case 'add_feature_to_quote':
            result = handleAddFeature(session, args.featureId);
            break;

          case 'get_current_quote':
            result = handleGetQuote(session);
            break;

          case 'finalize_quote':
            result = handleFinalizeQuote(session, args.clientName, args.clientEmail);
            break;

          default:
            result = { error: 'Unknown function' };
        }

        toolResults.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: JSON.stringify(result)
        });
      }

      // Get AI response after function calls
      const followUp = await openai.chat.completions.create({
        model: AI_MODEL,
        messages: [
          { role: 'system', content: CONSULTANT_SYSTEM_PROMPT },
          ...session.messages.map(m => ({ 
            role: m.role as 'user' | 'assistant' | 'system',
            content: m.content 
          })),
          assistantMessage,
          ...toolResults
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const finalMessage = followUp.choices[0].message.content || 'I apologize, I encountered an error. Could you please rephrase that?';
      
      session.messages.push({
        role: 'assistant',
        content: finalMessage
      });

      return NextResponse.json({
        message: finalMessage,
        quote: session.quote,
        toolResults
      });
    }

    // No function calls - just return the message
    const aiResponse = assistantMessage.content || 'I apologize, I encountered an error. Could you please rephrase that?';
    
    session.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    return NextResponse.json({
      message: aiResponse,
      quote: session.quote
    });

  } catch (error) {
    console.error('AI Consultant Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Function handlers
function handleStartQuote(session: any, serviceType: ServiceType) {
  const mandatoryFeature = serviceType === 'website' ? 'CORE-FOUNDATION' : 'WF-CORE';
  const feature = getFeatureById(mandatoryFeature, serviceType);

  if (!feature) {
    return { error: 'Failed to initialize quote' };
  }

  session.quote = {
    serviceType,
    items: [feature],
    total: feature.price,
    mandatory: [feature],
    optional: []
  };

  return {
    success: true,
    message: `Started ${serviceType} quote with ${feature.name} (${formatKES(feature.price)})`,
    quote: session.quote
  };
}

function handleFindFeatures(userGoal: string, serviceType: ServiceType) {
  const features = searchFeatures(userGoal, serviceType);
  
  return {
    success: true,
    features: features.slice(0, 5).map(f => ({
      id: f.featureId,
      name: f.name,
      price: formatKES(f.price),
      description: f.description,
      category: f.category
    })),
    message: `Found ${features.length} matching features`
  };
}

function handleAddFeature(session: any, featureId: string) {
  if (!session.quote) {
    return { error: 'No active quote. Please start a quote first.' };
  }

  const feature = getFeatureById(featureId, session.quote.serviceType);
  
  if (!feature) {
    return { error: `Feature ${featureId} not found` };
  }

  // Check if already added
  if (session.quote.items.some((item: QuoteItem) => item.featureId === featureId)) {
    return { error: 'Feature already in quote', feature };
  }

  session.quote.items.push(feature);
  session.quote.optional.push(feature);
  session.quote.total = calculateQuoteTotal(session.quote.items);

  return {
    success: true,
    message: `Added ${feature.name} (${formatKES(feature.price)}) to quote`,
    feature,
    newTotal: formatKES(session.quote.total)
  };
}

function handleGetQuote(session: any) {
  if (!session.quote) {
    return { error: 'No active quote' };
  }

  return {
    success: true,
    quote: {
      serviceType: session.quote.serviceType,
      items: session.quote.items.map((item: QuoteItem) => ({
        name: item.name,
        price: formatKES(item.price),
        category: item.category
      })),
      total: formatKES(session.quote.total),
      breakdown: {
        mandatory: formatKES(calculateQuoteTotal(session.quote.mandatory)),
        optional: formatKES(calculateQuoteTotal(session.quote.optional))
      }
    }
  };
}

function handleFinalizeQuote(session: any, clientName: string, clientEmail: string) {
  if (!session.quote) {
    return { error: 'No active quote to finalize' };
  }

  // In production: Save to database, send email, etc.
  return {
    success: true,
    message: 'Quote finalized! Our team will contact you within 24 hours.',
    quote: session.quote,
    client: { name: clientName, email: clientEmail },
    nextSteps: [
      'Your quote has been saved',
      'A detailed PDF will be emailed to you',
      'Our project manager will schedule a discovery call',
      'We typically respond within 4 business hours'
    ]
  };
}
