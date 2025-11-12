import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Comprehensive digital solutions for modern businesses
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <Card variant="default" className="p-8">
            <h2 className="text-3xl font-display font-bold mb-4">
              Website Development
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Modern, responsive websites built with cutting-edge technologies. From simple landing pages to complex e-commerce platforms.
            </p>
            <Button asChild>
              <Link href="/calculators/website">Get Quote</Link>
            </Button>
          </Card>

          <Card variant="default" className="p-8">
            <h2 className="text-3xl font-display font-bold mb-4">
              Software Development
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Custom software solutions tailored to your specific business needs. Enterprise-grade applications with transparent pricing.
            </p>
            <Button asChild>
              <Link href="/calculators/software">Get Quote</Link>
            </Button>
          </Card>

          <Card variant="default" className="p-8">
            <h2 className="text-3xl font-display font-bold mb-4">
              Workflow Automation
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Streamline your operations with intelligent automation. Save time and reduce errors with custom workflow solutions.
            </p>
            <Button asChild>
              <Link href="/calculators/automation">Get Quote</Link>
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
