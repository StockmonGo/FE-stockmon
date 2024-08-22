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
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
      <div className="relative w-full h-full overflow-hidden bg-stock-lemon-100 z-0">
        <div
          className="bg-contain bg-center w-full h-full fixed rotate-45 scale-150 bg-stock-lemon-100 z-[-1]"
          style={{ backgroundImage: "url('/images/bg.png')" }}
        ></div>
      </div>
      <div className="p-4 max-w-xl min-w-96 h-64">
        <div>
          <h2>[개발용 페이지] 필요한 컴포넌트 여기서 테스트</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
