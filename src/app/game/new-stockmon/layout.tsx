import CommonLayout from "@/components/ui/CommonLayout";
import React from "react";
import { Suspense } from "react";
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <CommonLayout routeUrl={"/world"}>{children}</CommonLayout>
    </Suspense>
  );
}
