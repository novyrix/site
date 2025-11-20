# Admin Dashboard - Novy AI Training

## Overview
The admin dashboard allows you to review queries where Novy AI couldn't find good feature matches, helping you improve the pricing matrix over time.

## Access
Navigate to: `/admin/unmapped-queries`

**Note:** Auth is temporarily disabled for development. In production, you'll need admin credentials.

## How It Works

### Automatic Query Logging
When a user searches and Novy finds **fewer than 3 matching features**, the query is automatically logged to the database for review. This threshold helps identify:
- Missing features in your pricing matrix
- Inadequate keywords on existing features
- Edge cases that need special handling

### Dashboard Features

1. **Stats Overview**
   - Total queries logged
   - Queries needing review
   - Already reviewed queries

2. **Query Cards**
   Each card shows:
   - User's original message
   - Number of features found (color-coded: red=0, yellow=1-2, blue=3+)
   - Timestamp
   - Novy's response (expandable)

3. **Actions**
   - **Show/Hide Response**: View Novy's full response to understand context
   - **Export Template**: Downloads a JSON template for creating a new feature
   - **Mark Reviewed**: Add notes about what action you took

### Workflow

#### Step 1: Review the Query
Read what the user was looking for. Common patterns:
- User describes a feature not in your matrix
- User uses different terminology than your keywords
- User asks about custom/complex requirements

#### Step 2: Decide on Action

**If the feature exists:**
1. Open `src/data/websiteMatrix.json` or `automationMatrix.json`
2. Find the relevant feature (e.g., `WEB-001`, `AUTO-005`)
3. Add missing keywords to the `keywords` or `tags` array
4. Example:
   ```json
   {
     "featureId": "WEB-001",
     "keywords": [
       "landing page",
       "home page",
       "hero section",
       "conversion funnel" // <- Added based on query
     ]
   }
   ```

**If the feature is missing:**
1. Click "Export Template" to download a starter JSON
2. Fill in the details:
   ```json
   {
     "featureId": "WEB-025", // Next available ID
     "name": "Waitlist Landing Page",
     "description": "Pre-launch landing page with email collection and countdown timer",
     "complexity": 2,
     "basePrice": 15000,
     "tags": ["marketing", "pre-launch", "conversion"],
     "keywords": ["waitlist", "coming soon", "email signup", "countdown"],
     "requiresDiscovery": false
   }
   ```
3. Add the feature object to the appropriate matrix file
4. Save and commit changes

**If the query is irrelevant:**
Simply mark as reviewed with notes like "Out of scope" or "Already handled in conversation"

#### Step 3: Mark as Reviewed
1. Click "Mark Reviewed"
2. Add notes about what you did:
   - "Added 'waitlist' keyword to WEB-001"
   - "Created new feature WEB-025 for pre-launch pages"
   - "Out of scope - user asking about hosting only"
3. Click "Confirm"

The query disappears from the dashboard once marked as reviewed.

### Tips for Effective Training

1. **Look for Patterns**: If 5 users ask about "chatbots", you probably need a chatbot feature
2. **Be Liberal with Keywords**: Add variations, synonyms, common misspellings
3. **Review Weekly**: Set aside time each week to process new queries
4. **Track Metrics**: Watch the "Features Found" count improve over time
5. **Export First**: Use the export template feature to speed up creating new features

### Example Scenarios

**Scenario 1: Missing Keywords**
- Query: "I need a website with a membership area"
- Features Found: 0
- Action: Open `websiteMatrix.json`, find user authentication feature, add "membership", "member portal", "restricted content" to keywords

**Scenario 2: New Feature Needed**
- Query: "Can you build a job board with applicant tracking?"
- Features Found: 1 (only found "dashboard")
- Action: Create new feature "Job Board Platform" with ATS, job listings, application management

**Scenario 3: Already Covered**
- Query: "How much for a basic website?"
- Features Found: 2
- Action: Mark reviewed with note "Query too vague, Novy handled appropriately"

## Development

### Create Admin User
Run this command to create an admin account:
```bash
npx tsx scripts/create-admin.ts
```

Default credentials:
- Email: `admin@novyrix.com`
- Password: `Admin123!`

**Change the password immediately after first login!**

### Re-enable Authentication
In production, uncomment the auth checks:

**File:** `src/app/admin/unmapped-queries/page.tsx`
```typescript
const session = await auth();
if (!session || session.user.role !== "ADMIN") {
  redirect("/login");
}
```

**File:** `src/app/api/admin/unmapped-queries/route.ts`
```typescript
const session = await auth();
if (!session || session.user.role !== "ADMIN") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

## Database Schema

```prisma
model UnmappedQuery {
  id           String   @id @default(cuid())
  sessionId    String
  userMessage  String   @db.Text
  aiResponse   String?  @db.Text
  featuresFound Int     @default(0)
  wasHelpful   Boolean  @default(false)
  needsReview  Boolean  @default(true)
  reviewNotes  String?  @db.Text
  createdAt    DateTime @default(now())
  reviewedAt   DateTime?
}
```

## API Endpoints

### PATCH `/api/admin/unmapped-queries`
Mark a query as reviewed.

**Body:**
```json
{
  "queryId": "clxy123abc",
  "reviewNotes": "Added keywords to WEB-001"
}
```

**Response:**
```json
{
  "success": true,
  "query": { ... }
}
```

## Troubleshooting

### "Property 'unmappedQuery' does not exist"
Run: `npx prisma generate` and restart your editor's TypeScript server.

### No Queries Appearing
Test the system by:
1. Go to `/ai-consultant`
2. Ask: "Do you build quantum computing interfaces?"
3. This should trigger logging (< 3 features matched)
4. Check `/admin/unmapped-queries`

### Can't Access Dashboard
- Check if auth is disabled (see "Re-enable Authentication")
- Ensure you're using admin credentials
- Check browser console for errors
