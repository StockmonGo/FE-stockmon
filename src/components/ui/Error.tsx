import React from "react";

type Props = {
  message?: string;
  children?: React.ReactNode;
};

export default function Error({
  message = "데이터를 가져오는데 실패하였습니다.",
  children,
}: Props) {
  return (
    <div>
      {message}
      {children && children}
    </div>
  );
}
