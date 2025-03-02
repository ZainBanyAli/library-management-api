import AuthorRepository from "../repositories/authorRepository";
import AuthorFactory from "../factories/authorFactory";

class AuthorService {
  public async addAuthor(name: string, bio: string) {
    const newAuthor = AuthorFactory.createAuthor(name, bio);
    return await AuthorRepository.createAuthor(newAuthor.name, newAuthor.bio);
  }

  public async getAuthors() {
    return await AuthorRepository.getAllAuthors();
  }

  public async updateAuthor(id: number, name: string, bio: string) {
    const affectedRows = await AuthorRepository.updateAuthor(id, name, bio);

    if (affectedRows === 0) {
      throw new Error("Not Found"); //  Ensures update fails if no row is affected
    }

    return { message: "Author updated successfully" };
  }

  public async deleteAuthor(id: number) {
    const affectedRows = await AuthorRepository.deleteAuthor(id);

    if (affectedRows === 0) {
      throw new Error("Not Found"); //  Ensures delete fails if no row is affected
    }

    return { message: "Author deleted successfully" };
  }
}

export default new AuthorService();
