"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoaderOne } from "@/components/ui/loader";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function AIChatModal({ isOpen, onClose, initialQuery }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && initialQuery && messages.length === 0) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (query?: string) => {
    const messageText = query || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-consultant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: `inline-${Date.now()}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I apologize, but I couldn't generate a response.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:h-[600px] z-50"
          >
            <div className="h-full flex flex-col bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-800/30 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                      src="/novyrix-logo.png"
                      alt="Novyrix Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Sparkles className="w-6 h-6 text-orange-400 hidden" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Novy AI</h3>
                    <p className="text-xs text-gray-400">Your AI Consultant</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent via-slate-900/10 to-transparent">
                {messages.length === 0 && !isLoading && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4 p-8 rounded-2xl bg-slate-800/20 backdrop-blur-md border border-white/10">
                      <div className="w-20 h-20 mx-auto flex items-center justify-center">
                        <Image
                          src="/novyrix-logo.png"
                          alt="Novy AI"
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        Welcome to Novy AI
                      </h4>
                      <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
                        Tell me about your project and I'll provide an instant,
                        transparent quote.
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/novyrix-logo.png"
                          alt="Novy AI"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3 shadow-lg",
                        message.role === "user"
                          ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-orange-500/30"
                          : "bg-slate-800/30 backdrop-blur-xl border border-white/20 text-gray-100 shadow-black/20"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-slate-700/50 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-white">
                          You
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/novyrix-logo.png"
                        alt="Novy AI"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-lg shadow-black/20">
                      <LoaderOne />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-slate-800/30 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-800/40 backdrop-blur-md border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 disabled:opacity-50 transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-orange-500/50 hover:scale-105 transition-all"
                  >
                    {isLoading ? (
                      <div className="scale-75">
                        <LoaderOne />
                      </div>
                    ) : (
                      <Send className="w-5 h-5 text-white" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
