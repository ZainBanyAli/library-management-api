import pool from "../config/db";

class AuthorRepository {
  public async createAuthor(name: string, bio: string) {
    return await pool.query("INSERT INTO authors (name, bio) VALUES (?, ?)", [name, bio]);
  }

  public async getAllAuthors() {
    const [authors] = await pool.query("SELECT * FROM authors");
    return authors;
  }

  public async updateAuthor(id: number, name: string, bio: string) {
    const [result]: any = await pool.query(
      "UPDATE authors SET name = ?, bio = ? WHERE id = ?",
      [name, bio, id]
    );
    return result.affectedRows; //Returns affectedRows
  }

  public async deleteAuthor(id: number) {
    const [result]: any = await pool.query("DELETE FROM authors WHERE id = ?", [id]);
    return result.affectedRows; // Returns affectedRows
  }
}

export default new AuthorRepository();
