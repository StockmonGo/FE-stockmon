import CommonLayout from "@/components/ui/CommonLayout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "BookDetail",
  description: "도감 상세 페이지",
};

export default function BookDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CommonLayout>{children}</CommonLayout>;
}
