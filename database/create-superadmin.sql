-- ========================================
-- CREATE SUPERADMIN ACCOUNT
-- ========================================
-- Execute: mysql -u naramakna_user -p naramakna_clean < database/create-superadmin.sql

-- Remove existing superadmin if exists
DELETE FROM users WHERE user_login = 'superadmin';

-- Create superadmin with proper bcrypt hash (password: 'password123')
INSERT INTO users (
  user_login, 
  user_pass, 
  user_nicename, 
  user_email, 
  display_name, 
  user_role, 
  user_status,
  email_verified,
  user_registered
) VALUES (
  'superadmin',
  '$2b$12$4Xl1EucxuYgNqzlySIM.f.zrpigqtodivxIFAqNdtrSFsINUMEcm6',
  'superadmin',
  'superadmin@naramakna.id',
  'Super Administrator',
  'superadmin',
  1,
  TRUE,
  NOW()
);

-- Verify creation
SELECT 'Superadmin created successfully:' as status;
SELECT user_login, user_email, user_role, user_status 
FROM users 
WHERE user_login = 'superadmin';

-- Show all admin accounts
SELECT 'All admin accounts:' as status;
SELECT user_login, user_email, user_role, user_status 
FROM users 
WHERE user_role IN ('superadmin', 'admin')
ORDER BY user_role DESC;