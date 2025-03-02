import express from "express";
import AuthController from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// User registration and login
router.post("/register", AuthController.registerUser.bind(AuthController));
router.post("/login", AuthController.loginUser.bind(AuthController));

//  Ensure `req: AuthRequest`
router.get("/profile", authenticateToken, (req: any, res) => {
  res.json({ message: "Access granted to protected route!", user: req.user });
});

export default router;
