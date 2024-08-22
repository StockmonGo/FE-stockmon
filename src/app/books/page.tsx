import React from "react";

export default function Books() {
  const books = [
    { id: 1, title: "Stockmon 1" },
    { id: 2, title: "Stockmon 2" },
    { id: 3, title: "Stockmon 3" },
  ];

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <a href={`/books/${book.id}`}>{book.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
