import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card variant="default" className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="font-display font-bold mb-2">Email</h3>
            <a href="mailto:info@novyrix.com" className="text-gray-400 hover:text-primary-500 transition-colors">
              info@novyrix.com
            </a>
          </Card>

          <Card variant="default" className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="font-display font-bold mb-2">Phone</h3>
            <a href="tel:+254700000000" className="text-gray-400 hover:text-primary-500 transition-colors">
              +254 700 000 000
            </a>
          </Card>

          <Card variant="default" className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="font-display font-bold mb-2">Location</h3>
            <p className="text-gray-400">Nairobi, Kenya</p>
          </Card>
        </div>

        <Card variant="highlighted" className="max-w-2xl mx-auto p-8 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Prefer to Get a Quote First?
          </h2>
          <p className="text-gray-400 mb-6">
            Use our transparent calculators to get an instant quote for your project
          </p>
          <Button size="lg" asChild>
            <a href="/calculators">Calculate Your Quote</a>
          </Button>
        </Card>
      </div>
    </main>
  );
}
