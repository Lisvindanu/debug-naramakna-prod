-- ========================================
-- ADD AUTHENTICATION COLUMNS TO USERS TABLE
-- ========================================
-- Execute: mysql -u naramakna_user -p naramakna_clean < database/add-auth-columns.sql

-- Check if columns exist first, then add them
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'naramakna_clean' AND TABLE_NAME = 'users' 
AND COLUMN_NAME IN ('user_role', 'email_verified', 'last_login', 'failed_login_attempts', 'locked_until', 'profile_image', 'bio');

-- Add new columns for authentication system (only if they don't exist)
SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'naramakna_clean' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'user_role') = 0, 
    'ALTER TABLE users ADD COLUMN user_role ENUM(''superadmin'', ''admin'', ''writer'', ''user'') DEFAULT ''user'' NOT NULL', 
    'SELECT "user_role column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'naramakna_clean' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'email_verified') = 0, 
    'ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE', 
    'SELECT "email_verified column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'naramakna_clean' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'last_login') = 0, 
    'ALTER TABLE users ADD COLUMN last_login DATETIME NULL', 
    'SELECT "last_login column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'naramakna_clean' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'failed_login_attempts') = 0, 
    'ALTER TABLE users ADD COLUMN failed_login_attempts INT DEFAULT 0', 
    'SELECT "failed_login_attempts column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'naramakna_clean' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'locked_until') = 0, 
    'ALTER TABLE users ADD COLUMN locked_until DATETIME NULL', 
    'SELECT "locked_until column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'naramakna_clean' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'profile_image') = 0, 
    'ALTER TABLE users ADD COLUMN profile_image VARCHAR(255) NULL', 
    'SELECT "profile_image column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'naramakna_clean' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'bio') = 0, 
    'ALTER TABLE users ADD COLUMN bio TEXT NULL', 
    'SELECT "bio column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_role ON users (user_role);
CREATE INDEX IF NOT EXISTS idx_user_status ON users (user_status);
CREATE INDEX IF NOT EXISTS idx_email_verified ON users (email_verified);
CREATE INDEX IF NOT EXISTS idx_last_login ON users (last_login);

-- Update user_status comments
ALTER TABLE users MODIFY user_status INT NOT NULL DEFAULT 0 COMMENT '0=inactive/pending, 1=active, 2=suspended, 3=banned';

-- Create first superadmin user (password: 'password123')
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
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYSuHhUFUr8QqyS',
  'superadmin',
  'admin@naramakna.id',
  'Super Administrator',
  'superadmin',
  1,
  TRUE,
  NOW()
) ON DUPLICATE KEY UPDATE 
  user_role = 'superadmin', 
  user_status = 1,
  email_verified = TRUE;

-- Verification queries
SELECT '🔐 AUTH SETUP COMPLETE:' as status;

SELECT 'User Roles:' as info, user_role, COUNT(*) as count
FROM users 
GROUP BY user_role;

SELECT 'User Status:' as info, 
  CASE user_status 
    WHEN 0 THEN 'Pending'
    WHEN 1 THEN 'Active' 
    WHEN 2 THEN 'Suspended'
    WHEN 3 THEN 'Banned'
    ELSE 'Unknown'
  END as status_name,
  COUNT(*) as count
FROM users 
GROUP BY user_status;

SELECT 'Superadmin Account:' as info, user_login, user_email, user_role, user_status
FROM users 
WHERE user_role = 'superadmin';