# 🗓️ Novyrix 7-Week Development Roadmap

## Overview
This roadmap will take you from setup to deployment in 7 weeks, building a production-ready platform for Novyrix.

---

## ✅ Foundation (COMPLETE!)
**Status**: ✅ Done
**Duration**: Already completed

### Completed:
- [x] Next.js 14+ setup with TypeScript
- [x] Tailwind CSS with dark theme
- [x] Prisma ORM with complete schema
- [x] All packages installed
- [x] Design system configured
- [x] Secure auth secret generated
- [x] Pricing logic implemented
- [x] Documentation created

---

## 📅 Week 1: UI Component Library
**Goal**: Build reusable, production-ready components
**Duration**: 7 days
**Effort**: ~15-20 hours

### Day 1-2: Core Utilities & Button Component
**Files to Create**:
- `src/lib/utils.ts` - Utility functions (cn helper)
- `src/components/ui/button.tsx` - Button with variants

**Variants**:
- Primary (orange, gradient shadow)
- Secondary (glass effect)
- Ghost (transparent hover)
- Destructive (red, for delete actions)

**States**:
- Default, Hover, Active, Disabled, Loading

**Test**: Create a test page with all button variants

---

### Day 3-4: Card Component
**Files to Create**:
- `src/components/ui/card.tsx` - Glassmorphism cards
- Card, CardHeader, CardTitle, CardContent exports

**Variants**:
- Default (basic glass)
- Elevated (stronger shadow)
- Interactive (hover scale)
- Pricing (orange border)

**Test**: Build sample cards with different content

---

### Day 5: Navigation Component
**Files to Create**:
- `src/components/navigation.tsx` - Main navbar
- `src/components/mobile-menu.tsx` - Mobile hamburger menu

**Features**:
- Logo
- Desktop nav links
- Mobile hamburger (animated)
- Sticky header with blur on scroll
- Active link highlighting

**Links**:
- Home
- Services (dropdown: Website, Software, Automation)
- About
- Portfolio
- Contact
- Login/Register

---

### Day 6: Footer Component
**Files to Create**:
- `src/components/footer.tsx` - Site footer

**Sections**:
- Company info & logo
- Services links
- Quick links (About, Portfolio, Contact)
- Social media icons
- Newsletter signup
- Copyright & legal

---

### Day 7: Preloader Component
**Files to Create**:
- `src/components/preloader.tsx` - Loading animation

**Features**:
- Novyrix logo animation
- Progress bar or spinner
- Smooth fade out
- Show only on initial page load
- Use Framer Motion

**Inspiration**: Apple-style minimalist loader

---

### Week 1 Deliverables:
- ✅ Complete UI component library
- ✅ Navigation & Footer
- ✅ Consistent design system
- ✅ Reusable across entire app

---

## 📅 Week 2: Homepage
**Goal**: Create compelling landing page that converts
**Duration**: 7 days
**Effort**: ~20-25 hours

### Day 1-2: Hero Section
**File**: `src/components/home/hero.tsx`

**Elements**:
- Large animated headline: "Build World-Class Digital Products"
- Subheading about Novyrix services
- Primary CTA: "Get Your Free Quote"
- Secondary CTA: "View Portfolio"
- Background: Subtle gradient animation
- Glassmorphism decorative cards

**Animations**:
- Fade in on load
- Floating elements
- Gradient text animation

---

### Day 3-4: Services Section
**File**: `src/components/home/services.tsx`

**3 Service Cards**:
1. **Website Development**
   - Icon: Globe/Monitor
   - Description: "Modern, responsive websites"
   - Starting price: "From KES 30,000"
   - CTA: "Get Quote"

2. **Software Development**
   - Icon: Code/Terminal
   - Description: "Custom software & SaaS"
   - Starting price: "From KES 400,000"
   - CTA: "Get Quote"

3. **Workflow Automation**
   - Icon: Zap/Workflow
   - Description: "Automate repetitive tasks"
   - CTA: "Free Consultation"

**Features**:
- Hover effects with scale
- Orange glow on hover
- Link to respective calculator

---

### Day 5: About/Why Novyrix Section
**File**: `src/components/home/about.tsx`

**Content**:
- Company mission
- Transparent pricing approach
- Kenyan market focus
- Tech stack badges (Next.js, React, etc.)
- Team photo or values icons

