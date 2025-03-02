import pool from "../config/db";

class BookRepository {
  public async createBook(title: string, author_id: number, published_year: number, genre: string) {
    return await pool.query(
      "INSERT INTO books (title, author_id, published_year, genre) VALUES (?, ?, ?, ?)",
      [title, author_id, published_year, genre]
    );
  }

  public async getAllBooks() {
    const [books] = await pool.query("SELECT * FROM books");
    return books;
  }

  public async updateBook(id: number, title: string, author_id: number, published_year: number, genre: string) {
    const [result]: any = await pool.query(
      "UPDATE books SET title = ?, author_id = ?, published_year = ?, genre = ? WHERE id = ?",
      [title, author_id, published_year, genre, id]
    );
    return result.affectedRows; //  Return affectedRows
  }

  public async deleteBook(id: number) {
    const [result]: any = await pool.query("DELETE FROM books WHERE id = ?", [id]);
    return result.affectedRows; //  Return affectedRows
  }
}

export default new BookRepository();
