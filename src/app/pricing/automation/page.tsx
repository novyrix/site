import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap, Code2, Database, DollarSign, Clock, TrendingUp, X, Smartphone, Cloud, Shield, RefreshCw } from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export const metadata = {
  title: 'Workflow Automation Pricing | Novyrix',
  description: 'Transparent pricing for workflow automation, API integration, and process automation services.',
};

export default function AutomationPricingPage() {
  const tiers = [
    {
      name: "Starter Automation",
      price: "20,000",
      subtitle: "Simple automation workflows",
      description: "Automate basic repetitive tasks and connect simple systems",
      features: [
        "Up to 2 system integrations",
        "Email automation",
        "Form submission handling",
        "Data export/import automation",
        "Basic scheduling tasks",
        "Webhook setup",
        "Documentation included",
        "1 month support"
      ],
      notIncluded: [
        "Complex API integrations",
        "Real-time data sync",
        "Custom dashboards"
      ],
      ideal: ["Small businesses", "Simple workflows", "Email automation", "Basic data sync"],
      deliveryTime: "2-3 weeks",
      examples: [
        "Auto-respond to form submissions",
        "Daily report generation",
        "File backup automation",
        "Social media posting"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Business Automation",
      price: "60,000",
      subtitle: "Advanced workflow automation",
      description: "Connect multiple systems with complex automation logic",
      features: [
        "Up to 5 system integrations",
        "M-Pesa payment integration",
        "KRA eTIMS integration",
        "CRM/ERP integration",
        "Real-time data sync",
        "Custom API development",
        "Error handling & logging",
        "Admin dashboard",
        "3 months support",
        "Training included"
      ],
      notIncluded: [
        "Advanced AI/ML features",
        "Multi-region deployment"
      ],
      ideal: ["Growing businesses", "E-commerce", "Multiple integrations", "Payment automation"],
      deliveryTime: "4-6 weeks",
      examples: [
        "M-Pesa to accounting sync",
        "KRA eTIMS invoice automation",
        "Inventory management sync",
        "Order processing automation"
      ],
      cta: "Most Popular",
      highlighted: true
    },
    {
      name: "Enterprise Automation",
      price: "Custom",
      subtitle: "Complete automation solutions",
      description: "End-to-end workflow automation with advanced features",
      features: [
        "Unlimited integrations",
        "Custom workflow engine",
        "Real-time monitoring",
        "Advanced error recovery",
        "Multi-region support",
        "API rate limiting",
        "Performance analytics",
        "Custom SLAs",
        "Dedicated support",
        "6 months support",
        "Ongoing optimization",
        "Priority updates"
      ],
      notIncluded: [],
      ideal: ["Large enterprises", "Complex workflows", "Mission-critical automation", "Multi-location"],
      deliveryTime: "8+ weeks",
      examples: [
        "Multi-branch POS sync",
        "Supply chain automation",
        "Advanced payment routing",
        "Enterprise resource planning"
      ],
      cta: "Contact Us",
      highlighted: false
    }
  ];

  const integrations = [
    {
      name: "M-Pesa Integration",
      price: "From KES 25,000",
      description: "STK Push, B2C, B2B, payment notifications",
      features: [
        "STK Push (Lipa na M-Pesa)",
        "B2C payments",
        "Payment confirmations",
        "Transaction reconciliation",
        "Testing environment"
      ],
      icon: <Smartphone className="w-6 h-6" />,
      timeline: "2-3 weeks",
      recurring: false
    },
    {
      name: "KRA eTIMS Integration",
      price: "From KES 30,000",
      description: "Automated tax invoice submission",
      features: [
        "Invoice generation",
        "Automatic submission",
        "Credit note handling",
        "Compliance reporting",
        "Stock management sync"
      ],
      icon: <Database className="w-6 h-6" />,
      timeline: "3-4 weeks",
      recurring: false
    },
    {
      name: "Google Workspace Automation",
      price: "From KES 20,000",
      description: "Drive, Sheets, Docs, Calendar automation",
      features: [
        "File sync & backup",
        "Sheet data processing",
        "Calendar automation",
        "Email workflows",
        "Document generation"
      ],
      icon: <Cloud className="w-6 h-6" />,
      timeline: "2-3 weeks",
      recurring: false
    },
    {
      name: "CRM/ERP Integration",
      price: "From KES 40,000",
      description: "Connect with Salesforce, Odoo, SAP, etc.",
      features: [
        "Two-way data sync",
        "Customer data mapping",
        "Order processing",
        "Inventory updates",
        "Custom field mapping"
      ],
      icon: <RefreshCw className="w-6 h-6" />,
      timeline: "4-6 weeks",
      recurring: false
    },
    {
      name: "Payment Gateway Integration",
      price: "From KES 30,000",
      description: "Stripe, PayPal, Flutterwave, Pesapal",
      features: [
        "Payment processing",
        "Webhook handling",
        "Subscription management",
        "Refund automation",
        "Multi-currency support"
      ],
      icon: <DollarSign className="w-6 h-6" />,
      timeline: "2-3 weeks",
      recurring: false
    },
    {
      name: "Custom API Integration",
      price: "From KES 35,000",
      description: "Any third-party API or custom system",
      features: [
        "API documentation analysis",
        "Authentication setup",
        "Data transformation",
        "Error handling",
        "Rate limiting"
      ],
      icon: <Code2 className="w-6 h-6" />,
      timeline: "3-5 weeks",
      recurring: false
    }
  ];

  const roiExamples = [
    {
      scenario: "Manual Invoice Entry",
      before: "5 hours/week manually entering invoices",
      after: "Automated eTIMS submission",
      timeSaved: "20 hours/month",
      costSaved: "KES 30,000/month",
      payback: "1 month"
    },
    {
      scenario: "Payment Reconciliation",
      before: "8 hours/week matching M-Pesa to orders",
      after: "Auto-match payments to invoices",
      timeSaved: "32 hours/month",
      costSaved: "KES 48,000/month",
      payback: "1.5 months"
    },
    {
      scenario: "Inventory Management",
      before: "Manual stock updates across systems",
      after: "Real-time sync between POS and accounting",
      timeSaved: "15 hours/month",
      costSaved: "KES 22,500/month",
      payback: "2.5 months"
    },
    {
      scenario: "Report Generation",
      before: "3 hours/day compiling reports manually",
      after: "Automated daily reports via email",
      timeSaved: "60 hours/month",
      costSaved: "KES 90,000/month",
      payback: "Less than 1 month"
    }
  ];

  const pricingModels = [
    {
      model: "One-Time Development",
      description: "Pay once for the automation setup",
      bestFor: "Simple integrations, one-way sync, scheduled tasks",
      priceRange: "KES 20,000 - 150,000",
      ongoing: "Optional maintenance packages available"
    },
    {
      model: "Monthly Subscription",
      description: "Ongoing support, monitoring, and updates",
      bestFor: "Mission-critical automation, real-time sync, high-volume",
      priceRange: "From KES 10,000/month",
      ongoing: "Includes hosting, monitoring, updates, support"
    },
    {
      model: "Hybrid Model",
      description: "Initial development + ongoing maintenance",
      bestFor: "Most businesses - stable automation with peace of mind",
      priceRange: "Development + KES 5,000-15,000/month",
      ongoing: "Covers bug fixes, minor updates, technical support"
    }
  ];

  const faqs = [
    {
      question: "How is automation pricing calculated?",
      answer: "Pricing depends on complexity: number of systems to integrate, data volume, real-time vs scheduled, custom logic requirements, and error handling needs. We provide detailed quotes after understanding your specific workflow."
    },
    {
      question: "What's the difference between one-time and monthly pricing?",
      answer: "One-time covers development and setup. Monthly includes hosting, monitoring, updates, and support. For critical automations or high-volume integrations, monthly ensures reliability and immediate issue resolution."
    },
    {
      question: "How long does M-Pesa integration take?",
      answer: "Basic M-Pesa STK Push integration takes 2-3 weeks including testing. More complex scenarios (B2C, B2B, multi-account) may take longer. We handle all Safaricom onboarding requirements."
    },
    {
      question: "Can you integrate with our existing software?",
      answer: "Most likely yes! We work with ERPs (Odoo, SAP), CRMs (Salesforce, HubSpot), POS systems, custom software, and any system with an API. We'll assess feasibility during discovery."
    },
    {
      question: "What if an integration breaks?",
      answer: "With monthly support, we monitor 24/7 and fix issues immediately. For one-time projects, you can purchase ad-hoc support or upgrade to a maintenance package anytime."
    },
    {
      question: "Do you handle KRA eTIMS compliance?",
      answer: "Yes! We specialize in KRA eTIMS integration, ensuring full compliance with tax regulations. We handle invoice generation, submission, credit notes, and reporting requirements."
    },
    {
      question: "Can automation scale as our business grows?",
      answer: "Absolutely! We build scalable solutions that grow with you. Whether handling 100 or 100,000 transactions, our architecture adapts. We also provide performance optimization as needed."
    },
    {
      question: "What happens to our data?",
      answer: "Your data security is paramount. We implement encryption, secure APIs, and follow best practices. You retain full ownership of all data. We can sign NDAs and comply with data protection regulations."
    },
    {
      question: "Can we start small and expand automation later?",
      answer: "Yes! Many clients start with one integration (e.g., M-Pesa) and expand as they see ROI. We design modular solutions that allow easy addition of new integrations without rebuilding."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <section className="relative py-32 bg-black bg-grid-white/[0.02] border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-4">
              <Zap className="w-4 h-4" />
              <span>Workflow Automation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Automation <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Pricing</span>
            </h1>

            <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Save time and reduce errors with intelligent automation. Clear pricing for integrations and workflows.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link href="/#contact">
                <HoverBorderGradient>
                  Get a Custom Quote
                </HoverBorderGradient>
              </Link>
              <Link href="/portfolio">
                <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 font-medium">
                  View Examples
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-black bg-grid-white/[0.02] border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Calculate Your <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">ROI</span>
            </h2>
            <p className="text-neutral-400 text-lg">Real examples of time and cost savings</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {roiExamples.map((example, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-primary-400">{example.scenario}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-400">Before</p>
                      <p className="text-neutral-200">{example.before}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-400">After</p>
                      <p className="text-neutral-200">{example.after}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">Time Saved</p>
                    <p className="text-lg font-bold text-primary-400">{example.timeSaved}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">Cost Saved</p>
                    <p className="text-lg font-bold text-green-400">{example.costSaved}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-neutral-400 mb-1">Payback Period</p>
                    <p className="text-base font-bold text-neutral-200">{example.payback}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2 text-primary-400">Average ROI: 3-6 months</h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Most businesses recoup their automation investment within 3-6 months through time savings, reduced errors, and improved efficiency. The ROI continues to compound over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Automation Packages</h2>
            <p className="text-neutral-400 text-lg">Choose based on your complexity needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl p-8 border ${
                  tier.highlighted
                    ? 'border-primary-500/50 bg-gradient-to-b from-primary-500/5 to-black'
                    : 'border-white/10 bg-black/50'
                } backdrop-blur-sm`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-black text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-neutral-400 text-sm mb-4">{tier.subtitle}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                      {tier.price === "Custom" ? "Custom" : `KES ${tier.price}`}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-neutral-400 text-sm">starting</span>
                    )}
                  </div>
                </div>

                <p className="text-neutral-300 text-sm mb-6 leading-relaxed">{tier.description}</p>

                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 mb-3 font-semibold">What's Included</p>
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.notIncluded.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 mb-3 font-semibold">Not Included</p>
                      <ul className="space-y-2">
                        {tier.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-500">
                            <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Use Cases</p>
                    <div className="space-y-1.5">
                      {tier.examples.map((example, i) => (
                        <p key={i} className="text-xs text-neutral-400">• {example}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Ideal For</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.ideal.map((item, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-neutral-400">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary-400" />
                      <span className="text-neutral-300">Delivery: {tier.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                <Link href="/#contact" className="block w-full">
                  <button
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                      tier.highlighted
                        ? 'bg-primary-500 hover:bg-primary-600 text-black'
                        : 'border border-white/10 hover:border-primary-500/30 text-white'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Integrations */}
      <section className="py-20 bg-black bg-grid-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Popular <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Integrations</span>
            </h2>
            <p className="text-neutral-400 text-lg">Add-on integrations to any package</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {integrations.map((integration, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 text-primary-400">
                  {integration.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{integration.name}</h3>
                <p className="text-primary-400 font-semibold text-sm mb-3">{integration.price}</p>
                <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{integration.description}</p>

                <ul className="space-y-2 mb-4">
                  {integration.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Clock className="w-4 h-4" />
                    <span>Timeline: {integration.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing Models</h2>
            <p className="text-neutral-400 text-lg">Choose the payment structure that works for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingModels.map((model, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 border ${
                  model.model === "Hybrid Model"
                    ? 'border-primary-500/50 bg-gradient-to-b from-primary-500/5 to-black'
                    : 'border-white/10 bg-black/50'
                } backdrop-blur-sm`}
              >
                {model.model === "Hybrid Model" && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-bold mb-4">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{model.model}</h3>
                <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{model.description}</p>

                <div className="space-y-3 mb-4 pb-4 border-b border-white/10">
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">Best For</p>
                    <p className="text-sm text-neutral-300">{model.bestFor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">Price Range</p>
                    <p className="text-base font-bold text-primary-400">{model.priceRange}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-400 leading-relaxed">{model.ongoing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-black bg-grid-white/[0.02] border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-neutral-400 text-lg">Common questions about automation pricing</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold mb-3 text-primary-400">{faq.question}</h3>
                <p className="text-neutral-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Automate
              </span>
              ?
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Get a free workflow assessment and custom quote. We'll analyze your processes and show you the ROI potential.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/#contact">
                <HoverBorderGradient>
                  <span className="flex items-center gap-2">
                    Get Started Today
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </HoverBorderGradient>
              </Link>
              <Link href="/portfolio">
                <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 font-medium">
                  See Examples
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
