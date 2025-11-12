"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { trackEvent, trackFunnelStep } from "@/lib/analytics";

type BusinessArea = "sales" | "operations" | "marketing" | "hr" | "finance" | "customer_service";
type ToolCategory = "paper" | "spreadsheets" | "digital_tools" | "advanced";
type TimeInvestment = "1-5" | "5-15" | "15-30" | "30+";

interface AutomationData {
  businessArea: BusinessArea | null;
  toolCategory: ToolCategory | null;
  hoursPerWeek: TimeInvestment | null;
  specificTools: string[];
}

export default function AutomationCalculatorPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AutomationData>({
    businessArea: null,
    toolCategory: null,
    hoursPerWeek: null,
    specificTools: [],
  });

  // Track calculator usage
  useEffect(() => {
    if (step === 4) {
      // Track calculator completion
      const roi = calculateROI();
      trackEvent.calculatorCompleted({
        calculatorType: 'automation',
        estimatedPrice: roi.potentialSavings || 0
      });

      trackFunnelStep('convert', {
        funnel: 'automation_calculator',
        value: roi.potentialSavings || 0
      });
    } else if (step > 1) {
      // Track calculator usage for each step
      trackEvent.calculatorUsed({
        calculatorType: 'automation',
        step: step,
        totalSteps: 4
      });
    }
  }, [step]);

  // Calculate ROI and qualification
  const calculateROI = () => {
    if (!data.hoursPerWeek) return { hoursPerMonth: 0, kshValue: 0, savingsPercentage: 0 };

    const hourRanges: Record<TimeInvestment, number> = {
      "1-5": 3,
      "5-15": 10,
      "15-30": 22,
      "30+": 40,
    };

    const hoursPerWeek = hourRanges[data.hoursPerWeek];
    const hoursPerMonth = hoursPerWeek * 4;

    // Assume KES 2,000 per hour value (conservative estimate)
    const hourlyValue = 2000;
    const kshValue = hoursPerMonth * hourlyValue;

    // Automation typically saves 60-80% of manual time
    const savingsPercentage = 70;

    return {
      hoursPerMonth,
      kshValue,
      savingsPercentage,
      potentialSavings: (kshValue * savingsPercentage) / 100,
    };
  };

  const qualifyLead = (): "high" | "medium" | "foundation" => {
    if (!data.hoursPerWeek || !data.toolCategory) return "foundation";

    const highTimeInvestment = data.hoursPerWeek === "15-30" || data.hoursPerWeek === "30+";
    const goodToolFoundation =
      data.toolCategory === "digital_tools" || data.toolCategory === "advanced";

    if (highTimeInvestment && goodToolFoundation) return "high";
    if (
      (data.hoursPerWeek === "5-15" && goodToolFoundation) ||
      (highTimeInvestment && data.toolCategory === "spreadsheets")
    )
      return "medium";

    return "foundation";
  };

  const formatKES = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const businessAreas = [
    {
      id: "sales" as BusinessArea,
      title: "Sales & Lead Management",
      description: "Lead tracking, follow-ups, pipeline management",
      icon: "📊",
    },
    {
      id: "operations" as BusinessArea,
      title: "Operations & Workflow",
      description: "Task management, approvals, inventory",
      icon: "⚙️",
    },
    {
      id: "marketing" as BusinessArea,
      title: "Marketing & Campaigns",
      description: "Email marketing, social media, analytics",
      icon: "📢",
    },
    {
      id: "hr" as BusinessArea,
      title: "HR & Employee Management",
      description: "Onboarding, time tracking, payroll",
      icon: "👥",
    },
    {
      id: "finance" as BusinessArea,
      title: "Finance & Accounting",
      description: "Invoicing, expenses, reporting",
      icon: "💰",
    },
    {
      id: "customer_service" as BusinessArea,
      title: "Customer Support",
      description: "Ticket management, responses, feedback",
      icon: "💬",
    },
  ];

  const toolCategories = [
    {
      id: "paper" as ToolCategory,
      title: "Paper & Email Only",
      description: "Manual processes, paper forms, email communication",
      score: 1,
    },
    {
      id: "spreadsheets" as ToolCategory,
      title: "Spreadsheets (Excel/Google Sheets)",
      description: "Using spreadsheets to track and manage data",
      score: 2,
    },
    {
      id: "digital_tools" as ToolCategory,
      title: "Digital Tools (CRM, Project Management)",
      description: "Using specific software but manual data entry",
      score: 3,
    },
    {
      id: "advanced" as ToolCategory,
      title: "Advanced Software",
      description: "Multiple integrated systems, looking to optimize",
      score: 4,
    },
  ];

  const timeInvestments = [
    {
      id: "1-5" as TimeInvestment,
      title: "1-5 hours per week",
      description: "Small amount of repetitive tasks",
    },
    {
      id: "5-15" as TimeInvestment,
      title: "5-15 hours per week",
      description: "Moderate time on manual processes",
    },
    {
      id: "15-30" as TimeInvestment,
      title: "15-30 hours per week",
      description: "Significant time on repetitive work",
    },
    {
      id: "30+" as TimeInvestment,
      title: "30+ hours per week",
      description: "Most of my time is manual work",
    },
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
              Workflow Automation Calculator
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Discover how much time and money you could save with automation
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

          {/* Step 1: Business Area */}
          {step === 1 && (
            <div className="space-y-6">
              <Card variant="default" className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Which business area needs automation?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {businessAreas.map((area) => (
                      <button
                        key={area.id}
                        onClick={() => {
                          setData({ ...data, businessArea: area.id });
                          setStep(2);
                        }}
                        className={`p-6 rounded-lg border-2 transition-all text-left ${
                          data.businessArea === area.id
                            ? "border-primary-500 bg-primary-500/10"
                            : "border-white/10 hover:border-primary-500/50 bg-white/5"
                        }`}
                      >
                        <div className="text-4xl mb-3">{area.icon}</div>
                        <h3 className="font-display font-bold text-lg mb-2">{area.title}</h3>
                        <p className="text-gray-400 text-sm">{area.description}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Current Tools */}
          {step === 2 && (
            <div className="space-y-6">
              <Card variant="default" className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    What tools are you currently using?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {toolCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setData({ ...data, toolCategory: category.id });
                          setStep(3);
                        }}
                        className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                          data.toolCategory === category.id
                            ? "border-primary-500 bg-primary-500/10"
                            : "border-white/10 hover:border-primary-500/50 bg-white/5"
                        }`}
                      >
                        <h3 className="font-display font-bold text-lg mb-2">{category.title}</h3>
                        <p className="text-gray-400 text-sm">{category.description}</p>
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

          {/* Step 3: Time Investment */}
          {step === 3 && (
            <div className="space-y-6">
              <Card variant="default" className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    How much time do you spend on manual tasks?
                  </CardTitle>
                  <p className="text-gray-400 mt-2">Per week in this area</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeInvestments.map((time) => (
                      <button
                        key={time.id}
                        onClick={() => {
                          setData({ ...data, hoursPerWeek: time.id });
                          setStep(4);
                        }}
                        className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                          data.hoursPerWeek === time.id
                            ? "border-primary-500 bg-primary-500/10"
                            : "border-white/10 hover:border-primary-500/50 bg-white/5"
                        }`}
                      >
                        <h3 className="font-display font-bold text-lg mb-2">{time.title}</h3>
                        <p className="text-gray-400 text-sm">{time.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button variant="ghost" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="space-y-6">
              {/* ROI Projection */}
              <Card variant="highlighted" className="p-8">
                <CardHeader>
                  <CardTitle className="text-3xl">Your Automation Potential</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                      <Clock className="w-8 h-8 text-primary-500 mb-3" />
                      <div className="text-sm text-gray-400 mb-2">Time Spent Monthly</div>
                      <div className="text-3xl font-display font-bold">
                        {calculateROI().hoursPerMonth} hours
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                      <Zap className="w-8 h-8 text-primary-500 mb-3" />
                      <div className="text-sm text-gray-400 mb-2">Potential Savings</div>
                      <div className="text-3xl font-display font-bold text-primary-500">
                        {calculateROI().savingsPercentage}%
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                      <Target className="w-8 h-8 text-primary-500 mb-3" />
                      <div className="text-sm text-gray-400 mb-2">Monthly Value</div>
                      <div className="text-3xl font-display font-bold">
                        {formatKES(calculateROI().potentialSavings || 0)}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-primary-500/10 border border-primary-500/20">
                    <p className="text-gray-300 leading-relaxed">
                      Based on your inputs, you could save approximately{" "}
                      <strong className="text-primary-500">
                        {calculateROI().hoursPerMonth * 0.7} hours per month
                      </strong>{" "}
                      (worth {formatKES(calculateROI().potentialSavings || 0)}) through workflow
                      automation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="text-sm text-gray-400 mb-1">Business Area</div>
                      <div className="font-medium capitalize">
                        {data.businessArea?.replace("_", " ")}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="text-sm text-gray-400 mb-1">Current Setup</div>
                      <div className="font-medium capitalize">
                        {toolCategories.find((t) => t.id === data.toolCategory)?.title}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="text-sm text-gray-400 mb-1">Priority</div>
                      <div className="font-medium capitalize">{qualifyLead()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendation */}
              <Card variant="default" className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {qualifyLead() === "high"
                      ? "🎯 You're Ready for Automation!"
                      : qualifyLead() === "medium"
                      ? "✨ Great Opportunity for Automation"
                      : "🌱 Let's Build Your Foundation"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {qualifyLead() === "high" && (
                    <>
                      <p className="text-gray-300 leading-relaxed">
                        Your business is at the perfect stage for automation. With{" "}
                        {calculateROI().hoursPerMonth} hours spent monthly on manual tasks and
                        existing digital tools, we can create immediate impact.
                      </p>

                      <div className="p-6 rounded-lg bg-primary-500/10 border border-primary-500/20">
                        <h3 className="font-display font-bold text-xl mb-4">
                          Free 30-Minute Automation Audit
                        </h3>
                        <ul className="space-y-3">
                          {[
                            "Identify your biggest automation opportunities",
                            "Map your current workflow",
                            "Recommend specific tools & integrations",
                            "Estimate ROI and implementation timeline",
                            "No obligation, just expert advice",
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {qualifyLead() === "medium" && (
                    <>
                      <p className="text-gray-300 leading-relaxed">
                        You have good potential for automation. With some strategic improvements to
                        your current setup, we can help you save significant time and reduce
                        errors.
                      </p>

                      <div className="p-6 rounded-lg bg-primary-500/10 border border-primary-500/20">
                        <h3 className="font-display font-bold text-xl mb-4">
                          Free Automation Consultation
                        </h3>
                        <ul className="space-y-3">
                          {[
                            "Review your current processes",
                            "Identify quick wins and long-term opportunities",
                            "Recommend automation tools for your industry",
                            "Create a phased implementation plan",
                            "Get started with highest-impact automations",
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {qualifyLead() === "foundation" && (
                    <>
                      <p className="text-gray-300 leading-relaxed">
                        Before diving into automation, let's establish a strong digital foundation.
                        We'll help you implement the right tools and processes that set you up for
                        successful automation in the future.
                      </p>

                      <div className="p-6 rounded-lg bg-primary-500/10 border border-primary-500/20">
                        <h3 className="font-display font-bold text-xl mb-4">
                          Free Foundation Consultation
                        </h3>
                        <ul className="space-y-3">
                          {[
                            "Assess your current workflows",
                            "Recommend foundational digital tools",
                            "Create a roadmap from manual to automated",
                            "Identify low-cost, high-impact improvements",
                            "Prepare your team for digital transformation",
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button size="lg" className="flex-1" asChild>
                      <Link href="/contact">
                        {qualifyLead() === "high"
                          ? "Book Free Audit"
                          : "Book Free Consultation"}
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setStep(1)}>
                      Start Over
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
