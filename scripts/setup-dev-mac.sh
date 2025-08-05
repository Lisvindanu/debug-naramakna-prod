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
