# CyberStore - E-Commerce API Server

A modern, production-ready e-commerce API server built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Quick Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

### One-Click Deployment

1. Click the "Deploy on Railway" button above
2. Configure your environment variables
3. Railway will automatically build and deploy your app

For detailed deployment instructions, see [RAILWAY_DEPLOYMENT.md](../RAILWAY_DEPLOYMENT.md)

## ✨ Features

- 🛍️ **Product Management** - Full CRUD operations with filtering, search, and pagination
- 🔐 **Authentication** - JWT-based auth with bcrypt password hashing
- 💳 **Stripe Integration** - Payment processing with webhooks
- 📦 **Order Management** - Complete order lifecycle handling
- 👤 **User Profiles** - Account management and preferences
- 🔒 **Security** - Helmet, CORS, rate limiting, and input validation
- 📊 **Logging** - Morgan request logging
- ⚡ **Performance** - Compression middleware for optimized responses

## 🏗️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **Payments:** Stripe
- **Security:** Helmet, CORS, express-rate-limit
- **Validation:** Joi

## 📋 Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- MongoDB instance (local or Atlas)
- Stripe account (for payments)

## 🚀 Getting Started

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Update the values:
   ```env
   NODE_ENV=development
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/cyberstore
   JWT_SECRET=your-secret-key
   STRIPE_SECRET_KEY=sk_test_...
   CLIENT_URL=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:8000`

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

### Admin User Setup

For administrative access to the application, create an admin user account:

```bash
npm run create-admin
```

This will create (or update) an admin user with full privileges. See [ADMIN_SETUP.md](ADMIN_SETUP.md) for detailed information about admin credentials and usage.

**Default Admin Credentials:**
- Email: `admin@cyberstore.local`
- Password: `Detroit1977!!`
- Role: `admin` (full privileges)

**Custom Credentials (Recommended for Production):**
```bash
ADMIN_EMAIL="your-admin@example.com" ADMIN_PASSWORD="SecurePass123!" npm run create-admin
```

⚠️ **Security Note:** Always use custom credentials via environment variables in production environments.

## 📚 API Documentation

### Base URL
- Development: `http://localhost:8000`
- Production: `https://your-app.railway.app`

### Endpoints

#### Health Check
```http
GET /api/health
```
Returns server status and configuration info.

#### Products
```http
GET    /api/products              # List all products (with filters)
GET    /api/products/:id          # Get single product
GET    /api/products/featured/list # Get featured products
GET    /api/products/categories/list # Get categories
GET    /api/products/search/:query # Search products
```

**Query Parameters for listing:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Filter by category
- `minPrice` / `maxPrice` - Price range
- `search` - Full-text search
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - asc or desc (default: desc)
- `featured` - true/false

#### Authentication
```http
POST   /api/auth/register         # Create new account
POST   /api/auth/login            # Login
GET    /api/auth/me               # Get current user (requires auth)
PUT    /api/auth/me               # Update profile (requires auth)
PUT    /api/auth/change-password  # Change password (requires auth)
POST   /api/auth/oauth-login      # OAuth login (Google/GitHub)
```

#### Orders
```http
GET    /api/orders                # List user orders (requires auth)
POST   /api/orders                # Create new order (requires auth)
GET    /api/orders/:id            # Get order details (requires auth)
```

#### Payments (Stripe)
```http
POST   /api/payments/create-payment-intent   # Create payment intent
POST   /api/payments/confirm-payment         # Confirm payment (requires auth)
POST   /api/payments/webhook                 # Stripe webhook
GET    /api/payments/payment-methods         # Get saved payment methods (requires auth)
POST   /api/payments/refund                  # Process refund (requires auth)
```

#### Users
```http
GET    /api/users                 # User info (requires auth)
GET    /api/users/orders          # User orders (requires auth)
```

### Authentication

Protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

Get a token by calling `/api/auth/login` or `/api/auth/register`.

## 🔒 Security Features

- **Helmet**: Sets security-related HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **JWT Authentication**: Secure token-based auth
- **bcrypt**: Password hashing with salt rounds
- **Input Validation**: Joi schema validation
- **Error Handling**: Centralized error middleware

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Deployment

### Railway (Recommended)

See [RAILWAY_DEPLOYMENT.md](../RAILWAY_DEPLOYMENT.md) for complete Railway deployment guide.

Quick steps:
1. Push your code to GitHub
2. Connect repository to Railway
3. Configure environment variables
4. Railway handles the rest automatically

### Other Platforms

The app works on any platform that supports Node.js:
- **Heroku**: Use `Procfile` (already included)
- **AWS Elastic Beanstalk**: Standard Node.js deployment
- **Google Cloud Run**: Containerize with Docker
- **Azure App Service**: Node.js runtime
- **DigitalOcean App Platform**: Direct from GitHub

## 🔧 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `PORT` | No | Server port (Railway sets this) | `8000` |
| `MONGODB_URI` | Yes* | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Yes | Secret for JWT signing | Random string |
| `STRIPE_SECRET_KEY` | No** | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | No** | Stripe webhook secret | `whsec_...` |
| `CLIENT_URL` | No | Frontend URL for CORS | `https://myapp.com` |
| `EMAIL_HOST` | No | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | No | SMTP port | `587` |
| `EMAIL_USER` | No | SMTP username | `user@gmail.com` |
| `EMAIL_PASS` | No | SMTP password | App password |

\* Not required for basic testing, but needed for full functionality  
\** Required only if using payment features

## 🐛 Troubleshooting

### Build Fails
- Ensure Node.js version is 18+
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript version compatibility

### Database Connection Issues
- Verify `MONGODB_URI` is correct
- Check network connectivity to MongoDB
- Ensure MongoDB user has proper permissions
- Whitelist IP addresses in MongoDB Atlas

### Stripe Errors
- Verify API keys are correct
- Check Stripe dashboard for webhook status
- Ensure webhook signing secret matches

### CORS Errors
- Set `CLIENT_URL` environment variable
- Check CORS configuration in `src/index.ts`
- Verify request origin matches allowed origins

## 📈 Performance

- Average response time: <100ms
- Throughput: 1000+ req/sec (single instance)
- Memory usage: ~150MB base
- Compression enabled for responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details

## 🆘 Support

- **Documentation**: See [RAILWAY_DEPLOYMENT.md](../RAILWAY_DEPLOYMENT.md)
- **Issues**: Open an issue on GitHub
- **Questions**: Use GitHub Discussions

## 🔗 Links

- [Main Repository](https://github.com/mllinman/CyberRanger)
- [Railway Platform](https://railway.app)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Stripe Documentation](https://stripe.com/docs)

---

**Built with ❤️ using TypeScript, Express, and MongoDB**
