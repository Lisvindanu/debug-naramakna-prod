# 🚀 Deployment & URL Management Guide

## 📋 Overview

Guide lengkap untuk manage URLs dari development ke production dan sebaliknya.

---

## 🛠️ Environment URLs

### 🔧 **Development (Current)**
```bash
Frontend:  http://localhost:5173
Backend:   http://localhost:3001  
API:       http://localhost:3001/api
Uploads:   http://localhost:3001/uploads
Database:  localhost:3306 (naramakna_clean)
```

### 🌐 **Production (Target)**
```bash
Frontend:  https://naramakna.id
Backend:   https://api.naramakna.id (atau naramakna.id:3001)
API:       https://api.naramakna.id/api
Uploads:   https://naramakna.id/uploads
Database:  production-db-host (naramakna_clean)
```

---

## 📦 Quick Commands

### 🔄 **Development → Production**

#### 1. Update Database URLs
```sql
-- Core URLs
UPDATE options SET option_value = 'https://naramakna.id' WHERE option_name = 'home';
UPDATE options SET option_value = 'https://naramakna.id' WHERE option_name = 'siteurl';
UPDATE options SET option_value = 'https://naramakna.id' WHERE option_name = 'site_url';
UPDATE options SET option_value = 'https://api.naramakna.id/api' WHERE option_name = 'api_url';
UPDATE options SET option_value = 'https://naramakna.id/uploads' WHERE option_name = 'uploads_url';

-- Content URLs
UPDATE posts SET post_content = REPLACE(post_content, 'http://localhost:5173', 'https://naramakna.id') WHERE post_content LIKE '%localhost:5173%';
UPDATE posts SET post_content = REPLACE(post_content, 'http://localhost:3001/uploads', 'https://naramakna.id/uploads') WHERE post_content LIKE '%localhost:3001/uploads%';

-- Meta values
UPDATE postmeta SET meta_value = REPLACE(meta_value, 'http://localhost:5173', 'https://naramakna.id') WHERE meta_value LIKE '%localhost:5173%';
UPDATE postmeta SET meta_value = REPLACE(meta_value, 'http://localhost:3001/uploads', 'https://naramakna.id/uploads') WHERE meta_value LIKE '%localhost:3001/uploads%';
```

#### 2. Update Backend Config
```javascript
// backend/src/config/database.js
const config = {
  host: process.env.DB_HOST || 'production-db-host',
  user: process.env.DB_USER || 'naramakna_user',
  password: process.env.DB_PASSWORD || 'production-password',
  database: process.env.DB_NAME || 'naramakna_clean',
  port: process.env.DB_PORT || 3306
};

// backend/.env (production)
NODE_ENV=production
DB_HOST=production-db-host
DB_USER=naramakna_user
DB_PASSWORD=strong-production-password
DB_NAME=naramakna_clean
JWT_SECRET=super-strong-jwt-secret
PORT=3001
CORS_ORIGIN=https://naramakna.id
```

#### 3. Update Frontend Config
```typescript
// frontend/src/utils/constants/api.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.naramakna.id/api'
  : 'http://localhost:3001/api';

const UPLOADS_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://naramakna.id/uploads'
  : 'http://localhost:3001/uploads';
```

### 🔄 **Production → Development**

#### 1. Back to Development URLs
```sql
-- Core URLs
UPDATE options SET option_value = 'http://localhost:5173' WHERE option_name = 'home';
UPDATE options SET option_value = 'http://localhost:5173' WHERE option_name = 'siteurl';
UPDATE options SET option_value = 'http://localhost:5173' WHERE option_name = 'site_url';
UPDATE options SET option_value = 'http://localhost:3001/api' WHERE option_name = 'api_url';
UPDATE options SET option_value = 'http://localhost:3001/uploads' WHERE option_name = 'uploads_url';

-- Content URLs
UPDATE posts SET post_content = REPLACE(post_content, 'https://naramakna.id', 'http://localhost:5173') WHERE post_content LIKE '%naramakna.id%';
UPDATE posts SET post_content = REPLACE(post_content, 'https://naramakna.id/uploads', 'http://localhost:3001/uploads') WHERE post_content LIKE '%naramakna.id/uploads%';

-- Meta values
UPDATE postmeta SET meta_value = REPLACE(meta_value, 'https://naramakna.id', 'http://localhost:5173') WHERE meta_value LIKE '%naramakna.id%';
```

