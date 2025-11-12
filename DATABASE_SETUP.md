# 🗄️ Database Setup Instructions

## Important Notice

Your database credentials are configured, but the database server is not accessible at `localhost:3306`. This is normal if your MySQL database is hosted remotely (e.g., on your web hosting provider).

## Current Database Configuration

```
Database: mdawidah_novyrix
User: mdawidah_novyrix
Password: ZsF40IaVYzIX
Current URL: mysql://mdawidah_novyrix:ZsF40IaVYzIX@localhost:3306/mdawidah_novyrix
```

## Action Required: Update Database URL

### Option 1: Remote MySQL Database (Most Likely)

If your MySQL is hosted remotely (e.g., cPanel, shared hosting), update the DATABASE_URL in `.env.local`:

```env
# Replace 'localhost' with your actual database host
DATABASE_URL="mysql://mdawidah_novyrix:ZsF40IaVYzIX@your-database-host.com:3306/mdawidah_novyrix"
```

**Common hosting providers:**
- **cPanel/Shared Hosting**: Usually `localhost` or an IP like `127.0.0.1`
- **Remote Server**: Full domain or IP address
- **PlanetScale**: Use the connection string they provide
- **Railway**: Use the connection URL from Railway dashboard

### Option 2: Local MySQL (If Testing Locally)

If you want to use a local MySQL server:

1. **Install MySQL locally:**
   - Download from https://dev.mysql.com/downloads/mysql/
   - Or install via package manager

2. **Start MySQL service:**
   ```powershell
   # Windows - Start MySQL service
   net start MySQL80
   ```

3. **Create the database:**
   ```bash
   mysql -u root -p
   CREATE DATABASE mdawidah_novyrix;
   CREATE USER 'mdawidah_novyrix'@'localhost' IDENTIFIED BY 'ZsF40IaVYzIX';
   GRANT ALL PRIVILEGES ON mdawidah_novyrix.* TO 'mdawidah_novyrix'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

### Option 3: Use PlanetScale (Recommended for Development)

PlanetScale provides free serverless MySQL:

1. Sign up at https://planetscale.com
2. Create a new database
3. Get connection string
4. Update `.env.local` with PlanetScale URL

## Push Schema to Database

Once you've updated the DATABASE_URL with the correct host:

```bash
# Push schema to database
npm run prisma:push

# Verify with Prisma Studio
npm run prisma:studio
```

## Vercel Deployment

When deploying to Vercel, add the DATABASE_URL as an environment variable in your Vercel project settings with the production database URL.

## Tables That Will Be Created

When you run `prisma:push`, these tables will be created:

- ✅ **User** - Client and admin accounts
- ✅ **Account** - OAuth accounts (for future social login)
- ✅ **Session** - User sessions
- ✅ **VerificationToken** - Email verification tokens
- ✅ **Quote** - All quote calculator data
- ✅ **Project** - Active client projects
- ✅ **Invoice** - Payment tracking
- ✅ **SupportTicket** - Support tickets for Care Plan clients
- ✅ **Service** - Available services
- ✅ **PricingBlock** - Configurable pricing blocks

## Need Help?

If you're unsure about your database host:
1. Check your hosting provider's cPanel or control panel
2. Look for "MySQL Databases" or "Database Configuration"
3. Find the "MySQL Host" or "Database Host" setting
4. Use that value in your DATABASE_URL

---

**Status**: ⚠️ Database connection not yet established
**Next Step**: Update DATABASE_URL with correct host, then run `npm run prisma:push`
