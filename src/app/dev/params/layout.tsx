import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "회원가입&로그인",
};

export default function paramsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div>
          <h4>파라미터 예제</h4>
        </div>
        {children}
      </body>
    </html>
  );
}
