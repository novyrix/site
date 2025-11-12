import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Novyrix <hello@novyrix.com>';
export const REPLY_TO = process.env.RESEND_REPLY_TO || 'support@novyrix.com';

/**
 * Send an email using Resend
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML content
 * @param text - Plain text fallback (optional)
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text,
      replyTo: REPLY_TO,
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeEmail(to: string, userName: string) {
  const subject = 'Welcome to Novyrix - Let\'s Build Something Amazing';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to Novyrix!</h1>
        </div>

        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; margin-top: 0;">Hi ${userName},</p>

          <p>Thank you for joining Novyrix! We're excited to help you bring your digital vision to life.</p>

          <div style="background: #f9fafb; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0;">
            <h3 style="margin-top: 0; color: #667eea;">What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 10px;"><strong>Get a Quote:</strong> Use our calculators to get instant pricing for your project</li>
              <li style="margin-bottom: 10px;"><strong>Browse Services:</strong> Explore our website, software, and automation solutions</li>
              <li style="margin-bottom: 10px;"><strong>Contact Us:</strong> Have questions? Our team is here to help</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/calculators" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Get Your Free Quote
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
            Need help getting started? Reply to this email or visit our
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" style="color: #667eea; text-decoration: none;">contact page</a>.
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Novyrix. All rights reserved.</p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #667eea; text-decoration: none;">Visit Website</a> •
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy" style="color: #667eea; text-decoration: none;">Privacy Policy</a> •
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/terms" style="color: #667eea; text-decoration: none;">Terms of Service</a>
          </p>
        </div>
      </body>
    </html>
  `;

  const text = `
Welcome to Novyrix!

Hi ${userName},

Thank you for joining Novyrix! We're excited to help you bring your digital vision to life.

What's Next?
- Get a Quote: Use our calculators to get instant pricing for your project
- Browse Services: Explore our website, software, and automation solutions
- Contact Us: Have questions? Our team is here to help

Visit ${process.env.NEXT_PUBLIC_APP_URL}/calculators to get your free quote.

Need help? Reply to this email or visit ${process.env.NEXT_PUBLIC_APP_URL}/contact.

© ${new Date().getFullYear()} Novyrix. All rights reserved.
  `;

  return sendEmail({ to, subject, html, text });
}

/**
 * Send a quote confirmation email
 */
export async function sendQuoteConfirmationEmail({
  to,
  userName,
  quoteId,
  serviceType,
  totalPrice,
}: {
  to: string;
  userName: string;
  quoteId: string;
  serviceType: string;
  totalPrice: number;
}) {
  const subject = 'Quote Received - We\'ll Review and Get Back to You';

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const serviceLabels: { [key: string]: string } = {
    WEBSITE: 'Website Development',
    SOFTWARE: 'Custom Software Development',
    AUTOMATION: 'Workflow Automation',
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Quote Received!</h1>
        </div>

        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; margin-top: 0;">Hi ${userName},</p>

          <p>Thank you for requesting a quote! We've received your request and our team is reviewing it.</p>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin: 30px 0;">
            <h3 style="margin-top: 0; color: #667eea;">Quote Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Quote ID:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">#${quoteId.slice(0, 8).toUpperCase()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Service:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${serviceLabels[serviceType]}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px;">Estimated Price:</td>
                <td style="padding: 8px 0; font-weight: 700; font-size: 20px; color: #667eea; text-align: right; border-top: 1px solid #e5e7eb; padding-top: 15px;">${formatKES(totalPrice)}</td>
              </tr>
            </table>
          </div>

          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0;">
            <h3 style="margin-top: 0; color: #059669;">What Happens Next?</h3>
            <ol style="margin: 0; padding-left: 20px; color: #065f46;">
              <li style="margin-bottom: 10px;">Our team will review your requirements within 24 hours</li>
              <li style="margin-bottom: 10px;">We'll reach out if we need any clarifications</li>
              <li style="margin-bottom: 10px;">You'll receive a detailed proposal via email</li>
              <li>Once approved, we'll kick off your project!</li>
            </ol>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/quotes/${quoteId}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              View Your Quote
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
            Have questions? Reply to this email or call us at <strong>+254 790 778 103</strong>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Novyrix. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;

  const text = `
Quote Received!

Hi ${userName},

Thank you for requesting a quote! We've received your request and our team is reviewing it.

Quote Summary:
- Quote ID: #${quoteId.slice(0, 8).toUpperCase()}
- Service: ${serviceLabels[serviceType]}
- Estimated Price: ${formatKES(totalPrice)}

What Happens Next?
1. Our team will review your requirements within 24 hours
2. We'll reach out if we need any clarifications
3. You'll receive a detailed proposal via email
4. Once approved, we'll kick off your project!

View your quote: ${process.env.NEXT_PUBLIC_APP_URL}/quotes/${quoteId}

Have questions? Reply to this email or call us at +254 790 778 103

© ${new Date().getFullYear()} Novyrix. All rights reserved.
  `;

  return sendEmail({ to, subject, html, text });
}

/**
 * Send a contact form submission email to admin
 */
export async function sendContactNotificationEmail({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const subject = `New Contact Form Submission from ${name}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1f2937; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>

        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; color: #1f2937;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Name:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a></td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div>
            <h3 style="color: #1f2937; margin-bottom: 10px;">Message:</h3>
            <div style="background: #f9fafb; border-left: 4px solid #667eea; padding: 20px; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">Received: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
New Contact Form Submission

Contact Information:
- Name: ${name}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}

Message:
${message}

Received: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
  `;

  // Send to admin email (configure in .env)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@novyrix.com';
  return sendEmail({ to: adminEmail, subject, html, text });
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail({
  to,
  userName,
  resetToken,
}: {
  to: string;
  userName: string;
  resetToken: string;
}) {
  const subject = 'Reset Your Novyrix Password';
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
        </div>

        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; margin-top: 0;">Hi ${userName},</p>

          <p>We received a request to reset your password for your Novyrix account.</p>

          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0;">
            <p style="margin: 0; color: #92400e;"><strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Reset My Password
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px;">
            This link will expire in <strong>1 hour</strong> for security reasons.
          </p>

          <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #667eea; word-break: break-all;">${resetUrl}</a>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Novyrix. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;

  const text = `
Password Reset Request

Hi ${userName},

We received a request to reset your password for your Novyrix account.

⚠️ Security Notice: If you didn't request this password reset, please ignore this email. Your password will remain unchanged.

Reset your password by clicking this link:
${resetUrl}

This link will expire in 1 hour for security reasons.

© ${new Date().getFullYear()} Novyrix. All rights reserved.
  `;

  return sendEmail({ to, subject, html, text });
}
