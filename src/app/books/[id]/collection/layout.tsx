import CommonLayout from "@/components/ui/CommonLayout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Collection",
  description: "모으기",
};

export default function CollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full h-full">{children}</div>;
}
