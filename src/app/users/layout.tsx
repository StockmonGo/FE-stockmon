import type { Metadata } from "next";

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
    <div className="w-screen max-w-xl h-screen bg-[url('/images/bg.jpg')] flex flex-col items-center justify-center p-6 space-y-6 font-ptr">
      {children}
    </div>
  );
}
