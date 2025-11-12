import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Novyrix',
  description: 'Privacy policy and data protection information for Novyrix',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: November 12, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 space-y-8 text-slate-200">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="mb-4">
              Novyrix (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
            </p>
            <p>
              By using our Service, you consent to the data practices described in this policy. If you do not agree with 
              our policies and practices, please do not use our Service.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">1.1 Personal Information</h3>
            <p className="mb-4">We collect personal information that you voluntarily provide when you:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>Register an account:</strong> Name, email address, phone number, company name</li>
              <li><strong>Request a quote:</strong> Project details, budget information, timeline requirements</li>
              <li><strong>Contact us:</strong> Name, email, phone number, message content</li>
              <li><strong>Use calculators:</strong> Business information, project specifications, feature selections</li>
              <li><strong>Make payments:</strong> Billing address, payment information (processed through secure third-party payment processors)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">1.2 Automatically Collected Information</h3>
            <p className="mb-4">When you access our Service, we automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, features used</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device type</li>
              <li><strong>Cookies and Tracking:</strong> Session identifiers, preferences, authentication tokens</li>
              <li><strong>Performance Data:</strong> Page load times, errors encountered, system diagnostics</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">1.3 Information from Third Parties</h3>
            <p>We may receive information about you from:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Authentication providers (if you sign in through third-party services)</li>
              <li>Payment processors</li>
              <li>Business partners or affiliates (with your consent)</li>
            </ul>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.1 Provide Services</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Create and manage your account</li>
              <li>Process and respond to quote requests</li>
              <li>Deliver software development and automation services</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Process payments and manage invoices</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.2 Improve Our Service</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Analyze usage patterns and optimize user experience</li>
              <li>Develop new features and functionality</li>
              <li>Conduct research and analytics</li>
              <li>Monitor and troubleshoot technical issues</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.3 Communication</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Send transactional emails (quote confirmations, project updates)</li>
              <li>Provide customer support and respond to requests</li>
              <li>Send service announcements and updates</li>
              <li>Send marketing communications (with your consent, opt-out available)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.4 Legal and Security</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Comply with legal obligations and enforce our Terms of Service</li>
              <li>Protect against fraud, abuse, and security threats</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
          </section>

          {/* 3. Data Storage and Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage and Security</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">3.1 Data Storage</h3>
            <p className="mb-4">
              Your data is stored securely in our MySQL database hosted by trusted cloud infrastructure providers. 
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Encrypted data transmission (SSL/TLS)</li>
              <li>Encrypted data storage</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">3.2 Data Retention</h3>
            <p className="mb-4">We retain your information for as long as:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Your account is active</li>
              <li>Needed to provide services or fulfill contractual obligations</li>
              <li>Required by law or for legitimate business purposes</li>
              <li>Necessary to resolve disputes or enforce agreements</li>
            </ul>
            <p>
              Upon account deletion or termination, we will delete or anonymize your personal data within 30 days, 
              unless retention is required by law.
            </p>
          </section>

          {/* 4. Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="mb-4">We use cookies and similar tracking technologies to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>Essential Cookies:</strong> Required for authentication, security, and core functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our Service and improve user experience</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="mb-4">
              You can control cookie preferences through your browser settings. However, disabling essential cookies 
              may limit your ability to use certain features of the Service.
            </p>
            <p>
              We use NextAuth.js for authentication which stores session tokens in secure HTTP-only cookies. 
              These cookies are essential for maintaining your logged-in state.
            </p>
          </section>

          {/* 5. Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
            <p className="mb-4">Our Service integrates with the following third-party services:</p>
            
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Resend (Email Service)</h4>
                <p className="text-sm">
                  We use Resend to send transactional and service-related emails. Your email address and message 
                  content are processed by Resend to deliver emails. See Resend&apos;s privacy policy at resend.com/legal.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Cloud Hosting Provider</h4>
                <p className="text-sm">
                  Our database and application are hosted on secure cloud infrastructure. Your data is stored in 
                  compliance with industry security standards.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Payment Processors</h4>
                <p className="text-sm">
                  Payment information is processed through secure third-party payment processors. We do not store 
                  full credit card information on our servers.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Analytics Services</h4>
                <p className="text-sm">
                  We may use analytics services to understand usage patterns and improve our Service. These services 
                  may collect anonymized usage data.
                </p>
              </div>
            </div>

            <p className="mt-4">
              These third-party services have their own privacy policies and data practices. We encourage you to 
              review their policies before using our Service.
            </p>
          </section>

          {/* 6. Data Sharing and Disclosure */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Data Sharing and Disclosure</h2>
            <p className="mb-4">We do not sell, rent, or trade your personal information. We may share your information:</p>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">6.1 With Your Consent</h3>
            <p className="mb-4">We may share information with third parties when you explicitly consent.</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">6.2 Service Providers</h3>
            <p className="mb-4">
              We share information with trusted service providers who help us operate our business (hosting, email, 
              payment processing). These providers are contractually obligated to protect your data.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">6.3 Legal Requirements</h3>
            <p className="mb-4">We may disclose information if required by law or in response to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Legal processes (court orders, subpoenas)</li>
              <li>Government requests or investigations</li>
              <li>Protection of our rights, property, or safety</li>
              <li>Prevention of fraud or illegal activities</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">6.4 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the 
              acquiring entity. We will notify you of any such change in ownership.
            </p>
          </section>

          {/* 7. Your Rights and Choices */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights and Choices</h2>
            <p className="mb-4">You have the following rights regarding your personal information:</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.1 Access and Portability</h3>
            <p className="mb-4">
              You can access and download your personal information through your account settings or by contacting us.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.2 Correction and Update</h3>
            <p className="mb-4">
              You can update your profile information at any time through your account settings.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.3 Deletion</h3>
            <p className="mb-4">
              You can request deletion of your account and personal data. Some information may be retained as required 
              by law or for legitimate business purposes (e.g., transaction records).
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.4 Marketing Communications</h3>
            <p className="mb-4">
              You can opt out of marketing emails by clicking the unsubscribe link in any marketing email or by 
              updating your email preferences in account settings.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">7.5 Data Protection Rights (GDPR Compliance)</h3>
            <p className="mb-4">If you are in the European Economic Area, you have additional rights:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Right to object to data processing</li>
              <li>Right to restrict processing</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
          </section>

          {/* 8. International Data Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. International Data Transfers</h2>
            <p className="mb-4">
              Our primary operations are based in Kenya. However, some of our service providers may be located in 
              other countries. When we transfer data internationally, we ensure appropriate safeguards are in place 
              to protect your information in accordance with this Privacy Policy and applicable data protection laws.
            </p>
          </section>

          {/* 9. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Children&apos;s Privacy</h2>
            <p>
              Our Service is not intended for children under 18 years of age. We do not knowingly collect personal 
              information from children. If you become aware that a child has provided us with personal information, 
              please contact us immediately, and we will take steps to delete such information.
            </p>
          </section>

          {/* 10. Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal 
              requirements, or other factors. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Posting the updated policy on our website</li>
              <li>Sending an email notification to registered users</li>
              <li>Displaying a prominent notice on the Service</li>
            </ul>
            <p>
              The &quot;Last Updated&quot; date at the top indicates when the policy was last revised. Your continued use 
              of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* 11. Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Information</h2>
            <p className="mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p><strong className="text-white">Privacy Officer:</strong> privacy@novyrix.com</p>
              <p><strong className="text-white">General Inquiries:</strong> hello@novyrix.com</p>
              <p><strong className="text-white">Website:</strong> https://novyrix.com/contact</p>
              <p><strong className="text-white">Address:</strong> Nairobi, Kenya</p>
            </div>
            <p className="mt-4">
              We will respond to your privacy-related inquiries within 30 days of receipt.
            </p>
          </section>

          {/* 12. California Privacy Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. California Privacy Rights (CCPA)</h2>
            <p className="mb-4">
              If you are a California resident, you have specific rights under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to access your personal information</li>
              <li>Right to request deletion of personal information</li>
              <li>Right to equal service and price (non-discrimination)</li>
            </ul>
            <p className="mt-4">
              Note: We do not sell personal information to third parties.
            </p>
          </section>

          {/* 13. Data Security Measures */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Data Security Measures</h2>
            <p className="mb-4">We implement comprehensive security measures including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encryption in transit (HTTPS/TLS) and at rest</li>
              <li>Secure authentication with bcrypt password hashing</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and role-based permissions</li>
              <li>Monitoring and logging of security events</li>
              <li>Incident response procedures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="mt-4">
              While we implement robust security measures, no system is completely secure. We cannot guarantee absolute 
              security, but we are committed to protecting your information using industry best practices.
            </p>
          </section>

        </div>

        {/* Footer Links */}
        <div className="mt-8 flex gap-4 text-sm text-slate-400">
          <Link href="/terms" className="hover:text-blue-400 transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
