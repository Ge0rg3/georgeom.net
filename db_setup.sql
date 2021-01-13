CREATE DATABASE IF NOT EXISTS website_db;

USE website_db;

CREATE TABLE IF NOT EXISTS blog_posts (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Preview VARCHAR(500) NOT NULL,
    Path VARCHAR(255) NOT NULL,
    Timestamp DATETIME NOT NULL,
    Source VARCHAR(20) NOT NULL,
    Category VARCHAR(20)
);

-- Add webadmin permission with (replace placeholder login creds):
-- grant select on website_db.* to 'WEBADMIN_USER' identified by 'WEBADMIN_PASS';

-- Demo post insert:
-- INSERT INTO blog_posts VALUES (NULL, "My Post", "Hello this is my latest post", "https://medium.com", '2020-12-01 08:18:00', "Medium", "HTB");