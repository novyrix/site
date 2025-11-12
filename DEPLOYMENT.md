# 🚀 Vercel Deployment Guide for Novyrix

## Environment Variables Required

When deploying to Vercel, you need to set these environment variables in your project settings:

### 1. Database Configuration
```bash
DATABASE_URL="mysql://mdawidah_novyrix:ZsF40IaVYzIX@mdawidahomestay.com:3306/mdawidah_novyrix"
```
**Purpose:** Connection string for your production MySQL database

---

### 2. NextAuth Configuration
```bash
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="TnmLmkw1ZGPvoBIs8mlC2UiJ+QYvBe63HaruAYKwsec="
```
**Purpose:** 
- `NEXTAUTH_URL`: Your production domain (update after deployment)
- `NEXTAUTH_SECRET`: Encryption key for sessions (keep this secure!)

**⚠️ IMPORTANT:** Update `NEXTAUTH_URL` with your actual Vercel deployment URL after first deploy

---

### 3. Resend Email Configuration
```bash
RESEND_API_KEY="re_ddLqDnFp_BfeXpbC1c4Ue4ZazzhAzEfC4"
RESEND_FROM_EMAIL="Novyrix <hello@novyrix.com>"
RESEND_REPLY_TO="support@novyrix.com"
ADMIN_EMAIL="admin@novyrix.com"
```
**Purpose:** Email service for transactional emails (quotes, contact form, etc.)

**Note:** You'll need to verify your domain in Resend to send from `@novyrix.com`. 
Until then, use Resend's sandbox email: `onboarding@resend.dev`

---

### 4. App Configuration
```bash
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_APP_NAME="Novyrix"
```
**Purpose:** Public app settings accessible in browser
- `NEXT_PUBLIC_APP_URL`: Your production URL (update after deployment)
- `NEXT_PUBLIC_APP_NAME`: Your application name

---

## 📋 Step-by-Step Deployment

### Step 1: Push to GitHub
```bash
git add -A
git commit -m "chore: prepare for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `novyrix/site`
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables
In Vercel project settings, add these variables:

#### Required Variables:
| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `mysql://mdawidah_novyrix:ZsF40IaVYzIX@mdawidahomestay.com:3306/mdawidah_novyrix` | Production MySQL |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Update after deployment |
| `NEXTAUTH_SECRET` | `TnmLmkw1ZGPvoBIs8mlC2UiJ+QYvBe63HaruAYKwsec=` | Keep secure! |
| `RESEND_API_KEY` | `re_ddLqDnFp_BfeXpbC1c4Ue4ZazzhAzEfC4` | Email service |
| `RESEND_FROM_EMAIL` | `Novyrix <onboarding@resend.dev>` | Use sandbox initially |
| `RESEND_REPLY_TO` | `support@novyrix.com` | Reply-to address |
| `ADMIN_EMAIL` | `admin@novyrix.com` | Admin notifications |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Update after deployment |
| `NEXT_PUBLIC_APP_NAME` | `Novyrix` | App name |

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Get your deployment URL (e.g., `novyrix.vercel.app`)

### Step 5: Update URLs
After first deployment, update these environment variables with your actual URL:
- `NEXTAUTH_URL` → `https://novyrix.vercel.app` (or your custom domain)
- `NEXT_PUBLIC_APP_URL` → `https://novyrix.vercel.app`

Then redeploy (Vercel will auto-redeploy on env variable changes)

### Step 6: Set Up Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `novyrix.com`)
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to use custom domain

---

## 🔐 Resend Email Setup

### Using Sandbox (Testing)
- From: `onboarding@resend.dev`
- Limit: Can only send to your verified email
- Good for: Initial testing

### Using Custom Domain (Production)
1. Go to [resend.com/domains](https://resend.com/domains)
2. Add your domain (e.g., `novyrix.com`)
3. Add DNS records:
   - SPF record
   - DKIM record
   - DMARC record (optional)
4. Wait for verification (usually 5-10 minutes)
5. Update `RESEND_FROM_EMAIL` to use your domain:
   ```bash
   RESEND_FROM_EMAIL="Novyrix <hello@novyrix.com>"
   ```

---

## ✅ Post-Deployment Checklist

- [ ] Verify deployment URL works
- [ ] Test user registration/login
- [ ] Test software calculator → quote submission
- [ ] Test automation calculator → quote submission
- [ ] Test contact form → email receipt
- [ ] Check admin dashboard access (create admin user)
- [ ] Verify database connection
- [ ] Test all main pages load correctly
- [ ] Check error pages (404, 500)
- [ ] Verify analytics tracking (Vercel Analytics dashboard)
- [ ] Test mobile responsiveness
- [ ] Check console for errors
- [ ] Verify SSL certificate

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if MySQL server allows connections from Vercel IPs
- Test connection locally first

### Email Not Sending
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for delivery logs
- If using custom domain, verify DNS records

### NextAuth Errors
- Ensure `NEXTAUTH_URL` matches your deployment URL exactly
- Verify `NEXTAUTH_SECRET` is set
- Check if you're using HTTPS (required in production)

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

---

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatically enabled with `@vercel/analytics` package
- View in Vercel dashboard → Analytics tab
- Real-time page views, Web Vitals, custom events

### Speed Insights
- Automatically enabled with `@vercel/speed-insights` package
- View performance metrics in Vercel dashboard

### Custom Events Tracked
- Quote submissions (software & automation)
- Contact form submissions
- Calculator completions
- User registrations/logins
- CTA clicks and conversions

---

## 🔒 Security Notes

1. **Never commit `.env.local` or `.env` to Git** (already in `.gitignore`)
2. **Rotate secrets regularly** (especially `NEXTAUTH_SECRET`)
3. **Use strong passwords** for database and admin accounts
4. **Monitor Resend usage** to detect abuse
5. **Review Vercel logs** regularly for suspicious activity

---

## 🌐 Custom Domain Setup

### Add Domain to Vercel
1. Project Settings → Domains → Add Domain
2. Enter your domain: `novyrix.com`
3. Vercel provides DNS records

### DNS Configuration
Add these records to your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate
- Automatically provisioned by Vercel
- Usually takes 5-10 minutes
- HTTPS enforced automatically

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Resend email logs
3. Check database connection
4. Verify all environment variables are set correctly

---

## 🎉 You're Ready to Launch!

Your Novyrix platform is production-ready with:
- ✅ All features implemented
- ✅ Security hardening complete
- ✅ Legal compliance (Terms & Privacy)
- ✅ Analytics tracking configured
- ✅ Error handling in place
- ✅ Email system ready

**Happy launching! 🚀**
