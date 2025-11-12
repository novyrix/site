'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to error reporting service
    console.error('Application error:', error)
    
    // In production, send to error tracking service (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
      // Example: sendToErrorTracking(error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="bg-red-500/20 p-6 rounded-full">
              <AlertTriangle className="w-16 h-16 text-red-400" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            We apologize for the inconvenience. An unexpected error occurred while processing your request. 
            Our team has been notified and is working to fix the issue.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Error Details (Development Mode)
              </h3>
              <div className="text-sm text-slate-300 font-mono bg-black/30 p-4 rounded overflow-x-auto">
                <p className="mb-2">
                  <strong>Message:</strong> {error.message}
                </p>
                {error.digest && (
                  <p className="mb-2">
                    <strong>Digest:</strong> {error.digest}
                  </p>
                )}
                {error.stack && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-slate-400 hover:text-slate-300">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 text-xs text-slate-400 whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          )}

          {/* Error Reference (Production) */}
          {process.env.NODE_ENV === 'production' && error.digest && (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 mb-8">
              <p className="text-slate-400 text-sm">
                Error Reference: <span className="text-white font-mono">{error.digest}</span>
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Please provide this reference when contacting support
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
          </div>

          {/* Help Section */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Need Help?
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              If this problem persists, please contact our support team and we&apos;ll help you resolve the issue.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all"
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </Link>
          </div>

          {/* Additional Tips */}
          <div className="mt-8 text-left bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-3">Troubleshooting Tips:</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Try refreshing the page or clearing your browser cache</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Check your internet connection and try again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Make sure you&apos;re using a supported browser (Chrome, Firefox, Safari, Edge)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>If you were submitting a form, try again in a few minutes</span>
              </li>
            </ul>
          </div>

          {/* Footer Note */}
          <p className="text-center text-slate-500 text-sm mt-8">
            Error Code: 500 • Internal Server Error
          </p>
        </div>
      </div>
    </div>
  )
}
