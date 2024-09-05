import React from "react";
import CommonLayout from "./CommonLayout";

type Props = {
  children?: React.ReactNode;
};

export default function Loading({ children }: Props) {
  return (
    <CommonLayout title="로딩 중">
      <div>{children && children}</div>
    </CommonLayout>
  );
}
