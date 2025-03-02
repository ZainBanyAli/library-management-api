class AuthorFactory {
    static createAuthor(name: string, bio: string) {
      return { name, bio };
    }
  }
  
  export default AuthorFactory;
  