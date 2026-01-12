# Railway Deployment Guide for CyberStore

This guide will help you deploy the CyberStore application to Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. Railway CLI installed (optional, for command-line deployment)
3. Environment variables configured

## Quick Deploy (Web Interface)

### Step 1: Create a New Project

1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select this repository
4. Railway will automatically detect the configuration files

### Step 2: Configure Environment Variables

Add the following environment variables in the Railway dashboard:

**Required:**
- `NODE_ENV=production`
- `PORT` (Railway sets this automatically - **DO NOT manually override** unless you know what you're doing. Railway uses this for healthchecks.)

**Important Note about PORT:**
Railway automatically injects a `PORT` environment variable that your application must listen on. This port is also used for healthcheck requests. The application is configured to read this variable correctly. If you manually set a PORT variable, ensure it matches the port your application listens on to avoid healthcheck failures.

**Database (Required for full functionality):**
- `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cyberstore`

**Authentication:**
- `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production`

**Stripe (Required for payments):**
- `STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key`
- `STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key`
- `STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret`

**Optional:**
- `CLIENT_URL=https://your-frontend-domain.com`
- `EMAIL_HOST=smtp.gmail.com`
- `EMAIL_PORT=587`
- `EMAIL_USER=your-email@gmail.com`
- `EMAIL_PASS=your-app-password`

### Step 3: Deploy

Railway will automatically:
1. Install dependencies
2. Build the application
3. Start the server
4. Provide you with a public URL

## CLI Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project (first time only)
railway init

# Link to existing project (if already created)
railway link

# Set environment variables
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=your-mongodb-uri
railway variables set JWT_SECRET=your-jwt-secret
railway variables set STRIPE_SECRET_KEY=your-stripe-key

# Deploy
npm run deploy:railway
```

## Database Setup

### Option 1: Railway PostgreSQL (Not currently supported)
The app currently uses MongoDB. You would need to modify the code to use PostgreSQL.

### Option 2: MongoDB Atlas (Recommended)

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Add a database user
4. Whitelist all IPs (0.0.0.0/0) for Railway access
5. Get your connection string
6. Add it to Railway as `MONGODB_URI`

### Option 3: Railway MongoDB Plugin

1. In your Railway project dashboard
2. Click "New" → "Database" → "Add MongoDB"
3. Railway will automatically set the `MONGODB_URI` variable

## Stripe Configuration

1. Go to https://dashboard.stripe.com/
2. Get your API keys from the Developers section
3. Add them to Railway environment variables
4. Set up webhooks:
   - Webhook URL: `https://your-railway-app.railway.app/api/payments/webhook`
   - Events to listen: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook signing secret to Railway

## Health Check

After deployment, verify your app is running:

```bash
curl https://your-app.railway.app/api/health
```

### Railway Healthcheck Configuration

The application is configured to work with Railway's healthcheck system:

- **Healthcheck Path**: `/api/health` (configured in `railway.json`)
- **Healthcheck Timeout**: 300 seconds (5 minutes)
- **Healthcheck Hostname**: Railway uses `healthcheck.railway.app` as the hostname for healthcheck requests
- **Response**: Always returns HTTP 200 status code, even during startup

The server is configured to:
1. Accept requests from the `healthcheck.railway.app` hostname
2. Respond immediately to healthcheck requests, even during initialization
3. Listen on the `PORT` environment variable that Railway provides
4. Return a 200 status code to indicate the service is available

Expected response during startup:
```json
{
  "status": "OK",
  "ready": false,
  "message": "CyberStore API is starting up",
  "timestamp": "2024-01-08T...",
  "environment": "production",
  "database": "disconnected",
  "stripe": "configured",
  "port": "8000"
}
```

Expected response after full initialization:
```json
{
  "status": "OK",
  "ready": true,
  "message": "CyberStore API is running",
  "timestamp": "2024-01-08T...",
  "environment": "production",
  "database": "connected",
  "stripe": "configured",
  "port": "8000"
}
```

The `ready` field indicates whether the application has fully initialized. The healthcheck always returns HTTP 200, even during startup, to satisfy Railway's healthcheck requirements and ensure zero-downtime deployments.

## Testing the Deployment

### Test API Endpoints:

1. **Health Check:**
   ```bash
   curl https://your-app.railway.app/api/health
   ```

2. **Products (without DB):**
   ```bash
   curl https://your-app.railway.app/api/products
   ```

3. **Register User:**
   ```bash
   curl -X POST https://your-app.railway.app/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User"}'
   ```

## Common Issues

### 1. Healthcheck Failures ("Service Unavailable" or "Status 400")

**Symptoms:**
- Railway deployment fails with healthcheck timeout
- Error messages like "failed with service unavailable" or "failed with status 400"
- Deployment never completes

**Solution:**
The application is now configured to handle Railway healthchecks correctly:
- ✅ Accepts requests from `healthcheck.railway.app` hostname
- ✅ Returns HTTP 200 status immediately, even during startup
- ✅ Listens on the PORT environment variable that Railway provides
- ✅ Healthcheck path is set to `/api/health` in `railway.json`

If you still experience issues:
1. Verify the `PORT` environment variable is not manually set or overridden
2. Check that no firewall or middleware is blocking the healthcheck endpoint
3. Ensure the healthcheck timeout (300 seconds) is sufficient for your app to start
4. Check Railway logs for startup errors that prevent the server from listening

### 2. Build Fails

**Solution:** Check the build logs in Railway dashboard. Common issues:
- Missing dependencies in package.json
- TypeScript compilation errors
- Missing environment variables

### 3. Database Connection Error

**Solution:** 
- Verify `MONGODB_URI` is set correctly
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

### 4. Application Crashes After Deploy

**Solution:**
- Check Railway logs for error messages
- Verify all required environment variables are set
- Ensure PORT is not hardcoded (Railway assigns it automatically)

### 5. CORS Errors

**Solution:**
- Add your frontend domain to `CLIENT_URL` environment variable
- The app is configured to allow Railway domains by default

## Environment-Specific Settings

### Development
```bash
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/cyberstore
```

### Production (Railway)
```bash
NODE_ENV=production
PORT=<Railway assigns automatically>
MONGODB_URI=<Your MongoDB Atlas connection string>
```

## Monitoring

Railway provides:
- Real-time logs
- Metrics (CPU, Memory, Network)
- Deployment history
- Automatic restarts on failure

Access these in your Railway dashboard.

## Scaling

Railway automatically scales based on your plan. To upgrade:
1. Go to Project Settings
2. Click on "Upgrade"
3. Select a plan that fits your needs

## Custom Domain

To add a custom domain:
1. In Railway dashboard, go to Settings
2. Click "Generate Domain" or "Add Custom Domain"
3. Follow the instructions to configure DNS

## Rollback

To rollback to a previous deployment:
1. Go to Deployments tab in Railway
2. Find the working deployment
3. Click "Redeploy"

## Security Best Practices

1. ✅ Always use environment variables for secrets
2. ✅ Enable HTTPS (Railway provides this automatically)
3. ✅ Use strong JWT secrets
4. ✅ Keep Stripe keys secure
5. ✅ Regularly update dependencies
6. ✅ Monitor logs for suspicious activity
7. ✅ Use Railway's private networking when possible

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- MongoDB Atlas Support: https://www.mongodb.com/support
- Stripe Support: https://support.stripe.com

## Next Steps

After successful deployment:

1. ✅ Test all API endpoints
2. ✅ Set up monitoring and alerts
3. ✅ Configure custom domain
4. ✅ Set up Stripe webhooks
5. ✅ Deploy frontend client
6. ✅ Configure CORS for production domain
7. ✅ Set up backup strategy for database
8. ✅ Document any custom configurations

---

**Note:** The application is designed to run even without a database connection for testing purposes. However, for production use, a MongoDB database is required for full functionality.
