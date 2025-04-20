import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { BooksController } from "../controllers/BooksController";
import { booksStore } from "../stores/BooksStore";

const controller = new BooksController(booksStore);

export const BooksView = observer(() => {
  const user = "yourNickname";

  useEffect(() => {
    controller.loadBooks(user);
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <p>Your books: {controller.privateBooksCount}</p>
      <ul>
        {controller.books.map((book) => (
          <li key={book.id}>
            {book.title} {book.private && "(Private)"}
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          controller.addBook(user, { title: "New Book", private: false })
        }
      >
        Add Book
      </button>
    </div>
  );
});
