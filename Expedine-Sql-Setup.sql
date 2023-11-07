-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

CREATE TABLE `Chats` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `chat_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `chat_id` (`chat_id`),
  CONSTRAINT `Carts_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `Chats` (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CartItems` (
    `cart_item_id` INT NOT NULL AUTO_INCREMENT,
    `cart_id` INT DEFAULT NULL,
    `meal_item_id` INT DEFAULT NULL,
    `added_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`cart_item_id`),
    KEY `cart_id` (`cart_id`),
    KEY `meal_item_id` (`meal_item_id`),
    CONSTRAINT `CartItems_ibfk_1` FOREIGN KEY (`cart_id`)
        REFERENCES `Carts` (`cart_id`),
    CONSTRAINT `CartItems_ibfk_2` FOREIGN KEY (`meal_item_id`)
        REFERENCES `MealItems` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=31 DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

CREATE TABLE `Chats` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `chat_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `MealItems` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text,
  `Price` float DEFAULT NULL,
  `ItemType` text,
  `Image` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `sender_role` text,
  `message_content` text,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `function_call` tinyint(1) DEFAULT NULL,
  `function_arg` int DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `chat_id` (`chat_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `Chats` (`chat_id`),
  CONSTRAINT `Messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=393 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Users (username, email, password, created_at)
VALUES ('User3', 'john.doe@example.com', 'hashed_password', NOW());

INSERT INTO Users (username, email, password, created_at)
VALUES ('User3', 'john.doe@example.com', 'hashed_password', NOW());

INSERT INTO Users (username, email, password, created_at)
VALUES ('User3', 'john.doe@example.com', 'hashed_password', NOW());

INSERT INTO Users (username, email, password, created_at)
VALUES ('User3', 'john.doe@example.com', 'hashed_password', NOW());