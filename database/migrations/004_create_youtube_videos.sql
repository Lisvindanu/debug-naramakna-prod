-- Migration untuk membuat tabel cache YouTube videos
CREATE TABLE youtube_videos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    youtube_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
