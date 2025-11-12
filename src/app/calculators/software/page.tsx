"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { SOFTWARE_PRICING } from "@/lib/constants/pricing";
import { trackEvent, trackFunnelStep } from "@/lib/analytics";

type ProjectType = "business_software" | "saas" | "mobile_app" | "audit";
type ProjectStage = "idea" | "designs" | "specs";
type Complexity = "simple" | "medium" | "complex";

interface SoftwareFeatures {
  userAuth: boolean;
  payments: boolean;
  adminDashboard: boolean;
  realtime: boolean;
  apiIntegrations: boolean;
  reporting: boolean;
  multiUser: boolean;
  mobileApp: boolean;
}

export default function SoftwareCalculatorPage() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [projectStage, setProjectStage] = useState<ProjectStage | null>(null);
  const [features, setFeatures] = useState<SoftwareFeatures>({
    userAuth: false,
    payments: false,
    adminDashboard: false,
    realtime: false,
    apiIntegrations: false,
    reporting: false,
    multiUser: false,
    mobileApp: false,
  });
  const [complexity, setComplexity] = useState<Complexity | null>(null);

  // Track calculator usage
  useEffect(() => {
    if (step === 4) {
      // Track calculator completion
      const priceEstimate = getPriceEstimate();
      trackEvent.calculatorCompleted({
        calculatorType: 'software',
        estimatedPrice: priceEstimate.max
      });

      trackFunnelStep('convert', {
        funnel: 'software_calculator',
        value: priceEstimate.max
      });
    } else if (step > 1) {
      // Track calculator usage for each step
      trackEvent.calculatorUsed({
        calculatorType: 'software',
        step: step,
        totalSteps: 4
      });
    }
  }, [step]);

  // Calculate complexity score based on features
  const calculateComplexity = (): Complexity => {
    const featureCount = Object.values(features).filter(Boolean).length;

    if (featureCount <= 2) return "simple";
    if (featureCount <= 5) return "medium";
    return "complex";
  };

  // Get price estimate based on complexity
  const getPriceEstimate = (): { min: number; max: number } => {
    const calc = calculateComplexity();

    if (calc === "simple") {
      return { min: SOFTWARE_PRICING.TIER_1_MIN, max: SOFTWARE_PRICING.TIER_1_MAX };
    }
    if (calc === "medium") {
      return { min: SOFTWARE_PRICING.TIER_2_MIN, max: SOFTWARE_PRICING.TIER_2_MAX };
    }
    return { min: SOFTWARE_PRICING.TIER_3_MIN, max: 5000000 };
  };

  const formatKES = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const toggleFeature = (feature: keyof SoftwareFeatures) => {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const projectTypes = [
    {
      id: "business_software" as ProjectType,
      title: "Business Software",
      description: "Internal tools, CRM, ERP, inventory systems",
      icon: "💼",
    },
    {
      id: "saas" as ProjectType,
      title: "SaaS Application",
      description: "Subscription-based software service",
      icon: "☁️",
    },
    {
      id: "mobile_app" as ProjectType,
      title: "Mobile Application",
      description: "iOS/Android native or cross-platform app",
      icon: "📱",
    },
    {
      id: "audit" as ProjectType,
      title: "Software Audit",
      description: "Review existing software, identify issues",
      icon: "🔍",
    },
  ];

  const projectStages = [
    {
      id: "idea" as ProjectStage,
      title: "Just an Idea",
      description: "I have a concept but need help planning",
      multiplier: 1.2,
    },
    {
      id: "designs" as ProjectStage,
      title: "Designs Ready",
      description: "I have mockups/wireframes prepared",
      multiplier: 1.0,
    },
    {
      id: "specs" as ProjectStage,
      title: "Full Specifications",
      description: "I have detailed technical requirements",
      multiplier: 0.9,
    },
  ];

  const featuresList = [
    { key: "userAuth", label: "User Authentication & Accounts", points: 2 },
    { key: "payments", label: "Payment Processing & Subscriptions", points: 3 },
    { key: "adminDashboard", label: "Admin Dashboard & Management", points: 2 },
    { key: "realtime", label: "Real-time Features (Chat, Notifications)", points: 3 },
    { key: "apiIntegrations", label: "Third-party API Integrations", points: 2 },
    { key: "reporting", label: "Analytics & Reporting", points: 2 },
    { key: "multiUser", label: "Multi-user Collaboration", points: 2 },
    { key: "mobileApp", label: "Mobile App (iOS/Android)", points: 3 },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              href="/calculators"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Link>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
              Software Development Calculator
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Get a ballpark estimate for your custom software project
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full transition-colors ${
                  s <= step ? "bg-primary-500" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Project Type */}
          {step === 1 && (
            <div className="space-y-6">
              <Card variant="default" className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">What type of project do you have?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setProjectType(type.id);
                          if (type.id === "audit") {
                            setStep(4); // Skip to results for audit
                          } else {
                            setStep(2);
                          }
                        }}
                        className={`p-6 rounded-lg border-2 transition-all text-left ${
                          projectType === type.id
                            ? "border-primary-500 bg-primary-500/10"
                            : "border-white/10 hover:border-primary-500/50 bg-white/5"
                        }`}
                      >
                        <div className="text-4xl mb-3">{type.icon}</div>
                        <h3 className="font-display font-bold text-lg mb-2">{type.title}</h3>
                        <p className="text-gray-400 text-sm">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Project Stage */}
          {step === 2 && (
            <div className="space-y-6">
              <Card variant="default" className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">What stage is your project at?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectStages.map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => {
                          setProjectStage(stage.id);
                          setStep(3);
                        }}
                        className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                          projectStage === stage.id
                            ? "border-primary-500 bg-primary-500/10"
                            : "border-white/10 hover:border-primary-500/50 bg-white/5"
                        }`}
                      >
                        <h3 className="font-display font-bold text-lg mb-2">{stage.title}</h3>
                        <p className="text-gray-400 text-sm">{stage.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button variant="ghost" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Features Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <Card variant="default" className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Select the features you need</CardTitle>
                  <p className="text-gray-400 mt-2">Choose all that apply</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {featuresList.map((feature) => (
                      <button
                        key={feature.key}
                        onClick={() => toggleFeature(feature.key as keyof SoftwareFeatures)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                          features[feature.key as keyof SoftwareFeatures]
                            ? "border-primary-500 bg-primary-500/10"
                            : "border-white/10 hover:border-primary-500/50 bg-white/5"
                        }`}
                      >
                        <span className="font-medium">{feature.label}</span>
                        {features[feature.key as keyof SoftwareFeatures] && (
                          <CheckCircle2 className="w-5 h-5 text-primary-500" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <Button variant="ghost" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button onClick={() => setStep(4)}>
                      Get Estimate
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="space-y-6">
              {projectType === "audit" ? (
                // Software Audit Result
                <Card variant="highlighted" className="p-8">
                  <CardHeader>
                    <CardTitle className="text-3xl">Software Audit Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-sm text-gray-400 mb-2">Fixed Price</div>
                      <div className="text-4xl font-display font-bold text-primary-500">
                        {formatKES(SOFTWARE_PRICING.TECHNICAL_AUDIT)}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-display font-bold text-xl">What's Included:</h3>
                      <ul className="space-y-3">
                        {[
                          "Comprehensive code review",
                          "Security vulnerability assessment",
                          "Performance analysis",
                          "Architecture evaluation",
                          "Best practices review",
                          "Detailed report with recommendations",
                          "1-hour consultation to discuss findings",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button size="lg" className="flex-1" asChild>
                        <Link href="/contact">Book Audit</Link>
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => setStep(1)}>
                        Start Over
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Software Development Estimate
                <>
                  <Card variant="highlighted" className="p-8">
                    <CardHeader>
                      <CardTitle className="text-3xl">Your Ballpark Estimate</CardTitle>
                      <p className="text-gray-400 mt-2">Based on your selections</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-sm text-gray-400 mb-2">Estimated Project Cost</div>
                        <div className="text-4xl font-display font-bold text-primary-500">
                          {formatKES(getPriceEstimate().min)} - {formatKES(getPriceEstimate().max)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-white/5">
                          <div className="text-sm text-gray-400 mb-1">Project Type</div>
                          <div className="font-medium capitalize">
                            {projectType?.replace("_", " ")}
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5">
                          <div className="text-sm text-gray-400 mb-1">Complexity</div>
                          <div className="font-medium capitalize">{calculateComplexity()}</div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5">
                          <div className="text-sm text-gray-400 mb-1">Features Selected</div>
                          <div className="font-medium">
                            {Object.values(features).filter(Boolean).length}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-lg bg-primary-500/10 border border-primary-500/20">
                        <div className="flex items-start gap-4">
                          <Lightbulb className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-display font-bold text-lg mb-2">
                              Why is this a range?
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                              Software projects vary based on design complexity, integrations,
                              and specific requirements. To give you an accurate quote, we
                              recommend our Discovery Phase.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="default" className="p-8">
                    <CardHeader>
                      <CardTitle className="text-2xl">Next Step: Discovery Phase</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-baseline gap-4">
                        <div className="text-3xl font-display font-bold text-primary-500">
                          {formatKES(SOFTWARE_PRICING.DISCOVERY_PHASE)}
                        </div>
                        <div className="text-gray-400">One-time investment</div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-display font-bold text-xl">What You Get:</h3>
                        <ul className="space-y-3">
                          {[
                            "Detailed project scope and requirements",
                            "Technical architecture design",
                            "User experience (UX) planning",
                            "Accurate fixed-price quote",
                            "Project timeline and milestones",
                            "Risk assessment and mitigation plan",
                            "Technology stack recommendation",
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-sm text-gray-300">
                          💡 <strong>Good to know:</strong> The Discovery Phase fee is deducted
                          from your final project cost if you proceed with Novyrix.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button size="lg" className="flex-1" asChild>
                          <Link href="/contact">Book Discovery Phase</Link>
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => setStep(1)}>
                          Start Over
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
