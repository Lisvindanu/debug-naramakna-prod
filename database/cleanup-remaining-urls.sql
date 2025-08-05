-- ========================================
-- CLEANUP REMAINING naramakna.id URLs
-- ========================================

-- These might be in JSON, meta, or other formats that need specific handling

-- 1. Check what types of content still have naramakna.id
SELECT 'Post content with naramakna.id:' as info, COUNT(*) as count, post_type
FROM posts 
WHERE post_content LIKE '%naramakna.id%'
GROUP BY post_type;

-- 2. Check postmeta for naramakna.id
SELECT 'Postmeta with naramakna.id:' as info, COUNT(*) as count
FROM postmeta 
WHERE meta_value LIKE '%naramakna.id%';

-- 3. Check options for naramakna.id  
SELECT 'Options with naramakna.id:' as info, COUNT(*) as count
FROM options 
WHERE option_value LIKE '%naramakna.id%';

-- 4. FINAL CLEANUP: Replace all remaining naramakna.id URLs
UPDATE posts 
SET post_content = REPLACE(post_content, 'naramakna.id', 'localhost:5173')
WHERE post_content LIKE '%naramakna.id%';

UPDATE postmeta 
SET meta_value = REPLACE(meta_value, 'naramakna.id', 'localhost:5173')
WHERE meta_value LIKE '%naramakna.id%';

UPDATE options 
SET option_value = REPLACE(option_value, 'naramakna.id', 'localhost:5173')
WHERE option_value LIKE '%naramakna.id%';

-- 5. VERIFICATION
SELECT 'Final check - remaining naramakna.id:' as info;
SELECT 'Posts:' as table_name, COUNT(*) as remaining_urls FROM posts WHERE post_content LIKE '%naramakna.id%'
UNION ALL
SELECT 'Postmeta:', COUNT(*) FROM postmeta WHERE meta_value LIKE '%naramakna.id%'  
UNION ALL
SELECT 'Options:', COUNT(*) FROM options WHERE option_value LIKE '%naramakna.id%';

SELECT 'Upload URLs updated:' as info, COUNT(*) as total_uploads
FROM posts 
WHERE post_content LIKE '%/uploads/%';