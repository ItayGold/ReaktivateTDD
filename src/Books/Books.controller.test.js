import BooksController from "./Books.controller";

// Mock the repository
jest.mock("./Books.repository", () => ({
  __esModule: true,
  default: {
    getBooks: jest.fn(),
    addBook: jest.fn()
  }
}));

import booksRepository from "./Books.repository";

describe("BooksController", () => {
  let mockStore;
  let controller;

  beforeEach(() => {
    mockStore = {
      setLoading: jest.fn(),
      setBooks: jest.fn(),
      addBook: jest.fn(),
      books: [{ name: "Book A", private: false }],
      privateBooksCount: 1
    };

    controller = new BooksController(mockStore);
  });

  it("should load books and update store", async () => {
    const mockData = [
      { name: "Clean Code", author: "Robert C. Martin", private: false }
    ];
    booksRepository.getBooks.mockResolvedValue(mockData);

    await controller.loadBooks();

    expect(mockStore.setLoading).toHaveBeenCalledWith(true);
    expect(mockStore.setBooks).toHaveBeenCalledWith(mockData);
    expect(mockStore.setLoading).toHaveBeenCalledWith(false);
  });

  it("should add a book when repository returns success", async () => {
    booksRepository.addBook.mockResolvedValue(true);
    const newBook = { name: "Domain-Driven Design", author: "Eric Evans" };

    await controller.addBook(newBook);

    expect(mockStore.addBook).toHaveBeenCalledWith({
      ...newBook,
      private: false
    });
  });

  it("should not add a book if repository fails", async () => {
    booksRepository.addBook.mockResolvedValue(false);
    const newBook = { name: "UML Distilled", author: "Martin Fowler" };

    await controller.addBook(newBook);

    expect(mockStore.addBook).not.toHaveBeenCalled();
  });
});
