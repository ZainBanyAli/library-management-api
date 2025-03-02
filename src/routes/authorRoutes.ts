import express from "express";
import { body } from "express-validator";
import AuthorController from "../controllers/authorController";
import { authenticateToken } from "../middlewares/authMiddleware";
import ValidationMiddleware from "../middlewares/validationMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("bio").optional().isString().withMessage("Bio must be a string"),
  ],
  ValidationMiddleware.validate,
  AuthorController.addAuthor.bind(AuthorController)
);

router.get("/", AuthorController.getAuthors.bind(AuthorController));

router.put(
  "/:id",
  authenticateToken,
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("bio").optional().isString().withMessage("Bio must be a string"),
  ],
  ValidationMiddleware.validate,
  AuthorController.updateAuthor.bind(AuthorController)
);

router.delete("/:id", authenticateToken, AuthorController.deleteAuthor.bind(AuthorController));

export default router;
