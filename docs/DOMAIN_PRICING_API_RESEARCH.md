# Domain Pricing API Research

## Overview
This document outlines the best platforms for sourcing domain pricing data, prioritizing Kenyan providers first, then international options.

---

## 🇰🇪 KENYAN DOMAIN REGISTRARS

### 1. **Kenya Network Information Center (KENIC)** ⭐ RECOMMENDED
- **Website**: https://www.kenic.or.ke
- **Focus**: Official registry for .ke domains
- **API Status**: Limited - primarily for registrars
- **Pricing**:
  - .co.ke: ~KES 1,500/year
  - .ke: ~KES 2,500/year
- **Pros**:
  - Official Kenyan registry
  - Most authoritative for .ke domains
  - Direct pricing
- **Cons**:
  - No public API for pricing
  - Must work through accredited registrars
- **Integration**: Contact for registrar partnership

### 2. **Safaricom Digital** ⭐ PRIORITY
- **Website**: https://www.safaricom.co.ke/business/solutions/web-services
- **API**: Available for business partners
- **Pricing**: Competitive for Kenyan market
- **Pros**:
  - Largest telco in Kenya
  - M-Pesa integration available
  - Local support
  - Trust factor with Kenyan businesses
- **Cons**:
  - Partnership required
  - May have minimum volumes
- **Integration**: Apply for API access through business portal

### 3. **Truehost Kenya**
- **Website**: https://truehost.co.ke
- **API**: WHMCS integration available
- **Pricing**:
  - .co.ke: KES 999/year
  - .com: KES 1,200/year
- **Pros**:
  - Popular in Kenya
  - Competitive pricing
  - WHMCS API for automation
- **Cons**:
  - Requires reseller account
- **Integration**: https://truehost.co.ke/reseller-hosting

### 4. **Jambo Domains**
- **Website**: https://jambodomains.co.ke
- **API**: Limited
- **Pricing**: Standard Kenyan rates
- **Pros**:
  - Local presence
  - Kenya-focused
- **Cons**:
  - Limited API documentation
  - Smaller player

---

## 🌍 INTERNATIONAL DOMAIN PRICING APIS

### 1. **Namecheap API** ⭐ HIGHLY RECOMMENDED
- **Website**: https://www.namecheap.com/support/api/intro/
- **Documentation**: https://www.namecheap.com/support/api/methods/
- **API Type**: REST API
- **Pricing**:
  - API access: FREE with $50+ account balance
  - Sandbox available for testing
  - .com domains: ~$8.88/year
- **Features**:
  - Domain availability check
  - Real-time pricing
  - Domain registration
  - DNS management
  - SSL certificates
- **Pros**:
  - Comprehensive API
  - Well-documented
  - Competitive pricing
  - Sandbox environment
  - Good uptime
- **Cons**:
  - Requires API whitelist (IP whitelisting)
  - $50 minimum balance
- **Integration Effort**: Medium
- **Code Example**:
```javascript
// Check domain availability
GET https://api.namecheap.com/xml.response
?ApiUser=username
&ApiKey=key
&UserName=username
&Command=namecheap.domains.check
&ClientIp=your-ip
&DomainList=example.com,example.net
```

### 2. **GoDaddy API** ⭐ RECOMMENDED
- **Website**: https://developer.godaddy.com
- **Documentation**: https://developer.godaddy.com/doc
- **API Type**: REST API (JSON)
- **Pricing**:
  - API access: FREE
  - Production requires domain reseller account
- **Features**:
  - Domain search
  - Pricing information
  - Domain purchase
  - DNS management
  - Email services
- **Pros**:
  - Free API access
  - Excellent documentation
  - No IP whitelisting required
  - OpenAPI/Swagger spec
  - Global reach
- **Cons**:
  - Reseller account needed for production
  - Higher domain prices
- **Integration Effort**: Easy
- **Code Example**:
```javascript
// Get domain availability
GET https://api.godaddy.com/v1/domains/available?domain=example.com
Headers:
  Authorization: sso-key {key}:{secret}
```

### 3. **ResellerClub API**
- **Website**: https://www.resellerclub.com
- **Documentation**: https://manage.resellerclub.com/kb/answer/751
- **API Type**: REST/JSON API
- **Pricing**:
  - Reseller account required
  - Competitive wholesale prices
  - .com: ~$8/year
- **Features**:
  - Complete domain management
  - Hosting APIs
  - SSL certificates
  - Email services
- **Pros**:
  - Comprehensive platform
  - Good for white-label solutions
  - Competitive pricing
  - Multiple TLDs supported
- **Cons**:
  - Reseller account setup required
  - Complex pricing structure
- **Integration Effort**: Medium

### 4. **Enom API**
- **Website**: https://www.enom.com
- **Documentation**: https://www.enom.com/api/
- **API Type**: REST API
- **Pricing**:
  - Reseller account required
  - Minimum deposit: $500
- **Features**:
  - Domain registration
  - DNS management
  - WHOIS privacy
  - Domain transfer
