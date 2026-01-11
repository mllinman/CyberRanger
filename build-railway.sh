#!/bin/bash
# Railway deployment build script
# This script builds both the client and server, and copies necessary files to the server dist directory

set -e  # Exit immediately if a command exits with a non-zero status

echo "========================================"
echo "🚀 Starting CyberStore Build Process"
echo "========================================"

# Build Client
echo ""
echo "📦 Building Client..."
cd client
npm install --include=dev
npm run build

echo "=== CLIENT BUILD COMPLETE ==="
ls -la . | head -20

# Verify .next directory exists
if [ -d ".next" ]; then
  echo "✓ .next directory exists"
else
  echo "✗ .next directory missing!"
  exit 1
fi

# Build Server
echo ""
echo "🔧 Building Server..."
cd ../server
npm install --include=dev
npm run build

echo "=== SERVER BUILD COMPLETE ==="
ls -la dist | head -20

# Copy .next to server dist
echo ""
echo "📋 Copying .next to server dist..."
cp -r ../client/.next ./dist/

echo "=== .NEXT COPY COMPLETE ==="

# Verify .next was copied successfully
if [ -d "./dist/.next" ]; then
  echo "✓ .next copied successfully to ./dist/"
else
  echo "✗ .next copy failed!"
  exit 1
fi

# Copy public directory if it exists
if [ -d "../client/public" ]; then
  echo "📂 Copying public directory..."
  cp -r ../client/public ./dist/
  echo "✓ public directory copied"
else
  echo "ℹ️  No public directory to copy"
fi

# Show final structure
echo ""
echo "=== FINAL dist CONTENTS ==="
ls -la ./dist

echo ""
echo "=== dist/.next CONTENTS (first 20 items) ==="
ls -la ./dist/.next | head -20

echo ""
echo "========================================"
echo "✅ Build Process Complete!"
echo "========================================"
