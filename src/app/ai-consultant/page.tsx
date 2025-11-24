"use client";

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  timeString?: string; // Client-side formatted time
}

interface QuoteItem {
  name: string;
  price: string;
  category: string;
}

interface CurrentQuote {
  serviceType: 'website' | 'automation';
  items: QuoteItem[];
  total: string;
}

export default function AIConsultantPage() {
  const searchParams = useSearchParams();
  const prefilledQuery = searchParams.get('q');

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm **Novy**, your AI consultant at Novyrix. I help Kenyan businesses build custom web applications and workflow automations with complete transparency. \n\nTo get started, could you tell me: What's the main business challenge you're looking to solve?",
      timestamp: new Date(),
      timeString: '' // Will be set on client
    }
  ]);
  const [isClient, setIsClient] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<CurrentQuote | null>(null);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle prefilled query from homepage
  useEffect(() => {
    if (prefilledQuery && !isLoading) {
      setInput(prefilledQuery);
      // Auto-submit after a brief delay
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [prefilledQuery]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsClient(true);
    // Format all timestamps on client mount
    setMessages(msgs => msgs.map(msg => ({
      ...msg,
      timeString: msg.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    })));
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const timestamp = new Date();
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp,
      timeString: timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sessionId
        })
      });

      const data = await response.json();

      if (data.message) {
        const timestamp = new Date();
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp,
          timeString: timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        setMessages(prev => [...prev, assistantMessage]);
      }

      if (data.quote) {
        setCurrentQuote(data.quote);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const timestamp = new Date();
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again or contact our team directly.",
        timestamp,
        timeString: timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text">
                AI Consultant
              </h1>
              <p className="text-gray-400">Your intelligent project advisor</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card variant="default" className="flex flex-col h-[calc(100vh-250px)]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${
                        message.role === 'assistant'
                          ? 'bg-gradient-to-br from-primary-400 to-primary-600'
                          : 'bg-white/10'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Sparkles className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-sm font-bold">You</span>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`flex-1 max-w-[80%] ${
                        message.role === 'user' ? 'text-right' : ''
                      }`}
                    >
                      <div
                        className={`inline-block p-4 rounded-xl ${
                          message.role === 'assistant'
                            ? 'bg-white/5 border border-white/10'
                            : 'bg-primary-500/20 border border-primary-500/30'
                        }`}
                      >
                        <p className="text-gray-100 whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      {isClient && message.timeString && (
                        <p className="text-xs text-gray-500 mt-2">
                          {message.timeString}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <Loader2 className="w-5 h-5 animate-spin text-primary-500" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4">
                <div className="flex gap-3">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe what you need..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    rows={3}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="self-end"
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Send
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </Card>
          </div>

          {/* Quote Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card variant="highlighted" className="p-6 sticky top-24">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-500" />
                Your Quote
              </h3>

              {currentQuote ? (
                <div className="space-y-4">
                  {/* Service Type */}
                  <div className="p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Service</p>
                    <p className="font-medium capitalize">
                      {currentQuote.serviceType === 'website'
                        ? 'Website Development'
                        : 'Workflow Automation'}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400 font-medium">Features:</p>
                    {currentQuote.items.map((item, index) => (
                      <div key={index} className="flex items-start justify-between gap-2 text-sm">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="font-mono text-primary-500 whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display font-bold">Total</span>
                      <span className="text-2xl font-display font-bold text-primary-500">
                        {currentQuote.total}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-gray-400">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Fixed price, no surprises
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Quote valid for 30 days
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Free consultation included
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-sm">
                    Start chatting to build your custom quote
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 mb-3">
                  Prefer to explore on your own?
                </p>
                <Link href="/calculators">
                  <Button variant="outline" size="sm" className="w-full">
                    Use Calculator Instead
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
