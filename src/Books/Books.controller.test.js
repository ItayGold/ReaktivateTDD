import BooksController from "./Books.controller";

jest.mock("./Books.repository", () => ({
  __esModule: true,
  default: {
    getBooks: jest.fn(),
    addBook: jest.fn(),
    resetBooks: jest.fn()
  }
}));

import booksRepository from "./Books.repository";

describe("BooksController", () => {
  let store;
  let controller;

  beforeEach(() => {
    booksRepository.getBooks.mockResolvedValue([
      { name: "Test Book", author: "Tester", private: true }
    ]);
    booksRepository.addBook.mockResolvedValue(true);

    store = {
      setLoading: jest.fn(),
      setBooks: jest.fn(),
      addBook: jest.fn(),
      toggleFilter: jest.fn(),
      books: [],
      privateBooksCount: 1,
      filteredBooks: [{ name: "Test Book", author: "Tester", private: true }]
    };

    controller = new BooksController(store, "testuser");
  });

  it("loads books from repository and updates store", async () => {
    await controller.loadBooks();

    expect(store.setLoading).toHaveBeenCalledTimes(2);
    expect(store.setLoading).toHaveBeenNthCalledWith(1, true);
    expect(store.setBooks).toHaveBeenCalledWith([
      { name: "Test Book", author: "Tester", private: true }
    ]);
    expect(store.setLoading).toHaveBeenNthCalledWith(2, false);
  });

  it("adds a book and reloads books if successful", async () => {
    await controller.addBook({
      name: "Clean Architecture",
      author: "Uncle Bob",
      private: true
    });

    expect(booksRepository.addBook).toHaveBeenCalledWith("testuser", {
      name: "Clean Architecture",
      author: "Uncle Bob",
      private: true
    });

    expect(booksRepository.getBooks).toHaveBeenCalled(); // triggered via loadBooks()
    expect(store.setBooks).toHaveBeenCalled(); // from loadBooks()
  });

  it("exposes filteredBooks and privateBooksCount from the store", () => {
    expect(controller.books).toEqual(store.filteredBooks);
    expect(controller.privateBooksCount).toBe(1);
  });
});
