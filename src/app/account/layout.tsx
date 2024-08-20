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
    <>
      <div>
        <h2>Stockmon World</h2>
      </div>
      {children}
    </>
  );
}
