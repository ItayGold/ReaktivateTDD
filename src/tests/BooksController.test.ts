import { BooksStore } from "../stores/BooksStore";
import { BooksController } from "../controllers/BooksController";

test("adds a new book", async () => {
  const mockStore = new BooksStore();
  const controller = new BooksController(mockStore);

  // mock API
  mockStore.addBook = jest.fn().mockImplementation(async (user, book) => {
    mockStore.books.push({ id: "123", title: book.title!, private: false });
  });

  await controller.addBook("test-user", {
    title: "Mocked Book",
    private: false,
  });

  expect(mockStore.books.length).toBe(1);
  expect(mockStore.books[0].title).toBe("Mocked Book");
});
