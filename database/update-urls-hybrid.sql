-- ========================================
-- UPDATE URLs FOR HYBRID DATABASE STRUCTURE
-- ========================================

-- For our hybrid structure (posts table without wp_ prefix)

-- 1. CHECK & UPDATE OPTIONS TABLE (if exists)
UPDATE options 
SET option_value = 'http://localhost:5173' 
WHERE option_name = 'home';

UPDATE options 
SET option_value = 'http://localhost:5173' 
WHERE option_name = 'siteurl';

-- 2. UPDATE POSTS CONTENT
-- Replace naramakna.id with localhost:5173 in all posts
UPDATE posts 
SET post_content = REPLACE(post_content, 'https://naramakna.id', 'http://localhost:5173')
WHERE post_content LIKE '%naramakna.id%';

UPDATE posts 
SET post_content = REPLACE(post_content, 'http://naramakna.id', 'http://localhost:5173')
WHERE post_content LIKE '%naramakna.id%';

-- 3. UPDATE UPLOADS URLs (MOST IMPORTANT!)
-- Replace wp-content/uploads with just /uploads
UPDATE posts 
SET post_content = REPLACE(post_content, '/wp-content/uploads/', '/uploads/')
WHERE post_content LIKE '%/wp-content/uploads/%';

-- Also replace full WordPress upload URLs
UPDATE posts 
SET post_content = REPLACE(post_content, 'http://localhost:5173/wp-content/uploads/', 'http://localhost:5173/uploads/')
WHERE post_content LIKE '%wp-content/uploads%';

-- 4. UPDATE POST META (if exists)
UPDATE postmeta 
SET meta_value = REPLACE(meta_value, 'https://naramakna.id', 'http://localhost:5173')
WHERE meta_value LIKE '%naramakna.id%';

UPDATE postmeta 
SET meta_value = REPLACE(meta_value, '/wp-content/uploads/', '/uploads/')
WHERE meta_value LIKE '%/wp-content/uploads/%';

-- 5. UPDATE COMMENTS (if any)
UPDATE comments 
SET comment_content = REPLACE(comment_content, 'https://naramakna.id', 'http://localhost:5173')
WHERE comment_content LIKE '%naramakna.id%';

-- 6. ADD DEVELOPMENT OPTIONS (for React frontend)
INSERT INTO options (option_name, option_value, autoload) VALUES 
('site_url', 'http://localhost:5173', 'yes'),
('api_url', 'http://localhost:3001/api', 'yes'),
('uploads_url', 'http://localhost:3001/uploads', 'yes')
ON DUPLICATE KEY UPDATE option_value = VALUES(option_value);

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check what tables we have
SELECT 'Available Tables:' as info;
SHOW TABLES;

-- Check posts with uploads
SELECT 'Posts with uploads:' as info, COUNT(*) as count
FROM posts 
WHERE post_content LIKE '%/uploads/%';

-- Sample posts with images (if any)
SELECT 'Sample content:' as info, post_title, 
       SUBSTRING(post_content, 1, 150) as content_preview
FROM posts 
WHERE post_content LIKE '%/uploads/%' 
OR post_content LIKE '%localhost%'
LIMIT 3;