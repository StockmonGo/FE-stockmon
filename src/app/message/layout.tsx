import BtnClose from "@/components/ui/BtnClose";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "알림함",
  description: "알림내역을 보여줍니다.",
};

export default function MessageLayout({
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
      </div>
      <div className="p-6 max-w-xl w-xl h-screen relative z-1 m-auto flex flex-col items-center justify-between gap-6">
        <div className="header">
          <h2 className="text-center text-stock-dark-800 text-xl font-bold py-2">
            알림
          </h2>
        </div>
        <div className="main flex-1 w-full overflow-hidden">{children}</div>
        <div className="footer">
          <BtnClose />
        </div>
      </div>
    </div>
  );
}
