import BtnClose from "@/components/ui/BtnClose";
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
  return (
    <div
      className="p-6 pb-24 overflow-scroll bg-cover bg-center w-full h-full fixed z-[-1]"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="max-w-xl w-xl h-screen mx-auto">{children}</div>
      <footer className="fixed left-0 right-0 bottom-6 w-full flex justify-center z-10">
        <BtnClose />
      </footer>
    </div>
  );
}
