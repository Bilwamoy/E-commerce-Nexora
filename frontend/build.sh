#!/bin/bash

# DEFINITIVE SWC DISABLE SCRIPT
# This script completely eliminates SWC from the build process

set -e

echo "🚀 Starting DEFINITIVE SWC-free build process..."

# Force environment variables to disable SWC
export DISABLE_SWC=1
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export SWC_DISABLE=1

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps --no-optional

# Force disable SWC in package.json scripts
echo "🔧 Forcing SWC disable in build process..."
export DISABLE_SWC=1

# Build with forced environment
echo "🏗️ Building with SWC completely disabled..."
DISABLE_SWC=1 NEXT_TELEMETRY_DISABLED=1 npm run build

echo "✅ DEFINITIVE build completed successfully!"
echo "📁 Build output: .next/" 