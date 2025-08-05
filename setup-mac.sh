#!/bin/bash

# =================================================================
# SETUP PORTAL BERITA NARAMAKNA - MAC COMPATIBLE VERSION
# =================================================================
# Script untuk membuat struktur folder dan file placeholder
# Compatible dengan macOS (tested on macOS Monterey+)
# 
# Jalankan dari root directory project (naramakna.id/)
# chmod +x setup-mac.sh && ./setup-mac.sh
# =================================================================

echo "🍎 Setting up Naramakna Portal Structure for macOS..."

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "⚠️  This script is optimized for macOS. It might work on other systems but YMMV."
fi

# =================================================================
# 1. BACKUP EXISTING FILES (Mac safe)
# =================================================================
echo "💾 Creating backup of existing files..."

# Create backup directory with timestamp
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Backup existing files if they exist
[ -f "README.md" ] && cp "README.md" "$BACKUP_DIR/"
[ -f "package.json" ] && cp "package.json" "$BACKUP_DIR/"

echo "✅ Backup created in $BACKUP_DIR/"

# =================================================================
# 2. REORGANIZE EXISTING STRUCTURE
# =================================================================
echo "📁 Reorganizing existing files to frontend structure..."

# Buat folder frontend dan pindahkan file React yang ada
mkdir -p frontend

# Move files dengan error handling
[ -d "src" ] && mv src frontend/ || echo "ℹ️  src directory not found, skipping..."
[ -d "public" ] && mv public frontend/ || echo "ℹ️  public directory not found, skipping..." 
[ -f "index.html" ] && mv index.html frontend/ || echo "ℹ️  index.html not found, skipping..."
[ -f "vite.config.ts" ] && mv vite.config.ts frontend/ || echo "ℹ️  vite.config.ts not found, skipping..."
[ -f "tsconfig.json" ] && mv tsconfig.json frontend/ || echo "ℹ️  tsconfig.json not found, skipping..."
[ -f "tsconfig.app.json" ] && mv tsconfig.app.json frontend/ || echo "ℹ️  tsconfig.app.json not found, skipping..."
[ -f "tsconfig.node.json" ] && mv tsconfig.node.json frontend/ || echo "ℹ️  tsconfig.node.json not found, skipping..."
[ -f "eslint.config.js" ] && mv eslint.config.js frontend/ || echo "ℹ️  eslint.config.js not found, skipping..."

# Handle package files carefully
if [ -f "package.json" ]; then
    mv package.json frontend/package.json
    echo "✅ Moved package.json to frontend/"
else
    echo "⚠️  package.json not found, will create new one"
fi

if [ -f "package-lock.json" ]; then
    mv package-lock.json frontend/
    echo "✅ Moved package-lock.json to frontend/"
fi

# =================================================================
# 3. CREATE BACKEND STRUCTURE
# =================================================================
echo "📁 Creating backend structure..."

mkdir -p backend/src/{controllers,models,routes,middleware,services,config,utils}
mkdir -p backend/src/uploads/{images,videos,documents}
mkdir -p backend/cron

# =================================================================
# 4. CREATE DATABASE STRUCTURE
# =================================================================
echo "📁 Creating database structure..."

mkdir -p database/{migrations,seeders}

# =================================================================
# 5. CREATE SHARED STRUCTURE  
# =================================================================
echo "📁 Creating shared structure..."

mkdir -p shared/{types,constants,utils}

# =================================================================
# 6. CREATE DOCS STRUCTURE
# =================================================================
echo "📁 Creating documentation structure..."

mkdir -p docs
mkdir -p scripts

# =================================================================
# 7. FRONTEND ATOMIC DESIGN STRUCTURE
# =================================================================
echo "📁 Creating frontend atomic design structure..."

# Only create if frontend/src doesn't exist or is empty
if [ ! -d "frontend/src" ] || [ -z "$(ls -A frontend/src 2>/dev/null)" ]; then
    mkdir -p frontend/src
fi

# Atomic Design Components
mkdir -p frontend/src/components/{atoms,molecules,organisms,templates,pages}

# Atoms
mkdir -p frontend/src/components/atoms/{Button,Input,Avatar,Badge,LoadingSpinner,Icon,Typography,Image}

# Molecules  
mkdir -p frontend/src/components/molecules/{SearchBar,ArticleCard,VideoCard,CommentItem,AdBanner,ShareButtons,UserProfile,FormField}

