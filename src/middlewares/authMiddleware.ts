import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Request to include user data
interface AuthRequest extends Request {
  user?: any;
}

// Middleware to verify JWT
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <TOKEN>"

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach user info to request
    next(); // Continue to the next middleware/route
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return; 
  }
};
