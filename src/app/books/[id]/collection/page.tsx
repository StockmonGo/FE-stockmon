"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Collection() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <a href={`/books/${params.id}`}>back</a>
      <div>Collection {params.id}</div>
    </div>
  );
}