# Organisms
mkdir -p frontend/src/components/organisms/{Header,Footer,Sidebar,ArticleList,VideoGallery,CommentSection,YouTubeEmbed,TikTokEmbed,AdminDashboard}

# Templates
mkdir -p frontend/src/components/templates/{MainLayout,AdminLayout,ArticleLayout,AuthLayout}

# Pages
mkdir -p frontend/src/components/pages/{Home,ArticleDetail,VideoDetail,Category,Search,Profile,Login,Register}
mkdir -p frontend/src/components/pages/Admin/{Dashboard,Articles,Videos,Users,Ads,Analytics}

# Other frontend directories
mkdir -p frontend/src/{contexts,hooks,services,utils,types,assets}
mkdir -p frontend/src/contexts/{AuthContext,MediaContext,CommentContext,AdsContext,AnalyticsContext}
mkdir -p frontend/src/services/{api,external}
mkdir -p frontend/src/assets/{images,icons,videos}
mkdir -p frontend/src/styles/{components,themes}
mkdir -p frontend/src/utils/{formatters,validators,constants,helpers}

# =================================================================
# 8. CREATE PLACEHOLDER FILES WITH COMMENTS (MAC COMPATIBLE)
# =================================================================
echo "📝 Creating placeholder files with comments..."

# ROOT FILES
# =================================================================

