import express from "express";
import { body } from "express-validator";
import BookController from "../controllers/bookController";
import { authenticateToken } from "../middlewares/authMiddleware";
import ValidationMiddleware from "../middlewares/validationMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("author_id").isNumeric().withMessage("Author ID must be a number"),
    body("published_year").isNumeric().withMessage("Published year must be a number"),
    body("genre").notEmpty().withMessage("Genre is required"),
  ],
  ValidationMiddleware.validate,
  BookController.addBook.bind(BookController)
);

router.get("/", BookController.getBooks.bind(BookController));

router.put(
  "/:id",
  authenticateToken,
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("author_id").optional().isNumeric().withMessage("Author ID must be a number"),
    body("published_year").optional().isNumeric().withMessage("Published year must be a number"),
    body("genre").optional().notEmpty().withMessage("Genre cannot be empty"),
  ],
  ValidationMiddleware.validate,
  BookController.updateBook.bind(BookController)
);

router.delete("/:id", authenticateToken, BookController.deleteBook.bind(BookController));

export default router;