**Layout**: Split-screen (text + visual)

---

### Day 6: Stats/Testimonials Section (Optional)
**File**: `src/components/home/social-proof.tsx`

**Stats** (if available):
- Projects completed
- Happy clients
- Years in business
- Support response time

**OR Testimonials**:
- Client quotes
- Company logos
- Rating stars

---

### Day 7: Homepage Polish & Integration
**File**: `src/app/page.tsx` (update)

**Tasks**:
- Integrate all sections
- Add scroll animations
- Test responsive design
- Optimize performance
- Add SEO metadata

---

### Week 2 Deliverables:
- ✅ Complete, professional homepage
- ✅ All sections animated
- ✅ Mobile responsive
- ✅ Strong call-to-actions

---

## 📅 Week 3: Quote Calculator (Website Development)
**Goal**: Build the core quote calculator feature
**Duration**: 7 days
**Effort**: ~25-30 hours

### Day 1: Calculator Structure & Path Selection
**Files**:
- `src/app/calculator/website/page.tsx`
- `src/components/calculator/path-selection.tsx`

**Path Selection Screen**:
- "I'm not sure what I need" → Guided Path
- "I know the features I want" → Tech Path
- Clean design with card selection
- Icons for each path

---

### Day 2-3: Guided Path (Non-Technical)
**File**: `src/components/calculator/guided-path.tsx`

**Question**: "What is the main goal of your website?"

**Options**:
1. Inform Customers (Base only)
2. Showcase My Work (Base + Gallery)
3. Publish Content (Base + Blog)
4. Book Appointments (Base + Booking)
5. Sell Products Online (Base + E-commerce)
6. Something Totally Custom (Redirect to software)

**Features**:
- Cards for each option
- Icon + description
- Auto-calculate on selection
- Show running total

---

### Day 4: Tech Path (Technical Users)
**File**: `src/components/calculator/tech-path.tsx`

**Checkboxes**:
- [ ] Blog / CMS (+KES 15,000)
- [ ] Advanced Gallery (+KES 15,000)
- [ ] Booking System (+KES 30,000)
- [ ] E-commerce (+KES 60,000)
- [ ] API Integration (+KES 35,000)

**Features**:
- Real-time price updates
- Visual pricing breakdown
- Feature descriptions on hover

---

### Day 5: Hosting & Care Plan Selection
**File**: `src/components/calculator/hosting-options.tsx`

**Hosting**:
- ( ) Novyrix Basic Hosting: KES 3,900/year
- ( ) Novyrix Advanced Hosting: KES 5,800/year
- ( ) I'll manage my own hosting: KES 0

**Care Plan**:
- [ ] Novyrix Care Plan: KES 5,000/month
- [ ] Novyrix E-commerce Plan: KES 12,000/month (if e-commerce selected)

---

### Day 6-7: Quote Summary Page
**File**: `src/components/calculator/quote-summary.tsx`

**Display**:
- Itemized breakdown
  - Base Site: KES 30,000
  - + E-commerce: KES 60,000
  - + Advanced Hosting: KES 5,800/year
  - + Care Plan: KES 5,000/month
- One-time total
- Recurring costs (monthly/yearly)
- Grand total visualization

**Actions**:
- "Lock in This Quote" button
- Save to database
- Create user account (if not logged in)
- Email confirmation

---

### Week 3 Deliverables:
- ✅ Fully functional website calculator
- ✅ Both paths (Guided & Tech) working
- ✅ Quote saving to database
- ✅ Email confirmation sent

---

## 📅 Week 4: Authentication System
**Goal**: Secure login for clients and admins
**Duration**: 7 days
**Effort**: ~20-25 hours

### Day 1-2: NextAuth.js Configuration
**Files**:
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/lib/auth.ts` - Auth utilities
- `src/lib/auth-options.ts` - NextAuth config

**Setup**:
- Credentials provider
- JWT strategy
- bcrypt password hashing
- Session callbacks
- Role-based permissions

---

### Day 3-4: Login & Register Pages
**Files**:
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`

**Login Form**:
- Email input
- Password input
- "Remember me" checkbox
- "Forgot password?" link
- Social login (optional)

**Register Form**:
- Name, Email, Password
- Company (optional)
- Phone (optional)
- Terms & conditions checkbox

