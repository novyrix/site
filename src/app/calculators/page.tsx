import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
            Get Your Quote
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Choose a service to calculate your instant, transparent quote
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card variant="interactive" hover className="p-8 text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Website Development
            </h3>
            <p className="text-gray-400 mb-6">
              Calculate costs for your website project
            </p>
            <Button size="lg" className="w-full" asChild>
              <Link href="/calculators/website">
                Start Calculator <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>

          <Card variant="interactive" hover className="p-8 text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Software Development
            </h3>
            <p className="text-gray-400 mb-6">
              Get estimate for custom software
            </p>
            <Button size="lg" className="w-full" asChild>
              <Link href="/calculators/software">
                Start Calculator <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>

          <Card variant="interactive" hover className="p-8 text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Workflow Automation
            </h3>
            <p className="text-gray-400 mb-6">
              Qualify for automation solution
            </p>
            <Button size="lg" className="w-full" asChild>
              <Link href="/calculators/automation">
                Start Calculator <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
