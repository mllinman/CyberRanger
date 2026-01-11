#!/bin/bash
# CyberStore Web Application Build Script
# This script builds both the client (Next.js) and server (Node.js/Express)

set -e

echo "🚀 Building CyberStore Web Application..."
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Build client (Next.js)
echo "📦 Building client (Next.js)..."
cd client
npm install
npm run build
echo "✅ Client build completed!"
echo ""

# Build server (TypeScript)
echo "📦 Building server (Node.js/Express + TypeScript)..."
cd ../server
npm install
npm run build
echo "✅ Server build completed!"
echo ""

# Copy .next directory to server dist
echo "📁 Copying .next build to server/dist..."
mkdir -p dist
cp -r ../client/.next dist/
if [ -d "../client/public" ]; then
    cp -r ../client/public dist/
    echo "✅ Copied public directory"
fi
echo "✅ .next directory copied successfully!"
echo ""

# Verify build
echo "🔍 Verifying build..."
if [ -d "dist/.next" ]; then
    echo "✅ dist/.next exists"
else
    echo "❌ dist/.next does NOT exist!"
    exit 1
fi

if [ -f "dist/index.js" ]; then
    echo "✅ dist/index.js exists"
else
    echo "❌ dist/index.js does NOT exist!"
    exit 1
fi

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "To run the application:"
echo "  cd server"
echo "  npm start"
echo ""
echo "Or from root directory:"
echo "  npm start"
