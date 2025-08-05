-- ========================================
-- UPDATE NARAMAKNA URLs FOR DEVELOPMENT
-- ========================================

-- Backup original URLs (optional)
-- SELECT * FROM wp_options WHERE option_name IN ('siteurl', 'home');

-- 1. UPDATE WORDPRESS CORE URLs
UPDATE wp_options 
SET option_value = 'http://localhost:5173' 
WHERE option_name = 'home';

UPDATE wp_options 
SET option_value = 'http://localhost:5173' 
WHERE option_name = 'siteurl';

-- 2. UPDATE POST CONTENT URLs
-- Replace naramakna.id with localhost:5173 in all posts
UPDATE wp_posts 
SET post_content = REPLACE(post_content, 'https://naramakna.id', 'http://localhost:5173')
WHERE post_content LIKE '%naramakna.id%';

UPDATE wp_posts 
SET post_content = REPLACE(post_content, 'http://naramakna.id', 'http://localhost:5173')
WHERE post_content LIKE '%naramakna.id%';

-- 3. UPDATE UPLOADS URLs (MOST IMPORTANT!)
-- Replace wp-content/uploads with just /uploads
UPDATE wp_posts 
SET post_content = REPLACE(post_content, '/wp-content/uploads/', '/uploads/')
WHERE post_content LIKE '%/wp-content/uploads/%';

-- Also replace full WordPress upload URLs
UPDATE wp_posts 
SET post_content = REPLACE(post_content, 'http://localhost:5173/wp-content/uploads/', 'http://localhost:5173/uploads/')
WHERE post_content LIKE '%wp-content/uploads%';

-- 4. UPDATE META VALUES (if any)
UPDATE wp_postmeta 
SET meta_value = REPLACE(meta_value, 'https://naramakna.id', 'http://localhost:5173')
WHERE meta_value LIKE '%naramakna.id%';

UPDATE wp_postmeta 
SET meta_value = REPLACE(meta_value, '/wp-content/uploads/', '/uploads/')
WHERE meta_value LIKE '%/wp-content/uploads/%';

-- 5. UPDATE COMMENTS (if any)
UPDATE wp_comments 
SET comment_content = REPLACE(comment_content, 'https://naramakna.id', 'http://localhost:5173')
WHERE comment_content LIKE '%naramakna.id%';

-- 6. UPDATE OPTIONS (theme/plugin settings)
UPDATE wp_options 
SET option_value = REPLACE(option_value, 'https://naramakna.id', 'http://localhost:5173')
WHERE option_value LIKE '%naramakna.id%';

UPDATE wp_options 
SET option_value = REPLACE(option_value, '/wp-content/uploads/', '/uploads/')
WHERE option_value LIKE '%/wp-content/uploads/%';

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check core URLs
SELECT 'Core URLs:' as section, option_name, option_value 
FROM wp_options 
WHERE option_name IN ('siteurl', 'home');

-- Check for remaining old URLs
SELECT 'Remaining naramakna.id:' as section, COUNT(*) as count
FROM wp_posts 
WHERE post_content LIKE '%naramakna.id%';

-- Check uploads paths
SELECT 'Upload paths:' as section, COUNT(*) as count
FROM wp_posts 
WHERE post_content LIKE '%/uploads/%';

-- Sample posts with images
SELECT 'Sample posts:' as section, post_title, 
       SUBSTRING(post_content, 1, 100) as content_preview
FROM wp_posts 
WHERE post_content LIKE '%/uploads/%' 
AND post_status = 'publish'
LIMIT 3;