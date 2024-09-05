import CommonLayout from "@/components/ui/CommonLayout";
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
  return <CommonLayout title={"알림"}>{children}</CommonLayout>;
}