**Validation**:
- Client-side validation
- Server-side validation
- Error messages
- Loading states

---

### Day 5: Protected Routes & Middleware
**Files**:
- `src/middleware.ts` - Route protection
- `src/lib/auth-guard.ts` - Auth helpers

**Protect**:
- `/dashboard/*` - Require authentication
- `/admin/*` - Require ADMIN role
- `/calculator/*` - Allow guest, save on login

**Redirect**:
- Unauthenticated → `/login`
- After login → Dashboard or original destination

---

### Day 6: Password Reset Flow
**Files**:
- `src/app/(auth)/forgot-password/page.tsx`
- `src/app/(auth)/reset-password/[token]/page.tsx`
- `src/app/api/auth/reset-password/route.ts`

**Flow**:
1. User enters email
2. Generate reset token
3. Send email with link
4. User clicks link
5. User sets new password
6. Token invalidated

---

### Day 7: Admin Authentication
**Files**:
- `src/app/(auth)/admin/login/page.tsx` - Separate admin login

**Features**:
- Distinct admin login page
- Enhanced security
- Admin role check
- Audit logging

---

### Week 4 Deliverables:
- ✅ Complete authentication system
- ✅ Login, register, password reset
- ✅ Protected routes
- ✅ Role-based access (CLIENT/ADMIN)

---

## 📅 Week 5: Client & Admin Dashboards
**Goal**: Build user portals for managing quotes and projects
**Duration**: 7 days
**Effort**: ~30-35 hours

### Day 1-3: Client Dashboard
**Files**:
- `src/app/(dashboard)/client/page.tsx`
- `src/app/(dashboard)/client/quotes/page.tsx`
- `src/app/(dashboard)/client/projects/page.tsx`
- `src/components/dashboard/quote-card.tsx`
- `src/components/dashboard/project-card.tsx`

**Sections**:
1. **Overview**
   - Welcome message
   - Stats: Total quotes, active projects
   - Quick actions

2. **My Quotes**
   - List all quotes
   - Filter by status (Draft, Submitted, Accepted)
   - View quote details
   - Edit draft quotes

3. **My Projects**
   - Active projects
   - Project status
   - Progress bar
   - Invoice history

4. **Support** (if on Care Plan)
   - Submit ticket
   - View ticket history

---

### Day 4-7: Admin Dashboard
**Files**:
- `src/app/(dashboard)/admin/page.tsx`
- `src/app/(dashboard)/admin/quotes/page.tsx`
- `src/app/(dashboard)/admin/clients/page.tsx`
- `src/app/(dashboard)/admin/projects/page.tsx`
- `src/app/(dashboard)/admin/pricing/page.tsx`

**Sections**:
1. **Overview**
   - Total quotes (this month)
   - Active projects
   - Revenue stats
   - Pending actions

2. **Quote Management**
   - View all quotes
   - Filter/search
   - Update quote status
   - Convert quote to project

3. **Client Management**
   - View all clients
   - Client details
   - Communication history
   - Notes

4. **Project Management**
   - All projects
   - Update status
   - Add invoices
   - Track payments

5. **Pricing Configuration**
   - Edit pricing blocks
   - Update base prices
   - Manage services

6. **Analytics**
   - Quote conversion rate
   - Popular services
   - Revenue trends

---

### Week 5 Deliverables:
- ✅ Client dashboard (view quotes & projects)
- ✅ Admin dashboard (manage everything)
- ✅ Quote & project management
- ✅ Pricing configuration

---

## 📅 Week 6: Additional Calculators
**Goal**: Build software and automation calculators
**Duration**: 7 days
**Effort**: ~20-25 hours

### Day 1-4: Software Development Calculator
**Files**:
- `src/app/calculator/software/page.tsx`
- `src/components/calculator/project-type.tsx`
- `src/components/calculator/complexity-assessment.tsx`
- `src/components/calculator/software-result.tsx`

**Flow**:
1. **Project Type**
   - Business Software
   - SaaS Application
   - Mobile App
   - Software Audit

2. **Project Stage**
   - Idea Only
   - Designs Ready
   - Full Specs

3. **Features Checklist**
   - User accounts & login
   - Payments / subscriptions
   - Admin dashboard
   - Real-time features
   - API integrations
   - Reporting

