import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BooksStore from "../Stores/BooksStore";
import BooksController from "../Books/Books.controller";

const store = new BooksStore();
const controller = new BooksController(store, "postnikov");

const BooksView = observer(() => {
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    private: false
  });


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
    <div className="BooksView">
      <h1>Books</h1>
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#fff',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        zIndex: 999
      }}>
        Your books: {controller.privateBooksCount}
      </div>

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
        <label style={{ display: "block", marginTop: "8px" }}>
          <input
            type="checkbox"
            checked={newBook.private}
            onChange={(e) => setNewBook({ ...newBook, private: e.target.checked })}
          />
          {" "}Private
        </label>
        <button onClick={handleAddBook}>Add Book</button>
        <button onClick={() => controller.resetBooks()}>
          Reset All Books
        </button>

      </div>

      {store.isLoading ? (
        <p>Loading...</p>
      ) : (

        <div>
          <h2>Books List</h2>
          <div>
            <button onClick={() => controller.toggleFilter()}>
              Show: {store.filterPrivateOnly ? "All Books" : "Private Only"}
            </button>
          </div>
          <ul>
            {controller.books.map((book, index) => (
              <li key={index}>
                {book.author}: {book.name}
                {book.private && " (Private)"}
              </li>
            ))}
          </ul>
        </div>

      )}
    </div>
  );
});

export default BooksView;