---

## 📜 SQL Scripts

### 🎯 **Ready-to-Use Scripts**

#### `database/deploy-to-production.sql`
```sql
-- ========================================
-- DEPLOY TO PRODUCTION URLs
-- ========================================

-- Update WordPress core URLs
UPDATE options SET option_value = 'https://naramakna.id' WHERE option_name IN ('home', 'siteurl', 'site_url');
UPDATE options SET option_value = 'https://api.naramakna.id/api' WHERE option_name = 'api_url';
UPDATE options SET option_value = 'https://naramakna.id/uploads' WHERE option_name = 'uploads_url';

-- Update post content
UPDATE posts SET post_content = REPLACE(post_content, 'localhost:5173', 'naramakna.id') WHERE post_content LIKE '%localhost:5173%';
UPDATE posts SET post_content = REPLACE(post_content, 'localhost:3001/uploads', 'naramakna.id/uploads') WHERE post_content LIKE '%localhost:3001/uploads%';
UPDATE posts SET post_content = REPLACE(post_content, 'http://', 'https://') WHERE post_content LIKE '%http://naramakna.id%';

-- Update meta values
UPDATE postmeta SET meta_value = REPLACE(meta_value, 'localhost:5173', 'naramakna.id') WHERE meta_value LIKE '%localhost:5173%';
UPDATE postmeta SET meta_value = REPLACE(meta_value, 'localhost:3001/uploads', 'naramakna.id/uploads') WHERE meta_value LIKE '%localhost:3001/uploads%';

-- Update options
UPDATE options SET option_value = REPLACE(option_value, 'localhost:5173', 'naramakna.id') WHERE option_value LIKE '%localhost:5173%';

-- Verification
SELECT 'Production URLs:' as status, option_name, option_value 
FROM options 
WHERE option_name IN ('home', 'siteurl', 'api_url', 'uploads_url');
```

#### `database/revert-to-development.sql`
```sql
-- ========================================
-- REVERT TO DEVELOPMENT URLs
-- ========================================

-- Update WordPress core URLs
UPDATE options SET option_value = 'http://localhost:5173' WHERE option_name IN ('home', 'siteurl', 'site_url');
UPDATE options SET option_value = 'http://localhost:3001/api' WHERE option_name = 'api_url';
UPDATE options SET option_value = 'http://localhost:3001/uploads' WHERE option_name = 'uploads_url';

-- Update post content
UPDATE posts SET post_content = REPLACE(post_content, 'https://naramakna.id', 'http://localhost:5173') WHERE post_content LIKE '%naramakna.id%';
UPDATE posts SET post_content = REPLACE(post_content, 'naramakna.id/uploads', 'localhost:3001/uploads') WHERE post_content LIKE '%naramakna.id/uploads%';

-- Update meta values
UPDATE postmeta SET meta_value = REPLACE(meta_value, 'https://naramakna.id', 'http://localhost:5173') WHERE meta_value LIKE '%naramakna.id%';
UPDATE postmeta SET meta_value = REPLACE(meta_value, 'naramakna.id/uploads', 'localhost:3001/uploads') WHERE meta_value LIKE '%naramakna.id/uploads%';

-- Update options
UPDATE options SET option_value = REPLACE(option_value, 'naramakna.id', 'localhost:5173') WHERE option_value LIKE '%naramakna.id%';

-- Verification
SELECT 'Development URLs:' as status, option_name, option_value 
FROM options 
WHERE option_name IN ('home', 'siteurl', 'api_url', 'uploads_url');
```

---

## 🚀 Deployment Checklist

### 📋 **Before Deploy**
- [ ] Test all API endpoints locally
- [ ] Verify uploads are working
- [ ] Check database connections
- [ ] Update environment variables
- [ ] Build frontend for production
- [ ] Test backend with production DB

### 📋 **During Deploy**
- [ ] Upload backend code to server
- [ ] Upload frontend build to server
- [ ] Copy uploads folder to server
- [ ] Import database (if needed)
- [ ] Run URL update SQL script
- [ ] Update DNS records
- [ ] Configure SSL certificates

### 📋 **After Deploy**
- [ ] Test frontend loads
- [ ] Test API endpoints
- [ ] Test media files load
- [ ] Verify database connections
- [ ] Check logs for errors
- [ ] Test from multiple devices

