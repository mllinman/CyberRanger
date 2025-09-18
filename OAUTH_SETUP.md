# OAuth Setup Guide

This guide explains how to set up OAuth applications for Google and GitHub authentication in CyberRecon Suite.

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create a new "OAuth 2.0 Client ID"
5. Configure the authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your environment variables:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

## GitHub OAuth Setup

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. Create a new OAuth App with:
   - Application name: "CyberRecon Suite"
   - Homepage URL: `http://localhost:3000` (development) or your domain
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret to your environment variables:
   ```
   GITHUB_ID=your_github_oauth_app_id
   GITHUB_SECRET=your_github_oauth_app_secret
   ```

## Environment Variables

Create a `.env.local` file in the client directory with:

```bash
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret

# Stripe Configuration (for subscription management)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Stripe Webhook Setup

1. Go to your Stripe Dashboard > Developers > Webhooks
2. Create a new webhook endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Backend Environment Variables

Create a `.env` file in the server directory:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/cyberrecon

# JWT Secret
JWT_SECRET=your-jwt-secret-key

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Testing

After setting up the environment variables:

1. Start the backend: `cd server && npm run dev`
2. Start the frontend: `cd client && npm run dev`
3. Visit `http://localhost:3000/pricing` and test the authentication flow
4. Try signing up with different methods (email, Google, GitHub)

## Production Deployment

For production:

1. Update redirect URIs in OAuth applications to use your production domain
2. Set `NEXTAUTH_URL` to your production URL
3. Use production Stripe keys
4. Set up proper SSL certificates
5. Configure webhook endpoints with your production domain