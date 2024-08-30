import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function Loading({ children }: Props) {
  return (
    <div>
      <div>로딩중</div>
      <div>{children && children}</div>
    </div>
  );
}
