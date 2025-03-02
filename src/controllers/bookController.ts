import { Request, Response, NextFunction } from "express";
import BookService from "../services/bookService";

class BookController {
  public async addBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, author_id, published_year, genre } = req.body;
      await BookService.addBook(title, author_id, published_year, genre);
      res.status(201).json({ status: 201, message: "Book added successfully" });
      return; 
    } catch (error) {
      next(error);
    }
  }

  public async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await BookService.getBooks();
      res.status(200).json({ status: 200, books });
      return;
    } catch (error) {
      next(error);
    }
  }

  public async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, author_id, published_year, genre } = req.body;
      const { id } = req.params;

      const updatedBook = await BookService.updateBook(Number(id), title, author_id, published_year, genre);

      if (!updatedBook) {
        res.status(404).json({ status: 404, message: "Book not found" });
        return;
      }

      res.status(200).json({ status: 200, message: "Book updated successfully" });
      return;
    } catch (error) {
      next(error);
    }
  }

  public async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const deletedBook = await BookService.deleteBook(Number(id));

      if (!deletedBook) {
        res.status(404).json({ status: 404, message: "Book not found" });
        return;
      }

      res.status(200).json({ status: 200, message: "Book deleted successfully" });
      return;
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
