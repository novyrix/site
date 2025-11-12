# 🚀 Novyrix - Digital IT Solutions Platform

Modern, glassmorphism-styled web platform for Novyrix - a Kenyan digital IT company specializing in software development, website development, and workflow automation.

## 🎯 Project Overview

Novyrix is a transparent, modern IT solutions company that helps Kenyan businesses build world-class digital products. This platform features:

- **Interactive Quote Calculator** - Get instant, transparent pricing for services
- **Client Portal** - Track projects, quotes, and support tickets
- **Admin Dashboard** - Manage clients, projects, and pricing
- **Secure Authentication** - Separate client and admin login systems
- **Care Plan System** - Subscription-based maintenance and support

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Glassmorphism** - Apple-inspired dark theme design
- **Custom Fonts** - Inter, Space Grotesk, JetBrains Mono

### Database & Auth
- **Prisma ORM** - Type-safe database client
- **MySQL** - Production database
- **NextAuth.js v5** - Authentication system
- **bcryptjs** - Password hashing

### Additional Tools
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variants
- **clsx** - Conditional classes

## 📁 Project Structure

```
novyrixapp/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Auth routes (login, register)
│   │   ├── (dashboard)/      # Dashboard routes
│   │   ├── calculator/       # Quote calculator
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── calculator/      # Calculator components
│   │   └── dashboard/       # Dashboard components
│   ├── lib/                  # Utility functions
│   │   ├── prisma.ts        # Prisma client
│   │   └── auth.ts          # Auth utilities
│   └── types/                # TypeScript types
├── .env.local                # Environment variables
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MySQL database (local or remote)
- npm or yarn package manager

### 1. Clone and Install

```bash
cd novyrixapp
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` file with your database credentials:

```env
# Database
DATABASE_URL="mysql://mdawidah_novyrix:ZsF40IaVYzIX@localhost:3306/mdawidah_novyrix"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-secret-key-here"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Novyrix"
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database (for development)
npm run prisma:push

# Or run migrations (for production)
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

### Color Palette
- **Primary (Orange)**: `#FF6B35` - Brand color, CTAs, accents
- **Background (Black)**: `#000000` - Main background
- **Glass Effects**: Semi-transparent whites with backdrop blur

### Typography
- **Headings**: Space Grotesk - Bold, modern display font
- **Body**: Inter - Clean, readable paragraph font
- **Code/Numbers**: JetBrains Mono - Monospace for technical content

### Components
All components follow Apple's glassmorphism design language:
- Subtle backdrop blur
- Semi-transparent backgrounds
- Smooth hover transitions
- Orange accent highlights

## 💰 Pricing Model Implementation

### Website Development Calculator

**Base Price**: KES 30,000
- Starter site (1-3 pages)
- Professional design
- Responsive & mobile-first
- Admin panel

**Add-on Blocks**:
- Blog/CMS: +KES 15,000
- Advanced Gallery: +KES 15,000
- Booking System: +KES 30,000
- E-commerce: +KES 60,000
- API Integration: +KES 35,000

**Hosting & Maintenance**:
- Basic Hosting: KES 3,900/year
- Advanced Hosting: KES 5,800/year
- Care Plan: KES 5,000/month
- E-commerce Plan: KES 12,000/month

### Software Development
- Tier 1 (Simple): KES 400,000 - 900,000
- Tier 2 (Medium): KES 900,000 - 2,500,000
- Tier 3 (Complex): KES 2,500,000+
- Discovery Phase: KES 75,000
- Technical Audit: KES 100,000

### Workflow Automation
Qualification-based - leads to consultation booking

## 🔐 Authentication System

### Client Auth
- Email/password registration
- Protected client portal routes
- Quote management
- Project tracking

### Admin Auth
- Elevated permissions
- Admin dashboard access
- Client management
- Pricing configuration

## 📊 Database Schema

### Key Models
- **User** - Client and admin accounts
- **Quote** - Calculator quotes with all selections
- **Project** - Active client projects
- **Invoice** - Payment tracking
- **SupportTicket** - Care Plan support requests
- **Service** - Available services
- **PricingBlock** - Configurable pricing blocks

See `prisma/schema.prisma` for full schema.

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub: `https://github.com/novyrix/site`

2. Connect to Vercel:
   - Import GitHub repository
   - Configure environment variables
   - Deploy

3. Set Environment Variables in Vercel:
   ```
   DATABASE_URL
   NEXTAUTH_URL (production URL)
   NEXTAUTH_SECRET
   ```

### Database
Ensure your MySQL database is accessible from Vercel's servers. Use:
- PlanetScale (serverless MySQL)
- Railway
- Your hosting provider's MySQL

## 📦 Key Features to Implement

### Phase 1: Foundation ✅
- [x] Next.js setup
- [x] Tailwind configuration
- [x] Prisma schema
- [x] Database connection
- [x] Design system

### Phase 2: Core Components
- [ ] Navigation component
- [ ] Button variants
- [ ] Card components
- [ ] Preloader animation
- [ ] Footer component

### Phase 3: Calculator
- [ ] Website development calculator
- [ ] Software development calculator
- [ ] Automation qualification funnel
- [ ] Quote summary page

### Phase 4: Authentication
- [ ] NextAuth configuration
- [ ] Client registration/login
- [ ] Admin authentication
- [ ] Protected routes

### Phase 5: Dashboards
- [ ] Client dashboard
- [ ] Admin dashboard
- [ ] Quote management
- [ ] Project tracking

### Phase 6: Polish
- [ ] Email notifications
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Testing & QA

## 🤝 Contributing

This is a private project for Novyrix. If you're part of the team:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📄 License

Private - Novyrix © 2025

## 🆘 Support

For technical questions or issues:
- Check the documentation above
- Review the pricing model document
- Contact the development team

---

**Built with ❤️ by Novyrix**
