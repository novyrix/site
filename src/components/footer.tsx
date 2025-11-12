import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const services = [
  { name: "Website Development", href: "/services/website" },
  { name: "Software Development", href: "/services/software" },
  { name: "Workflow Automation", href: "/services/automation" },
  { name: "Web Hosting", href: "/services/hosting" },
  { name: "Care Plans", href: "/services/care-plans" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socials = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Instagram", href: "#", icon: Instagram },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-display font-bold gradient-text">
                Novyrix
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Empowering businesses with cutting-edge web development, custom software solutions,
              and intelligent workflow automation. Transform your digital presence with Novyrix.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@novyrix.com"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>info@novyrix.com</span>
              </a>
              <a
                href="tel:+254790778103"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+254 790 778 103</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Novyrix. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary-500/10 border border-white/10 hover:border-primary-500/30 flex items-center justify-center text-gray-400 hover:text-primary-500 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
