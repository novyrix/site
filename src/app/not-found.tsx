import Link from 'next/link'
import { Search, Home, Calculator, FileText, Mail, ArrowRight } from 'lucide-react'

export default function NotFound() {
  const helpfulLinks = [
    {
      href: '/',
      icon: Home,
      title: 'Home',
      description: 'Return to homepage'
    },
    {
      href: '/calculators/software',
      icon: Calculator,
      title: 'Software Calculator',
      description: 'Get a quote for your project'
    },
    {
      href: '/quotes',
      icon: FileText,
      title: 'My Quotes',
      description: 'View your quote requests'
    },
    {
      href: '/contact',
      icon: Mail,
      title: 'Contact Us',
      description: 'Get in touch with our team'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Error Message */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              404
            </h1>
            <h2 className="text-3xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. 
              Don&apos;t worry, we&apos;ll help you find your way.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for pages, features, or help..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const searchQuery = (e.target as HTMLInputElement).value
                    if (searchQuery.toLowerCase().includes('quote') || searchQuery.toLowerCase().includes('calculator')) {
                      window.location.href = '/calculators/software'
                    } else if (searchQuery.toLowerCase().includes('contact')) {
                      window.location.href = '/contact'
                    } else if (searchQuery.toLowerCase().includes('project')) {
                      window.location.href = '/projects'
                    } else if (searchQuery.toLowerCase().includes('admin')) {
                      window.location.href = '/admin'
                    } else {
                      window.location.href = '/'
                    }
                  }
                }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Press Enter to search
            </p>
          </div>
        </div>

        {/* Helpful Links Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white text-center mb-6">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helpfulLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
                        {link.title}
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <p className="text-slate-400 text-sm">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Additional Help */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Still Can&apos;t Find What You&apos;re Looking For?
          </h3>
          <p className="text-slate-400 mb-6">
            Our team is here to help you navigate the platform and answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all"
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Error Code: 404 • Page Not Found
        </p>
      </div>
    </div>
  )
}
