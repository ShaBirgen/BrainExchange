CREATE TABLE Users (
    user_id VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(255)  NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
	Role VARCHAR(255) DEFAULT 'user',
    Phone_number VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Created_at DATE NOT NULL,
    isDeleted BIT DEFAULT 0
);

USE BrainExchange

SELECT * FROM Users

CREATE DATABASE BrainExchange