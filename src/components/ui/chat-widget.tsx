"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  sender: "USER" | "AI" | "AGENT";
  content: string;
  createdAt: Date;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isHumanMode, setIsHumanMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Session
  useEffect(() => {
    let storedSessionId = localStorage.getItem("novyrix_chat_session");
    if (!storedSessionId) {
      storedSessionId = crypto.randomUUID();
      localStorage.setItem("novyrix_chat_session", storedSessionId);
    }
    setSessionId(storedSessionId);

    // Load history
    fetchHistory(storedSessionId);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchHistory = async (sid: string) => {
    try {
      const res = await fetch(`/api/chat?sessionId=${sid}`);
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to load chat history", error);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: "USER",
      content: inputValue,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: newMessage.content,
          visitorId: sessionId, // Using session ID as visitor ID for simplicity
        }),
      });

      const data = await res.json();

      if (data.response) {
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          sender: "AI",
          content: data.response,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestHuman = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          action: "request_human",
          visitorId: sessionId,
        }),
      });
      const data = await res.json();

      const systemMessage: Message = {
        id: crypto.randomUUID(),
        sender: "AGENT", // System message
        content: data.systemMessage || "An agent has been notified.",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, systemMessage]);
      setIsHumanMode(true);
    } catch (error) {
      console.error("Failed to request human", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold text-white">Novyrix Support</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-slate-400 mt-10">
                  <p>Welcome to Novyrix!</p>
                  <p className="text-sm mt-2">How can we help you today?</p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.sender === "USER" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm",
                      msg.sender === "USER"
                        ? "bg-primary-600 text-white rounded-tr-none"
                        : "bg-slate-800 text-slate-200 rounded-tl-none border border-white/5"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Actions */}
            {!isHumanMode && messages.length > 0 && (
              <div className="px-4 pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white/10 hover:bg-white/5 text-xs"
                  onClick={requestHuman}
                >
                  <User className="w-3 h-3 mr-2" />
                  Talk to Human
                </Button>
              </div>
            )}

            {/* WhatsApp Fallback */}
            {isHumanMode && (
               <div className="px-4 pb-2">
               <a
                 href="https://wa.me/254790778103" // Replace with actual number
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-center w-full p-2 text-xs text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
               >
                 <Phone className="w-3 h-3 mr-2" />
                 Reply taking too long? Chat on WhatsApp
               </a>
             </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-slate-800/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="bg-slate-900/50 border-white/10 focus:ring-primary-500"
                />
                <Button type="submit" size="icon" className="bg-primary-600 hover:bg-primary-700">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg shadow-primary-600/30 flex items-center justify-center z-50 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
