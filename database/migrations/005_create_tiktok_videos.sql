-- Migration untuk membuat tabel cache TikTok videos
CREATE TABLE tiktok_videos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tiktok_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255),
    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
