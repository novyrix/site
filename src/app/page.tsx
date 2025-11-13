import Link from "next/link";
import { ArrowRight, Code, Zap, Sparkles, CheckCircle2, Users, Award, Clock, Shield, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm font-medium animate-fadeIn">
            🚀 Transparent Pricing • No Hidden Fees
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 gradient-text animate-fadeIn">
            Transform Your Digital Presence
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slideUp">
            Empowering Kenyan businesses with cutting-edge web development,
            custom software solutions, and intelligent workflow automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp">
            <Button size="lg" asChild>
              <Link href="/calculators" className="inline-flex items-center gap-2">
                Get Your Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { label: "Projects Delivered", value: "50+" },
              { label: "Happy Clients", value: "30+" },
              { label: "Years Experience", value: "5+" },
              { label: "Response Time", value: "<24h" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose Novyrix?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We combine technical excellence with transparent pricing and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Transparent Pricing",
                description: "Use our calculators to get instant quotes. No surprises, no hidden fees.",
              },
              {
                icon: Clock,
                title: "Fast Delivery",
                description: "Efficient processes ensure your project is delivered on time, every time.",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Modern tech stack and best practices for world-class solutions.",
              },
              {
                icon: Users,
                title: "Dedicated Support",
                description: "Care Plans available with 24/7 support and maintenance included.",
              },
              {
                icon: Lightbulb,
                title: "Innovation First",
                description: "Cutting-edge solutions using the latest technologies and frameworks.",
              },
              {
                icon: CheckCircle2,
                title: "Proven Track Record",
                description: "50+ successful projects delivered for satisfied clients across Kenya.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} variant="default" className="group hover:border-primary-500/30 transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Website Development */}
          <Card variant="interactive" hover className="group">
            <CardHeader>
              <div className="w-14 h-14 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Code className="w-7 h-7 text-primary-500" />
              </div>
              <CardTitle>Website Development</CardTitle>
              <CardDescription>
                Modern, responsive websites built with the latest technologies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-400">
              <p>• Landing pages from KES 30,000</p>
              <p>• Blog integration: +KES 15,000</p>
              <p>• E-commerce: +KES 60,000</p>
              <p>• Custom API: +KES 35,000</p>
              <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                <Link href="/calculators">Calculate Quote →</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Software Development */}
          <Card variant="interactive" hover className="group">
            <CardHeader>
              <div className="w-14 h-14 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Sparkles className="w-7 h-7 text-primary-500" />
              </div>
              <CardTitle>Software Development</CardTitle>
              <CardDescription>
                Custom software solutions for complex business requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-400">
              <p>• Small projects: KES 400K - 900K</p>
              <p>• Medium projects: KES 900K - 2.5M</p>
              <p>• Enterprise: KES 2.5M+</p>
              <p>• Transparent tier-based pricing</p>
              <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                <Link href="/calculators">Get Estimate →</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Workflow Automation */}
          <Card variant="interactive" hover className="group">
            <CardHeader>
              <div className="w-14 h-14 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Zap className="w-7 h-7 text-primary-500" />
              </div>
              <CardTitle>Workflow Automation</CardTitle>
              <CardDescription>
                Streamline operations and boost productivity with automation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-400">
              <p>• Save 10-20 hours per week</p>
              <p>• Integration with existing tools</p>
              <p>• Custom automation solutions</p>
              <p>• Qualification-based pricing</p>
              <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                <Link href="/calculators">Qualify Now →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get your project started in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Choose Service",
                description: "Select from website development, software, or automation services",
              },
              {
                step: "02",
                title: "Get Quote",
                description: "Use our transparent calculators to get an instant, accurate quote",
              },
              {
                step: "03",
                title: "Lock In Price",
                description: "Submit your quote and lock in your price with no hidden fees",
              },
              {
                step: "04",
                title: "We Build",
                description: "Our team brings your vision to life with regular updates",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 border-2 border-primary-500/30 text-primary-500 font-display font-bold text-2xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-bold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what our clients say about working with Novyrix
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "James Mwangi",
                role: "CEO, TechStart Kenya",
                content: "Novyrix transformed our digital presence with a stunning website and custom CRM. The transparent pricing made budgeting easy!",
                rating: 5,
              },
              {
                name: "Sarah Wanjiru",
                role: "Director, Savanna Retail",
                content: "The workflow automation saved us 15 hours per week. ROI was achieved in just 2 months. Highly recommend!",
                rating: 5,
              },
              {
                name: "David Omondi",
                role: "Founder, EduLearn",
                content: "Professional team, clear communication, and delivered on time. Our e-learning platform exceeded expectations!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} variant="default">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-display font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-white/5">
        <Card variant="highlighted" className="max-w-4xl mx-auto text-center p-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Use our transparent pricing calculators to get an instant quote
            for your project. No hidden fees, no surprises.
          </p>
          <Button size="xl" asChild>
            <Link href="/calculators" className="inline-flex items-center gap-2">
              Calculate Your Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </Card>
      </section>
    </main>
  );
}
