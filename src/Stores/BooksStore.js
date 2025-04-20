import { makeAutoObservable, runInAction } from "mobx";

export default class BooksStore {
  books = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setBooks(books) {
    runInAction(() => {
      this.books = books;
    });
  }

  addBook(book) {
    runInAction(() => {
      this.books.push(book);
    });
  }

  setLoading(value) {
    this.isLoading = value;
  }

  get privateBooks() {
    return this.books.filter((b) => b.private === true);
  }

  get privateBooksCount() {
    return this.privateBooks.length;
  }
}