---

## 🌍 Server Architecture

### 🏗️ **Recommended Setup**

#### **Option 1: Single Server**
```
naramakna.id (Frontend - React build)
├── /api/* → Backend Express (port 3001)
├── /uploads/* → Static files
└── /* → React SPA
```

#### **Option 2: Separate Servers**
```
naramakna.id → Frontend (React)
api.naramakna.id → Backend (Express)
cdn.naramakna.id → Static files/uploads
```

### 🔧 **Nginx Configuration**

#### **Single Server Setup**
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name naramakna.id www.naramakna.id;
    
    # Frontend (React)
    location / {
        root /var/www/naramakna.id/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Static uploads
    location /uploads/ {
        root /var/www/naramakna.id/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 📱 Environment Variables

### 🔧 **Backend `.env`**

#### **Development**
```bash
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_USER=naramakna_user
DB_PASSWORD=password
DB_NAME=naramakna_clean
JWT_SECRET=dev-jwt-secret
CORS_ORIGIN=http://localhost:5173
```

#### **Production**
```bash
NODE_ENV=production
PORT=3001
DB_HOST=your-production-db
DB_USER=naramakna_user
DB_PASSWORD=strong-production-password
DB_NAME=naramakna_clean
JWT_SECRET=super-strong-jwt-secret
CORS_ORIGIN=https://naramakna.id
```

### ⚛️ **Frontend `.env`**

#### **Development**
```bash
VITE_API_URL=http://localhost:3001/api
VITE_UPLOADS_URL=http://localhost:3001/uploads
VITE_NODE_ENV=development
```

#### **Production**
```bash
VITE_API_URL=https://api.naramakna.id/api
VITE_UPLOADS_URL=https://naramakna.id/uploads
VITE_NODE_ENV=production
```

---

## 🎯 Quick Commands Reference

### 📊 **Database Check**
```sql
-- Check current URLs
SELECT option_name, option_value FROM options 
WHERE option_name IN ('home', 'siteurl', 'api_url', 'uploads_url');

-- Count posts with localhost
SELECT COUNT(*) FROM posts WHERE post_content LIKE '%localhost%';

-- Count posts with naramakna.id
SELECT COUNT(*) FROM posts WHERE post_content LIKE '%naramakna.id%';
```

### 🔄 **One-liner Commands**
```bash
# Deploy to production
mysql -u naramakna_user -p naramakna_clean < database/deploy-to-production.sql

# Revert to development
mysql -u naramakna_user -p naramakna_clean < database/revert-to-development.sql

# Build frontend for production
cd frontend && npm run build

# Start backend in production
cd backend && NODE_ENV=production npm start
```

---

## 💡 Tips & Best Practices

### ✅ **Do's**
- Always backup database before URL changes
- Test on staging environment first
- Use environment variables for different configs
- Monitor server logs after deployment
- Keep development and production configs separate

### ❌ **Don'ts**
- Don't hardcode URLs in components
- Don't forget to update both database AND code
- Don't skip SSL certificates in production
- Don't mix development and production data
- Don't forget to update CORS settings

---

## 🆘 Troubleshooting

### 🔍 **Common Issues**

#### **CORS Errors**
```javascript
// backend/src/app.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://naramakna.id', 'https://www.naramakna.id']
    : ['http://localhost:5173']
}));
```

#### **Mixed Content (HTTP/HTTPS)**
```sql
-- Force HTTPS in production
UPDATE posts SET post_content = REPLACE(post_content, 'http://naramakna.id', 'https://naramakna.id');
```

#### **Upload Path Issues**
```bash
# Check uploads folder permissions
chmod -R 755 public/uploads/
chown -R www-data:www-data public/uploads/
```

---

## 📞 Quick Reference

| Environment | Frontend | Backend | Database | 
|-------------|----------|---------|----------|
| **Development** | :5173 | :3001 | localhost |
| **Production** | :443 (https) | :3001 | production-host |

**Database URL Script:** `database/deploy-to-production.sql` ↔️ `database/revert-to-development.sql`

**Config Files:** `backend/.env` | `frontend/.env.local`

**Deploy Command:** `mysql -u user -p database < script.sql`

---

*Last updated: $(date)*