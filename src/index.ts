import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import "./config/db"; // Ensure database connection is initialized
import authRoutes from "./routes/authRoutes"; // Authentication routes
import bookRoutes from "./routes/bookRoutes"; // Book routes
import authorRoutes from "./routes/authorRoutes"; // Author routes
import ErrorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

app.get("/", (req, res) => {
  res.send("Library Management API is running...");
});

// Properly register Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler.handleErrors(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
