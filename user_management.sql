
-- Database: user_management

-- Create the `users` table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(15),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for `users`
INSERT INTO users (name, email, password, mobile, role) VALUES
('Admin User', 'admin@example.com', '$2b$10$hash_for_demo_only', '1234567890', 'admin'),
('John Doe', 'john@example.com', '$2b$10$hash_for_demo_only', '0987654321', 'user');

-- Create the `courses` table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    instructor VARCHAR(255),
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for `courses`
INSERT INTO courses (name, category, status, instructor, price) VALUES
('React Basics', 'Programming', 'active', 'Jane Smith', 29.99),
('Advanced React', 'Programming', 'active', 'John Doe', 49.99);
