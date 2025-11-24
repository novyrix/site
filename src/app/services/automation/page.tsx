"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Workflow, Zap, Clock, DollarSign, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AutomationPage() {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Save 20+ Hours Weekly",
      description: "Automate repetitive tasks that eat up your team's time. Focus on high-value work that grows your business."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Reduce Operational Costs",
      description: "Cut manual labor costs by up to 70%. One-time automation investment pays for itself in months."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Zero Human Error",
      description: "Eliminate mistakes from manual data entry and processing. Your workflows run perfectly every time."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scale Without Hiring",
      description: "Handle 10x more volume without adding headcount. Your automations scale instantly."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "24/7 Operations",
      description: "Workflows run around the clock, even when your team is offline. Never miss a lead or customer request."
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Seamless Integration",
      description: "Connect all your tools: CRM, email, sheets, databases. Data flows automatically between systems."
    }
  ];

  const useCases = [
    {
      title: "Lead Management Automation",
      problem: "Manually entering leads from web forms into CRM, sending follow-ups, and updating spreadsheets.",
      solution: "Automatic lead capture, instant CRM entry, personalized email sequences, and real-time reporting.",
      results: ["5 hours saved daily", "50% faster response time", "30% increase in conversions"]
    },
    {
      title: "Invoice & Payment Processing",
      problem: "Creating invoices manually, tracking payments, sending reminders, reconciling accounts.",
      solution: "Auto-generate invoices on project completion, send to clients, track payments, update accounting software.",
      results: ["15 hours saved weekly", "Faster payment collection", "Zero reconciliation errors"]
    },
    {
      title: "Customer Onboarding",
      problem: "Manual welcome emails, account setup, document collection, and team notifications.",
      solution: "Automated welcome sequence, account provisioning, document requests, and stakeholder alerts.",
      results: ["10x faster onboarding", "Consistent experience", "90% less manual work"]
    },
    {
      title: "Report Generation",
      problem: "Pulling data from multiple sources, creating reports, and distributing to stakeholders weekly.",
      solution: "Scheduled data aggregation, automated report generation, and distribution to relevant teams.",
      results: ["8 hours saved weekly", "Real-time insights", "100% data accuracy"]
    }
  ];

  const integrations = [
    { name: "Google Workspace", description: "Gmail, Sheets, Drive, Calendar" },
    { name: "Microsoft 365", description: "Outlook, Excel, Teams, SharePoint" },
    { name: "Salesforce", description: "CRM data sync and automation" },
    { name: "HubSpot", description: "Marketing and sales workflows" },
    { name: "Slack/Teams", description: "Notifications and approvals" },
    { name: "QuickBooks", description: "Accounting automation" },
    { name: "Stripe/PayPal", description: "Payment processing" },
    { name: "Zapier/Make", description: "Third-party integrations" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="text-primary-400 text-sm font-medium">Workflow Automation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Eliminate Busy Work, <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Amplify Results</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Stop wasting hours on repetitive tasks. We connect your apps (CRM, Email, Sheets, Database) and make them work together automatically. Save 20+ hours weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
              Automate Your Workflows
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-700 hover:border-primary-500">
              See What's Possible
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Why Automate?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-neutral-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Real Automation Examples
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
            See how businesses like yours are saving hours daily with smart automation.
          </p>
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-all"
              >
                <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-2">❌ Before (Manual)</h4>
                    <p className="text-neutral-400">{useCase.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-2">✅ After (Automated)</h4>
                    <p className="text-neutral-400">{useCase.solution}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {useCase.results.map((result, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm border border-primary-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Connect Everything
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
            We integrate with the tools you already use. No need to switch platforms.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-colors text-center"
              >
                <h3 className="font-semibold mb-1">{integration.name}</h3>
                <p className="text-sm text-neutral-500">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Reclaim Your Time?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Let's identify the workflows slowing you down and build automation that saves 20+ hours weekly.
          </p>
          <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
            Start Automating Today
          </Button>
        </div>
      </section>
    </div>
  );
}
