import CommonLayout from "@/components/ui/CommonLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "동맹",
  description: "동맹을 관리하는 페이지입니다",
};

export default function MessageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CommonLayout title={"동맹"} >
      <div className="p-6">
        {children}
      </div>
    </CommonLayout>
  );
}
