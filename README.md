# library-management-api
 Library Management System using Node.js with TypeScript 

** Project Overview

This is a RESTful API for managing a simple library system, built with Node.js and TypeScript, using MySQL raw queries. It follows best practices in Object-Oriented Programming (OOP) and implements a design pattern for better code maintainability.

** Technologies Used

Node.js with TypeScript

Express.js (Framework)

MySQL (Database)

JWT Authentication (Secure API requests)

Design Patterns: MVC, Singleton, and Factory Patterns

** Project Structure
/library-management-api
│── src/
│   ├── config/db.ts  # Database connection
│   ├── controllers/  # API controllers
│   ├── factories/    # Factory pattern implementation
│   ├── middlewares/  # Middleware for validation & auth
│   ├── repositories/ # Data handling (Raw MySQL queries)
│   ├── routes/       # API routes
│   ├── services/     # Business logic layer
│   ├── index.ts      # Entry point
│── database/library.sql  # Database schema
│── package.json
│── tsconfig.json
│── .env.example  # Environment variables
│── README.md



** Setup & Installation

1️⃣ Clone the Repository
git clone 
cd library-management-api

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the project root and configure your database settings:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=library_db
JWT_SECRET=your_secret_key
PORT=5000

4️⃣ Set Up the Database

5️⃣ Start the Server
npm run dev



** Authentication

This API uses JWT authentication. To access secured routes:
Login 
Get the token and send it in the Authorization header:
Authorization: Bearer your_token_here


** API Endpoints:
## Authentication Endpoints

| Method | Endpoint     | Description |
|--------|-------------|-------------|
| POST   | `/register` | Register a new user |
| POST   | `/login`    | Authenticate user and get JWT token |
| GET    | `/profile`  | Access protected user profile (Requires JWT) |

##  Author Endpoints

**Base URL:** `http://localhost:5001/api`

| Method | Endpoint              | Description |
|--------|----------------------|-------------|
| POST   | `/api/authors`       | Add a new author (Requires JWT) |
| GET    | `/api/authors`       | Get a list of all authors |
| PUT    | `/api/authors/:id`   | Update an author's details (Requires JWT) |
| DELETE | `/api/authors/:id`   | Delete an author (Requires JWT) |


##  Book Endpoints

**Base URL:** `http://localhost:5001/api`

| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| POST   | `/api/books`    | Add a new book (Requires JWT) |
| GET    | `/api/books`    | Get a list of all books |
| PUT    | `/api/books/:id` | Update a book's details (Requires JWT) |
| DELETE | `/api/books/:id` | Delete a book (Requires JWT) |


## Design Patterns Used

## Singleton Pattern (Database Connection)

This project uses the Singleton Pattern for managing the database connection efficiently. The Singleton Pattern ensures that only one instance of the database connection pool is created and shared across the entire application, preventing multiple redundant connections.

Implementation:

The database connection is created using mysql2 and stored in a shared connection pool.

When a query is executed, it reuses the same connection pool instead of opening a new connection every time.

The pool is exported using pool.promise(), ensuring a single shared instance is used throughout the application.

## Factory Pattern (Object Creation)

This project also uses the Factory Pattern to streamline the creation of Book and Author objects.

Implementation:

Instead of directly instantiating objects, the Factory Pattern provides a single point of creation.

This improves code reusability and maintainability by centralizing object construction logic.



## sql database queries:
CREATE DATABASE IF NOT EXISTS library;

USE library;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    published_year INT,
    genre VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);





 
