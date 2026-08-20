# Google Auth Platform Setup

## Project

- Google Cloud project: `novyrix-platform`
- Project number: `466245149840`
- Application type: Web application
- Suggested client name: `Novyrix Web`

Google's standard web OAuth client is created in Google Cloud Console, not with the `gcloud iam oauth-clients` commands. Those commands create workforce or IAP clients and are not interchangeable with Google sign-in for Auth.js.

## Branding

- App name: `Novyrix`
- User support email: `spira@novyrix.com`
- Developer contact email: `spira@novyrix.com`
- Homepage: `https://novyrix.com`
- Privacy policy: `https://novyrix.com/privacy`
- Terms: `https://novyrix.com/terms`

Use the external audience unless every approved user belongs to one Google Workspace organization. Only the basic `openid`, `email`, and `profile` scopes are required.

## Authorized Origins

- `https://novyrix.com`
- `https://www.novyrix.com`
- `https://novyrix-preview.vercel.app`
- `http://localhost:3000`

## Redirect URIs

- `https://novyrix.com/api/auth/callback/google`
- `https://www.novyrix.com/api/auth/callback/google`
- `https://novyrix-preview.vercel.app/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/google`

Google does not allow wildcard OAuth redirect URIs. The Vercel preview deployment should therefore receive the stable `novyrix-preview.vercel.app` alias before preview sign-in is tested.

## Vercel Variables

Add the generated values as sensitive variables for Preview and Production:

- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

Then redeploy so Auth.js initializes the Google provider. Do not place the client secret in a tracked file.

## Access Rules

- The Google profile must report a verified email address.
- Admin access requires an exact match in `NOVYRIX_ADMIN_EMAIL`.
- Client access requires an existing, non-disabled `PortalUser` with at least one `PortalMembership`.
- Sign-in never creates a client account automatically.
- The credentials provider is unavailable whenever `VERCEL=1`.

## Verification

1. Sign in with the configured admin Google account and confirm redirect to `/admin`.
2. Sign in with a provisioned client email and confirm redirect to `/portal`.
3. Sign in with an unknown Google account and confirm access is denied.
4. Confirm `/admin` rejects a client session and `/portal` rejects an admin session.
5. Confirm both root and `www` domains complete the callback without a redirect mismatch.
