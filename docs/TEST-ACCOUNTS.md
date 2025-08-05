# 🔐 Test Accounts

## 📋 Ready-to-Use Accounts

### **👑 Superadmin Account:**
```
Username: superadmin
Password: password123
Email: superadmin@naramakna.id
Role: superadmin
Status: Active ✅
```

### **🛡️ Admin Account:**
```
Username: admin1
Password: password123
Email: admin@naramakna.id
Role: admin
Status: Active ✅
```

### **✍️ Writer Account:**
```
Username: testwriter
Password: password123
Email: writer@test.com
Role: writer
Status: Active ✅ (Approved)
```

---

## 🚀 Testing URLs

### **Frontend Login:**
```
http://localhost:5173/login
```

### **Backend API:**
```
http://localhost:3001/api/auth/login
```

---

## 🎯 Test Scenarios

### **1. Login Testing:**
1. Visit `http://localhost:5173/login`
2. Try each account above
3. Verify role-based redirects:
   - Superadmin → `/admin/dashboard`
   - Admin → `/admin/dashboard`
   - Writer → `/writer/dashboard`

### **2. Registration Testing:**
1. Visit `http://localhost:5173/register`
2. Register new writer account
3. Login as admin to approve writer
4. Test approved writer login

### **3. Permission Testing:**
1. Login as writer → Create content → Check pending status
2. Login as admin → Approve content → Verify published
3. Test role-based feature access

---

## ⚠️ Rate Limiting

Authentication endpoints have rate limiting:
- **Login:** 5 attempts per 15 minutes
- **Register:** 3 attempts per hour
- **Password Reset:** 3 attempts per hour

Wait if you see "Too many attempts" error.

---

## 🔄 Reset Database (if needed)

```bash
# Recreate superadmin
mysql -u naramakna_user -p naramakna_clean < database/create-superadmin.sql

# Add auth columns (if needed)
mysql -u naramakna_user -p naramakna_clean < database/add-auth-columns-simple.sql
```

---

## ✅ Account Status

All test accounts are **READY** and **ACTIVE** for immediate testing! 🎉