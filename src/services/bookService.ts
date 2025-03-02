import BookRepository from "../repositories/bookRepository";
import BookFactory from "../factories/bookFactory";

class BookService {
  public async addBook(title: string, author_id: number, published_year: number, genre: string) {
    const newBook = BookFactory.createBook(title, author_id, published_year, genre);
    return await BookRepository.createBook(newBook.title, newBook.author_id, newBook.published_year, newBook.genre);
  }

  public async getBooks() {
    return await BookRepository.getAllBooks();
  }

  public async updateBook(id: number, title: string, author_id: number, published_year: number, genre: string) {
    const affectedRows = await BookRepository.updateBook(id, title, author_id, published_year, genre);
    if (affectedRows === 0) {
      throw new Error("Not Found"); //  Throw error if no book was updated
    }
    return { message: "Book updated successfully" };
  }

  public async deleteBook(id: number) {
    const affectedRows = await BookRepository.deleteBook(id);
    if (affectedRows === 0) {
      throw new Error("Not Found"); //  Throw error if no book was deleted
    }
    return { message: "Book deleted successfully" };
  }
}

export default new BookService();
