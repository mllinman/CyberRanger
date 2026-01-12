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

# Install root dependencies first
echo ""
echo "📦 Installing root dependencies..."
cd "$BASE_DIR"
npm install

# Build Client
echo ""
echo "📦 Building Client..."
cd "$BASE_DIR/client"
# Install client dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing client dependencies..."
  npm install
fi
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
# Install server dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing server dependencies..."
  npm install
fi
npm run build

echo "=== SERVER BUILD COMPLETE ==="
ls -la dist | head -20

# Function to safely copy a file if it exists
safe_copy() {
  local src="$1"
  local dest="$2"
  if [ -f "$src" ]; then
    cp "$src" "$dest" && echo "✓ Copied $(basename "$src")" || echo "⚠️  Failed to copy $(basename "$src")"
  else
    echo "ℹ️  File not found: $(basename "$src"), skipping"
  fi
}

# Copy .next to server dist using absolute paths
echo ""
echo "📋 Copying .next to server dist..."
echo "Source: $BASE_DIR/client/.next"
echo "Destination: $BASE_DIR/server/dist/"
echo "Checking source exists:"
ls -la "$BASE_DIR/client/.next" | head -10

# Use rsync if available, fallback to cp
if command -v rsync &> /dev/null; then
  echo "Using rsync for copy..."
  if rsync -av "$BASE_DIR/client/.next" "$BASE_DIR/server/dist/"; then
    echo "✓ rsync completed successfully"
  else
    echo "⚠️  rsync failed, falling back to cp..."
    cp -r "$BASE_DIR/client/.next" "$BASE_DIR/server/dist/"
  fi
else
  echo "Using cp for copy..."
  cp -r "$BASE_DIR/client/.next" "$BASE_DIR/server/dist/"
fi

echo "=== .NEXT COPY COMPLETE ==="
echo "Verifying destination:"
ls -la "$BASE_DIR/server/dist/" | head -20

# Verify .next was copied successfully
if [ -d "$BASE_DIR/server/dist/.next" ]; then
  echo "✓ .next copied successfully to server/dist/"
  echo "Contents of .next directory:"
  ls -la "$BASE_DIR/server/dist/.next" | head -10
  echo "Size of .next directory:"
  du -sh "$BASE_DIR/server/dist/.next"
else
  echo "✗ .next copy failed!"
  echo "DEBUG: Listing server/dist contents:"
  find "$BASE_DIR/server/dist" -maxdepth 2 -type d
  exit 1
fi

# Copy Next.js config and package.json (needed by Next.js at runtime)
echo ""
echo "📋 Copying Next.js configuration files to server/dist..."
safe_copy "$BASE_DIR/client/next.config.js" "$BASE_DIR/server/dist/"
safe_copy "$BASE_DIR/client/package.json" "$BASE_DIR/server/dist/"

# Also copy .next to the base dist directory for Railway deployments
# Railway may flatten the directory structure, so we ensure .next is accessible
# from both /app/server/dist and /app/dist
echo ""
echo "📋 Copying .next to base dist directory for Railway..."
mkdir -p "$BASE_DIR/dist"
echo "Created base dist directory at: $BASE_DIR/dist"
cp -r "$BASE_DIR/client/.next" "$BASE_DIR/dist/"
echo "Copy complete, verifying..."
ls -la "$BASE_DIR/dist/" | head -20

if [ -d "$BASE_DIR/dist/.next" ]; then
  echo "✓ .next copied successfully to base dist/"
  echo "Base dist/.next contents:"
  ls -la "$BASE_DIR/dist/.next" | head -10
else
  echo "⚠️  Warning: .next copy to base dist failed"
  echo "Base dist contents:"
  ls -la "$BASE_DIR/dist/" || echo "Could not list base dist"
fi

# Copy Next.js config files to base dist as well
echo ""
echo "📋 Copying Next.js configuration files to base dist..."
safe_copy "$BASE_DIR/client/next.config.js" "$BASE_DIR/dist/"
safe_copy "$BASE_DIR/client/package.json" "$BASE_DIR/dist/"

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

# Create a build marker file to prove .next was present during build
echo "Creating build marker file..."
echo "Build completed at $(date)" > "$BASE_DIR/server/dist/.next/BUILD_MARKER.txt"
echo "Build directory: $BASE_DIR" >> "$BASE_DIR/server/dist/.next/BUILD_MARKER.txt"
echo "✓ Build marker created"

# Final verification
echo ""
echo "=== FINAL VERIFICATION ==="
echo "Checking critical files exist in server/dist:"
[ -d "$BASE_DIR/server/dist/.next" ] && echo "✓ .next directory exists" || echo "✗ .next directory missing!"
[ -f "$BASE_DIR/server/dist/.next/BUILD_MARKER.txt" ] && echo "✓ Build marker exists" || echo "✗ Build marker missing!"
[ -f "$BASE_DIR/server/dist/index.js" ] && echo "✓ index.js exists" || echo "✗ index.js missing!"

echo ""
echo "========================================"
echo "✅ Build Process Complete!"
echo "========================================"
