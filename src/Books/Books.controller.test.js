import BooksController from "./Books.controller";

jest.mock("./Books.repository", () => ({
  __esModule: true,
  default: {
    getBooks: jest.fn(),
    addBook: jest.fn()
  }
}));


import booksRepository from "./Books.repository";

describe("BooksController", () => {
  let store;
  let controller;

  beforeEach(() => {
    booksRepository.getBooks.mockReset();
    booksRepository.addBook.mockReset();
  
    booksRepository.getBooks.mockResolvedValue([
      { name: "Test Book", author: "Tester", private: true }
    ]);
  
    booksRepository.addBook.mockResolvedValue(true);
  
    store = {
      setLoading: jest.fn(),
      setBooks: jest.fn(),
      addBook: jest.fn(),
      books: [],
      privateBooksCount: 1
    };
  
    controller = new BooksController(store, "testuser");
  });
  

  it("loads books from repository and updates store", async () => {
    await controller.loadBooks();
    expect(store.setLoading).toHaveBeenCalledWith(true);
    expect(store.setBooks).toHaveBeenCalledWith([
      { name: "Test Book", author: "Tester", private: true }
    ]);
    expect(store.setLoading).toHaveBeenCalledWith(false);
  });
  it("loads books from repository and updates store", async () => {
    await controller.loadBooks();
  
    console.log("setLoading calls:", store.setLoading.mock.calls);
  
    expect(store.setLoading).toHaveBeenCalledTimes(2);
    expect(store.setLoading).toHaveBeenNthCalledWith(1, true);
    expect(store.setBooks).toHaveBeenCalledWith([
      { name: "Test Book", author: "Tester", private: true }
    ]);
    expect(store.setLoading).toHaveBeenNthCalledWith(2, false);
  });
  
  
});
