import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Novyrix',
  description: 'Terms and conditions for using Novyrix services',
}

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-slate-400">Last updated: November 12, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 space-y-8 text-slate-200">

          {/* 1. Agreement to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using Novyrix (&quot;the Service&quot;, &quot;Platform&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
              If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service, including but not limited to
              clients, administrators, and any other parties utilizing our software development, workflow automation, or related services.
            </p>
          </section>

          {/* 2. Description of Services */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Services</h2>
            <p className="mb-4">
              Novyrix provides custom software development, workflow automation, and technology consulting services. Our services include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Custom software development and programming services</li>
              <li>Workflow automation and process optimization</li>
              <li>Technical consulting and system architecture design</li>
              <li>Software maintenance and support services</li>
              <li>Project management and delivery</li>
              <li>Online calculators and quotation tools</li>
            </ul>
            <p className="mt-4">
              We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice.
            </p>
          </section>

          {/* 3. User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To access certain features of the Service, you must register for an account. When you register, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and accept all risks of unauthorized access</li>
              <li>Immediately notify us of any unauthorized use of your account</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate your account if any information provided is inaccurate,
              not current, or incomplete, or if you violate these Terms.
            </p>
          </section>

          {/* 4. Services and Quotations */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Services and Quotations</h2>
            <p className="mb-4">
              <strong>4.1 Quotation Process:</strong> Quotations provided through our platform are estimates based on the
              information you provide. Final pricing may vary based on project scope, complexity, and requirements discovered
              during project analysis.
            </p>
            <p className="mb-4">
              <strong>4.2 Acceptance:</strong> A binding contract is formed only when both parties sign a formal project
              agreement or statement of work. Online quotations and calculator results are for estimation purposes only.
            </p>
            <p className="mb-4">
              <strong>4.3 Scope Changes:</strong> Any changes to project scope, requirements, or deliverables may result
              in adjusted timelines and pricing. Change requests must be submitted in writing and approved by both parties.
            </p>
            <p>
              <strong>4.4 Timeline:</strong> Project timelines are estimates and may be adjusted due to unforeseen
              circumstances, scope changes, or delays in receiving necessary information or approvals from clients.
            </p>
          </section>

          {/* 5. Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Payment Terms</h2>
            <p className="mb-4">
              <strong>5.1 Pricing:</strong> All prices are quoted in Kenyan Shillings (KES) unless otherwise specified.
              Prices are subject to change with 30 days notice.
            </p>
            <p className="mb-4">
              <strong>5.2 Payment Schedule:</strong> Payment terms will be specified in individual project agreements.
              Typical payment schedules include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Initial deposit: 30-50% upon project commencement</li>
              <li>Milestone payments: As specified in project agreement</li>
              <li>Final payment: Upon project completion and acceptance</li>
            </ul>
            <p className="mb-4">
              <strong>5.3 Late Payments:</strong> Payments not received within 14 days of the due date may incur a late
              fee of 2% per month. We reserve the right to suspend work until payment is received.
            </p>
            <p className="mb-4">
              <strong>5.4 Refunds:</strong> Deposit payments are non-refundable once work has commenced. Refunds for
              incomplete work will be calculated based on work completed and expenses incurred.
            </p>
            <p>
              <strong>5.5 Taxes:</strong> All prices are exclusive of applicable taxes unless stated otherwise. You are
              responsible for all applicable taxes, duties, and government fees.
            </p>
          </section>

          {/* 6. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property Rights</h2>
            <p className="mb-4">
              <strong>6.1 Ownership Transfer:</strong> Upon full payment, intellectual property rights for custom-developed
              software and deliverables transfer to the client, unless otherwise specified in the project agreement.
            </p>
            <p className="mb-4">
              <strong>6.2 Pre-existing Materials:</strong> Novyrix retains all rights to pre-existing frameworks, libraries,
              tools, and methodologies used in project delivery. Clients receive a license to use these components as part
              of the delivered solution.
            </p>
            <p className="mb-4">
              <strong>6.3 Third-party Components:</strong> Delivered solutions may include third-party libraries and
              components subject to their respective licenses. Clients must comply with all applicable third-party licenses.
            </p>
            <p>
              <strong>6.4 Portfolio Rights:</strong> Novyrix reserves the right to use completed projects in our portfolio,
              marketing materials, and case studies, unless confidentiality is specifically required by agreement.
            </p>
          </section>

          {/* 7. Confidentiality */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Confidentiality</h2>
            <p className="mb-4">
              Both parties agree to maintain confidentiality of proprietary information shared during the course of
              engagement. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Business strategies, processes, and methodologies</li>
              <li>Technical specifications and source code</li>
              <li>Financial information and pricing details</li>
              <li>Customer data and business relationships</li>
            </ul>
            <p>
              Confidentiality obligations survive the termination of the engagement and remain in effect for 3 years
              unless a separate non-disclosure agreement specifies otherwise.
            </p>
          </section>

          {/* 8. Warranties and Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Warranties and Disclaimers</h2>
            <p className="mb-4">
              <strong>8.1 Service Warranty:</strong> We warrant that services will be performed in a professional manner
              consistent with industry standards. Software will function substantially as described in specifications.
            </p>
            <p className="mb-4">
              <strong>8.2 Disclaimer:</strong> EXCEPT AS EXPRESSLY PROVIDED, THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT
              WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              <strong>8.3 No Guarantee:</strong> We do not guarantee that the Service will be uninterrupted, timely, secure,
              or error-free, or that defects will be corrected outside of warranty periods.
            </p>
          </section>

          {/* 9. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOVYRIX SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Service interruptions or delays</li>
              <li>Errors or inaccuracies in content or calculations</li>
              <li>Unauthorized access to or alteration of your data</li>
            </ul>
            <p>
              Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim
              during the 12 months preceding the claim.
            </p>
          </section>

          {/* 10. Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Novyrix, its officers, directors, employees, and agents from
              any claims, damages, losses, liabilities, and expenses (including legal fees) arising from: (a) your use of
              the Service; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) any
              content or information you provide through the Service.
            </p>
          </section>

          {/* 11. Support and Maintenance */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Support and Maintenance</h2>
            <p className="mb-4">
              <strong>11.1 Warranty Support:</strong> Bug fixes and corrections for issues in delivered software are provided
              during the warranty period as specified in the project agreement (typically 30-90 days after delivery).
            </p>
            <p className="mb-4">
              <strong>11.2 Ongoing Support:</strong> Continued support and maintenance beyond the warranty period requires a
              separate support agreement or care plan.
            </p>
            <p>
              <strong>11.3 Response Times:</strong> Support response times and availability will be specified in individual
              support agreements.
            </p>
          </section>

          {/* 12. Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Termination</h2>
            <p className="mb-4">
              <strong>12.1 By Client:</strong> You may terminate your account at any time. Termination of ongoing projects
              requires written notice and payment for work completed.
            </p>
            <p className="mb-4">
              <strong>12.2 By Novyrix:</strong> We may terminate or suspend your account immediately if you breach these
              Terms, fail to make required payments, or engage in fraudulent or illegal activities.
            </p>
            <p className="mb-4">
              <strong>12.3 Effect of Termination:</strong> Upon termination:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Your right to access the Service ceases immediately</li>
              <li>You remain responsible for all charges incurred before termination</li>
              <li>We may delete your account data after 30 days</li>
              <li>Provisions regarding payment, confidentiality, and liability survive termination</li>
            </ul>
          </section>

          {/* 13. Prohibited Uses */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Prohibited Uses</h2>
            <p className="mb-4">You may not use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malicious code or viruses</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Impersonate any person or entity</li>
              <li>Collect or harvest personal information without consent</li>
              <li>Engage in fraudulent or deceptive practices</li>
            </ul>
          </section>

          {/* 14. Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Governing Law and Dispute Resolution</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to
              conflict of law provisions.
            </p>
            <p className="mb-4">
              Any disputes arising from these Terms or the Service shall first be attempted to be resolved through good
              faith negotiations. If negotiations fail, disputes shall be resolved through arbitration in Nairobi, Kenya,
              under the rules of the Chartered Institute of Arbitrators (Kenya).
            </p>
          </section>

          {/* 15. Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email
              or through the Service. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
            <p>
              It is your responsibility to review these Terms periodically. The &quot;Last Updated&quot; date at the top of
              this page indicates when these Terms were last revised.
            </p>
          </section>

          {/* 16. Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">16. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p><strong className="text-white">Email:</strong> legal@novyrix.com</p>
              <p><strong className="text-white">Website:</strong> https://novyrix.com</p>
              <p><strong className="text-white">Address:</strong> Nairobi, Kenya</p>
            </div>
          </section>

          {/* 17. Severability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">17. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or
              eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>
          </section>

          {/* 18. Entire Agreement */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">18. Entire Agreement</h2>
            <p>
              These Terms, together with any project agreements, statements of work, and our Privacy Policy, constitute
              the entire agreement between you and Novyrix regarding the Service and supersede all prior agreements and
              understandings.
            </p>
          </section>

        </div>

        {/* Footer Links */}
        <div className="mt-8 flex gap-4 text-sm text-slate-400">
          <Link href="/privacy" className="hover:text-blue-400 transition-colors">
            Privacy Policy
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