4. **Complexity Scoring**
   - Calculate score (1-10)
   - Map to tier (Simple/Medium/Complex)

5. **Result**
   - Show ballpark estimate
   - Offer Discovery Phase (KES 75,000)
   - CTA: "Book Discovery Phase"

---

### Day 5-7: Workflow Automation Funnel
**Files**:
- `src/app/calculator/automation/page.tsx`
- `src/components/calculator/automation-qualification.tsx`
- `src/components/calculator/automation-result.tsx`

**Questions**:
1. **Business Area**
   - Sales, Operations, Marketing, HR

2. **Current Tools**
   - Paper/email
   - Spreadsheets
   - Digital tools (CRM, etc.)
   - Advanced software

3. **Hours Per Week on Manual Tasks**
   - 1-5 hours
   - 5-15 hours
   - 15+ hours

**Result Logic**:
- **High Priority** (15+ hours + digital tools)
  → "Free 30-Min Automation Audit"
- **Foundation Needed** (< 5 hours or paper-based)
  → "Free Consultation"

**CTA**: Book calendar appointment

---

### Week 6 Deliverables:
- ✅ Software development calculator
- ✅ Automation qualification funnel
- ✅ All three calculators complete
- ✅ Lead capture system

---

## 📅 Week 7: Polish, Testing & Deployment
**Goal**: Launch production-ready platform
**Duration**: 7 days
**Effort**: ~25-30 hours

### Day 1-2: Email Integration
**Setup**:
- Install Resend or SendGrid
- Create email templates
- Configure SMTP

**Emails**:
1. Welcome email (new user)
2. Quote confirmation
3. Project status update
4. Invoice reminder
5. Password reset
6. Admin notifications

---

### Day 3: SEO Optimization
**Tasks**:
- Add metadata to all pages
- OpenGraph images
- Structured data (JSON-LD)
- Create sitemap.xml
- Create robots.txt
- Add canonical URLs
- Optimize images

---

### Day 4: Performance Optimization
**Tasks**:
- Run Lighthouse audit
- Optimize images (next/image)
- Code splitting
- Lazy loading
- Font optimization
- Reduce bundle size
- Enable ISR where applicable

---

### Day 5: Testing
**Test**:
- All calculator paths
- Authentication flows
- Dashboard features
- Mobile responsiveness
- Cross-browser compatibility
- Form validations
- Error handling
- Loading states

---

### Day 6: Security Audit
**Check**:
- Environment variables secure
- API routes protected
- SQL injection prevented (Prisma)
- XSS prevention
- CSRF tokens
- Rate limiting on API
- Secure headers

---

### Day 7: Vercel Deployment
**Steps**:
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Configure database (production)
5. Run initial deployment
6. Test production build
7. Set up custom domain
8. Enable Vercel Analytics
9. Monitor performance

---

### Week 7 Deliverables:
- ✅ Email system working
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Fully tested
- ✅ Deployed to production
- ✅ **LIVE! 🚀**

---

## 📊 Summary

### Total Timeline: 7 Weeks
- **Week 1**: UI Components
- **Week 2**: Homepage
- **Week 3**: Website Calculator
- **Week 4**: Authentication
- **Week 5**: Dashboards
- **Week 6**: Other Calculators
- **Week 7**: Launch

### Total Effort: ~180-200 hours
- Average: 25-30 hours/week
- ~4-5 hours/day if working daily
- ~6-8 hours/day if working 3-4 days/week

### Key Milestones:
- ✅ Week 1: Can build pages with components
- ✅ Week 2: Have a landing page
- ✅ Week 3: Can generate quotes
- ✅ Week 4: Users can sign up
- ✅ Week 5: Users can manage projects
- ✅ Week 6: All services available
- ✅ Week 7: **LAUNCH!**

---

## 🎯 Success Metrics

By the end of 7 weeks, you will have:
- ✅ Production-ready Novyrix platform
- ✅ 3 quote calculators
- ✅ Client & admin portals
- ✅ Secure authentication
- ✅ Email system
- ✅ Database with all data
- ✅ Mobile-responsive design
- ✅ SEO optimized
- ✅ Deployed on Vercel
- ✅ Ready to acquire customers!

---

**Start Date**: After database connection is fixed
**End Date**: 7 weeks later
**Launch**: Production-ready Novyrix platform

**Let's build! 🚀**
