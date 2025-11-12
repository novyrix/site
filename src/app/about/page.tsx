import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text text-center">
            About Novyrix
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed text-center mb-16">
            Empowering Kenyan businesses with world-class digital solutions
          </p>

          <Card variant="default" className="p-8 mb-8">
            <h2 className="text-3xl font-display font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To democratize access to premium digital solutions for Kenyan businesses through transparent pricing,
              modern technology, and exceptional service. We believe every business deserves world-class software.
            </p>
          </Card>

          <Card variant="default" className="p-8 mb-8">
            <h2 className="text-3xl font-display font-bold mb-4">Our Approach</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We combine technical excellence with business understanding to deliver solutions that drive real results:
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>✓ Transparent, calculator-based pricing with no hidden fees</li>
              <li>✓ Modern tech stack using the latest frameworks and best practices</li>
              <li>✓ Regular communication and project updates</li>
              <li>✓ Care Plans for ongoing support and maintenance</li>
              <li>✓ Focus on ROI and business outcomes</li>
            </ul>
          </Card>

          <Card variant="default" className="p-8">
            <h2 className="text-3xl font-display font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-400 leading-relaxed">
              With 5+ years of experience and 50+ successful projects, we've helped businesses across Kenya
              transform their digital presence. Our transparent pricing model means you always know what you're
              paying for, and our technical expertise ensures you get premium quality every time.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
