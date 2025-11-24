"use client";

import Link from "next/link";
import { ArrowLeft, Code2, Zap, Shield, Globe, CheckCircle2, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function APIIntegrationPage() {
  const integrations = [
    {
      name: "M-Pesa Payment Integration",
      icon: "/logos/M-PESA-logo-2.png",
      description: "Accept mobile payments from customers across Kenya. Real-time payment confirmation and automated reconciliation.",
      features: ["STK Push", "C2B Payments", "B2C Disbursements", "Transaction Status"]
    },
    {
      name: "KRA eTIMS Integration",
      icon: "/logos/KRA2.png",
      description: "Automated tax compliance with Kenya Revenue Authority. Generate invoices, submit returns, and maintain compliance effortlessly.",
      features: ["Invoice Generation", "Tax Calculation", "Automatic Filing", "Compliance Reports"]
    },
    {
      name: "SMS Gateway Integration",
      description: "Send transactional SMS, OTPs, and notifications. Reliable delivery with real-time status tracking.",
      features: ["Bulk SMS", "OTP Verification", "Delivery Reports", "Two-way SMS"]
    },
    {
      name: "Payment Gateways",
      description: "Accept credit cards, bank transfers, and digital wallets. PCI-compliant integration with Stripe, PayPal, and more.",
      features: ["Card Payments", "Subscriptions", "Refunds", "Fraud Detection"]
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Faster Development",
      description: "Leverage existing APIs instead of building from scratch. Launch in weeks, not months."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Grade Security",
      description: "Secure API authentication, encrypted data transfer, and compliance with industry standards."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Real-Time Sync",
      description: "Keep data synchronized across all your systems. Changes propagate instantly."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Scalable Architecture",
      description: "Handle millions of API calls with automatic scaling and rate limiting."
    }
  ];

  const process = [
    {
      step: "01",
      title: "API Discovery",
      description: "We identify which APIs you need, evaluate options, and design the integration architecture."
    },
    {
      step: "02",
      title: "Development",
      description: "Build secure, robust integrations with proper error handling, logging, and monitoring."
    },
    {
      step: "03",
      title: "Testing",
      description: "Comprehensive testing in sandbox environments before going live with real transactions."
    },
    {
      step: "04",
      title: "Deployment & Monitoring",
      description: "Deploy to production with health checks, alerts, and 24/7 monitoring for issues."
    }
  ];

  const useCases = [
    {
      title: "E-Commerce Platform",
      description: "Connect payment gateways, shipping APIs, inventory management, and email services.",
      apis: ["M-Pesa", "Stripe", "SendGrid", "Twilio"]
    },
    {
      title: "SaaS Application",
      description: "Integrate authentication, analytics, payment processing, and customer support tools.",
      apis: ["Auth0", "Google Analytics", "Stripe", "Intercom"]
    },
    {
      title: "Business Management",
      description: "Connect CRM, accounting, invoicing, and tax compliance systems.",
      apis: ["Salesforce", "QuickBooks", "KRA eTIMS", "Slack"]
    }
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
            <span className="text-primary-400 text-sm font-medium">API Integration</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Connect Your Systems <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Seamlessly</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Integrate M-Pesa, KRA eTIMS, SMS gateways, payment processors, and any third-party API into your systems. Secure, reliable, and production-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
              Get Integration Quote
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-700 hover:border-primary-500">
              View Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Integrations */}
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Popular Integrations We Provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-all group"
              >
                {integration.icon && (
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={integration.icon}
                      alt={integration.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-3">{integration.name}</h3>
                <p className="text-neutral-400 mb-6">{integration.description}</p>
                <div className="space-y-2">
                  {integration.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-primary-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Why Professional API Integration?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Common Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-neutral-400 mb-6">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.apis.map((api, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs border border-primary-500/20"
                    >
                      {api}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Our Integration Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {process.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 border-2 border-primary-500/50 flex items-center justify-center text-primary-400 font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-neutral-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Need Custom API Integration?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Whether it's M-Pesa, KRA eTIMS, or any third-party service, we'll integrate it securely and reliably.
          </p>
          <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
            Discuss Your Integration
          </Button>
        </div>
      </section>
    </div>
  );
}
