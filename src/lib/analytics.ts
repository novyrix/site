import { track } from '@vercel/analytics'

/**
 * Track custom analytics events for key conversion points
 */

export const trackEvent = {
  /**
   * Track quote submission event
   */
  quoteSubmitted: (data: {
    serviceType: string
    estimatedValue: number
    features?: string[]
  }) => {
    track('quote_submitted', {
      service_type: data.serviceType,
      estimated_value: data.estimatedValue,
      features: data.features?.join(',') || '',
    })
  },

  /**
   * Track quote acceptance
   */
  quoteAccepted: (data: {
    quoteId: string
    serviceType: string
    totalValue: number
  }) => {
    track('quote_accepted', {
      quote_id: data.quoteId,
      service_type: data.serviceType,
      total_value: data.totalValue,
    })
  },

  /**
   * Track contact form submission
   */
  contactFormSubmitted: (data: {
    source: string // e.g., 'contact_page', 'quote_inquiry'
  }) => {
    track('contact_form_submitted', {
      source: data.source,
    })
  },

  /**
   * Track calculator usage
   */
  calculatorUsed: (data: {
    calculatorType: 'software' | 'automation'
    step: number
    totalSteps: number
  }) => {
    track('calculator_used', {
      calculator_type: data.calculatorType,
      step: data.step,
      total_steps: data.totalSteps,
    })
  },

  /**
   * Track calculator completion
   */
  calculatorCompleted: (data: {
    calculatorType: 'software' | 'automation'
    estimatedPrice: number
  }) => {
    track('calculator_completed', {
      calculator_type: data.calculatorType,
      estimated_price: data.estimatedPrice,
    })
  },

  /**
   * Track project creation
   */
  projectCreated: (data: {
    projectType: string
    contractValue: number
  }) => {
    track('project_created', {
      project_type: data.projectType,
      contract_value: data.contractValue,
    })
  },

  /**
   * Track user registration
   */
  userRegistered: (data: {
    method: string // e.g., 'email', 'oauth'
  }) => {
    track('user_registered', {
      method: data.method,
    })
  },

  /**
   * Track user login
   */
  userLoggedIn: (data: {
    method: string
  }) => {
    track('user_logged_in', {
      method: data.method,
    })
  },

  /**
   * Track feature usage
   */
  featureUsed: (data: {
    feature: string
    context?: string
  }) => {
    track('feature_used', {
      feature: data.feature,
      context: data.context || '',
    })
  },

  /**
   * Track page views for important pages
   */
  pageView: (data: {
    page: string
    referrer?: string
  }) => {
    track('page_view', {
      page: data.page,
      referrer: data.referrer || '',
    })
  },

  /**
   * Track CTA clicks
   */
  ctaClicked: (data: {
    cta: string // e.g., 'get_quote', 'contact_us', 'view_projects'
    location: string // e.g., 'hero', 'footer', 'navigation'
  }) => {
    track('cta_clicked', {
      cta: data.cta,
      location: data.location,
    })
  },

  /**
   * Track search queries
   */
  searchPerformed: (data: {
    query: string
    resultsCount: number
  }) => {
    track('search_performed', {
      query: data.query,
      results_count: data.resultsCount,
    })
  },
}

/**
 * Track conversion funnel steps
 */
export const trackFunnelStep = (step: 'view' | 'engage' | 'convert', data: {
  funnel: string
  value?: number
}) => {
  track(`funnel_${step}`, {
    funnel: data.funnel,
    value: data.value || 0,
  })
}

/**
 * Track user behavior patterns
 */
export const trackBehavior = (behavior: string, metadata?: Record<string, string | number>) => {
  track(`behavior_${behavior}`, metadata || {})
}
