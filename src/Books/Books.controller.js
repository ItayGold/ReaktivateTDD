import booksRepository from "./Books.repository";

export default class BooksController {
  constructor(store, user) {
    this.store = store;
    this.user = user;
  }

  async loadBooks() {
    this.store.setLoading(true);
    try {
      const books = await booksRepository.getBooks(this.user);
      this.store.setBooks(books);
    } catch (error) {
      console.debug("Failed to load books:", error);
    } finally {
      this.store.setLoading(false);
    }
  }

  async addBook(book) {
    try {
      const success = await booksRepository.addBook(this.user, book);
      if (success) {
        await this.loadBooks(); // ensures data consistency with backend
      }
    } catch (error) {
      console.debug("Failed to add book:", error);
    }
  }

  async resetBooks() {
    try {
      const success = await booksRepository.resetBooks(this.user);
      if (success) {
        await this.loadBooks();
      }
    } catch (error) {
      console.debug("Failed to reset books:", error);
    }
  }

  toggleFilter() {
    this.store.toggleFilter();
  }

  get books() {
    return this.store.filteredBooks;
  }

  get privateBooksCount() {
    return this.store.privateBooksCount;
  }
}
