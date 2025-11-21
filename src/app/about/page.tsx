import { Spotlight } from "@/components/ui/spotlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Shield, Zap, TrendingUp, CheckCircle2, Users, Heart, Globe, Code2 } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      title: "Radical Transparency",
      description: "We believe in open pricing and clear communication. No hidden fees, no surprises. You know exactly what you're paying for.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700" />,
      icon: <Shield className="h-4 w-4 text-neutral-300" />,
      className: "md:col-span-2",
    },
    {
      title: "Kenyan Excellence",
      description: "World-class software, built in Nairobi. We're proving that Kenyan engineering can compete on the global stage.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700" />,
      icon: <Globe className="h-4 w-4 text-neutral-300" />,
      className: "md:col-span-1",
    },
    {
      title: "Technical Mastery",
      description: "We don't just use templates. We build custom, scalable architectures using modern stacks like Next.js and Node.js.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700" />,
      icon: <Code2 className="h-4 w-4 text-neutral-300" />,
      className: "md:col-span-1",
    },
    {
      title: "Client Partnership",
      description: "We're not just vendors; we're partners. Your success is our success. We build long-term relationships.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700" />,
      icon: <Users className="h-4 w-4 text-neutral-300" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <main className="min-h-screen bg-black/[0.96] text-white antialiased bg-grid-white/[0.02]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            About <span className="text-primary-400">Novyrix</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Empowering Kenyan businesses with world-class digital solutions.
            Transparent. Scalable. Local.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Our Mission
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To democratize access to premium digital solutions for Kenyan businesses through transparent pricing,
                modern technology, and exceptional service. We believe every business deserves world-class software,
                regardless of size.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We are challenging the status quo of the agency model. No more black-box pricing.
                No more spaghetti code. Just clean, efficient, and transparent engineering.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50">
               {/* Placeholder for team image or abstract graphic */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-purple-900/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                      <Heart className="w-10 h-10 text-primary-400" />
                    </div>
                    <p className="text-sm text-gray-500 font-mono">Built with Passion in Nairobi</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-black bg-grid-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-400">The principles that guide every line of code we write.</p>
          </div>
          <BentoGrid className="max-w-4xl mx-auto">
            {values.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>
    </main>
  );
}
