import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
  // User Registration (Sign Up)
  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      // Check if the user already exists
      const [existingUser]: any = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (existingUser.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      await pool.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  }

  // User Login (Sign In)
  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user in database
      const [user]: any = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (user.length === 0) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }

      // Generate JWT Token
      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET as string, {
        expiresIn: "15m",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }
}

export default new AuthController();
