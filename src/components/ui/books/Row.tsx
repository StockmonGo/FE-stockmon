import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Row({ children }: Props) {
  return <div className="flex justify-between">{children}</div>;
}