- **Pros**:
  - Reliable platform
  - Good documentation
  - Many TLDs
- **Cons**:
  - High minimum deposit
  - Dated API design
- **Integration Effort**: Medium-High

### 5. **Gandi API** ⭐ DEVELOPER FRIENDLY
- **Website**: https://www.gandi.net
- **Documentation**: https://api.gandi.net/docs/
- **API Type**: REST API (JSON)
- **Pricing**:
  - API access: FREE
  - Transparent pricing
  - .com: ~$15/year
- **Features**:
  - Domain operations
  - DNS management
  - SSL certificates
  - Email forwarding
- **Pros**:
  - Excellent developer experience
  - Modern API design
  - No hidden fees
  - Good documentation
  - Ethical practices
- **Cons**:
  - Higher prices
  - Smaller market share
- **Integration Effort**: Easy

### 6. **Name.com API**
- **Website**: https://www.name.com/api
- **Documentation**: https://www.name.com/api-docs/
- **API Type**: REST API (JSON)
- **Pricing**:
  - API access with account
  - Competitive pricing
- **Features**:
  - Domain search
  - Registration
  - DNS management
- **Pros**:
  - Clean API
  - Good docs
  - Fair pricing
- **Cons**:
  - Less feature-rich than competitors
- **Integration Effort**: Easy

---

## 📊 RECOMMENDED IMPLEMENTATION STRATEGY

### Phase 1: Kenya-First Approach
1. **Primary**: Partner with Safaricom Digital for .ke domains
2. **Secondary**: Integrate Truehost Kenya for backup
3. **Display**: Show Kenyan pricing prominently

### Phase 2: International Coverage
1. **Primary International**: GoDaddy API (easiest to integrate)
2. **Secondary**: Namecheap API (better pricing)
3. **Premium**: Gandi API (for clients who value privacy/ethics)

### Phase 3: Unified Pricing Service
Create internal API that aggregates:
```javascript
GET /api/domain/check?domain=example.com
Response:
{
  "available": true,
  "domain": "example.com",
  "prices": {
    "ke": {
      "provider": "Truehost Kenya",
      "registration": 1200,
      "renewal": 1200,
      "currency": "KES"
    },
    "international": {
      "provider": "GoDaddy",
      "registration": 1500,
      "renewal": 1800,
      "currency": "KES" // converted
    }
  },
  "recommended": "ke" // Kenya-first
}
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### Recommended Tech Stack
```typescript
// Domain pricing service
export class DomainPricingService {
  // Kenya providers
  async checkKenyanPricing(domain: string) {
    // Safaricom API
    // Truehost API
  }

  // International providers
  async checkInternationalPricing(domain: string) {
    // GoDaddy API
    // Namecheap API
  }

  // Unified response
  async getDomainPricing(domain: string) {
    const [kenyan, international] = await Promise.all([
      this.checkKenyanPricing(domain),
      this.checkInternationalPricing(domain)
    ]);

    return {
      available: kenyan.available || international.available,
      prices: { kenyan, international },
      recommended: kenyan.available ? 'kenyan' : 'international'
    };
  }
}
```

### Database Schema Addition
```prisma
model DomainQuote {
  id              String   @id @default(cuid())
  domain          String
  tld             String
  available       Boolean

  // Kenyan pricing
  kenyanProvider  String?
  kenyanPrice     Decimal? @db.Decimal(10, 2)

  // International pricing
  intlProvider    String?
  intlPrice       Decimal? @db.Decimal(10, 2)

  // Recommendation
  recommended     String   // 'kenyan' or 'international'

  userId          String?
  createdAt       DateTime @default(now())
  expiresAt       DateTime // Cache for 24 hours

  @@index([domain])
  @@index([createdAt])
}
```

---

## 💰 COST ANALYSIS

### Setup Costs
- **Safaricom Partnership**: Contact for details
- **Truehost Reseller**: ~KES 15,000/year
- **GoDaddy Reseller**: FREE (pay-as-you-go)
- **Namecheap**: $50 minimum deposit

### Per-Transaction Costs
- **Kenya (.co.ke)**: KES 1,000 - 1,500/year
- **International (.com)**: KES 1,200 - 1,800/year
- **Markup Recommendation**: 20-30% for sustainability

---

## 🎯 IMMEDIATE NEXT STEPS

1. **Contact Safaricom Digital** - Apply for API partnership
2. **Setup GoDaddy Developer Account** - Start integration immediately
3. **Register Truehost Reseller** - Backup for Kenyan domains
4. **Build Unified API** - Abstract provider differences
5. **Add Domain Pricing Page** - Show transparent pricing to clients

---

## 📞 CONTACT INFORMATION

### Safaricom Digital
- Email: digitalbusiness@safaricom.co.ke
- Phone: +254 711 042 000

### Truehost Kenya
- Email: support@truehost.co.ke
- Phone: +254 20 528 5000

### GoDaddy Developer Support
- Website: https://developer.godaddy.com/support
- Email: apisupport@godaddy.com

---

**Last Updated**: November 21, 2025
**Next Review**: January 2026
