# CyberStore Web Application - Build Instructions

This document describes how to build and deploy the CyberStore web application (client and server).

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB (optional, for full functionality)

## Project Structure

```
CyberRanger/
├── client/          # Next.js 15 frontend application
│   ├── app/         # Next.js App Router pages
│   ├── components/  # React components
│   └── .next/       # Build output (generated)
├── server/          # Node.js/Express backend API
│   ├── src/         # TypeScript source files
│   └── dist/        # Compiled JavaScript (generated)
└── build_web.sh     # Build script
```

## Build Process

### Option 1: Using the Build Script (Recommended)

```bash
# From the project root directory
./build_web.sh
```

This script will:
1. Install dependencies for both client and server
2. Build the Next.js client
3. Build the TypeScript server
4. Copy the `.next` directory to `server/dist/`
5. Verify the build was successful

### Option 2: Using npm from Root Directory

```bash
# Install all dependencies
npm run install:all

# Build both client and server
npm run build

# Start the server
npm start
```

### Option 3: Manual Build

```bash
# 1. Build the client
cd client
npm install
npm run build

# 2. Build the server
cd ../server
npm install
npm run build

# 3. Copy .next directory to server/dist
mkdir -p dist
cp -r ../client/.next dist/

# 4. (Optional) Copy public directory if it exists
test -d ../client/public && cp -r ../client/public dist/ || true

# 5. Start the server
npm start
```

## Deployment

### Railway Deployment

The application is configured for Railway deployment using Nixpacks. The build process is defined in:

- `nixpacks.toml` - Nixpacks build configuration
- `railway.json` - Railway-specific settings

The deployment automatically:
1. Installs dependencies for client and server
2. Builds the Next.js client (creates `.next` directory)
3. Builds the TypeScript server (creates `dist` directory)
4. Copies `.next` to `server/dist/`
5. Starts the server which serves both API and frontend

### Environment Variables

Create a `.env` file in the `server` directory with:

```env
NODE_ENV=production
PORT=8000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
# ... other variables (see server/.env.example)
```

## Running the Application

### Development Mode

```bash
# Start both client and server in development mode
npm run dev
```

This runs:
- Client at http://localhost:3000
- Server at http://localhost:8000

### Production Mode

```bash
# After building (see above)
npm start
```

The server runs on the configured PORT (default: 8000) and serves:
- API routes at `/api/*`
- Next.js frontend at all other routes

## Verification

After building, verify the structure:

```bash
# Check that .next directory exists in server/dist
ls -la server/dist/.next

# Check that server is built
ls -la server/dist/index.js
```

Both should exist for the application to run correctly.

## Troubleshooting

### Error: "Next.js build not found"

This error occurs when the `.next` directory is not found in the expected location. To fix:

1. Ensure the client build completed successfully:
   ```bash
   cd client && npm run build
   ```

2. Verify `.next` directory was created:
   ```bash
   ls -la client/.next
   ```

3. Copy `.next` to server/dist:
   ```bash
   cd server
   mkdir -p dist
   cp -r ../client/.next dist/
   ```

4. Verify the copy:
   ```bash
   ls -la server/dist/.next
   ```

### Build Fails

- Ensure Node.js 18+ is installed: `node --version`
- Clear node_modules and reinstall:
  ```bash
  rm -rf node_modules client/node_modules server/node_modules
  npm run install:all
  ```
- Check for TypeScript errors in server:
  ```bash
  cd server && npm run build
  ```

## CI/CD

The application uses Nixpacks for automated builds on Railway. The build configuration ensures:

1. Dependencies are installed with `npm ci` for reproducible builds
2. Client is built before server
3. `.next` directory is properly copied to server/dist
4. Server is configured to find the Next.js build at runtime

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Nixpacks Documentation](https://nixpacks.com/)
