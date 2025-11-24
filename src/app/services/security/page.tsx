"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Key, Eye, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Authentication & Authorization",
      description: "Multi-factor authentication, role-based access control, and session management with industry-standard protocols (OAuth 2.0, JWT).",
      includes: ["OAuth 2.0 / OpenID Connect", "Multi-Factor Authentication (MFA)", "Role-Based Access Control (RBAC)", "Session Management"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Encryption",
      description: "End-to-end encryption for data at rest and in transit. AES-256 encryption standards protect sensitive information.",
      includes: ["TLS/SSL Certificates", "AES-256 Encryption", "Encrypted Database Fields", "Secure Key Management"]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Security Monitoring",
      description: "24/7 monitoring for suspicious activity, intrusion attempts, and security vulnerabilities with real-time alerts.",
      includes: ["Intrusion Detection", "Activity Logging", "Real-Time Alerts", "Security Dashboards"]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Vulnerability Management",
      description: "Regular security audits, penetration testing, and automated vulnerability scanning to identify and fix issues.",
      includes: ["Regular Security Audits", "Penetration Testing", "Automated Scanning", "Patch Management"]
    }
  ];

  const compliance = [
    {
      name: "GDPR Compliance",
      description: "European data protection regulations for handling personal data",
      requirements: ["Data Privacy", "User Consent", "Right to Delete", "Data Portability"]
    },
    {
      name: "PCI DSS",
      description: "Payment Card Industry security standards for credit card processing",
      requirements: ["Secure Networks", "Cardholder Data Protection", "Access Control", "Monitoring"]
    },
    {
      name: "ISO 27001",
      description: "International standard for information security management",
      requirements: ["Risk Assessment", "Security Policies", "Incident Response", "Continuous Improvement"]
    }
  ];

  const threats = [
    {
      threat: "SQL Injection",
      protection: "Parameterized queries, input validation, and ORM frameworks prevent database attacks.",
      status: "Protected"
    },
    {
      threat: "Cross-Site Scripting (XSS)",
      protection: "Content Security Policy headers and input sanitization block malicious scripts.",
      status: "Protected"
    },
    {
      threat: "Cross-Site Request Forgery (CSRF)",
      protection: "CSRF tokens and same-site cookies prevent unauthorized actions.",
      status: "Protected"
    },
    {
      threat: "DDoS Attacks",
      protection: "Rate limiting, CDN protection, and traffic filtering stop denial of service attacks.",
      status: "Protected"
    },
    {
      threat: "Brute Force Attacks",
      protection: "Account lockouts, CAPTCHA, and progressive delays prevent password guessing.",
      status: "Protected"
    },
    {
      threat: "Man-in-the-Middle",
      protection: "HTTPS/TLS encryption and certificate pinning secure data transmission.",
      status: "Protected"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Security Assessment",
      description: "Evaluate your current security posture, identify vulnerabilities, and define security requirements."
    },
    {
      step: "02",
      title: "Architecture Design",
      description: "Design secure system architecture with defense-in-depth principles and zero-trust approach."
    },
    {
      step: "03",
      title: "Implementation",
      description: "Build security features from the ground up with encryption, authentication, and monitoring."
    },
    {
      step: "04",
      title: "Testing & Auditing",
      description: "Conduct penetration testing, security audits, and vulnerability assessments before launch."
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
            <span className="text-primary-400 text-sm font-medium">Enterprise Security</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bank-Grade Security <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Built-In</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Enterprise-level security from day one. Authentication, encryption, compliance, and 24/7 monitoring to protect your business and customer data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
              Get Security Audit
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-700 hover:border-primary-500">
              Security Features
            </Button>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Comprehensive Security Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-400 mb-6">{feature.description}</p>
                <div className="space-y-2">
                  {feature.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-primary-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Protection */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Protection Against Common Threats
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
            We defend against the most common security vulnerabilities and attack vectors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threats.map((threat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">{threat.threat}</h3>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                    {threat.status}
                  </span>
                </div>
                <p className="text-sm text-neutral-400">{threat.protection}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Compliance Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {compliance.map((standard, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-colors"
              >
                <h3 className="text-2xl font-bold mb-3">{standard.name}</h3>
                <p className="text-neutral-400 mb-6">{standard.description}</p>
                <div className="space-y-2">
                  {standard.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-primary-400" />
                      {req}
                    </div>
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
            Our Security Process
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
            Secure Your Application Today
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Don't compromise on security. Get enterprise-grade protection built into every layer of your application.
          </p>
          <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
            Request Security Audit
          </Button>
        </div>
      </section>
    </div>
  );
}
