-- Migration untuk membuat tabel analytics tracking
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content_type ENUM('article', 'video') NOT NULL,
    content_id INT NOT NULL,
    event_type ENUM('view', 'like', 'comment') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
