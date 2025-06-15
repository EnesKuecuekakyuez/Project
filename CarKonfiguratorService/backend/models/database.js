import mysql from 'mysql2/promise';
import { config } from '../config/config.js';

// Create connection pool
const pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize database tables
export const initializeDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        
        // Create cars table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS cars (
                id INT PRIMARY KEY AUTO_INCREMENT,
                model VARCHAR(100) NOT NULL,
                brand VARCHAR(100) NOT NULL,
                base_price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create configurations table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS configurations (
                id INT PRIMARY KEY AUTO_INCREMENT,
                car_id INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                features JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
            )
        `);

        // Create saved_configurations table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS saved_configurations (
                id INT PRIMARY KEY AUTO_INCREMENT,
                car_id INT NOT NULL,
                configuration_id INT NOT NULL,
                user_id VARCHAR(100),
                color VARCHAR(50),
                accessories JSON,
                total_price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
                FOREIGN KEY (configuration_id) REFERENCES configurations(id) ON DELETE CASCADE
            )
        `);

        // Create colors table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS colors (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                hex_code VARCHAR(7) NOT NULL,
                price DECIMAL(10,2) DEFAULT 0,
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create accessories table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS accessories (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                category VARCHAR(50),
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        connection.release();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

export default pool; 