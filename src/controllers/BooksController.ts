import { BooksStore } from "../stores/BooksStore";

export class BooksController {
  constructor(private store: BooksStore) {}

  loadBooks(user: string) {
    return this.store.fetchBooks(user);
  }

  addBook(user: string, book: Partial<{ title: string; private: boolean }>) {
    return this.store.addBook(user, book);
  }

  get books() {
    return this.store.books;
  }

  get privateBooksCount() {
    return this.store.privateBooksCount;
  }
}
