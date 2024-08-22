"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Collection() {
  const router = useParams();
  console.log(router);
  return (
    <div>
      <a href={`/books/${router.id}`}>back</a>
      <div>Collection {router.id}</div>
    </div>
  );
}
