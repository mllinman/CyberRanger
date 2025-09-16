# CyberStore - Modern E-commerce Platform

A fully-featured modern e-commerce website with comprehensive Stripe integration, built with React/Next.js frontend and Node.js/Express backend.

## 🚀 Features

### Core E-commerce Features
- **Product Catalog** - Browse products with categories, search, and filters
- **Shopping Cart** - Add/remove items, update quantities, persistent cart storage
- **Secure Checkout** - Stripe integration with card payments and digital wallets
- **User Authentication** - Register, login, profile management
- **Order Management** - Order tracking and history
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Payment & Security
- **Stripe Integration** - Secure payment processing with PCI compliance
- **Payment Intent API** - Modern Stripe Payment Intents for SCA compliance
- **SSL Encryption** - Secure data transmission
- **JWT Authentication** - Secure user sessions
- **Rate Limiting** - API protection against abuse

### Technical Features
- **Modern Stack** - React 18, Next.js 14, TypeScript, Node.js, Express
- **Database** - MongoDB with Mongoose ODM
- **State Management** - Zustand for client-side state
- **Styling** - Tailwind CSS with responsive design
- **API Architecture** - RESTful API with Express.js
- **Real-time Updates** - Toast notifications and optimistic updates

## 📦 Project Structure

```
CyberRanger/
├── client/                 # Next.js frontend application
│   ├── components/        # React components
│   ├── pages/            # Next.js pages and API routes
│   ├── lib/              # Utilities and store management
│   ├── styles/           # CSS and styling
│   └── types/            # TypeScript type definitions
├── server/                # Express.js backend API
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   └── services/     # Business logic services
│   └── dist/             # Compiled JavaScript (generated)
├── database/              # Database schemas and migrations
└── docs/                 # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud)
- Stripe account for payments

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CyberRanger
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Configuration**
   
   **Backend (.env in server folder):**
   ```env
   NODE_ENV=development
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/cyberstore
   JWT_SECRET=your-super-secret-jwt-key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   CLIENT_URL=http://localhost:3000
   ```
   
   **Frontend (.env.local in client folder):**
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   npm run client:dev    # Frontend on :3000
   npm run server:dev    # Backend on :8000
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - API Health Check: http://localhost:8000/api/health

## 💳 Stripe Integration

### Setup Stripe
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard
3. Add keys to your environment files
4. Configure webhooks for order processing

### Payment Features
- **Card Payments** - Visa, MasterCard, American Express, etc.
- **Digital Wallets** - Apple Pay, Google Pay support
- **International** - Multi-currency support
- **Security** - PCI DSS compliance, SCA support
- **Webhooks** - Real-time payment status updates

### Test Cards
Use Stripe test cards for development:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🗄️ Database Models

### User Model
```typescript
{
  email: string
  password: string (hashed)
  firstName: string
  lastName: string
  role: 'customer' | 'admin'
  address?: AddressSchema
  stripeCustomerId?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Product Model
```typescript
{
  name: string
  description: string
  price: number
  images: string[]
  category: string
  sku: string (unique)
  stock: number
  rating: number
  reviews: number
  featured: boolean
  active: boolean
  tags: string[]
  metadata: object
  createdAt: Date
  updatedAt: Date
}
```

## 🔐 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - Secure authentication with expiration
- **Rate Limiting** - Protection against API abuse
- **CORS Configuration** - Cross-origin request security
- **Helmet.js** - Security headers
- **Input Validation** - Joi schema validation
- **SQL Injection Protection** - Mongoose ODM prevents injection

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update profile

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Featured products
- `GET /api/products/categories/list` - Product categories

### Payments
- `POST /api/payments/create-payment-intent` - Initialize payment
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook handler

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
npm run client:test

# Backend tests
npm run server:test

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use production Stripe keys
- Configure production database
- Set secure JWT secret
- Configure domain CORS settings

### Deployment Options
- **Vercel** (recommended for Next.js)
- **Netlify** (frontend) + **Railway/Render** (backend)
- **Docker** containers
- **Traditional VPS** with PM2

## 🔧 Development

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for consistent styling

### Git Workflow
- Feature branches from main
- Pull requests for code review
- Semantic commit messages
- Automated CI/CD with testing

## 📊 Performance

- **Next.js Optimization** - Automatic code splitting and optimization
- **Image Optimization** - Next.js Image component with lazy loading
- **Caching** - Static generation and API caching
- **Compression** - Gzip compression for API responses
- **Bundle Analysis** - Bundle size monitoring

## 🛡️ Monitoring & Logging

- **Morgan** for HTTP request logging
- **Error Handling** with proper status codes
- **Health Check** endpoint for uptime monitoring
- **Performance Monitoring** ready for tools like Sentry

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please create an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using modern web technologies for a secure and scalable e-commerce experience.