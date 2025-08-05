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
