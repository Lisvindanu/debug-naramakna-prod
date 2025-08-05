#!/bin/bash

# =====================================================
# macOS PRODUCTION DEPLOYMENT SCRIPT
# =====================================================
# Automated deployment ke production server dari macOS

echo "🍎 Starting production deployment from macOS..."

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script is designed for macOS only."
    exit 1
fi

# Check if we're on main branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Not on main branch. Switch to main before deploying."
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build frontend
echo "🏗️ Building frontend..."
cd frontend && npm run build && cd ..

# Run tests (if they exist)
if [ -f "backend/package.json" ] && grep -q '"test"' backend/package.json; then
    echo "🧪 Running tests..."
    cd backend && npm test && cd ..
fi

# Create deployment archive (optional)
echo "📦 Creating deployment archive..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
tar -czf "naramakna-deploy-${TIMESTAMP}.tar.gz" \
    --exclude='node_modules' \
    --exclude='*.log' \
    --exclude='.git' \
    --exclude='backup_*' \
    .

echo "✅ Deployment preparation completed!"
echo "📦 Archive created: naramakna-deploy-${TIMESTAMP}.tar.gz"
echo ""
echo "🚀 Upload this archive to your production server and:"
echo "1. Extract: tar -xzf naramakna-deploy-${TIMESTAMP}.tar.gz"
echo "2. Install: npm run install:all"
echo "3. Setup environment: cp backend/.env.example backend/.env"
echo "4. Update .env with production values"
echo "5. Run migrations: cd backend && npm run migrate"
echo "6. Start with PM2: pm2 start ecosystem.config.js"
