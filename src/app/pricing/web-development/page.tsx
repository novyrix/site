import Link from 'next/link';
import { CheckCircle2, ArrowRight, Globe, Smartphone, ShoppingCart, Zap, Code2, Database, Search, Shield, X } from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export const metadata = {
  title: 'Web Development Pricing | Novyrix',
  description: 'Transparent pricing for custom web development services. From landing pages to enterprise applications.',
};

export default function WebDevelopmentPricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "35,000",
      subtitle: "Perfect for small businesses",
      description: "Get your online presence established with a professional website",
      features: [
        "Up to 5 pages",
        "Responsive design",
        "Basic SEO optimization",
        "Contact form integration",
        "Social media links",
        "Mobile-friendly",
        "1 month support",
        "Fast loading speed"
      ],
      notIncluded: [
        "Content Management System",
        "E-commerce functionality",
        "Custom animations"
      ],
      ideal: ["Small businesses", "Personal portfolios", "Landing pages", "Simple company websites"],
      deliveryTime: "2-3 weeks",
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Growth",
      price: "75,000",
      subtitle: "For growing businesses",
      description: "Scale your online presence with advanced features and CMS",
      features: [
        "Up to 15 pages",
        "CMS integration (WordPress/Sanity)",
        "Advanced SEO optimization",
        "Blog functionality",
        "Contact & newsletter forms",
        "Analytics integration",
        "3 months support",
        "Performance optimization",
        "Admin training included",
        "Custom animations",
        "Social media integration"
      ],
      notIncluded: [
        "E-commerce with payment gateway",
        "Multi-language support"
      ],
      ideal: ["Growing businesses", "Content-heavy sites", "Business blogs", "Service providers"],
      deliveryTime: "4-6 weeks",
      cta: "Most Popular",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      subtitle: "For complex requirements",
      description: "Full-featured web applications with custom functionality",
      features: [
        "Unlimited pages",
        "Custom web application",
        "E-commerce with payment gateway",
        "Multi-language support",
        "Advanced CMS integration",
        "API integrations",
        "User authentication",
        "Database design",
        "6 months support",
        "Performance monitoring",
        "Security hardening",
        "Admin dashboard",
        "Custom features",
        "Progressive Web App (PWA)"
      ],
      notIncluded: [],
      ideal: ["Enterprise companies", "E-commerce stores", "SaaS platforms", "Complex web apps"],
      deliveryTime: "8-12+ weeks",
      cta: "Contact Us",
      highlighted: false
    }
  ];

  const addOns = [
    {
      name: "E-commerce Integration",
      price: "From KES 40,000",
      description: "Full online store with payment gateway (M-Pesa, card payments)",
      icon: <ShoppingCart className="w-6 h-6" />
    },
    {
      name: "Custom API Integration",
      price: "From KES 25,000",
      description: "Connect to third-party services (M-Pesa, KRA eTIMS, CRM, etc.)",
      icon: <Code2 className="w-6 h-6" />
    },
    {
      name: "Progressive Web App",
      price: "From KES 30,000",
      description: "Install-able web app with offline functionality",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      name: "Advanced SEO Package",
      price: "From KES 20,000",
      description: "Technical SEO, schema markup, sitemap, analytics setup",
      icon: <Search className="w-6 h-6" />
    },
    {
      name: "Database Design",
      price: "From KES 30,000",
      description: "Custom database architecture for complex data needs",
      icon: <Database className="w-6 h-6" />
    },
    {
      name: "Security Hardening",
      price: "From KES 25,000",
      description: "SSL, firewalls, DDoS protection, security audits",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      question: "What's included in the base price?",
      answer: "Each tier includes design, development, testing, deployment, and the specified support period. You'll get a fully functional website hosted on your chosen platform with mobile responsiveness and basic SEO."
    },
    {
      question: "Do you provide hosting?",
      answer: "We can set up hosting for you on platforms like Vercel, Netlify, or your preferred provider. Hosting costs vary based on traffic and features, typically starting from KES 2,000/month."
    },
    {
      question: "Can I upgrade later?",
      answer: "Absolutely! You can start with a Starter package and upgrade to Growth or Enterprise as your business grows. We'll work with you to add features incrementally."
    },
    {
      question: "What if I need custom features?",
      answer: "We love custom projects! Contact us with your requirements and we'll provide a detailed quote. Enterprise packages are fully customizable."
    },
    {
      question: "How does the development process work?",
      answer: "We follow an agile approach: discovery call → wireframes/design → development → your feedback → revisions → testing → launch. You'll get regular updates throughout."
    },
    {
      question: "What happens after the support period?",
      answer: "After the included support period, you can purchase extended support packages starting from KES 10,000/month, or handle updates yourself if you have technical capacity."
    },
    {
      question: "Do you provide content creation?",
      answer: "We can work with your existing content or partner with content creators. Copywriting services are available as an add-on starting from KES 15,000."
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern frameworks like Next.js, React, and TypeScript for optimal performance. For CMS, we offer WordPress, Sanity, or headless solutions based on your needs."
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
              <Globe className="w-4 h-4" />
              <span>Custom Web Development</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Web Development <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Pricing</span>
            </h1>

            <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Transparent pricing for professional websites and web applications. No hidden fees, just clear value.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link href="/#contact">
                <HoverBorderGradient>
                  Get a Custom Quote
                </HoverBorderGradient>
              </Link>
              <Link href="/portfolio/web-development">
                <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 font-medium">
                  View Our Work
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Package</h2>
            <p className="text-neutral-400 text-lg">Select the tier that matches your needs</p>
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
                      <span className="text-neutral-400 text-sm">one-time</span>
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
                      <Zap className="w-4 h-4 text-primary-400" />
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

      {/* Add-ons */}
      <section className="py-20 bg-black bg-grid-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Enhance Your <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Website</span>
            </h2>
            <p className="text-neutral-400 text-lg">Add extra features to any package</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 text-primary-400">
                  {addon.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{addon.name}</h3>
                <p className="text-primary-400 font-semibold text-sm mb-3">{addon.price}</p>
                <p className="text-neutral-400 text-sm leading-relaxed">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Package Comparison</h2>
            <p className="text-neutral-400 text-lg">See what's included in each tier</p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-neutral-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 font-bold">Starter</th>
                  <th className="text-center py-4 px-4 font-bold bg-primary-500/5">Growth</th>
                  <th className="text-center py-4 px-4 font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Number of Pages", starter: "Up to 5", growth: "Up to 15", enterprise: "Unlimited" },
                  { feature: "Responsive Design", starter: true, growth: true, enterprise: true },
                  { feature: "SEO Optimization", starter: "Basic", growth: "Advanced", enterprise: "Advanced" },
                  { feature: "Content Management", starter: false, growth: true, enterprise: true },
                  { feature: "E-commerce", starter: false, growth: false, enterprise: true },
                  { feature: "Custom Animations", starter: false, growth: true, enterprise: true },
                  { feature: "API Integrations", starter: false, growth: "Limited", enterprise: "Unlimited" },
                  { feature: "Multi-language", starter: false, growth: false, enterprise: true },
                  { feature: "Support Period", starter: "1 month", growth: "3 months", enterprise: "6 months" },
                  { feature: "Admin Training", starter: false, growth: true, enterprise: true },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-4 px-4 text-neutral-300">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <CheckCircle2 className="w-5 h-5 text-primary-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-300">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center bg-primary-500/5">
                      {typeof row.growth === 'boolean' ? (
                        row.growth ? (
                          <CheckCircle2 className="w-5 h-5 text-primary-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-300">{row.growth}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <CheckCircle2 className="w-5 h-5 text-primary-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-300">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <p className="text-neutral-400 text-lg">Everything you need to know about our pricing</p>
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
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Website
              </span>
              ?
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Get a free consultation and custom quote for your project. Let's discuss how we can bring your vision to life.
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
              <Link href="/portfolio/web-development">
                <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 font-medium">
                  View Portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
