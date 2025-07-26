#!/bin/bash

# Professional Next.js Build Script - SWC Bypass
# This script ensures a clean build without SWC dependencies

set -e

echo "🚀 Starting professional Next.js build process..."

# Set environment variables to disable SWC
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export DISABLE_SWC=1

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies with legacy peer deps
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps --no-optional

# Verify Babel configuration
echo "🔧 Verifying Babel configuration..."
if [ ! -f ".babelrc" ]; then
    echo "❌ .babelrc not found!"
    exit 1
fi

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output: .next/" 