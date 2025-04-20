import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BooksStore from "../Stores/BooksStore";
import BooksController from "../Books/Books.controller";

const store = new BooksStore();
const controller = new BooksController(store, "postnikov"); 

const BooksView = observer(() => {
  const [newBook, setNewBook] = useState({ name: "", author: "" });

  useEffect(() => {
    controller.loadBooks();
  }, []);

  const handleAddBook = async () => {
    if (newBook.name && newBook.author) {
      await controller.addBook(newBook);
      setNewBook({ name: "", author: "" });
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <p>Your private books: {controller.privateBooksCount}</p>

      <div>
        <input
          type="text"
          placeholder="Book name"
          value={newBook.name}
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      {store.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {controller.books.map((book, index) => (
            <li key={index}>
              {book.author}: {book.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default BooksView;
