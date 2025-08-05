-- ========================================
-- DEPLOY TO PRODUCTION URLs
-- ========================================
-- Execute: mysql -u naramakna_user -p naramakna_clean < database/deploy-to-production.sql

-- Update WordPress core URLs
UPDATE options SET option_value = 'https://naramakna.id' WHERE option_name = 'home';
UPDATE options SET option_value = 'https://naramakna.id' WHERE option_name = 'siteurl';
UPDATE options SET option_value = 'https://naramakna.id' WHERE option_name = 'site_url';
UPDATE options SET option_value = 'https://api.naramakna.id/api' WHERE option_name = 'api_url';
UPDATE options SET option_value = 'https://naramakna.id/uploads' WHERE option_name = 'uploads_url';

-- Update post content URLs
UPDATE posts 
SET post_content = REPLACE(post_content, 'http://localhost:5173', 'https://naramakna.id') 
WHERE post_content LIKE '%localhost:5173%';

UPDATE posts 
SET post_content = REPLACE(post_content, 'http://localhost:3001/uploads', 'https://naramakna.id/uploads') 
WHERE post_content LIKE '%localhost:3001/uploads%';

UPDATE posts 
SET post_content = REPLACE(post_content, 'localhost:5173', 'naramakna.id') 
WHERE post_content LIKE '%localhost:5173%';

UPDATE posts 
SET post_content = REPLACE(post_content, 'localhost:3001/uploads', 'naramakna.id/uploads') 
WHERE post_content LIKE '%localhost:3001/uploads%';

-- Force HTTPS for naramakna.id URLs
UPDATE posts 
SET post_content = REPLACE(post_content, 'http://naramakna.id', 'https://naramakna.id') 
WHERE post_content LIKE '%http://naramakna.id%';

-- Update meta values
UPDATE postmeta 
SET meta_value = REPLACE(meta_value, 'http://localhost:5173', 'https://naramakna.id') 
WHERE meta_value LIKE '%localhost:5173%';

UPDATE postmeta 
SET meta_value = REPLACE(meta_value, 'http://localhost:3001/uploads', 'https://naramakna.id/uploads') 
WHERE meta_value LIKE '%localhost:3001/uploads%';

UPDATE postmeta 
SET meta_value = REPLACE(meta_value, 'localhost:5173', 'naramakna.id') 
WHERE meta_value LIKE '%localhost:5173%';

-- Update options values
UPDATE options 
SET option_value = REPLACE(option_value, 'http://localhost:5173', 'https://naramakna.id') 
WHERE option_value LIKE '%localhost:5173%';

UPDATE options 
SET option_value = REPLACE(option_value, 'localhost:3001/uploads', 'naramakna.id/uploads') 
WHERE option_value LIKE '%localhost:3001/uploads%';

-- ========================================
-- VERIFICATION
-- ========================================

SELECT '🚀 PRODUCTION URLs:' as status;
SELECT option_name, option_value 
FROM options 
WHERE option_name IN ('home', 'siteurl', 'site_url', 'api_url', 'uploads_url');

SELECT '📊 URL COUNTS:' as status;
SELECT 'Posts with naramakna.id:' as type, COUNT(*) as count 
FROM posts WHERE post_content LIKE '%naramakna.id%'
UNION ALL
SELECT 'Posts with uploads:', COUNT(*) 
FROM posts WHERE post_content LIKE '%/uploads/%'
UNION ALL
SELECT 'Remaining localhost:', COUNT(*) 
FROM posts WHERE post_content LIKE '%localhost%';

-- Sample updated content
SELECT '📄 SAMPLE CONTENT:' as status;
SELECT post_title, LEFT(post_content, 100) as preview
FROM posts 
WHERE post_content LIKE '%naramakna.id/uploads%' 
AND post_status = 'publish'
LIMIT 2;