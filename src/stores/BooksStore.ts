import { makeAutoObservable, runInAction } from "mobx";
import { Book } from "../models/Book";
import { getBooksApi, addBookApi } from "../services/BookService";

export class BooksStore {
  books: Book[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBooks(user: string) {
    this.isLoading = true;
    const response = await getBooksApi(user);
    runInAction(() => {
      this.books = response;
      this.isLoading = false;
    });
  }

  async addBook(user: string, book: Partial<Book>) {
    const created = await addBookApi(user, book);
    runInAction(() => {
      this.books.push(created);
    });
  }

  get privateBooksCount() {
    return this.books.filter((b) => b.private).length;
  }

  get publicBooks() {
    return this.books.filter((b) => !b.private);
  }

  get privateBooks() {
    return this.books.filter((b) => b.private);
  }
}

export const booksStore = new BooksStore();