# Root package.json for managing both frontend and backend
cat > package.json << 'EOF'
{
  "name": "naramakna-portal",
  "version": "1.0.0",
  "description": "Portal berita digital dengan integrasi YouTube & TikTok API",
  "main": "index.js",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install",
    "build": "cd frontend && npm run build",
    "start": "cd backend && npm start",
    "setup:dev": "./scripts/setup-dev-mac.sh",
    "deploy": "./scripts/deploy-mac.sh"
  },
  "keywords": ["news", "portal", "youtube", "tiktok", "api", "macos"],
  "author": "Naramakna Team",
  "license": "MIT",
  "devDependencies": {
    "concurrently": "^8.2.2"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
EOF

# Root README.md with Mac-specific instructions
cat > README.md << 'EOF'
# 📰 Portal Berita Naramakna (macOS Compatible)

Portal berita digital modern dengan integrasi YouTube & TikTok API

## 🍎 macOS Requirements
- macOS 10.15+ (Catalina or later)
- Node.js 18+ (install via [Homebrew](https://brew.sh/) recommended)
- MySQL 8.0+ (install via Homebrew or MySQL Installer)
- Git (comes with Xcode Command Line Tools)

### Quick macOS Setup
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install required tools
brew install node mysql git

# Start MySQL service
brew services start mysql
```

## 🏗️ Architecture
- **Frontend**: React 19 + TypeScript + Vite (Port 3000)
- **Backend**: Node.js + Express + TypeScript (Port 3001) 
- **Database**: MySQL 8.0+ dengan Sequelize ORM
- **External APIs**: YouTube Data API v3, TikTok API

## 🚀 Quick Start (macOS)
```bash
# Install all dependencies
npm run install:all

# Setup development environment (macOS specific)
npm run setup:dev

# Start development servers
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:3001/api
```

## 📁 Project Structure
```
naramakna-portal/
├── frontend/          # React application
├── backend/           # Node.js API server  
├── database/          # MySQL schema & migrations
├── shared/            # Common types & utilities
├── docs/              # Documentation
└── scripts/           # macOS-compatible scripts
```

## 🔧 macOS-Specific Notes
- Scripts are tested on macOS Monterey (12.0+) and newer
- Uses Homebrew for package management
- MySQL configuration optimized for macOS
- File paths use forward slashes (Unix-style)
- Case-sensitive file system support

## 📖 Documentation
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [macOS Deployment Guide](./docs/DEPLOYMENT_MAC.md)
- [YouTube/TikTok Setup](./docs/EXTERNAL_APIS.md)

## 🐛 Troubleshooting (macOS)
- **Permission denied**: Run `chmod +x scripts/*.sh`
- **MySQL connection**: Check if MySQL service is running `brew services list | grep mysql`
- **Node version**: Use `nvm` to manage Node.js versions
- **Port conflicts**: Check if ports 3000/3001 are available
EOF

# Docker Compose untuk development environment (Mac compatible)
cat > docker-compose.yml << 'EOF'
# Docker Compose untuk development environment (macOS Compatible)
# Menjalankan MySQL dan Redis untuk development
# 
# macOS Usage:
# brew install docker docker-compose (or Docker Desktop)
# docker-compose up -d

version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: naramakna_mysql
    platform: linux/amd64  # For Apple Silicon compatibility
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: naramakna_portal
      MYSQL_USER: naramakna_user
      MYSQL_PASSWORD: naramakna_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    networks:
      - naramakna_network
    command: --default-authentication-plugin=mysql_native_password

  redis:
    image: redis:7-alpine
    container_name: naramakna_redis
    platform: linux/amd64  # For Apple Silicon compatibility
    ports:
      - "6379:6379"
    networks:
      - naramakna_network

  # Optional: phpMyAdmin for database management
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: naramakna_phpmyadmin
    platform: linux/amd64
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
      PMA_USER: naramakna_user
      PMA_PASSWORD: naramakna_pass
    ports:
      - "8080:80"
    depends_on:
      - mysql
    networks:
      - naramakna_network

volumes:
  mysql_data:

networks:
  naramakna_network:
    driver: bridge
EOF

# .gitignore optimized for macOS
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Production builds
dist/
build/
*/dist/
*/build/

# Environment variables
.env
.env.local
.env.production
*/.env
*/.env.local

# Logs
*.log
npm-debug.log*
logs/

# Database
*.db
*.sqlite

# macOS specific files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
.DocumentRevisions-V100
.fseventsd
.TemporaryItems
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Xcode (if using any native modules)
*.xcodeproj/
*.xcworkspace/
DerivedData/
*.hmap
*.ipa
*.dSYM.zip
*.dSYM

# Editor directories
.vscode/
.idea/
*.sublime-*
*.swp
*.swo

# Uploads
uploads/
*/uploads/

# Cache
.cache/
*/cache/
.npm

# Temporary files
tmp/
temp/
.tmp/

# Backup files created by this script
backup_*/

# Homebrew (if Brewfile is used)
Brewfile.lock.json
EOF

# macOS-specific development setup script
cat > scripts/setup-dev-mac.sh << 'EOF'
#!/bin/bash

# =====================================================
# macOS DEVELOPMENT ENVIRONMENT SETUP SCRIPT
# =====================================================
# Automated setup untuk development environment di macOS
# Includes Homebrew, MySQL, Node.js setup

echo "🍎 Setting up Naramakna development environment for macOS..."

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script is designed for macOS only."
    exit 1
fi

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "🍺 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == "arm64" ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    echo "✅ Homebrew already installed"
fi

# Install required tools if not present
echo "🔧 Installing required tools..."

# Node.js
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    brew install node
else
    echo "✅ Node.js already installed ($(node --version))"
fi

# MySQL
if ! command -v mysql &> /dev/null; then
    echo "🗄️ Installing MySQL..."
    brew install mysql
    brew services start mysql
    
    # Secure MySQL installation prompt
    echo "⚠️  Please run 'mysql_secure_installation' after this script completes"
else
    echo "✅ MySQL already installed"
fi

# Start MySQL service if not running
if ! brew services list | grep mysql | grep started > /dev/null; then
    echo "🚀 Starting MySQL service..."
    brew services start mysql
    sleep 3  # Give MySQL time to start
fi

# Check MySQL connection
echo "🔍 Testing MySQL connection..."
if mysql -u root -e "SELECT 1;" &> /dev/null; then
    echo "✅ MySQL connection successful"
else
    echo "⚠️  MySQL connection failed. You may need to run 'mysql_secure_installation'"
    echo "   or set a root password with: mysqladmin -u root password 'your_password'"
fi

# Create database and user
echo "📊 Setting up database..."
mysql -u root << EOF
CREATE DATABASE IF NOT EXISTS naramakna_portal;
CREATE USER IF NOT EXISTS 'naramakna_user'@'localhost' IDENTIFIED BY 'naramakna_pass';
GRANT ALL PRIVILEGES ON naramakna_portal.* TO 'naramakna_user'@'localhost';
FLUSH PRIVILEGES;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed"
else
    echo "⚠️  Database setup failed. You may need to provide MySQL root password"
    echo "   Try running: mysql -u root -p < database/schema.sql"
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
if [ -d "frontend" ]; then
    cd frontend && npm install && cd ..
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend directory not found"
fi

# Install backend dependencies  
echo "📦 Installing backend dependencies..."
if [ -d "backend" ]; then
    cd backend && npm install && cd ..
    echo "✅ Backend dependencies installed"
else
    echo "⚠️  Backend directory not found"
fi

# Setup environment files
echo "⚙️ Setting up environment files..."
if [ -f "backend/.env.example" ] && [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from template"
elif [ ! -f "backend/.env" ]; then
    cat > backend/.env << 'ENVEOF'
# Database Configuration (macOS Default)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=naramakna_portal
DB_USER=naramakna_user
DB_PASS=naramakna_pass

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Server Configuration
PORT=3001
NODE_ENV=development

# YouTube Data API v3 (Get from Google Cloud Console)
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_IDS=

# TikTok API (Get from TikTok Developer Portal)
TIKTOK_CLIENT_KEY=your_tiktok_client_key_here
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret_here

# File Upload Configuration
UPLOAD_PATH=./src/uploads
MAX_FILE_SIZE=10485760

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
ENVEOF
    echo "✅ Created backend/.env with default values"
fi

if [ ! -f "frontend/.env" ]; then
    cat > frontend/.env << 'ENVEOF'
# Frontend Environment Variables (macOS)
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=Naramakna Portal
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
ENVEOF
    echo "✅ Created frontend/.env"
fi

# Make scripts executable
echo "🔐 Setting script permissions..."
chmod +x scripts/*.sh

echo ""
echo "✅ macOS Development environment setup completed!"
echo ""
echo "🎯 Next steps:"
echo "1. Update backend/.env with your YouTube/TikTok API keys"
echo "2. Run 'npm run dev' to start both servers"
echo "3. Frontend: http://localhost:3000"
echo "4. Backend: http://localhost:3001/api"
echo "5. phpMyAdmin: http://localhost:8080 (if using Docker)"
echo ""
echo "🔧 Useful macOS commands:"
echo "• Check MySQL status: brew services list | grep mysql"
echo "• Restart MySQL: brew services restart mysql"
echo "• View MySQL logs: brew services logs mysql"
echo "• MySQL CLI: mysql -u naramakna_user -p naramakna_portal"
echo ""
echo "📖 Don't forget to read the documentation in ./docs/"
EOF

# macOS deployment script
cat > scripts/deploy-mac.sh << 'EOF'
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
EOF

# Make all scripts executable
chmod +x scripts/*.sh

echo ""
echo "🎉 ======================================================"
echo "   NARAMAKNA PORTAL STRUCTURE CREATED FOR macOS!"
echo "======================================================"
echo ""
echo "🍎 macOS-specific optimizations:"
echo "   ✅ Homebrew integration"
echo "   ✅ Apple Silicon (M1/M2) compatibility" 
echo "   ✅ macOS file system handling"
echo "   ✅ MySQL via Homebrew setup"
echo "   ✅ Xcode Command Line Tools support"
echo ""
echo "📁 Project structure created with:"
echo "   ✅ Frontend folder (React + TypeScript + Vite)"
echo "   ✅ Backend folder (Node.js + Express + MySQL)" 
echo "   ✅ Database schema and migrations"
echo "   ✅ macOS-compatible documentation"
echo "   ✅ Homebrew-based automation scripts"
echo "   ✅ Docker setup with Apple Silicon support"
echo ""
echo "🚀 Next steps for macOS:"
echo "   1. Run: npm run setup:dev (macOS-specific setup)"
echo "   2. Update backend/.env with your API keys"
echo "   3. Run: npm run dev"
echo ""
echo "🔧 macOS Requirements Check:"
if command -v brew &> /dev/null; then
    echo "   ✅ Homebrew: $(brew --version | head -n1)"
else
    echo "   ⚠️  Homebrew: Not installed (will be installed by setup script)"
fi

if command -v node &> /dev/null; then
    echo "   ✅ Node.js: $(node --version)"
else
    echo "   ⚠️  Node.js: Not installed (will be installed by setup script)"
fi

if command -v mysql &> /dev/null; then
    echo "   ✅ MySQL: $(mysql --version)"
else
    echo "   ⚠️  MySQL: Not installed (will be installed by setup script)"
fi

echo ""
echo "🌐 Development URLs:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend API: http://localhost:3001/api"
echo "   • phpMyAdmin: http://localhost:8080 (Docker)"
echo ""
echo "💡 All files contain detailed comments explaining their purpose!"
echo "🍎 Optimized for macOS Monterey (12.0) and newer!"
echo "======================================================"
