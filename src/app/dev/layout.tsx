import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "회원가입&로그인",
};

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4">
      <div>
        <h2>[개발용 페이지] 필요한 컴포넌트 여기서 테스트</h2>
      </div>
      {children}
    </div>
  );
}
