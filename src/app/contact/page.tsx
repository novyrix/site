import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Ready to start your project? We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Contact Form */}
          <div>
            <Card variant="highlighted" className="p-8">
              <h2 className="text-2xl font-display font-bold mb-6">Send us a Message</h2>
              <ContactForm />
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card variant="default" className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold mb-2">Email</h3>
                  <a href="mailto:info@novyrix.com" className="text-gray-400 hover:text-primary-500 transition-colors">
                    info@novyrix.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
            </Card>

            <Card variant="default" className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold mb-2">Phone</h3>
                  <a href="tel:+254700000000" className="text-gray-400 hover:text-primary-500 transition-colors">
                    +254 700 000 000
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm EAT</p>
                </div>
              </div>
            </Card>

            <Card variant="default" className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold mb-2">Location</h3>
                  <p className="text-gray-400">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-500 mt-1">Serving clients globally</p>
                </div>
              </div>
            </Card>

            <Card variant="highlighted" className="p-6">
              <h3 className="text-xl font-display font-bold mb-3">
                Prefer to Get a Quote First?
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                Use our transparent calculators to get an instant quote for your project
              </p>
              <Button size="md" className="w-full" asChild>
                <a href="/calculators">Calculate Your Quote</a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
