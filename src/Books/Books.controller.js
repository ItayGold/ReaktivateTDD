import booksRepository from "./Books.repository";

export default class BooksController {
  constructor(store) {
    this.store = store;
  }

  async loadBooks() {
    this.store.setLoading(true);
    try {
      const books = await booksRepository.getBooks();
      this.store.setBooks(books);
    } finally {
      this.store.setLoading(false);
    }
  }

  async addBook({ name, author }) {
    const success = await booksRepository.addBook({ name, author });
    if (success) {
      // just add locally; in real apps you'd re-fetch
      this.store.addBook({ name, author, private: false }); 
    }
  }

  get books() {
    return this.store.books;
  }

  get privateBooksCount() {
    return this.store.privateBooksCount;
  }
}
