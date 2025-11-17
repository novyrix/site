import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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
            Choose your preferred path to get an accurate quote
          </p>
        </div>

        {/* AI Consultant CTA */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card variant="highlighted" className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-display font-bold mb-2">
                  Not Sure What You Need?
                </h3>
                <p className="text-gray-400">
                  Chat with our AI Consultant to get a custom quote based on your business goals
                </p>
              </div>
              <Button size="xl" asChild>
                <Link href="/ai-consultant" className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Try AI Consultant
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-gray-500">Or use our detailed calculators:</p>
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
