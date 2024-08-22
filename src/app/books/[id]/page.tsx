"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Detail() {
  const router = useParams();
  console.log(router);

  return (
    <div>
      <h1>detail! {router.id}</h1>

      <ol>
        <li>
          <a href="/books">back</a>
        </li>
        <li>
          <a href={`/books/${router.id}/collection`}>collection</a>
        </li>
      </ol>
    </div>
  );
}
