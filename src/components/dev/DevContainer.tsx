import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};
export default function DevContainer(props: Props) {
  return (
    <div className="py-2 border-solid border-1 border-stock-dark-200 rounded-lg">
      <p>{props.title}</p>
      {props.children}
    </div>
  );
}
