import CountHeader from "@/components/ui/books/CountHeader";
import CommonLayout from "@/components/ui/CommonLayout";
import React from "react";

export default function Books() {
  const books = [
    { id: 1, title: "Stockmon 1" },
    { id: 2, title: "Stockmon 2" },
    { id: 3, title: "Stockmon 3" },
  ];

  return (
    <CommonLayout
      title={"도감"}
      header={
        /* TODO: api 연결 */
        <CountHeader count={1000} />
      }
    >
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <a href={`/books/${book.id}`}>{book.title}</a>
          </li>
        ))}
      </ul>
    </CommonLayout>
  );
}
