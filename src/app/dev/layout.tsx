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
      <div className="fixed w-full h-full overflow-hidden z-0">
        <div
          className="bg-contain bg-center w-full h-full fixed scale-150 z-[-1]"
          style={{ backgroundImage: "url('/images/bg.jpg')" }}
        ></div>
      </div>
      <div className="p-4 max-w-xl min-w-96 h-64 relative z-1">
        <div>
          <h2>[개발용 페이지] 필요한 컴포넌트 여기서 테스트</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
