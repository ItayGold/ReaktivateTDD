import booksRepository from "./Books.repository";

export default class BooksController {
  constructor(store, user) {
    this.store = store;
    this.user = user;
  }

  async loadBooks() {
    const books = await booksRepository.getBooks(this.user);
    this.store.setBooks(books);
  }
  
  async addBook(book) {
    const success = await booksRepository.addBook(this.user, book);
    if (success) {
      await this.loadBooks(); // safer approach
    }
  }

  get books() {
    return this.store.books;
  }

  get privateBooksCount() {
    return this.store.privateBooksCount;
  }
}
