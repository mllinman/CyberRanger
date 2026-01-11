#!/usr/bin/env bash
# Railway deployment build script
# This script builds both the client and server, and copies necessary files to the server dist directory

set -e  # Exit immediately if a command exits with a non-zero status

# Store the base directory
BASE_DIR="$(pwd)"

echo "========================================"
echo "🚀 Starting CyberStore Build Process"
echo "========================================"
echo "Base directory: $BASE_DIR"

# Build Client
echo ""
echo "📦 Building Client..."
cd "$BASE_DIR/client"
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
cd "$BASE_DIR/server"
npm install --include=dev
npm run build

echo "=== SERVER BUILD COMPLETE ==="
ls -la dist | head -20

# Copy .next to server dist using absolute paths
echo ""
echo "📋 Copying .next to server dist..."
cp -r "$BASE_DIR/client/.next" "$BASE_DIR/server/dist/"

echo "=== .NEXT COPY COMPLETE ==="

# Verify .next was copied successfully
if [ -d "$BASE_DIR/server/dist/.next" ]; then
  echo "✓ .next copied successfully to server/dist/"
else
  echo "✗ .next copy failed!"
  exit 1
fi

# Also copy .next to the base dist directory for Railway deployments
# Railway may flatten the directory structure, so we ensure .next is accessible
# from both /app/server/dist and /app/dist
echo ""
echo "📋 Copying .next to base dist directory for Railway..."
mkdir -p "$BASE_DIR/dist"
cp -r "$BASE_DIR/client/.next" "$BASE_DIR/dist/"

if [ -d "$BASE_DIR/dist/.next" ]; then
  echo "✓ .next copied successfully to base dist/"
else
  echo "⚠️  Warning: .next copy to base dist failed"
fi

# Copy public directory if it exists
if [ -d "$BASE_DIR/client/public" ]; then
  echo "📂 Copying public directory to server/dist..."
  cp -r "$BASE_DIR/client/public" "$BASE_DIR/server/dist/"
  echo "✓ public directory copied to server/dist"
  
  echo "📂 Copying public directory to base dist..."
  cp -r "$BASE_DIR/client/public" "$BASE_DIR/dist/"
  echo "✓ public directory copied to base dist"
else
  echo "ℹ️  No public directory to copy"
fi

# Show final structure
echo ""
echo "=== FINAL dist CONTENTS ==="
ls -la "$BASE_DIR/server/dist"

echo ""
echo "=== dist/.next CONTENTS (first 20 items) ==="
ls -la "$BASE_DIR/server/dist/.next" | head -20

echo ""
echo "========================================"
echo "✅ Build Process Complete!"
echo "========================================"
