import type { Metadata } from "next";
import React from "react";
import CommonLayout from "../../components/ui/CommonLayout";
import Twinkle from "../../components/ui/Twinkle";
export const metadata: Metadata = {
  title: "User",
  description: "회원가입, 로그인, 프로필",
};

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
      <div className="fixed w-full h-full overflow-hidden z-0">
        <div
          className="bg-cover bg-center w-full h-full fixed z-[-1]"
          style={{ backgroundImage: "url('/images/bg.jpg')" }}
        ></div>
        <Twinkle />
      </div>
      <div className="max-w-xl w-xl h-screen relative z-1 m-auto flex flex-col items-center justify-between gap-6">
        <main className="flex-1 w-full h-full overflow-scroll">{children}</main>
      </div>
    </div>
  );
}
