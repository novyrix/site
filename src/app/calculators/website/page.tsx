"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, HelpCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { WEBSITE_PRICING } from "@/lib/constants/pricing";
import { formatKES } from "@/lib/utils";

type CalculatorPath = "guided" | "tech" | null;
type HostingOption = "none" | "basic" | "premium";
type CarePlanOption = "none" | "basic" | "premium";

interface WebsiteFeatures {
  pages: number;
  hasBlog: boolean;
  hasGallery: boolean;
  hasBooking: boolean;
  hasEcommerce: boolean;
  hasCustomAPI: boolean;
}

export default function WebsiteCalculatorPage() {
  const [path, setPath] = React.useState<CalculatorPath>(null);
  const [step, setStep] = React.useState(1);

  // Guided Path State
  const [businessType, setBusinessType] = React.useState("");
  const [goals, setGoals] = React.useState<string[]>([]);
  const [budget, setBudget] = React.useState("");

  // Tech Path State
  const [features, setFeatures] = React.useState<WebsiteFeatures>({
    pages: 5,
    hasBlog: false,
    hasGallery: false,
    hasBooking: false,
    hasEcommerce: false,
    hasCustomAPI: false,
  });

  // Common State
  const [hosting, setHosting] = React.useState<HostingOption>("none");
  const [carePlan, setCarePlan] = React.useState<CarePlanOption>("none");

  // Calculate total cost
  const calculateTotal = () => {
    let total = WEBSITE_PRICING.BASE_COST;

    if (path === "tech") {
      // Add feature costs
      if (features.hasBlog) total += WEBSITE_PRICING.BLOG_INTEGRATION;
      if (features.hasGallery) total += WEBSITE_PRICING.GALLERY_PORTFOLIO;
      if (features.hasBooking) total += WEBSITE_PRICING.BOOKING_SYSTEM;
      if (features.hasEcommerce) total += WEBSITE_PRICING.ECOMMERCE;
      if (features.hasCustomAPI) total += WEBSITE_PRICING.CUSTOM_API;
    } else if (path === "guided") {
      // Estimate based on goals
      if (goals.includes("ecommerce")) total += WEBSITE_PRICING.ECOMMERCE;
      if (goals.includes("blog")) total += WEBSITE_PRICING.BLOG_INTEGRATION;
      if (goals.includes("booking")) total += WEBSITE_PRICING.BOOKING_SYSTEM;
      if (goals.includes("portfolio")) total += WEBSITE_PRICING.GALLERY_PORTFOLIO;
    }

    // Add hosting (annual cost shown for reference)
    const hostingCost =
      hosting === "basic"
        ? WEBSITE_PRICING.HOSTING.BASIC.annual
        : hosting === "premium"
        ? WEBSITE_PRICING.HOSTING.PREMIUM.annual
        : 0;

    // Add care plan (monthly cost * 12 for annual)
    const carePlanCost =
      carePlan === "basic"
        ? WEBSITE_PRICING.CARE_PLANS.BASIC.monthly * 12
        : carePlan === "premium"
        ? WEBSITE_PRICING.CARE_PLANS.PREMIUM.monthly * 12
        : 0;

    return {
      websiteCost: total,
      hostingCost,
      carePlanCost,
      total: total + hostingCost + carePlanCost,
    };
  };

  const costs = calculateTotal();

  // Reset calculator
  const resetCalculator = () => {
    setPath(null);
    setStep(1);
    setBusinessType("");
    setGoals([]);
    setBudget("");
    setFeatures({
      pages: 5,
      hasBlog: false,
      hasGallery: false,
      hasBooking: false,
      hasEcommerce: false,
      hasCustomAPI: false,
    });
    setHosting("none");
    setCarePlan("none");
  };

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  if (!path) {
    return (
      <main className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Calculators
            </Link>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
              Website Calculator
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Choose your preferred path to get an accurate quote
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card
              variant="interactive"
              hover
              className="p-8 cursor-pointer"
              onClick={() => setPath("guided")}
            >
              <div className="w-16 h-16 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-center">
                Guided Path
              </h3>
              <p className="text-gray-400 mb-6 text-center">
                Answer a few questions about your business and goals, and we'll
                recommend the best features for you
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-500" />
                  Perfect for beginners
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-500" />
                  Personalized recommendations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-500" />
                  Takes 2-3 minutes
                </li>
              </ul>
              <Button size="lg" className="w-full">
                Start Guided Path
              </Button>
            </Card>

            <Card
              variant="interactive"
              hover
              className="p-8 cursor-pointer"
              onClick={() => setPath("tech")}
            >
              <div className="w-16 h-16 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-center">
                Tech Path
              </h3>
              <p className="text-gray-400 mb-6 text-center">
                Know exactly what you need? Select specific features and get an
                instant quote with transparent pricing
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-500" />
                  For technical users
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-500" />
                  Detailed feature selection
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary-500" />
                  Instant pricing
                </li>
              </ul>
              <Button size="lg" className="w-full">
                Start Tech Path
              </Button>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  if (path === "guided") {
    return (
      <main className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={resetCalculator}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Change Path
            </button>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Step {step} of 4</span>
                <span className="text-sm text-gray-400">{Math.round((step / 4) * 100)}%</span>
              </div>
              <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {step === 1 && (
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-display font-bold mb-4">
                  What type of business do you have?
                </h2>
                <p className="text-gray-400 mb-6">
                  This helps us understand your industry and recommend suitable features
                </p>
                <div className="space-y-3">
                  {[
                    "Restaurant / Cafe",
                    "Retail / E-commerce",
                    "Professional Services",
                    "Healthcare / Wellness",
                    "Education / Training",
                    "Real Estate",
                    "Technology / Software",
                    "Other",
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => setBusinessType(type)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        businessType === type
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full mt-8"
                  disabled={!businessType}
                  onClick={() => setStep(2)}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Continue
                </Button>
              </Card>
            )}

            {step === 2 && (
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-display font-bold mb-4">
                  What are your main goals?
                </h2>
                <p className="text-gray-400 mb-6">
                  Select all that apply. We'll recommend features based on your goals.
                </p>
                <div className="space-y-3">
                  {[
                    { id: "online-presence", label: "Build online presence" },
                    { id: "ecommerce", label: "Sell products online" },
                    { id: "booking", label: "Accept bookings/appointments" },
                    { id: "blog", label: "Share content via blog" },
                    { id: "portfolio", label: "Showcase portfolio/gallery" },
                    { id: "leads", label: "Generate leads" },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                        goals.includes(goal.id)
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span>{goal.label}</span>
                      {goals.includes(goal.id) && (
                        <Check className="w-5 h-5 text-primary-500" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                    leftIcon={<ArrowLeft className="w-5 h-5" />}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={goals.length === 0}
                    onClick={() => setStep(3)}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Continue
                  </Button>
                </div>
              </Card>
            )}

            {step === 3 && (
              <Card variant="default" className="p-8">
                <h2 className="text-3xl font-display font-bold mb-4">
                  What's your budget range?
                </h2>
                <p className="text-gray-400 mb-6">
                  This helps us tailor our recommendations to your budget
                </p>
                <div className="space-y-3">
                  {[
                    { id: "30-50", label: "KES 30,000 - 50,000", desc: "Basic website" },
                    { id: "50-100", label: "KES 50,000 - 100,000", desc: "Professional website" },
                    { id: "100-200", label: "KES 100,000 - 200,000", desc: "Advanced features" },
                    { id: "200+", label: "KES 200,000+", desc: "Full-featured solution" },
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setBudget(range.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        budget === range.id
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="font-medium">{range.label}</div>
                      <div className="text-sm text-gray-400">{range.desc}</div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(2)}
                    leftIcon={<ArrowLeft className="w-5 h-5" />}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={!budget}
                    onClick={() => setStep(4)}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Continue
                  </Button>
                </div>
              </Card>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <Card variant="default" className="p-8">
                  <h2 className="text-3xl font-display font-bold mb-6">
                    Recommended for Your Business
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-500 mt-1" />
                      <div>
                        <div className="font-medium">Base Website</div>
                        <div className="text-sm text-gray-400">5 pages, responsive design, contact forms</div>
                        <div className="text-primary-500 font-mono mt-1">{formatKES(WEBSITE_PRICING.BASE_COST)}</div>
                      </div>
                    </div>

                    {goals.includes("blog") && (
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-500 mt-1" />
                        <div>
                          <div className="font-medium">Blog Integration</div>
                          <div className="text-sm text-gray-400">Share updates and insights</div>
                          <div className="text-primary-500 font-mono mt-1">{formatKES(WEBSITE_PRICING.BLOG_INTEGRATION)}</div>
                        </div>
                      </div>
                    )}

                    {goals.includes("portfolio") && (
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-500 mt-1" />
                        <div>
                          <div className="font-medium">Gallery/Portfolio</div>
                          <div className="text-sm text-gray-400">Showcase your work</div>
                          <div className="text-primary-500 font-mono mt-1">{formatKES(WEBSITE_PRICING.GALLERY_PORTFOLIO)}</div>
                        </div>
                      </div>
                    )}

                    {goals.includes("booking") && (
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-500 mt-1" />
                        <div>
                          <div className="font-medium">Booking System</div>
                          <div className="text-sm text-gray-400">Accept appointments online</div>
                          <div className="text-primary-500 font-mono mt-1">{formatKES(WEBSITE_PRICING.BOOKING_SYSTEM)}</div>
                        </div>
                      </div>
                    )}

                    {goals.includes("ecommerce") && (
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-500 mt-1" />
                        <div>
                          <div className="font-medium">E-commerce</div>
                          <div className="text-sm text-gray-400">Sell products online with cart & payments</div>
                          <div className="text-primary-500 font-mono mt-1">{formatKES(WEBSITE_PRICING.ECOMMERCE)}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between text-2xl font-display font-bold">
                      <span>Website Total</span>
                      <span className="text-primary-500">{formatKES(costs.websiteCost)}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full mt-6"
                    onClick={() => setStep(2)}
                    leftIcon={<ArrowLeft className="w-5 h-5" />}
                  >
                    Adjust Goals
                  </Button>
                </Card>

                {/* Hosting & Care Plans - Same as Tech Path */}
                <Card variant="default" className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-6">
                    Add Hosting & Support
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">Web Hosting (Optional)</h4>
                      <div className="space-y-3">
                        {[
                          { id: "none" as HostingOption, label: "No hosting needed", price: 0 },
                          { id: "basic" as HostingOption, label: "Basic Hosting", price: WEBSITE_PRICING.HOSTING.BASIC.annual, desc: "Perfect for small websites" },
                          { id: "premium" as HostingOption, label: "Premium Hosting", price: WEBSITE_PRICING.HOSTING.PREMIUM.annual, desc: "For high-traffic sites" },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setHosting(option.id)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              hosting === option.id
                                ? "border-primary-500 bg-primary-500/10"
                                : "border-white/10 hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{option.label}</div>
                                {option.desc && (
                                  <div className="text-sm text-gray-400">{option.desc}</div>
                                )}
                              </div>
                              <div className="text-primary-500 font-mono">
                                {option.price > 0 ? `${formatKES(option.price)}/year` : "Free"}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Care Plan (Optional)</h4>
                      <div className="space-y-3">
                        {[
                          { id: "none" as CarePlanOption, label: "No care plan", price: 0 },
                          { id: "basic" as CarePlanOption, label: "Basic Care", price: WEBSITE_PRICING.CARE_PLANS.BASIC.monthly, desc: "Updates & monitoring" },
                          { id: "premium" as CarePlanOption, label: "Premium Care", price: WEBSITE_PRICING.CARE_PLANS.PREMIUM.monthly, desc: "24/7 support" },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setCarePlan(option.id)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              carePlan === option.id
                                ? "border-primary-500 bg-primary-500/10"
                                : "border-white/10 hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{option.label}</div>
                                {option.desc && (
                                  <div className="text-sm text-gray-400">{option.desc}</div>
                                )}
                              </div>
                              <div className="text-primary-500 font-mono">
                                {option.price > 0 ? `${formatKES(option.price)}/month` : "Free"}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Final Quote Summary */}
                <Card variant="highlighted" className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-6">
                    Your Quote Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Website Development</span>
                      <span className="font-mono">{formatKES(costs.websiteCost)}</span>
                    </div>
                    {costs.hostingCost > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Hosting (Annual)</span>
                        <span className="font-mono">{formatKES(costs.hostingCost)}</span>
                      </div>
                    )}
                    {costs.carePlanCost > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Care Plan (Annual)</span>
                        <span className="font-mono">{formatKES(costs.carePlanCost)}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-primary-500/30">
                    <div className="flex items-center justify-between text-3xl font-display font-bold mb-8">
                      <span>Total Investment</span>
                      <span className="text-primary-500">{formatKES(costs.total)}</span>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        size="xl"
                        className="flex-1"
                        rightIcon={<Check className="w-5 h-5" />}
                      >
                        Lock in This Quote
                      </Button>
                      <Button
                        size="xl"
                        variant="outline"
                        onClick={resetCalculator}
                      >
                        Start Over
                      </Button>
                    </div>

                    <p className="text-center text-sm text-gray-400 mt-6">
                      This quote is valid for 30 days. No hidden fees guaranteed.
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Tech Path
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={resetCalculator}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Change Path
          </button>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Build Your Quote
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Select features and see pricing update in real-time
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature Selection */}
            <div className="lg:col-span-2 space-y-6">
              <Card variant="default" className="p-6">
                <h3 className="text-xl font-display font-bold mb-4">
                  Base Website
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Includes responsive design, contact forms, SEO optimization, and up to 5 pages
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-500">✓ Included</span>
                  <span className="font-mono text-lg font-bold">{formatKES(WEBSITE_PRICING.BASE_COST)}</span>
                </div>
              </Card>

              <Card variant="default" className="p-6">
                <h3 className="text-xl font-display font-bold mb-4">
                  Additional Features
                </h3>
                <div className="space-y-4">
                  {[
                    { key: "hasBlog" as keyof WebsiteFeatures, label: "Blog Integration", price: WEBSITE_PRICING.BLOG_INTEGRATION, desc: "Content management system for articles" },
                    { key: "hasGallery" as keyof WebsiteFeatures, label: "Gallery/Portfolio", price: WEBSITE_PRICING.GALLERY_PORTFOLIO, desc: "Showcase images and projects" },
                    { key: "hasBooking" as keyof WebsiteFeatures, label: "Booking System", price: WEBSITE_PRICING.BOOKING_SYSTEM, desc: "Accept appointments online" },
                    { key: "hasEcommerce" as keyof WebsiteFeatures, label: "E-commerce", price: WEBSITE_PRICING.ECOMMERCE, desc: "Shopping cart & payment processing" },
                    { key: "hasCustomAPI" as keyof WebsiteFeatures, label: "Custom API", price: WEBSITE_PRICING.CUSTOM_API, desc: "Backend integrations" },
                  ].map((feature) => (
                    <button
                      key={feature.key}
                      onClick={() =>
                        setFeatures((prev) => ({
                          ...prev,
                          [feature.key]: !prev[feature.key],
                        }))
                      }
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        features[feature.key]
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium flex items-center gap-2">
                            {feature.label}
                            {features[feature.key] && (
                              <Check className="w-4 h-4 text-primary-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {feature.desc}
                          </div>
                        </div>
                        <div className="text-primary-500 font-mono ml-4">
                          +{formatKES(feature.price)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card variant="default" className="p-6">
                <h3 className="text-xl font-display font-bold mb-4">
                  Web Hosting (Optional)
                </h3>
                <div className="space-y-3">
                  {[
                    { id: "none" as HostingOption, label: "I have my own hosting", price: 0 },
                    { id: "basic" as HostingOption, label: "Basic Hosting", price: WEBSITE_PRICING.HOSTING.BASIC.annual, desc: "Up to 10k visits/month" },
                    { id: "premium" as HostingOption, label: "Premium Hosting", price: WEBSITE_PRICING.HOSTING.PREMIUM.annual, desc: "Up to 100k visits/month" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setHosting(option.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        hosting === option.id
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{option.label}</div>
                          {option.desc && (
                            <div className="text-sm text-gray-400">{option.desc}</div>
                          )}
                        </div>
                        <div className="text-primary-500 font-mono">
                          {option.price > 0 ? `${formatKES(option.price)}/year` : ""}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card variant="default" className="p-6">
                <h3 className="text-xl font-display font-bold mb-4">
                  Care Plan (Optional)
                </h3>
                <div className="space-y-3">
                  {[
                    { id: "none" as CarePlanOption, label: "No care plan needed", price: 0 },
                    { id: "basic" as CarePlanOption, label: "Basic Care", price: WEBSITE_PRICING.CARE_PLANS.BASIC.monthly, desc: "Monthly updates & monitoring" },
                    { id: "premium" as CarePlanOption, label: "Premium Care", price: WEBSITE_PRICING.CARE_PLANS.PREMIUM.monthly, desc: "24/7 support & priority fixes" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setCarePlan(option.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        carePlan === option.id
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{option.label}</div>
                          {option.desc && (
                            <div className="text-sm text-gray-400">{option.desc}</div>
                          )}
                        </div>
                        <div className="text-primary-500 font-mono">
                          {option.price > 0 ? `${formatKES(option.price)}/month` : ""}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quote Summary (Sticky) */}
            <div className="lg:col-span-1">
              <Card variant="highlighted" className="p-6 sticky top-24">
                <h3 className="text-xl font-display font-bold mb-6">
                  Your Quote
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Base Website</span>
                    <span className="font-mono">{formatKES(WEBSITE_PRICING.BASE_COST)}</span>
                  </div>

                  {features.hasBlog && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Blog</span>
                      <span className="font-mono">{formatKES(WEBSITE_PRICING.BLOG_INTEGRATION)}</span>
                    </div>
                  )}

                  {features.hasGallery && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Gallery</span>
                      <span className="font-mono">{formatKES(WEBSITE_PRICING.GALLERY_PORTFOLIO)}</span>
                    </div>
                  )}

                  {features.hasBooking && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Booking</span>
                      <span className="font-mono">{formatKES(WEBSITE_PRICING.BOOKING_SYSTEM)}</span>
                    </div>
                  )}

                  {features.hasEcommerce && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">E-commerce</span>
                      <span className="font-mono">{formatKES(WEBSITE_PRICING.ECOMMERCE)}</span>
                    </div>
                  )}

                  {features.hasCustomAPI && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Custom API</span>
                      <span className="font-mono">{formatKES(WEBSITE_PRICING.CUSTOM_API)}</span>
                    </div>
                  )}

                  {costs.hostingCost > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Hosting (Annual)</span>
                      <span className="font-mono">{formatKES(costs.hostingCost)}</span>
                    </div>
                  )}

                  {costs.carePlanCost > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Care Plan (Annual)</span>
                      <span className="font-mono">{formatKES(costs.carePlanCost)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-primary-500/30 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-display font-bold">Total</span>
                    <span className="text-2xl font-display font-bold text-primary-500">
                      {formatKES(costs.total)}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-3"
                  rightIcon={<Check className="w-5 h-5" />}
                >
                  Lock in Quote
                </Button>

                <Button
                  size="md"
                  variant="ghost"
                  className="w-full"
                  onClick={resetCalculator}
                >
                  Start Over
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  No hidden fees • Quote valid 30 days
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
