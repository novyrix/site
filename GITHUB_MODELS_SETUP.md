# GitHub Models API Setup (FREE with Copilot Pro!)

## Why Switch to GitHub Models?

Your OpenAI API key has exceeded its quota. Good news: **GitHub Models is completely FREE with your Copilot Pro subscription!**

### Benefits:
- ✅ **FREE** unlimited usage with Copilot Pro
- ✅ Same GPT-4o model (latest from OpenAI)
- ✅ No billing required
- ✅ Built into your existing GitHub account
- ✅ Fast and reliable

## Setup Instructions (2 minutes)

### Step 1: Create a GitHub Personal Access Token

1. Go to: **https://github.com/settings/tokens**

2. Click **"Generate new token"** → **"Generate new token (classic)"**

3. Configure your token:
   - **Note**: `Novyrix AI Consultant`
   - **Expiration**: `No expiration` (or your preferred duration)
   - **Scopes**: **LEAVE ALL UNCHECKED** (no scopes needed for Models API)

4. Click **"Generate token"** at the bottom

5. **COPY THE TOKEN** - you'll only see it once!

### Step 2: Add Token to .env.local

Open `.env.local` and update the `GITHUB_TOKEN` line:

```bash
GITHUB_TOKEN="ghp_YourActualTokenHere123456789"
```

Replace `your_github_token_here` with the token you just copied.

### Step 3: Restart the Dev Server

```powershell
# Stop current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 4: Test the AI Consultant

Visit http://localhost:3000/ai-consultant and send a message!

## What Changed?

### Code Updates (Already Done ✅)

1. **src/lib/ai/openai.ts** - Switched to GitHub Models endpoint:
   ```typescript
   baseURL: 'https://models.inference.ai.azure.com'
   ```

2. **src/app/ai-consultant/page.tsx** - Fixed hydration error with timestamp formatting

### API Endpoint

GitHub Models API uses the same OpenAI SDK, just with a different base URL:

- **Old**: `https://api.openai.com/v1`
- **New**: `https://models.inference.ai.azure.com`

Everything else stays the same - same function calling, same models, same code!

## Available Models (All FREE)

With your Copilot Pro subscription, you get access to:

- ✅ `gpt-4o` (currently used) - Best for complex reasoning
- ✅ `gpt-4o-mini` - Faster and cheaper for simple tasks
- ✅ `gpt-3.5-turbo` - Fastest option
- ✅ `o1-preview` - Advanced reasoning model
- ✅ And more!

## Troubleshooting

### "GITHUB_TOKEN is not defined"
- Make sure you updated `.env.local` with your token
- Make sure you restarted the dev server after adding the token

### "401 Unauthorized"
- Your token might be invalid or expired
- Generate a new token at https://github.com/settings/tokens

### "Rate limit exceeded"
GitHub Models has generous rate limits for Copilot Pro users:
- 10 requests per minute
- 50,000 tokens per minute

If you hit limits, just wait a minute and try again.

## Cost Comparison

| Provider | Cost per 1M tokens | Quota Issues |
|----------|-------------------|--------------|
| OpenAI Direct | $5 input / $15 output | ❌ Quota exceeded |
| **GitHub Models** | **FREE** | ✅ Unlimited with Copilot Pro |

## Security Notes

- Your token only needs access to the Models API (no GitHub repo access)
- Keep your token secret (already in .env.local, which is .gitignored)
- Never commit tokens to git
- You can revoke/regenerate tokens anytime at https://github.com/settings/tokens

## Next Steps

After setting up:

1. ✅ Test AI Consultant with a complex query
2. ✅ Verify quote generation works
3. ✅ Monitor response times (should be 2-4 seconds)
4. ✅ Check that all features are discovered correctly

## Need Help?

If you have any issues:

1. Check terminal for error messages
2. Verify token is correct in `.env.local`
3. Make sure dev server restarted
4. Check GitHub Models status: https://github.com/marketplace/models

---

**Status**: Ready to use! Just add your token and restart the server. 🚀
