-- ========================================
-- REVERT TO DEVELOPMENT URLs
-- ========================================
-- Execute: mysql -u naramakna_user -p naramakna_clean < database/revert-to-development.sql

-- Update WordPress core URLs back to development
UPDATE options SET option_value = 'http://localhost:5173' WHERE option_name = 'home';
UPDATE options SET option_value = 'http://localhost:5173' WHERE option_name = 'siteurl';
UPDATE options SET option_value = 'http://localhost:5173' WHERE option_name = 'site_url';
UPDATE options SET option_value = 'http://localhost:3001/api' WHERE option_name = 'api_url';
UPDATE options SET option_value = 'http://localhost:3001/uploads' WHERE option_name = 'uploads_url';

-- Update post content URLs back to development
UPDATE posts 
SET post_content = REPLACE(post_content, 'https://naramakna.id', 'http://localhost:5173') 
WHERE post_content LIKE '%naramakna.id%';

UPDATE posts 
SET post_content = REPLACE(post_content, 'https://naramakna.id/uploads', 'http://localhost:3001/uploads') 
WHERE post_content LIKE '%naramakna.id/uploads%';

UPDATE posts 
SET post_content = REPLACE(post_content, 'naramakna.id/uploads', 'localhost:3001/uploads') 
WHERE post_content LIKE '%naramakna.id/uploads%';

UPDATE posts 
SET post_content = REPLACE(post_content, 'naramakna.id', 'localhost:5173') 
WHERE post_content LIKE '%naramakna.id%' AND post_content NOT LIKE '%localhost%';

-- Update meta values back to development
UPDATE postmeta 
SET meta_value = REPLACE(meta_value, 'https://naramakna.id', 'http://localhost:5173') 
WHERE meta_value LIKE '%naramakna.id%';

UPDATE postmeta 
SET meta_value = REPLACE(meta_value, 'naramakna.id/uploads', 'localhost:3001/uploads') 
WHERE meta_value LIKE '%naramakna.id/uploads%';

UPDATE postmeta 
SET meta_value = REPLACE(meta_value, 'naramakna.id', 'localhost:5173') 
WHERE meta_value LIKE '%naramakna.id%' AND meta_value NOT LIKE '%localhost%';

-- Update options values back to development
UPDATE options 
SET option_value = REPLACE(option_value, 'https://naramakna.id', 'http://localhost:5173') 
WHERE option_value LIKE '%naramakna.id%';

UPDATE options 
SET option_value = REPLACE(option_value, 'naramakna.id/uploads', 'localhost:3001/uploads') 
WHERE option_value LIKE '%naramakna.id/uploads%';

UPDATE options 
SET option_value = REPLACE(option_value, 'naramakna.id', 'localhost:5173') 
WHERE option_value LIKE '%naramakna.id%' AND option_value NOT LIKE '%localhost%';

-- ========================================
-- VERIFICATION
-- ========================================

SELECT '🔧 DEVELOPMENT URLs:' as status;
SELECT option_name, option_value 
FROM options 
WHERE option_name IN ('home', 'siteurl', 'site_url', 'api_url', 'uploads_url');

SELECT '📊 URL COUNTS:' as status;
SELECT 'Posts with localhost:' as type, COUNT(*) as count 
FROM posts WHERE post_content LIKE '%localhost%'
UNION ALL
SELECT 'Posts with uploads:', COUNT(*) 
FROM posts WHERE post_content LIKE '%/uploads/%'
UNION ALL
SELECT 'Remaining naramakna.id:', COUNT(*) 
FROM posts WHERE post_content LIKE '%naramakna.id%';

-- Sample updated content
SELECT '📄 SAMPLE CONTENT:' as status;
SELECT post_title, LEFT(post_content, 100) as preview
FROM posts 
WHERE post_content LIKE '%localhost:3001/uploads%' 
AND post_status = 'publish'
LIMIT 2;