import Link from 'next/link';
import { CheckCircle2, ArrowRight, Code2, Smartphone, Puzzle, GitBranch, Database, Shield, X, Zap, Clock } from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export const metadata = {
  title: 'Software Development Pricing | Novyrix',
  description: 'Transparent pricing for custom software, mobile apps, plugins, and integrations. Enterprise-grade solutions.',
};

export default function SoftwareDevelopmentPricingPage() {
  const tiers = [
    {
      name: "Mobile App",
      price: "50,000",
      subtitle: "iOS & Android applications",
      description: "Cross-platform mobile apps with native performance",
      features: [
        "Cross-platform development (React Native/Flutter)",
        "iOS & Android support",
        "Push notifications",
        "Offline functionality",
        "App store deployment",
        "User authentication",
        "Basic API integration",
        "Up to 10 screens",
        "2 months support",
        "Admin training"
      ],
      notIncluded: [
        "Backend infrastructure",
        "Advanced features (AR, AI, etc.)",
        "Complex integrations"
      ],
      ideal: ["Small businesses", "MVP launches", "Simple consumer apps", "Portfolio apps"],
      deliveryTime: "6-8 weeks",
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Custom Software",
      price: "150,000",
      subtitle: "Desktop & web applications",
      description: "Full-featured software solutions for your business needs",
      features: [
        "Desktop (Windows/Mac/Linux) or web-based",
        "Custom UI/UX design",
        "Database integration",
        "User management system",
        "Role-based access control",
        "Reporting & analytics",
        "Data import/export",
        "API development",
        "Cloud deployment",
        "4 months support",
        "Documentation included",
        "Training sessions"
      ],
      notIncluded: [
        "Advanced AI/ML features",
        "Mobile companion app"
      ],
      ideal: ["Enterprise businesses", "Internal tools", "Industry-specific software", "SaaS products"],
      deliveryTime: "10-14 weeks",
      cta: "Most Popular",
      highlighted: true
    },
    {
      name: "Enterprise Solution",
      price: "Custom",
      subtitle: "Complete custom systems",
      description: "End-to-end software solutions with advanced features",
      features: [
        "Multi-platform support",
        "Advanced architecture design",
        "Microservices architecture",
        "Real-time data processing",
        "Advanced security features",
        "Third-party integrations",
        "AI/ML capabilities",
        "Scalable infrastructure",
        "Load balancing",
        "Monitoring & alerting",
        "12 months support",
        "Dedicated project manager",
        "Ongoing maintenance",
        "Custom SLAs"
      ],
      notIncluded: [],
      ideal: ["Large enterprises", "Complex systems", "Mission-critical apps", "Multi-tenant SaaS"],
      deliveryTime: "16+ weeks",
      cta: "Contact Us",
      highlighted: false
    }
  ];

  const plugins = [
    {
      name: "JOSM Plugin Development",
      price: "From KES 80,000",
      description: "Custom plugins for Java OpenStreetMap Editor",
      features: [
        "Java-based plugin architecture",
        "OSM data integration",
        "Custom validation rules",
        "UI extensions",
        "Testing & documentation"
      ],
      timeline: "4-6 weeks",
      icon: <Puzzle className="w-6 h-6" />
    },
    {
      name: "VS Code Extension",
      price: "From KES 60,000",
      description: "Custom extensions for Visual Studio Code",
      features: [
        "TypeScript/JavaScript",
        "Custom commands & shortcuts",
        "Language support",
        "Marketplace publishing",
        "Testing & CI/CD"
      ],
      timeline: "3-5 weeks",
      icon: <Code2 className="w-6 h-6" />
    },
    {
      name: "Browser Extension",
      price: "From KES 50,000",
      description: "Extensions for Chrome, Firefox, Edge",
      features: [
        "Cross-browser support",
        "Content scripts",
        "Background workers",
        "Store publishing",
        "Auto-updates"
      ],
      timeline: "3-4 weeks",
      icon: <GitBranch className="w-6 h-6" />
    }
  ];

  const techStack = [
    {
      category: "Mobile Development",
      technologies: ["React Native", "Flutter", "Ionic", "Native (Swift/Kotlin)"],
      priceImpact: "Cross-platform is more cost-effective than native"
    },
    {
      category: "Web Applications",
      technologies: ["Next.js", "React", "Node.js", "Python/Django", "PHP/Laravel"],
      priceImpact: "Framework choice depends on project requirements"
    },
    {
      category: "Desktop Software",
      technologies: ["Electron", "Qt", "C#/.NET", "Python/PyQt"],
      priceImpact: "Electron offers cross-platform advantages"
    },
    {
      category: "Database",
      technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase"],
      priceImpact: "Included in base price; complex schemas extra"
    },
    {
      category: "DevOps & Cloud",
      technologies: ["AWS", "Azure", "Google Cloud", "Vercel", "DigitalOcean"],
      priceImpact: "Infrastructure costs separate from development"
    }
  ];

  const faqs = [
    {
      question: "What's the difference between Mobile App and Custom Software tiers?",
      answer: "Mobile App focuses on iOS/Android applications with standard features. Custom Software covers desktop applications, web-based systems, and more complex business logic. Both can include API integrations and databases."
    },
    {
      question: "Can you build native iOS and Android apps separately?",
      answer: "Yes! While we recommend cross-platform for cost efficiency, we can build native apps. Native development typically costs 60-80% more due to maintaining two separate codebases."
    },
    {
      question: "Do you provide source code?",
      answer: "Absolutely! You own all code and intellectual property. We provide full source code, documentation, and deployment instructions upon project completion."
    },
    {
      question: "What's included in the support period?",
      answer: "Support includes bug fixes, minor updates, technical assistance, and guidance on using the software. Major feature additions are quoted separately."
    },
    {
      question: "Can you integrate with our existing systems?",
      answer: "Yes! We specialize in integrations with ERPs, CRMs, payment gateways (M-Pesa, Stripe), KRA eTIMS, and custom APIs. Integration complexity is assessed during discovery."
    },
    {
      question: "How do you handle mobile app store submissions?",
      answer: "We handle the entire submission process for both Apple App Store and Google Play Store, including account setup, asset preparation, and responding to review feedback."
    },
    {
      question: "What if we need changes during development?",
      answer: "We follow agile methodology with regular check-ins. Minor changes are accommodated; significant scope changes are discussed and may adjust timeline and budget."
    },
    {
      question: "Do you offer maintenance after the project?",
      answer: "Yes! We offer maintenance packages starting from KES 15,000/month covering updates, bug fixes, security patches, and technical support."
    },
    {
      question: "Can you help with scaling as our user base grows?",
      answer: "Definitely! We build with scalability in mind and can provide ongoing performance optimization, infrastructure scaling, and feature enhancements as you grow."
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
              <Code2 className="w-4 h-4" />
              <span>Software Development</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Software Development <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Pricing</span>
            </h1>

            <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              From mobile apps to enterprise software. Transparent pricing for custom development projects.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link href="/#contact">
                <HoverBorderGradient>
                  Get a Custom Quote
                </HoverBorderGradient>
              </Link>
              <Link href="/portfolio">
                <button className="px-8 py-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 font-medium">
                  View Our Projects
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Software Packages</h2>
            <p className="text-neutral-400 text-lg">Choose the right solution for your needs</p>
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

      {/* Plugin Development */}
      <section className="py-20 bg-black bg-grid-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Plugin <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Development</span>
            </h2>
            <p className="text-neutral-400 text-lg">Extend existing platforms with custom plugins</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plugins.map((plugin, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 text-primary-400">
                  {plugin.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{plugin.name}</h3>
                <p className="text-primary-400 font-semibold text-sm mb-3">{plugin.price}</p>
                <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{plugin.description}</p>

                <ul className="space-y-2 mb-4">
                  {plugin.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Clock className="w-4 h-4" />
                    <span>Timeline: {plugin.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-neutral-400 mb-4">Need a different type of plugin?</p>
            <Link href="/#contact" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Discuss Your Requirements
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technology Stack</h2>
            <p className="text-neutral-400 text-lg">We work with modern, proven technologies</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {techStack.map((stack, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border border-white/10 bg-black/50 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-3 text-primary-400">{stack.category}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {stack.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-neutral-300 text-sm border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-neutral-400 text-sm">{stack.priceImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl bg-primary-500/5 border border-primary-500/20">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2 text-primary-400">Technology Consultation</h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Not sure which technology is right for your project? We provide free technical consultation to help you choose the best stack based on your requirements, budget, and long-term goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-black bg-grid-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Package Comparison</h2>
            <p className="text-neutral-400 text-lg">Compare features across tiers</p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-neutral-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 font-bold">Mobile App</th>
                  <th className="text-center py-4 px-4 font-bold bg-primary-500/5">Custom Software</th>
                  <th className="text-center py-4 px-4 font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Platform Support", mobile: "iOS & Android", software: "Desktop/Web", enterprise: "Multi-platform" },
                  { feature: "UI/UX Design", mobile: true, software: true, enterprise: true },
                  { feature: "User Authentication", mobile: true, software: true, enterprise: true },
                  { feature: "Database Integration", mobile: "Basic", software: true, enterprise: "Advanced" },
                  { feature: "API Development", mobile: "Basic", software: true, enterprise: "Advanced" },
                  { feature: "Real-time Features", mobile: false, software: "Optional", enterprise: true },
                  { feature: "AI/ML Capabilities", mobile: false, software: false, enterprise: true },
                  { feature: "Microservices", mobile: false, software: false, enterprise: true },
                  { feature: "Support Period", mobile: "2 months", software: "4 months", enterprise: "12 months" },
                  { feature: "Project Manager", mobile: false, software: false, enterprise: true },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-4 px-4 text-neutral-300">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.mobile === 'boolean' ? (
                        row.mobile ? (
                          <CheckCircle2 className="w-5 h-5 text-primary-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-300">{row.mobile}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center bg-primary-500/5">
                      {typeof row.software === 'boolean' ? (
                        row.software ? (
                          <CheckCircle2 className="w-5 h-5 text-primary-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-neutral-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-300">{row.software}</span>
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
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-neutral-400 text-lg">Common questions about software development pricing</p>
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
      <section className="py-32 bg-black bg-grid-white/[0.02] border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Software
              </span>
              ?
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Get a free consultation and custom quote for your project. We'll help you choose the right technology and approach.
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
                  View Case Studies
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
