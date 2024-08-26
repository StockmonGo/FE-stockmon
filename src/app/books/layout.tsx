import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Books",
  description: "도감",
};

export default function BooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full h-full">{children}</div>;
}
