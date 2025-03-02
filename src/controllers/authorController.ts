import { Request, Response, NextFunction } from "express";
import AuthorService from "../services/authorService";

class AuthorController {
  public async addAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, bio } = req.body;
      await AuthorService.addAuthor(name, bio);
      res.status(201).json({ status: 201, message: "Author added successfully" });
    } catch (error) {
      next(error);
    }
  }

  public async getAuthors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authors = await AuthorService.getAuthors();
      res.status(200).json({ status: 200, authors });
    } catch (error) {
      next(error);
    }
  }

  public async updateAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, bio } = req.body;
      const { id } = req.params;
      await AuthorService.updateAuthor(Number(id), name, bio);
      res.status(200).json({ status: 200, message: "Author updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await AuthorService.deleteAuthor(Number(id));
      res.status(200).json({ status: 200, message: "Author deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorController();
