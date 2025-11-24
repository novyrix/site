import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] text-white antialiased bg-grid-white/[0.02]">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Get in <span className="text-primary-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to start your project? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-slate-900 ring-1 ring-white/10 rounded-2xl p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/80 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <a href="mailto:info@novyrix.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                    info@novyrix.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/80 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <a href="tel:+254790778103" className="text-gray-400 hover:text-primary-400 transition-colors">
                    +254 790 778 103
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm EAT</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/80 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-gray-400">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-500 mt-1">Serving clients globally</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900/20 to-primary-800/20 border border-primary-500/20 p-8 text-center">
              <h3 className="text-xl font-bold mb-3">
                Prefer to Get a Quote First?
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Use our AI consultant to get an instant, transparent quote for your project.
              </p>
              <Link href="/ai-consultant">
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  <span className="mr-2">Talk to Novy AI</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
