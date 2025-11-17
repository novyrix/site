"use client";

import * as React from "react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);

    // Initialize analytics or other tracking here
    if (typeof window !== "undefined") {
      // Example: Enable Google Analytics
      // window.gtag?.('consent', 'update', {
      //   analytics_storage: 'granted'
      // });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6 animate-slideUp">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card border border-white/20 rounded-xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-display font-bold text-white mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized content. By clicking "Accept All", you consent to our use of cookies. You can learn more in our{" "}
                <a
                  href="/privacy"
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  Privacy Policy
                </a>
                .
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="flex-1 sm:flex-initial"
                >
                  Accept All
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDecline}
                  className="flex-1 sm:flex-initial"
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="flex-1 sm:flex-initial"
                >
                  <a href="/privacy">Learn More</a>
                </Button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDecline}
              className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
