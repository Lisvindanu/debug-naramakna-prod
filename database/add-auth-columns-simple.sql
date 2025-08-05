-- ========================================
-- ADD AUTHENTICATION COLUMNS (Simple Version)
-- ========================================

-- Add columns one by one with error handling
ALTER TABLE users ADD COLUMN user_role ENUM('superadmin', 'admin', 'writer', 'user') DEFAULT 'user' NOT NULL;
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN last_login DATETIME NULL;
ALTER TABLE users ADD COLUMN failed_login_attempts INT DEFAULT 0;
ALTER TABLE users ADD COLUMN locked_until DATETIME NULL;
ALTER TABLE users ADD COLUMN profile_image VARCHAR(255) NULL;
ALTER TABLE users ADD COLUMN bio TEXT NULL;

-- Add indexes
CREATE INDEX idx_user_role ON users (user_role);
CREATE INDEX idx_user_status_auth ON users (user_status);
CREATE INDEX idx_email_verified ON users (email_verified);

-- Update comment
ALTER TABLE users MODIFY user_status INT NOT NULL DEFAULT 0 COMMENT '0=pending, 1=active, 2=suspended, 3=banned';

-- Create superadmin (password: 'password123')
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
);

-- Verification
SELECT 'Setup complete!' as status;
SELECT user_login, user_email, user_role, user_status FROM users WHERE user_role = 'superadmin';