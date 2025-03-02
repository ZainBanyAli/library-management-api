class BookFactory {
    static createBook(title: string, author_id: number, published_year: number, genre: string) {
      return { title, author_id, published_year, genre };
    }
  }
  
  export default BookFactory;
  