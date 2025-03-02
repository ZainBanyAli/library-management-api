# library-management-api
 Library Management System using Node.js with TypeScript 

* Project Overview

This is a RESTful API for managing a simple library system, built with Node.js and TypeScript, using MySQL raw queries. It follows best practices in Object-Oriented Programming (OOP) and implements a design pattern for better code maintainability.

* Technologies Used

Node.js with TypeScript

Express.js (Framework)

MySQL (Database)

JWT Authentication (Secure API requests)

Design Pattern: Factory Pattern


* Project Structure
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

* Setup & Installation

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


* Authentication

This API uses JWT authentication. To access secured routes:

Login 

Get the token and send it in the Authorization header:
Authorization: Bearer your_token_here

 