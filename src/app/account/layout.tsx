import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "회원가입&로그인",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen max-w-xl h-screen bg-[url('/images/bg.jpg')] flex flex-col items-center justify-center px-4 py-9 space-y-6 font-ptr">
      {children}
    </div>
  );
}
