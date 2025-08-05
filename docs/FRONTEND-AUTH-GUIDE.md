# 🎨 Frontend Authentication Views

## 📋 Overview

Simple CRUD views untuk authentication dan role-based dashboards tanpa styling kompleks.

---

## 🚀 Pages Created

### **🔐 Authentication Pages:**

#### **Login Page (`/login`):**
- Simple form dengan username/email + password
- Remember me checkbox
- Role-based redirect setelah login
- Test account credentials displayed
- Error/success handling

#### **Register Page (`/register`):**
- Username, email, display name, password fields
- Role request dropdown (user/writer)
- Writer approval notification
- Auto redirect setelah register

### **👑 Admin Dashboard (`/admin/dashboard`):**
**Tabs:**
- **Overview:** Statistics & metrics
- **Users:** User management table
- **Pending Writers:** Approve/reject writers
- **Pending Posts:** Approve/reject content

**Features:**
- User listing dengan role badges
- Writer approval buttons
- Post review dengan approve/reject
- Real-time data refresh

### **✍️ Writer Dashboard (`/writer/dashboard`):**
**Tabs:**
- **Overview:** Writing statistics
- **Create Post:** Content creation form
- **Pending Posts:** Status tracking

**Features:**
- Content creation (articles, videos, pages)
- Pending submission tracking
- Status notifications

### **👤 User Dashboard (`/user/dashboard`):**
**Tabs:**
- **Overview:** Account info & upgrade options
- **Profile:** Update personal information
- **Content:** Browse latest published content

**Features:**
- Profile management
- Content browsing
- Account upgrade prompts

---

## 🛣️ Routing System

### **Simple Router (`SimpleRouter.tsx`):**
```typescript
const path = window.location.pathname;

// Route mapping:
'/login'           → LoginPage
'/register'        → RegisterPage
'/admin/dashboard' → AdminDashboard (superadmin/admin)
'/writer/dashboard'→ WriterDashboard (writer)
'/user/dashboard'  → UserDashboard (user)
'/'               → Auto-redirect based on role
```

### **Role-based Redirects:**
```typescript
// After login redirect:
superadmin/admin → /admin/dashboard
writer          → /writer/dashboard
user            → /user/dashboard

// Default route redirect:
Logged in  → Role-based dashboard
Not logged → /login
```

---

## 🔑 Authentication Flow

### **Login Process:**
1. User submits credentials
2. API call ke `/api/auth/login`
3. Store user data + token in localStorage
4. Auto-redirect based on user role
5. Show dashboard sesuai permissions

### **Registration Process:**
1. User fills registration form
2. API call ke `/api/auth/register`
3. Handle writer approval flow
4. Show success/approval message
5. Redirect ke login atau dashboard

### **Protected Routes:**
- Dashboard pages check for stored user data
- API calls include Authorization header
- Auto logout jika token expired

---

## 📊 Dashboard Features

### **👑 Admin Features:**
```typescript
// User Management
- View all users with filters
- Approve/reject writer registrations
- User role/status management
- Bulk operations (future)

// Content Management  
- Review pending posts
- Approve/reject submissions
- View content statistics
- Bulk review actions

// System Overview
- User counts by role
- Pending items tracking
- Activity metrics
```

### **✍️ Writer Features:**
```typescript
// Content Creation
- Create posts/articles
- Add video content (YouTube/TikTok)
- Submit for review
- Track submission status

// Content Management
- View pending posts
- Edit draft content (future)
- Content performance (future)
```

### **👤 User Features:**
```typescript
// Profile Management
- Update display name, email, bio
- View account information
- Account upgrade options

// Content Consumption
- Browse published content
- Read articles/watch videos
- Comment on posts (future)
```

---

## 🎨 Styling Approach

### **Simple & Clean:**
- No external CSS frameworks
- Inline styles for simplicity
- Basic HTML table layouts
- Simple form styling
- Color-coded status badges

### **UI Components:**
```typescript
// Status Badges
user_role colors:
- superadmin: red background
- admin: blue background  
- writer: green background
- user: gray background

// Status Indicators
- Active: green
- Pending: orange
- Suspended: red

// Action Buttons
- Approve: green background
- Reject: red background
- Primary: blue background
```

---

## 🚀 API Integration

### **Authentication Endpoints:**
```typescript
// Login
POST /api/auth/login
{
  identifier: string,
  user_pass: string,
  remember_me?: boolean
}

// Register
POST /api/auth/register
{
  user_login: string,
  user_email: string,
  user_pass: string,
  display_name: string,
  role_request: 'user' | 'writer'
}

// Profile Update
PUT /api/auth/profile
{
  display_name?: string,
  user_email?: string,
  bio?: string
}
```

### **Admin Endpoints:**
```typescript
// Get Users
GET /api/users

// Approve Writer
POST /api/users/:id/approve-writer
{ approved: boolean }

// Get Pending Posts
GET /api/approval/pending

// Review Post
POST /api/approval/:id/review
{ action: 'approve' | 'reject', feedback?: string }
```

### **Content Endpoints:**
```typescript
// Create Content (Writer)
POST /api/content
{
  post_title: string,
  post_content: string,
  post_type: 'post' | 'youtube_video' | 'tiktok_video' | 'page'
}

// Get My Pending Posts
GET /api/approval/my-pending
```

---

## 🛡️ Security Features

### **Client-side Protection:**
- JWT token stored in localStorage
- Authorization header pada API calls
- Cookie-based authentication
- Auto-logout on token expiry

### **Role-based UI:**
- Dashboard access based on user role
- Feature availability by permission
- Admin-only functions protected
- Writer approval workflow

---

## 🧪 Testing Credentials

### **Pre-created Accounts:**
```bash
# Superadmin
Username: superadmin
Password: password123
Access: Full system control

# Admin  
Username: admin1
Password: password123
Access: User + content management

# Writer (Approved)
Username: testwriter
Password: password123
Access: Content creation
```

---

## 📱 Usage Instructions

### **Development Setup:**
```bash
# Start both servers
npm run dev

# Backend: http://localhost:3001
# Frontend: http://localhost:5174 (if 5173 busy)
```

### **Testing Flow:**
```bash
1. Visit http://localhost:5174/login
2. Login dengan test accounts
3. Explore dashboards sesuai role:
   - Superadmin/Admin: User + content management
   - Writer: Content creation + pending tracking
   - User: Profile + content browsing
4. Test registration flow
5. Test approval workflows
```

---

## 🏆 Status: COMPLETE ✅

**Simple authentication views berhasil dibuat dengan:**
- ✅ Login & registration pages
- ✅ Role-based dashboards (admin, writer, user)
- ✅ Simple router tanpa dependencies
- ✅ Full CRUD operations
- ✅ API integration dengan backend
- ✅ Authentication flow lengkap
- ✅ No styling frameworks (sesuai request)

**Ready untuk testing dan development!** 🚀

---

## 🔄 Next Steps (Optional)

### **Enhancements:**
- Add React Router for better navigation
- Implement proper error boundaries
- Add loading states
- Form validation improvements
- Toast notifications
- Modal dialogs
- Responsive design
- Dark mode toggle

### **Features:**
- Comment system integration
- File upload for content
- Rich text editor
- Search functionality
- Pagination
- Real-time notifications

*Last updated: $(date)*